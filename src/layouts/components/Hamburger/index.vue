<template>
  <div @click="toggleClick">
    <q-icon class="icon" name="menu_open" v-if="isActive"></q-icon>
    <q-icon class="icon" name="menu" v-else></q-icon>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-facing-decorator';
@Component({
  name: 'HamburgerComponent',
  components: {},
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
  font-size: 20px;
}
</style>
