<template>
  <template v-if="hasPermission">
    <slot />
  </template>
  <template v-else>
    <span v-if="!rmDom">
      {{ defaultContent }}
    </span>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';

// 定义权限码的类型，通常是一个字符串
type PermissionCode = string;

export default defineComponent({
  name: 'JCPermission',
  props: {
    /**
     * 权限码。如果传递 falsy 值（如 null, undefined, 或空字符串），则默认认为有权限（用于测试或特殊逻辑）
     */
    code: {
      type: [String, null] as PropType<PermissionCode | null>,
      default: null,
    },
    /**
     * 无权限时显示的默认内容
     */
    defaultContent: {
      type: String,
      default: '--', // 默认显示为 '--'
    },
    /**
     * 是否在无权限时彻底隐藏组件，而不是显示 defaultContent
     */
    rmDom: {
      type: Boolean,
      default: false,
    },
    /**
     * 权限码列表
     */
    pagePermissionId: {
      type: Array as PropType<PermissionCode[]>,
      default: [],
    },
  },
  setup(props) {
    /**
     * 判断用户是否拥有指定权限
     */
    const hasPermission = computed(() => {
      const code = props.code;

      // 1. 如果没有传递权限码 (null/undefined)，则认为用户有权限（或不进行权限控制）
      if (!code) {
        return true;
      }

      // 2. 调用实际的权限判断方法
      return props.pagePermissionId.includes(code);
    });

    /**
     * 最终是否需要渲染组件内容
     */
    const canRender = computed(() => {
      // 如果有权限，则渲染
      if (hasPermission.value) {
        return true;
      }
      // 如果无权限，且不需要隐藏，则渲染默认内容
      if (!props.rmDom) {
        return true;
      }
      // 无权限，且需要隐藏，则不渲染
      return false;
    });

    return {
      hasPermission,
      canRender,
    };
  },
});
</script>