
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="collapse" key="collapse" to="/">
        <img src="~src/assets/logo.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="row items-center p-l-10 p-r-10">
          <img src="~src/assets/logo.png" class="sidebar-logo" />
          <div class="fs-14 f-bold">
            {{ PrdTitle }}
          </div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import setting from 'src/setting.json';
@Component({
  name: 'SidebarLogoComponent',
})
export default class SidebarLogoComponent extends Vue {
  @Prop({ default: true }) collapse!: boolean;
  public PrdTitle = setting.title;
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  zoom: 1;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--my-white);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    height: 32px;
    width: 32px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
    margin-right: 0;
  }
}
</style>
