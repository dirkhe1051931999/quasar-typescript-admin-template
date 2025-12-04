<template>
  <div class="layout" :style="layoutStyle">
    <SidebarComponent class="sidebar-container" />
    <NavigationBar class="navigation-bar" />
    <TagsView class="tags-view" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SidebarComponent from 'layouts/components/sidebar/Sidebar.vue';
import NavigationBar from 'layouts/components/Navigation/NavigationBar.vue';
import TagsView from 'layouts/components/tags/TagsView.vue';
import { AppModule } from 'src/store/modules/app';

export default defineComponent({
  name: 'LayoutIndexComponents',
  components: {
    SidebarComponent,
    NavigationBar,
    TagsView,
  },
  setup() {
    const expandedSidebarWidth = ref(220);
    const collapsedSidebarWidth = ref(72);
    const navigationHeight = ref(60);
    const tagsViewHeight = ref(40);

    const sidebarWidth = computed(() => {
      return AppModule.sidebarStatus ? collapsedSidebarWidth.value : expandedSidebarWidth.value;
    });

    const layoutStyle = computed(() => {
      return {
        '--sidebar-width': `${sidebarWidth.value}px`,
        '--sidebar-expand-width': `${expandedSidebarWidth.value}px`,
        '--sidebar-collapse-width': `${collapsedSidebarWidth.value}px`,
        '--navigation-height': `${navigationHeight.value}px`,
        '--tags-view-height': `${tagsViewHeight.value}px`,
      };
    });

    return {
      expandedSidebarWidth,
      collapsedSidebarWidth,
      navigationHeight,
      tagsViewHeight,
      sidebarWidth,
      layoutStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  background: var(--j-color-grey-lighter);
  color: var(--j-color-dark);
}

.sidebar-container {
  flex-shrink: 0;
  width: var(--sidebar-width);
}

.navigation-bar {
  flex-shrink: 0;
}

.tags-view {
  flex-shrink: 0;
}

.main-container {
  flex: 1;
  min-width: 0;
  height: calc(100vh - var(--navigation-height) - var(--tags-view-height));
  max-height: calc(100vh - var(--navigation-height) - var(--tags-view-height));
  padding: 16px;
  margin-left: var(--sidebar-width);
  margin-top: calc(var(--navigation-height) + var(--tags-view-height));
  transition: padding 0.2s ease, margin-left 0.28s ease;
  overflow-x: hidden;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

@media (max-width: 767px) {
  .main-container {
    display: none;
  }

  .sidebar-container {
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    top: 0 !important;
    position: fixed !important;
    z-index: 2000;
  }

  .navigation-bar {
    display: none;
  }

  .tags-view {
    display: none;
  }
}
</style>