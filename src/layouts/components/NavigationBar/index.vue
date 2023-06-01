<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggleClick="toggleSidebar" />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <a class="right-menu-item" href="https://dirkhe1051931999.github.io/quasar/" target="__blank">vue2 with quasar and use vue-class-decorator</a>
      <q-icon name="arrow_forward_ios" class="fs-18 text-white q-mr-md"></q-icon>
      <q-separator dark vertical />
      <div class="right-menu-item" :id="`${appTitle}-version`">{{ version }}</div>
      <q-separator dark vertical />
      <q-btn stretch flat icon="refresh" @click="refreshCurPage" :id="`${appTitle}-refreshCurPage`">
        <q-tooltip>{{ $t('tip.refreshCurPage') }}</q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn stretch flat :icon="darkIsActive ? 'dark_mode' : 'light_mode'" @click="toggleTheme()" :id="`${appTitle}-toggleTheme`">
        <q-tooltip>{{ $t('tip.toggleTheme') }}</q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn stretch flat @click="$q.fullscreen.toggle()" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" :id="`${appTitle}-fullscreen`">
        <q-tooltip>
          {{ !$q.fullscreen.isActive ? `${$t('tip.fullscreen')}` : `${$t('tip.cancelFullscreen')}` }}
        </q-tooltip>
      </q-btn>
      <q-separator dark vertical />
      <q-btn-dropdown stretch flat align="center" icon="font_download" dropdown-icon="app:topbar-arrow-bottom-white" :id="`${appTitle}-lang`">
        <q-list>
          <q-item :clickable="lang === 'zh-CN'" v-close-popup="lang === 'zh-CN'" :disable="lang === 'en-US'" @click="checkLang('en-US')">
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup="lang === 'en'" :disable="lang === 'zh-CN'" :clickable="lang === 'en-US'" @click="checkLang('zh-CN')">
            <q-item-section>
              <q-item-label>中文</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
      <div class="right-menu-item" @click="handleStartStep">step-by-step tours</div>
      <q-separator dark vertical />
      <q-btn-dropdown stretch flat align="center" dropdown-icon="app:topbar-arrow-bottom-white" :id="`${appTitle}-userinfo`">
        <template v-slot:label>
          <q-avatar class="q-mr-md fs-38">
            <img src="~assets/avatar.jpg" />
          </q-avatar>
          <span>{{ username }}</span>
        </template>
        <div class="row no-wrap q-pa-md">
          <div class="column w-200">
            <div class="text-h6 q-mb-md">Settings</div>
            <div class="row justify-between items-center">
              <span class="fs-12"> Tab Bar?</span>
              <el-switch v-model="showTagsView" class="drawer-switch" />
            </div>
            <div class="row justify-between items-center">
              <span class="fs-12">Sidebar Logo?</span>
              <el-switch v-model="showSidebarLogo" class="drawer-switch" />
            </div>
            <div class="row justify-between items-center">
              <span class="fs-12">Fixed Header</span>
              <el-switch v-model="fixedHeader" class="drawer-switch" />
            </div>
            <div class="row justify-between items-center">
              <span class="fs-12">Notify?</span>
              <el-switch v-model="showNotify" class="drawer-switch" />
            </div>
            <div class="row justify-between items-center">
              <span class="fs-12">Switch Theme Button?</span>
              <el-switch v-model="showThemeSwitch" class="drawer-switch" />
            </div>
            <div class="row justify-between items-center">
              <span class="fs-12">Full Screen Button?</span>
              <el-switch v-model="showScreenfull" class="drawer-switch" />
            </div>
          </div>
          <q-separator vertical inset class="q-mx-md" />
          <div class="column items-center">
            <q-avatar size="72px">
              <img src="~assets/logo.png" />
            </q-avatar>
            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ username }}</div>
            <q-btn color="primary" :label="$t('layouts.logout')" push @click="logout" v-close-popup />
          </div>
        </div>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { AppModule } from 'src/store/modules/app';
