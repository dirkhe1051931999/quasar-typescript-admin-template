
<template>
  <div class="handle-button" @click="show = true">
    <q-icon name="settings" class="fs-24"></q-icon>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
@Component({
  name: 'RightPanelComponent',
  components: {},
})
export default class RightPanelComponent extends Vue {
  get key() {
    return this.$route.path;
  }
  public show = false;
}
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--v3-rightpanel-button-bg-color);
  position: fixed;
  top: 350px;
  right: 0px;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: var(--my-white);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
