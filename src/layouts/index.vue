<template>
  <div class="animated fadeIn" style="height: 100%">
    <q-layout view="hHh Lpr lff">
      <!-- header -->
      <q-header>
        <q-toolbar>
          <q-btn dense flat round :icon="drawerLeft ? 'menu_open' : 'menu'" @click="set_left_darwer_open" />
          <q-toolbar-title class="row a-center">
            <q-breadcrumbs active-color="white" separator-color="white" class="fs-14 h-16" :key="+new Date()">
              <q-breadcrumbs-el :label="$t(`routes.${route.meta.title}`)" :name="curRouteFather" v-for="(route, index) in breadcrumbs" :key="index" />
            </q-breadcrumbs>
          </q-toolbar-title>
          <q-btn-dropdown stretch flat align="center" label="v0.0.1.3"></q-btn-dropdown>
          <q-separator dark vertical />
          <q-btn stretch flat icon="refresh" @click="refreshCurPage">
            <q-tooltip>{{ $t('tip.refreshCurPage') }}</q-tooltip>
          </q-btn>
          <q-separator dark vertical />
          <q-btn stretch flat @click="$q.fullscreen.toggle()" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'">
            <q-tooltip>{{ !$q.fullscreen.isActive ? `${$t('tip.fullscreen')}` : `${$t('tip.cancelFullscreen')}` }}</q-tooltip>
          </q-btn>
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat align="center" icon="font_download">
            <q-list>
              <q-item :clickable="lang === 'zh'" v-close-popup="lang === 'zh'" :disable="lang === 'en'" @click="checkLang('en')">
                <q-item-section>
                  <q-item-label>English</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-close-popup="lang === 'en'" :disable="lang === 'zh'" :clickable="lang === 'en'" @click="checkLang('zh')">
                <q-item-section>
                  <q-item-label>中文</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-separator dark vertical />
          <q-btn-dropdown stretch flat align="center">
            <template v-slot:label>
              <q-avatar class="m-r-10">
                <img src="~assets/avatar2.jpg" />
              </q-avatar>
            </template>
            <q-list>
              <q-item clickable v-close-popup @click="toProfile">
                <q-item-section>
                  <q-item-label>{{ $t('layouts.profile') }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset spaced />
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>
                  <q-item-label>{{ $t('layouts.logout') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
      <!-- left -->
      <q-drawer v-model="drawerLeft" show-if-above side="left" :width="250" :breakpoint="700" bordered content-class="text-black2" class="h-full">
        <q-scroll-area class="fit">
          <div class="row p-16 a-center fs-20 text-bold cursor-pointer" @click="toHome" v-if="showSideBarLogo">
            <img src="~assets/slogo.png" class="sidebar-slogo" />
            <span class="m-l-5 ellipsis w-170">{{ slogoTitle }}</span>
          </div>
          <Sidebaritem v-for="(item, index) in routes" :route="item" :key="index" :base-path="item.path" ref="sidebaritem" />
        </q-scroll-area>
      </q-drawer>
      <!-- 顶部导航 -->
      <q-page-container>
        <div class="h-48 layout-header-label bg-white text-black2 p-t-10 p-l-15 p-r-15 visited b-bottom" :style="drawerLeft ? 'left:250px' : ''">
          <div class="q-gutter-sm row no-wrap scroll">
            <div
              v-for="(tag, index) in visitedViews"
              :key="index"
              ref="tag"
              :class="[
                'bg-white p-l-10  b-radius-4 flex row relative border h-30 lh-30 p-r-20 cursor-pointer',
                isActive(tag) ? 'text-light-blue  p-r-10' : '',
              ]"
              :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
              tag="div"
              v-ripple
            >
              <span @click="handlerClickVisitedItem(tag)">{{ $t(`routes.${tag.meta.title}`) }}</span>
              <q-icon name="close" right @click.native.prevent.stop="closeTag(tag)"></q-icon>
              <q-menu touch-position context-menu>
                <q-list dense>
                  <q-item clickable v-close-popup>
                    <q-item-section @click="closeAll"> 关闭所有 </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </div>
        <!-- content -->
        <div class="m-t-70 p-l-20 p-r-20 p-b-20" :key="key">
          <router-view v-if="refreshPage" />
          <!-- 回到顶部 -->
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="blue-8" />
          </q-page-scroller>
        </div>
      </q-page-container>
      <!-- footer -->
      <q-footer class="bg-white text-center fs-12 text-gray row a-center j-center p-b-5" v-if="showFooter">
        <a :href="policy" target="_blank">{{ policy }}</a>
      </q-footer>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Sidebaritem from './components/sidebaritem.vue';
import { AppModule } from '../store/modules/app';
import { UserModule } from '../store/modules/user';
import settings from '@/settings.json';
import { PermissionModule } from '../store/modules/permission';
import { TagsViewModule, ITagView } from '@/store/modules/tags';
import { RouteRecord, Route, RouteConfig } from 'vue-router';
@Component({
  name: 'Layouts',
  components: {
    Sidebaritem,
  },
})
export default class extends Vue {
  $refs: any;
  get username() {
    return UserModule.username;
  }
  get avatar() {
    return UserModule.avatar;
  }
  get lang() {
    return AppModule.language;
  }
  get routes() {
    return PermissionModule.routes;
  }
  get key() {
    return this.$route.path;
  }

  get visitedViews() {
    return TagsViewModule.visitedViews;
  }
  get curRouteFather() {
    return this.$route.matched[0];
  }
  get refreshPage() {
    return AppModule.refreshPage;
  }
  @Watch('$route', { immediate: true })
  private onRouteChange(newVal: any) {
    this.addTags();
    this.moveToCurrentTag();
    this.getBreadcrumb();
  }
  private drawerLeft = true;
  private fixedRoute: any;
  private visible = false;
  private policy = settings.policy;
  private slogoTitle = settings.title;
  private adminName = settings.adminName;
  private showSideBarLogo = settings.showSideBarLogo;
  private showFooter = settings.showFooter;
  private breadcrumbs: any[] = [];
  private isActive(route: ITagView) {
    return route.path === this.$route.path;
  }
  private getBreadcrumb() {
    let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  }
  private isDashboard(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
  }
  private set_left_darwer_open() {
    this.drawerLeft = !this.drawerLeft;
  }
  private async logOut() {
    await UserModule.LogOut();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    this.$q.notify({
      color: 'primary',
      multiLine: true,
      icon: 'mood',
      actions: [
        {
          label: 'Close',
          color: 'white',
        },
      ],
      message: `Sign out successfully`,
    });
  }
  private addTags() {
    TagsViewModule.addView(this.$route);
  }
  private closeTag(view: ITagView) {
    if (this.visitedViews.length > 1) {
      let last: any = this.visitedViews[this.visitedViews.length - 1];
      if (this.$route.fullPath === view.fullPath) {
        // 如果删除的是当前路由，那么就删除当前路由并跳转到最后一个
        TagsViewModule.delView(view);
        // 重新获取下左后一个
        last = this.visitedViews[this.visitedViews.length - 1];
        this.$router.push({ path: last.fullPath });
      } else {
        // 如果删除不是当前路由，删了自己就好
        TagsViewModule.delView(view);
        last = this.visitedViews[this.visitedViews.length - 1];
      }
    } else {
      this.closeAll();
    }
  }
  private closeAll() {
    TagsViewModule.delAllViews();
    this.$router.push('/').catch((err) => 0);
  }
  private handlerClickVisitedItem(tag: any) {
    this.$router.push(tag.fullPath);
  }
  private moveToCurrentTag() {
    this.$nextTick(() => {
      if (this.visitedViews.length) {
        for (const tag of this.visitedViews) {
          if ((tag as ITagView).path === this.$route.path) {
            // When query is different then update
            if ((tag as ITagView).fullPath !== this.$route.fullPath) {
              TagsViewModule.updateVisitedView(this.$route);
            }
            break;
          }
        }
      }
    });
  }
  private refreshCurPage() {
    AppModule.refreshCurPage();
  }
  private checkLang(value: string) {
    AppModule.SET_LANGUAGE(value);
    this.$q.notify({
      color: 'primary',
      multiLine: true,
      icon: 'mood',
      actions: [
        {
          label: 'Close',
          color: 'white',
        },
      ],
      message: `${this.$i18n.tc('messages.success')}`,
    });
  }
  private toHome() {
    if (this.$route.name === 'Dashboard') {
      return;
    }
    this.$router.push({ path: '/' });
  }
  private toProfile() {
    this.$router.push({ path: '/profile/index' });
  }
  created() {}
}
</script>
<style lang="scss">
.layout-header-label {
  padding-right: 30px;
  position: relative;
  .scroll {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      background-color: transparent;
      display: none;
    }
  }
  .q-icon {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: 5px;
    cursor: pointer;
  }
}
</style>
<style scoped lang="scss">
.sidebar-slogo {
  width: 32px;
  height: 32px;
}
</style>
<style scoped lang="scss">
.visited {
  position: fixed;
  width: 100%;
  z-index: 10000;
  left: 0;
  .close-all {
    position: fixed;
    right: 0;
  }
}
</style>