<template>
  <div class="scroll-container">
    <q-icon
      class="arrow left"
      name="app:navigation-arrow-left"
      @click="scrollTo('left')"
    ></q-icon>
    <el-scrollbar ref="scrollbarRef" @scroll="scroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </el-scrollbar>
    <q-icon
      class="arrow right"
      name="app:navigation-arrow-right"
      @click="scrollTo('right')"
    ></q-icon>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue } from 'vue-facing-decorator';
import { ElScrollbar } from 'element-plus';
@Component({
  name: 'ScrollPaneComponent',
  components: {},
})
export default class ScrollPaneComponent extends Vue {
  @Ref
  readonly scrollbarRef!: InstanceType<typeof ElScrollbar>;
  @Ref
  readonly scrollbarContentRef!: HTMLDivElement;
  /** 当前滚动条距离左边的距离 */
  public currentScrollLeft = 0;
  /** 每次滚动距离 */
  readonly translateDistance = 200;
  /** 滚动时触发 */
  public scroll({ scrollLeft }: { scrollLeft: number }) {
    this.currentScrollLeft = scrollLeft;
  }
  /** 点击滚动 */
  public scrollTo(direction: 'left' | 'right') {
    let scrollLeft = 0;
    /** 可滚动内容的长度 */
    const scrollbarContentRefWidth = this.scrollbarContentRef!.clientWidth;
    /** 滚动可视区宽度 */
    const scrollbarRefWidth = this.scrollbarRef.$el.clientWidth;
    /** 最后剩余可滚动的宽度 */
    const lastDistance =
      scrollbarContentRefWidth - scrollbarRefWidth - this.currentScrollLeft;
    // 没有横向滚动条，直接结束
    if (scrollbarRefWidth > scrollbarContentRefWidth) return;
    if (direction === 'left') {
      scrollLeft = Math.max(0, this.currentScrollLeft - this.translateDistance);
    } else {
      scrollLeft = Math.min(
        this.currentScrollLeft + this.translateDistance,
        this.currentScrollLeft + lastDistance
      );
    }
    this.scrollbarRef!.setScrollLeft(scrollLeft);
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 28px;
    height: 100%;
    cursor: pointer;
    &.left {
      box-shadow: 5px 0 5px -6px #ccc;
    }
    &.right {
      box-shadow: -5px 0 5px -6px #ccc;
    }
  }
  .el-scrollbar {
    flex: 1;
    // 横向超出窗口长度时，显示滚动条
    white-space: nowrap;
    .scrollbar-content {
      display: inline-block;
    }
  }
}
</style>
