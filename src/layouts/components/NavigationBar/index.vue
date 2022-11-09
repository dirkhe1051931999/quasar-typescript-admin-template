<template>
  <div class="navigation-bar">
    <Hamburger
      :is-active="sidebar.opened"
      class="hamburger"
      @toggleClick="toggleSidebar"
    />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <!-- <Screenfull v-if="showScreenfull" class="right-menu-item" /> -->
      <!-- <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" /> -->
      <!-- <Notify v-if="showNotify" class="right-menu-item" /> -->
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a
              target="_blank"
              href="https://juejin.cn/post/7089377403717287972"
            >
              <el-dropdown-item>中文文档</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { AppModule } from 'src/store/modules/app';
import { SettingModule } from 'src/store/modules/setting';
import { UserFilled } from '@element-plus/icons-vue';
import Breadcrumb from '../Breadcrumb/index.vue';
import Hamburger from '../Hamburger/index.vue';
import { UserModule } from 'src/store/modules/user';
@Component({
  name: 'NavigationBarComponent',
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class NavigationBarComponent extends Vue {
  get username() {
    return 'UserModule.username';
  }
  get sidebar() {
    return AppModule.sidebar;
  }
  get showNotify() {
    return SettingModule.showNotify;
  }
  get showThemeSwitch() {
    return SettingModule.showThemeSwitch;
  }
  get showScreenfull() {
    return SettingModule.showScreenfull;
  }
  get UserFilled() {
    return UserFilled;
  }
  public toggleSidebar() {
    AppModule.TOGGLE_SIDEBAR(false);
  }
  public logout() {
    UserModule.LogOut();
    this.$router.push('/login');
  }
}
</script>



<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
