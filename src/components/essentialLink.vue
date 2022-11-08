<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({
  name: 'EssentialLink'
})
export default class EssentialLinkComponents extends Vue {
  @Prop({
    default: ''
  }) title!: string;
  @Prop({
    default: ''
  }) caption?: string;
  @Prop({
    default: ''
  }) link?: string;
  @Prop({
    default: ''
  }) icon?: string;
}
</script>


<style lang="scss" scoped>

</style>