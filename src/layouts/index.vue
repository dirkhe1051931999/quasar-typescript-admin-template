
<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar @toggleThemeChange="toggleThemeChange" />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
    </div>
    <div class="sun" ref="sun"></div>
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
  $refs: any;
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
  private toggleThemeChange() {
    if (!this.$q.dark.isActive) {
      this.$refs.sun.classList.add('down');
      setTimeout(() => {
        this.$refs.sun.classList.remove('down');
      }, 2200);
    }
  }
}
</script>
<style lang="scss" scoped>
.body--dark {
  .sidebar-container {
    box-shadow: 0px 6px 16px -1px rgba($color: #ffffff, $alpha: 0.05);
  }
}
.body--light {
  .sidebar-container {
    box-shadow: 0px 6px 16px -1px rgba($color: #000000, $alpha: 0.05);
  }
}
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
  background-color: var(--q-dark);
  opacity: 0.2;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
  background: var(--my-white);
}

.sidebar-container {
  width: var(--v3-sidebar-width) !important;
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

.sun {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 99999;
  transform: translateY(-1300px);
  background-color: #fdd835;
  box-shadow: 0px 0px 15px #fdd835, 0px 0px 25px #fdd835, 0px 0px 50px #fdd835, 0px 0px 100px #fdd835;
  &.up {
    animation: sunRise 4s forwards;
  }
  &.down {
    animation: sunDown 4s forwards;
  }
}

@keyframes sunRise {
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(300px);
    opacity: 1;
  }
}
@keyframes sunDown {
  from {
    transform: translateY(300px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
