<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <Fold v-if="isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-facing-decorator';
import { Expand, Fold } from '@element-plus/icons-vue';
@Component({
  name: 'HamburgerComponent',
  components: {
    Expand,
    Fold,
  },
})
export default class HamburgerComponent extends Vue {
  @Prop({ default: false }) isActive!: boolean;
  @Emit
  public toggleClick() {
    return null;
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
