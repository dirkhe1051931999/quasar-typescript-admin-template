
<template>
  <div class="VueSidePanel">
    <VueSidePanel
      v-model="isOpened"
      lock-scroll
      width="800px"
      z-index="2000"
      hide-close-btn
      body-class="VueSidePanel"
      :overlay-opacity="0"
    >
      <div class="title f-bold">
        {{ title }}
        <div class="close" @click="isOpened = false">
          <q-icon name="app:navigation-close" class="icon"></q-icon>
        </div>
      </div>
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
.VueSidePanel {
  box-shadow: -12px 0px 16px -8px rgba(0, 0, 0, 0.08);
}
</style>
<style lang="scss" scoped>
.VueSidePanel {
  .title {
    font-size: 16px;
    padding: 24px;
    position: relative;
    .close {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      transition: all 0.2s;
      &:hover {
        background: #f5f5f6;
        cursor: pointer;
      }
    }
  }
  // .content {
  // }
}
</style>
