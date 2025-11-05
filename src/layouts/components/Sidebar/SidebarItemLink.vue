<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to" @click="$emit('listenRouteChange')">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// 模拟 isExternal 效用函数
const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);

export default defineComponent({
  name: 'SidebarItemLink',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  emits: ['listenRouteChange'],
  setup() {
    return {
      isExternal,
    };
  },
});
</script>