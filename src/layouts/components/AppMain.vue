<template>
  <section class="app-main" :style="[calcStyle1, calcStyle2]" ref="appMain">
    <router-view v-slot="{ Component }" v-if="refreshPage">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import { AppModule } from 'src/store/modules/app';
import { getCurrentInstance } from 'vue';

import { Component, Vue, Watch } from 'vue-facing-decorator';

@Component({
  name: 'AppMainComponent',
  components: {},
})
export default class AppMainComponent extends Vue {
  $refs: any;
  get isCollapse() {
    return !AppModule.sidebar.opened;
  }
  get key() {
    this.$nextTick(() => {
      if (this.$refs.appMain.offsetHeight === this.$refs.appMain.scrollHeight) {
        this.calcStyle2 = 'padding:16px 28px';
      } else {
        this.calcStyle2 = 'padding:16px 16px 16px 28px';
      }
    });
    return this.$route.path;
  }
  get refreshPage() {
    return AppModule.refreshPage;
  }
  @Watch('isCollapse', { immediate: true })
  onchange(newVal: boolean) {
    if (newVal) {
      this.calcStyle1 = 'width:calc(100vw - 58px)';
    } else {
      this.calcStyle1 = 'width:calc(100vw - 220px)';
    }
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private calcStyle1 = '';
  private calcStyle2 = '';
}
</script>



<style lang="scss" scoped>
.app-main {
  position: fixed;
  height: calc(100vh - var(--v3-header-height)-var(--v3-navigationbar-height) - 16px - 16px);
  top: calc(var(--v3-navigationbar-height) + var(--v3-header-height));
  bottom: 0;
  right: 0;
  transition: all 0.2s;
  box-shadow: 0px 6px 16px -1px var(--q-shadow-1);
  overflow: auto;
  &::-webkit-scrollbar {
    background: transparent;
  }
  &::-webkit-scrollbar:vertical {
    width: 16px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 16px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 99999px;
    border: 0.3125em solid transparent;
    background-clip: content-box;
  }
}
.hasTagsView {
  .app-main {
    height: calc(100vh - var(--v3-header-height)-var(--v3-navigationbar-height) - 16px - 16px);
  }
}
</style>
