
<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
    <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :basePath="route.path"
          :isCollapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { getCssVariableValue } from 'src/utils/tools';
import { PermissionModule } from 'src/store/modules/permission';
import { AppModule } from 'src/store/modules/app';
import { SettingModule } from 'src/store/modules/setting';
import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';

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
    console.log(PermissionModule.routes);
    return PermissionModule.routes;
  }
  public v3SidebarMenuBgColor = getCssVariableValue(
    '--v3-sidebar-menu-bg-color'
  );
  public v3SidebarMenuTextColor = getCssVariableValue(
    '--v3-sidebar-menu-text-color'
  );
  public v3SidebarMenuActiveTextColor = getCssVariableValue(
    '--v3-sidebar-menu-active-text-color'
  );
}
</script>


<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
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
  &.is-active,
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
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
