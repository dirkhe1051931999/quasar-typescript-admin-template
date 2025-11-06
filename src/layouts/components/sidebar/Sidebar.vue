<template>
  <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <div class="sidebar-surface">
      <div class="scrollbar-wrapper" ref="scrollbarWrapper">
        <nav class="menu-list">
          <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :isCollapse="isCollapse" />
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue';
import { AppModule } from 'src/store/modules/app';
import { PermissionModule } from 'src/store/modules/permission';

export default defineComponent({
  name: 'SidebarComponent',
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute();
    const scrollbarWrapper = ref<HTMLElement | null>(null);

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta?.activeMenu) {
        return meta.activeMenu as string;
      }
      return path;
    });

    const routes = computed(() => {
      return PermissionModule.dynamicRoutes;
    });

    const isCollapse = computed(() => {
      return AppModule.sidebarStatus;
    });

    watch(isCollapse, (newVal: boolean) => {
      if (newVal) {
        // 折叠时重置滚动位置
        nextTick(() => {
          if (scrollbarWrapper.value) {
            scrollbarWrapper.value.scrollTop = 0;
          }
        });
      }
    });

    return {
      activeMenu,
      routes,
      isCollapse,
      scrollbarWrapper,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.sidebar-container {
  width: var(--sidebar-width);
  height: calc(100vh - var(--navigation-height, 60px));
  max-height: calc(100vh - var(--navigation-height, 60px));
  position: fixed;
  top: var(--navigation-height, 60px);
  left: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  color: #323232;
  box-shadow: 2px 0 16px rgba(15, 23, 42, 0.08);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  z-index: 1000;
  transition: width 0.28s ease;

  @media (max-width: 767px) {
    height: 100vh;
    max-height: 100vh;
    top: 0;
  }
}

.sidebar-surface {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0 0;
  min-height: 0;
  overflow: hidden;
}

.scrollbar-wrapper {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px 12px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.6) transparent;

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

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 767px) {
  .sidebar-container {
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    top: 0 !important;
    position: fixed !important;
    z-index: 2000;
    border-right: none;
  }

  .sidebar-surface {
    height: 100%;
  }
}
</style>
