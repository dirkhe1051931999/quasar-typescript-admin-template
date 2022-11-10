<template>
  <section class="app-main">
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

import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'AppMainComponent',
  components: {},
})
export default class AppMainComponent extends Vue {
  get key() {
    return this.$route.path;
  }
  get refreshPage() {
    return AppModule.refreshPage;
  }
}
</script>



<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  padding: 16px;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}
.hasTagsView {
  .app-main {
    min-height: calc(
      100vh - var(--v3-header-height)-var(--v3-navigationbar-height)
    );
  }
  .fixed-header + .app-main {
    padding-top: calc(
      var(--v3-navigationbar-height) + var(--v3-header-height) + 16px
    );
    padding-bottom: 16px;
  }
}
</style>
