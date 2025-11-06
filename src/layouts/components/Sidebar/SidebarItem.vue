<template>
  <div v-if="!item.meta?.hidden" :class="['sidebar-item-wrapper', { 'is-collapse': isCollapse }]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)" @listenRouteChange="listenRouteChange(theOnlyOneChild)">
        <div :class="['menu-item', { 'is-active': isActive(resolvePath(theOnlyOneChild.path)) }]" :title="$t(`routes.${theOnlyOneChild.meta.title}`)">
          <q-icon v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon as string" class="menu-icon" />
          <span class="menu-text">
            {{ $t(`routes.${theOnlyOneChild.meta.title}`) }}
          </span>
        </div>
      </SidebarItemLink>
    </template>

    <div v-else class="sub-menu-container" ref="subMenuContainer">
      <div :class="['sub-menu-title', { 'is-active': isSubMenuActive(resolvePath(item.path || '')) }]" @click="toggleExpand" :title="$t(`routes.${item.meta?.title || ''}`)">
        <q-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon as string" class="menu-icon" />
        <span class="menu-text">
          {{ $t(`routes.${item.meta?.title}`) }}
        </span>
        <q-icon name="keyboard_arrow_down" class="arrow-icon" :class="{ 'is-open': isExpanded }" />
      </div>

      <!-- 展开状态下显示子菜单 -->
      <transition name="menu-slide">
        <div v-show="isExpanded && !isCollapse" class="sub-menu-children">
          <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" :isCollapse="isCollapse" />
        </div>
      </transition>

      <!-- 折叠状态下显示弹窗 -->
      <transition name="popup-fade">
        <div v-show="showPopup && isCollapse && hasVisibleChildren" class="sub-menu-popup" :style="popupStyle" @mouseenter="handlePopupEnter" @mouseleave="handlePopupLeave">
          <div class="popup-content">
            <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" :isCollapse="false" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, computed, nextTick, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import path from 'path-browserify';
import SidebarItemLink from './SidebarItemLink.vue';
import type { RouteRecordRaw } from 'vue-router';

const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);

export default defineComponent({
  name: 'SidebarItem',
  components: {
    SidebarItemLink,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const { t } = useI18n();

    const isExpanded = ref(false);
    const showPopup = ref(false);
    const popupStyle = ref<Record<string, string>>({});
    const popupTimer = ref<NodeJS.Timeout | null>(null);
    const subMenuContainer = ref<HTMLElement | null>(null);

    const alwaysShowRootMenu = computed(() => {
      return !!(props.item.meta && props.item.meta.alwaysShow);
    });

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item: RouteRecordRaw) => {
          return !(item.meta && item.meta.hidden);
        });
        return showingChildren.length;
      }
      return 0;
    });

    const theOnlyOneChild = computed(() => {
      if (props.item.meta?.oneChildMenu) {
        return null;
      }
      if (showingChildNumber.value > 1) {
        return null;
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      return { ...props.item, path: '' } as RouteRecordRaw;
    });

    const hasVisibleChildren = computed(() => {
      return props.item.children ? props.item.children.some((child: RouteRecordRaw) => !child.meta || !child.meta.hidden) : false;
    });

    onBeforeUnmount(() => {
      if (popupTimer.value) {
        clearTimeout(popupTimer.value);
      }
    });

    const resolvePath = (routePath: string): string => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return path.resolve(props.basePath, routePath);
    };

    const isActive = (routePath: string): boolean => {
      return route.path === routePath;
    };

    const isSubMenuActive = (routePath: string): boolean => {
      return route.path.startsWith(routePath);
    };

    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    const listenRouteChange = (route: any) => {
      const { meta } = route;
      if (meta.listenRouteChange) {
        console.log(`Listen to route change for ${route.path}`);
      }
    };

    const handleMouseEnter = () => {
      if (props.isCollapse && hasVisibleChildren.value) {
        if (popupTimer.value) {
          clearTimeout(popupTimer.value);
          popupTimer.value = null;
        }
        showPopup.value = true;
        nextTick(() => {
          updatePopupPosition();
        });
      }
    };

    const handleMouseLeave = () => {
      if (props.isCollapse) {
        // 延迟关闭，允许鼠标移动到弹窗
        popupTimer.value = setTimeout(() => {
          showPopup.value = false;
        }, 150);
      }
    };

    const updatePopupPosition = () => {
      const container = subMenuContainer.value;
      if (container) {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        let top = rect.top;

        // 如果弹窗会超出视口底部，调整位置
        const estimatedHeight = Math.min(300, (props.item.children?.length || 0) * 46);
        if (top + estimatedHeight > viewportHeight) {
          top = viewportHeight - estimatedHeight - 16;
        }

        // 确保不会超出顶部
        if (top < 16) {
          top = 16;
        }

        popupStyle.value = {
          top: `${top}px`,
          left: `${rect.right + 8}px`,
        };
      }
    };

    const handlePopupEnter = () => {
      if (popupTimer.value) {
        clearTimeout(popupTimer.value);
        popupTimer.value = null;
      }
    };

    const handlePopupLeave = () => {
      if (props.isCollapse) {
        showPopup.value = false;
      }
    };

    return {
      isExternal,
      isExpanded,
      showPopup,
      popupStyle,
      subMenuContainer,
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      hasVisibleChildren,
      resolvePath,
      isActive,
      isSubMenuActive,
      toggleExpand,
      listenRouteChange,
      handleMouseEnter,
      handleMouseLeave,
      updatePopupPosition,
      handlePopupEnter,
      handlePopupLeave,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.sidebar-item-wrapper {
  display: block;
}

.menu-item,
.sub-menu-title {
  display: flex;
  align-items: center;
  position: relative;
  height: 46px;
  padding: 0 12px;
  border-radius: 4px;
  cursor: pointer;
  color: #323232;
  font-size: 14px;
  letter-spacing: 0.01em;
  gap: 12px;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  overflow: hidden;
}

.menu-item::before,
.sub-menu-title::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 10px;
  width: 4px;
  height: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--q-primary) 0%, #764ba2 100%);
  transform: translateY(-50%);
  transition: height 0.25s ease;
}

