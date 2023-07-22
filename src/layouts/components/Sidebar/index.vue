<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
    <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :basePath="route.path" :isCollapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import { PermissionModule } from 'src/store/modules/permission';
import { AppModule } from 'src/store/modules/app';
import { SettingModule } from 'src/store/modules/setting';
import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';
import { arrowSvg } from './arrow';
@Component({
  name: 'SidebarLogoComponent',
  components: {
    SidebarItem,
    SidebarLogo,
  },
})
export default class SidebarLogoComponent extends Vue {
  get activeMenu() {
    const { meta, path } = this.$route;
    if (meta?.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }
  get isCollapse() {
    return !AppModule.sidebar.opened;
  }
  get showSidebarLogo() {
    return SettingModule.showSidebarLogo;
  }
  get routes() {
    return PermissionModule.routes;
  }
  @Watch('isCollapse')
  onchange() {
    this.setArrowSvg();
  }
  mounted() {
    this.setArrowSvg();
  }
  public setArrowSvg() {
    this.$nextTick(() => {
      const arr = document.querySelectorAll('.sidebar-container .el-icon.el-sub-menu__icon-arrow');
      arr.forEach((data: any) => {
        data.innerHTML = arrowSvg;
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.body--dark {
  :deep(.el-menu-item) {
    .record {
      color: rgba($color: #ffffff, $alpha: 0.541);
    }
  }
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title),
  :deep(.el-sub-menu .el-menu-item) {
    height: var(--v3-sidebar-menu-item-height);
    line-height: var(--v3-sidebar-menu-item-height);
    &.is-active,
    &:hover {
      background-color: #a7a7a7;
    }
  }
}
.body--light {
  :deep(.el-menu-item) {
    .record {
      color: rgba($color: #000000, $alpha: 0.541);
    }
  }
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title),
  :deep(.el-sub-menu .el-menu-item) {
    height: var(--v3-sidebar-menu-item-height);
    line-height: var(--v3-sidebar-menu-item-height);
    &.is-active,
    &:hover {
      background-color: var(--my-grey-1);
    }
  }
}
:deep(.el-icon svg) {
  width: 1.5em;
  height: 1.5em;
}
@mixin tip-line {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);
  display: block;
  * {
    vertical-align: middle;
  }
}
:deep(.el-menu-item) {
  color: var(--el-text-color-primary);
  font-size: 14px !important;
  .record {
    font-size: 3px;
    width: 3px;
    height: 3px;
  }
  &.is-active {
    @include tip-line;
    color: $primary;
    .q-icon {
      color: var(--v3-sidebar-menu-active-text-color);
      &.record {
        color: var(--v3-sidebar-menu-active-text-color);
        font-size: 18px;
      }
    }
  }
}
.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--v3-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>
