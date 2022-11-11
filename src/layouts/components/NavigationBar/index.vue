<template>
  <div class="navigation-bar">
    <Hamburger
      :is-active="sidebar.opened"
      class="hamburger"
      @toggleClick="toggleSidebar"
    />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <a
        class="right-menu-item"
        href="https://dirkhe1051931999.github.io/quasar/"
        target="__blank"
        >vue2 with quasar and use vue-class-decorator</a
      >
      <q-icon name="arrow_forward_ios" class="fs-18 text-white m-r-12"></q-icon>
      <q-separator dark vertical />
      <div class="right-menu-item">{{ version }}</div>
      <q-separator dark vertical />
      <q-btn stretch flat icon="refresh" @click="refreshCurPage">
        <q-tooltip>{{ $t('tip.refreshCurPage') }}</q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn
        stretch
        flat
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      >
        <q-tooltip>
          {{
            !$q.fullscreen.isActive
              ? `${$t('tip.fullscreen')}`
              : `${$t('tip.cancelFullscreen')}`
          }}
        </q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn-dropdown stretch flat align="center" icon="font_download">
        <q-list>
          <q-item
            :clickable="lang === 'zh-CN'"
            v-close-popup="lang === 'zh-CN'"
            :disable="lang === 'en-US'"
            @click="checkLang('en-US')"
          >
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-close-popup="lang === 'en'"
            :disable="lang === 'zh-CN'"
            :clickable="lang === 'en-US'"
            @click="checkLang('zh-CN')"
          >
            <q-item-section>
              <q-item-label>中文</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
      <q-btn-dropdown stretch flat align="center">
        <template v-slot:label>
          <q-avatar class="m-r-10 fs-38">
            <img src="~assets/avatar2.jpg" />
          </q-avatar>
          <span>{{ username }}</span>
        </template>
        <q-list dense>
          <q-separator inset spaced />
          <q-item clickable v-close-popup @click="logout">
            <q-item-section>
              <q-item-label>{{ $t('layouts.logout') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { AppModule } from 'src/store/modules/app';
import { SettingModule } from 'src/store/modules/setting';
import Breadcrumb from '../Breadcrumb/index.vue';
import Hamburger from '../Hamburger/index.vue';
import { UserModule } from 'src/store/modules/user';
import setting from 'src/setting.json';
@Component({
  name: 'NavigationBarComponent',
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class NavigationBarComponent extends Vue {
  get username() {
    return UserModule.username;
  }
  get lang() {
    return AppModule.language;
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
  public version = setting.version;
  public checkLang(language: string) {
    if (language === 'en-US') {
      AppModule.SET_LANGUAGE(language);
      this.$i18n.locale = language;
      setting.language = language;
    } else {
      AppModule.SET_LANGUAGE(language);
      this.$i18n.locale = language;
      setting.language = language;
    }
  }
  public refreshCurPage() {
    AppModule.refreshCurPage();
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
  border-bottom: 1px solid #eee;
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: var(--v3-navigationbar-background);
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 12px;
    cursor: pointer;
    color: #ffffff;
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
    margin-right: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffffff;
    .right-menu-item {
      padding: 0 12px;
    }
  }
}
</style>