.menu-item:not(.is-active):hover,
.sub-menu-title:not(.is-active):hover {
  background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
  color: #323232;
}

.menu-item.is-active {
  background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
  color: var(--q-primary);
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
    color: var(--q-primary);
  }
}

.menu-item.is-active::before,
.sub-menu-title.is-active::before {
  display: none;
}

.sub-menu-title.is-active {
  background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
  color: var(--q-primary);
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
    color: var(--q-primary);
  }
}

.menu-icon {
  font-size: 18px;
  color: inherit;
  opacity: 1;
}

.menu-text {
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.arrow-icon {
  margin-left: auto;
  font-size: 18px;
  opacity: 0.6;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.arrow-icon.is-open {
  transform: rotate(180deg);
  opacity: 0.9;
}

.sub-menu-children {
  padding-left: 18px;
  margin-top: 6px;
  border-left: 1px dashed rgba(203, 213, 225, 0.6);
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.2s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  max-height: 400px;
  opacity: 1;
}

.sidebar-item-wrapper.is-collapse {
  .menu-item,
  .sub-menu-title {
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .menu-item::before,
  .sub-menu-title::before,
  .arrow-icon,
  .menu-text {
    display: none;
  }

  .menu-icon {
    font-size: 20px;
  }

  .sub-menu-children {
    display: none;
  }

  .menu-item.is-active,
  .sub-menu-title.is-active {
    background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
    color: var(--q-primary);
  }

  .menu-item.is-active:hover,
  .sub-menu-title.is-active:hover {
    background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
    color: var(--q-primary);
  }
}

// 弹窗中的菜单项不受折叠样式影响
.sub-menu-popup {
  .sidebar-item-wrapper {
    // 覆盖折叠样式，确保弹窗中的菜单正常显示
    &.is-collapse {
      .menu-item,
      .sub-menu-title {
        justify-content: flex-start !important;
        margin: 0 6px !important;
        padding: 0 12px !important;
      }

      .menu-text {
        display: inline !important;
      }

      .arrow-icon {
        display: block !important;
      }

      .menu-icon {
        font-size: 18px !important;
      }

      .sub-menu-children {
        display: block !important;
      }
    }

    // 非折叠状态下的正常样式
    .menu-item,
    .sub-menu-title {
      justify-content: flex-start;
      padding: 0 12px;
    }

    .menu-text {
      display: inline;
    }

    .arrow-icon {
      display: block;
    }

    .sub-menu-children {
      display: block;
      padding-left: 18px;
      margin-top: 6px;
      border-left: 1px dashed rgba(203, 213, 225, 0.6);
    }
  }
}

.sub-menu-popup {
  position: fixed;
  z-index: 2000;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.8);
  min-width: 200px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 8px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: rgba(203, 213, 225, 0.6);

    &:hover {
      background: rgba(148, 163, 184, 0.8);
    }
  }
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;

  // 确保弹窗中的菜单项有正确的样式
  .sidebar-item-wrapper {
    width: 100%;
  }
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.popup-fade-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.popup-fade-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
