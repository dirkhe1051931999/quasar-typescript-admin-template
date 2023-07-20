<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { isExternal } from 'src/utils/validate';
import { Component, Prop, Vue } from 'vue-facing-decorator';
@Component({
  name: 'SidebarItemLinkComponent',
})
export default class SidebarItemLinkComponent extends Vue {
  @Prop({ default: '' }) to!: string;
  public isExternal = isExternal;
}
</script>
