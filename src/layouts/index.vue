<template>
  <div class="layout" :style="layoutStyle">
    <SidebarComponent class="sidebar-container" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import SidebarComponent from 'layouts/components/sidebar/Sidebar.vue';
import { AppModule } from 'src/store/modules/app';

@Component({
  name: 'LayoutIndexComponents',
  components: { SidebarComponent },
})
class LayoutIndexComponents extends Vue {
  private readonly expandedSidebarWidth = 260;
  private readonly collapsedSidebarWidth = 72;

  get sidebarWidth(): number {
    return AppModule.sidebarStatus ? this.collapsedSidebarWidth : this.expandedSidebarWidth;
  }

  get layoutStyle(): Record<string, string> {
    return {
      '--sidebar-width': `${this.sidebarWidth}px`,
      '--sidebar-expand-width': `${this.expandedSidebarWidth}px`,
      '--sidebar-collapse-width': `${this.collapsedSidebarWidth}px`,
    };
  }
}

export default LayoutIndexComponents;
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fb 0%, #eef1f8 100%);
  color: #323232;
}

.sidebar-container {
  flex-shrink: 0;
  width: var(--sidebar-width);
}

.main-container {
  flex: 1;
  min-height: 100vh;
  padding: 16px;
  margin-left: var(--sidebar-width);
  transition: padding 0.2s ease, margin-left 0.28s ease;
}

@media (max-width: 1024px) {
  .layout {
    flex-direction: column;
  }

  .sidebar-container {
    width: 100%;
    position: relative;
  }

  .main-container {
    padding: 20px 16px 32px;
    margin-left: 0;
  }
}
</style>