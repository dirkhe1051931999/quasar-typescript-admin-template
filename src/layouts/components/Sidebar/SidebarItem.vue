<template>
  <div v-if="!isItemHidden" :class="['sidebar-item-wrapper', { 'is-collapse': isCollapse }]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)" @listenRouteChange="listenRouteChange(theOnlyOneChild)">
        <div :class="['menu-item', { 'is-active': isActive(resolvePath(theOnlyOneChild.path)) }]" :title="$t(`routes.${theOnlyOneChild.meta.title}`)">
          <!--          <JCsvg v-if="theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon as string" class="menu-icon" style="width: 20px" />-->
          <span class="menu-text">
            {{ $t(`routes.${theOnlyOneChild.meta.title}`) }}
          </span>
        </div>
      </SidebarItemLink>
    </template>

    <div v-else class="sub-menu-container" ref="subMenuContainer">
      <div :class="['sub-menu-title', { 'is-active': isSubMenuActive(resolvePath(item.path || '')) }]" @click="toggleExpand" :title="$t(`routes.${item.meta?.title || ''}`)">
        <!--        <JCsvg v-if="item.meta && item.meta.icon" :name="item.meta.icon as string" class="menu-icon" style="width: 20px" />-->
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
import { computed, defineComponent, nextTick, onBeforeUnmount, type PropType, ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import path from 'path-browserify';
import SidebarItemLink from './SidebarItemLink.vue';

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
    // eslint-disable-next-line no-undef
    const popupTimer = ref<NodeJS.Timeout | null>(null);
    const subMenuContainer = ref<HTMLElement | null>(null);

    const alwaysShowRootMenu = computed(() => {
      return !!(props.item.meta && props.item.meta.alwaysShow);
    });

    const isItemHidden = computed(() => {
      if (props.item.meta?.hidden) {
        return true;
      }

      const children = props.item.children;

      if (!children || children.length === 0) {
        return false;
      }

      const visibleChildren = children.filter((child: RouteRecordRaw) => !(child.meta && child.meta.hidden));

      return visibleChildren.length === 0;
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
      const children = props.item.children;
      if (!children || children.length === 0) {
        return { ...props.item, path: '' } as RouteRecordRaw;
      }
      const visibleChildren = children.filter((child: RouteRecordRaw) => !(child.meta && child.meta.hidden));
      if (visibleChildren.length === 1) {
        return visibleChildren[0];
      }
      return null;
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
      isItemHidden,
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
@use './styles/sidebarItem';
</style>