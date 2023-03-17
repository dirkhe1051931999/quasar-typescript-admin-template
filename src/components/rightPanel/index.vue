
<template>
  <div class="VueSidePanel">
    <VueSidePanel v-model="isOpened" lock-scroll width="800px" z-index="2000" hide-close-btn body-class="VueSidePanel" :overlay-opacity="0">
      <div class="title f-bold q-pa-md fs-18">
        {{ title }}
        <div class="close" @click="isOpened = false">
          <q-icon name="app:navigation-close" class="icon"></q-icon>
        </div>
      </div>
      <div class="split-line h-1"></div>
      <div class="content">
        <slot></slot>
      </div>
    </VueSidePanel>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
@Component({
  name: 'RightPanelComponent',
  components: {},
  emits: ['isOpen'],
})
export default class RightPanelComponent extends Vue {
  @Prop({ default: '' }) title!: string;
  public isOpened = false;
  @Watch('isOpened')
  onchange() {
    this.$emit('isOpen', this.isOpened);
  }
}
</script>
<style lang="scss">
.body--dark {
}
.body--light {
}
.body--dark {
  .VueSidePanel {
    box-shadow: -12px 0px 16px -8px rgba($color: #ffffff, $alpha: 0);
  }
}
.body--light {
  .VueSidePanel {
    box-shadow: -12px 0px 16px -8px rgba($color: #000000, $alpha: 0);
  }
}
</style>
<style lang="scss" scoped>
.VueSidePanel {
  .title {
    position: relative;
    .close {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--my-white);
      transition: all 0.2s;
      &:hover {
        background: var(--my-grey-1);
        cursor: pointer;
      }
    }
  }
  // .content {
  // }
}
</style>
