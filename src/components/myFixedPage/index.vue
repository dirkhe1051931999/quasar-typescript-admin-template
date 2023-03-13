<template>
  <transition
    appear
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown"
  >
    <div class="inner-page" :style="calcStyle">
      <div class="inner">
        <q-icon
          name="arrow_back"
          class="fs-20 absolute left-52 top-45 cursor-pointer"
          @click="back"
        ></q-icon>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { AppModule } from 'src/store/modules/app';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'MyFixedPageComponent', emits: ['back'] })
export default class MyFixedPageComponent extends Vue {
  get isCollapse() {
    return !AppModule.sidebar.opened;
  }
  @Watch('isCollapse', { immediate: true })
  onchange(newVal: boolean) {
    if (newVal) {
      this.calcStyle =
        'width:calc(100vw - 58px - 24px - 24px);left:calc(58px + 24px)';
    } else {
      this.calcStyle =
        'width:calc(100vw - 254px - 24px - 24px);left:calc(254px + 24px)';
    }
  }
  private calcStyle = '';
  private back() {
    this.$emit('back');
  }
}
</script>


<style lang="scss" scoped>
.inner-page {
  position: fixed;
  transition: all 0.3s;
  height: calc(
    100vh - var(--v3-header-height)-var(--v3-navigationbar-height) - 16px - 16px
  );
  right: 16px;
  top: calc(var(--v3-navigationbar-height) + var(--v3-header-height) + 16px);
  bottom: 16px;
  background: #ffffff;
  z-index: 10;
  box-shadow: 0px 6px 16px -1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px;
  .inner {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      background: transparent;
    }
    &::-webkit-scrollbar:vertical {
      width: 1em;
    }
    &::-webkit-scrollbar:horizontal {
      height: 1em;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 99999px;
      border: 0.3125em solid transparent;
      background-clip: content-box;
    }
  }
}
</style>