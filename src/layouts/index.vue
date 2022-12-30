
<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && classObj.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { AppModule, DeviceType } from 'src/store/modules/app';
import { SettingModule } from 'src/store/modules/setting';
import UseResize from './hooks/useResize';
import Sidebar from './components/Sidebar/index.vue';
import NavigationBar from './components/NavigationBar/index.vue';
import TagsView from './components/TagsView/index.vue';
import AppMain from './components/AppMain.vue';
@Component({
  name: 'LayoutIndexComponents',
  components: {
    Sidebar,
    NavigationBar,
    TagsView,
    AppMain,
  },
  mixins: [UseResize],
})
export default class LayoutIndexComponents extends Vue {
  get showSettings() {
    return SettingModule.showSettings;
  }
  get showTagsView() {
    return SettingModule.showTagsView;
  }
  get fixedHeader() {
    return SettingModule.fixedHeader;
  }
  get classObj() {
    return {
      hideSidebar: !AppModule.sidebar.opened,
      openSidebar: AppModule.sidebar.opened,
      withoutAnimation: AppModule.sidebar.withoutAnimation,
      mobile: AppModule.device === DeviceType.Mobile,
    };
  }
  public handleClickOutside() {
    AppModule.CLOSE_SIDEBAR(false);
  }
}
</script>
<style lang="scss" scoped>
@mixin clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: #000;
  opacity: 0.2;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
  background: var(--v3-main-container-background);
}

.sidebar-container {
  // transition: width 0.28s;
  width: var(--v3-sidebar-width) !important;
  // border-right: 1px solid #d8dce5;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: var(--v3-navigationbar-height);
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  z-index: 999;
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .tags-view-container {
    width: calc(100% - var(--v3-sidebar-hide-width));
    left: var(--v3-sidebar-hide-width);
  }
}
.hideSidebar.mobile {
  .tags-view-container {
    width: 100%;
    left: 0;
  }
}

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: var(--v3-sidebar-width) !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
