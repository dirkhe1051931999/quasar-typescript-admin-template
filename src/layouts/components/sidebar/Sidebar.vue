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
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
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
@use './styles/sidebar';
</style>