<template>
  <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <div class="sidebar-surface">
      <header class="sidebar-header">
        <div class="sidebar-brand" v-show="!isCollapse">
          <div class="sidebar-brand-text">
            <span class="sidebar-title">Quasar Admin</span>
            <span class="sidebar-subtitle">控制台</span>
          </div>
        </div>
        <button class="collapse-btn" type="button" @click="toggleCollapse" aria-label="折叠侧边栏">
          <q-icon :name="isCollapse ? 'chevron_right' : 'chevron_left'" />
        </button>
      </header>

      <div class="sidebar-divider" />

      <div class="scrollbar-wrapper" ref="scrollbarWrapper">
        <nav class="menu-list">
          <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :isCollapse="isCollapse" />
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { AppModule } from 'src/store/modules/app';
import { PermissionModule } from 'src/store/modules/permission';

export default defineComponent({
  name: 'SidebarComponent',
  components: {
    SidebarItem,
  },
  computed: {
    activeMenu(): string {
      const { meta, path } = this.$route;
      if (meta?.activeMenu) {
        return meta.activeMenu as string;
      }
      return path;
    },
    routes(): any[] {
      return PermissionModule.dynamicRoutes;
    },
    isCollapse(): boolean {
      return AppModule.sidebarStatus;
    },
  },
  watch: {
    isCollapse(newVal: boolean) {
      if (newVal) {
        // 折叠时重置滚动位置
        this.$nextTick(() => {
          const scrollbarEl = this.$refs.scrollbarWrapper as HTMLElement;
          if (scrollbarEl) {
            scrollbarEl.scrollTop = 0;
          }
        });
      }
    },
  },
  methods: {
    toggleCollapse() {
      AppModule.SET_SIDEBAR_STATUS(!this.isCollapse);
    },
  },
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.sidebar-container {
  width: var(--sidebar-width);
  height: 100vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
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
}

.sidebar-surface {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0 20px;
  min-height: 0;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 8px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #323232;
}

.sidebar-subtitle {
  font-size: 12px;
  color: $grey;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.collapse-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 4px;
  background: #ffffff;
  color: $grey-9;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.06);

  .q-icon {
    font-size: 20px;
  }

  &:hover {
    background: linear-gradient(135deg, var(--q-primary) 0%, #764ba2 100%);
    border-color: var(--q-primary);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

.sidebar-divider {
  height: 1px;
  margin: 12px 20px 16px;
  background: linear-gradient(90deg, rgba(226, 232, 240, 0) 0%, rgba(226, 232, 240, 0.8) 50%, rgba(226, 232, 240, 0) 100%);
}

.scrollbar-wrapper {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px 12px;

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

.sidebar-container.is-collapse {
  .sidebar-brand {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-12px);
  }

  .collapse-btn {
    border-radius: 4px;
  }
}

.sidebar-container:not(.is-collapse) {
  .sidebar-brand {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
}

@media (max-width: 1024px) {
  .sidebar-container {
    position: relative !important;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }

  .sidebar-surface {
    padding-bottom: 16px;
  }
}
</style>