import Breadcrumb from '../Breadcrumb/index.vue';
import Hamburger from '../Hamburger/index.vue';
import { UserModule } from 'src/store/modules/user';
import setting from 'src/setting.json';
import { SettingModule } from 'src/store/modules/setting';
import { setDarkTheme } from 'src/utils/localStorage';
import Shepherd from 'shepherd.js';
@Component({
  name: 'NavigationBarComponent',
  components: {
    Breadcrumb,
    Hamburger,
  },
  emits: ['toggleThemeChange'],
})
export default class NavigationBarComponent extends Vue {
  get appTitle() {
    return setting.title.replace(/\s+/g, '');
  }
  get username() {
    return UserModule.username;
  }
  get lang() {
    return AppModule.language;
  }
  get sidebar() {
    return AppModule.sidebar;
  }
  get darkIsActive() {
    return this.$q.dark.isActive;
  }
  /* setting */
  get showNotify() {
    return SettingModule.showNotify;
  }
  get showThemeSwitch() {
    return SettingModule.showThemeSwitch;
  }
  get showScreenfull() {
    return SettingModule.showScreenfull;
  }
  get showTagsView() {
    return SettingModule.showTagsView;
  }
  get showSidebarLogo() {
    return SettingModule.showSidebarLogo;
  }
  get fixedHeader() {
    return SettingModule.fixedHeader;
  }
  mounted() {
    this.initStep();
  }
  public tour: any;
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
  public initStep() {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        cancelIcon: {
          enabled: true,
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
    });
    const steps = [
      {
        id: `${this.appTitle}-version`,
        title: `${this.appTitle}-version`,
        text: `${this.appTitle}-version`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-version`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.cancel();
            },
            classes: 'shepherd-button-secondary',
            text: 'Cancel',
          },
          {
            action: () => {
              return this.tour.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        id: `${this.appTitle}-refreshCurPage`,
        title: `${this.appTitle}-refreshCurPage`,
        text: `${this.appTitle}-refreshCurPage`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-refreshCurPage`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
          },
          {
            action: () => {
              return this.tour.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        id: `${this.appTitle}-toggleTheme`,
        title: `${this.appTitle}-toggleTheme`,
        text: `${this.appTitle}-toggleTheme`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-toggleTheme`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
          },
          {
            action: () => {
              return this.tour.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        id: `${this.appTitle}-fullscreen`,
        title: `${this.appTitle}-fullscreen`,
        text: `${this.appTitle}-fullscreen`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-fullscreen`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
          },
          {
            action: () => {
              return this.tour.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        id: `${this.appTitle}-lang`,
        title: `${this.appTitle}-lang`,
        text: `${this.appTitle}-lang`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-lang`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back',
          },
          {
            action: () => {
              return this.tour.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        id: `${this.appTitle}-userinfo`,
        title: `${this.appTitle}-userinfo`,
        text: `${this.appTitle}-userinfo`,
        arrow: false,
        attachTo: {
          element: `#${this.appTitle}-userinfo`,
          on: 'bottom',
        },
        buttons: [
          {
            action: () => {
              return this.tour.cancel();
            },
            text: 'Confirm',
          },
        ],
      },
    ];
    this.tour.addSteps(steps);
  }
  public handleStartStep() {
    this.tour.start();
  }
  public refreshCurPage() {
    AppModule.refreshCurPage();
  }
  public toggleTheme() {
    if (this.$q.dark.isActive) {
      this.$q.dark.set(false);
      document.querySelector('html')?.classList.remove('dark');
    } else {
      this.$q.dark.set(true);
      document.querySelector('html')?.classList.add('dark');
    }
    setDarkTheme(this.$q.dark.isActive);
    this.$emit('toggleThemeChange');
  }
  public toggleSidebar() {
    AppModule.TOGGLE_SIDEBAR(false);
  }
  public async logout() {
    await UserModule.LogOut();
    this.$router.push('/login');
    this.$globalMessage.show({
      type: 'success',
      content: this.$t('messages.success'),
    });
  }
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  border-bottom: 1px solid var(--my-grey-5);
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
    color: var(--my-white);
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
    color: var(--my-white);
    .right-menu-item {
      padding: 0 12px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
