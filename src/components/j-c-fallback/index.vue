<template>
  <template v-if="hasValue">
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

// 定义值类型的联合类型，用于更灵活地接受输入
type FallbackValue = any;

export default defineComponent({
  name: 'JCFallback',
  props: {
    /**
     * 需要判断是否存在的原始值 (例如：row.name)。
     * * 接受任何类型。
     */
    value: {
      type: null as unknown as PropType<FallbackValue>,
      default: null,
    },
    /**
     * 无值时显示的默认内容
     */
    defaultContent: {
      type: String,
      default: '--', // 默认显示为 '--'
    },
    /**
     * 是否在无值时彻底隐藏组件，而不是显示 defaultContent
     */
    rmDom: {
      type: Boolean,
      default: false,
    },
    /**
     * 可选：是否将 0 或 '0' 视为有效值 (true)，或视为需要回退的值 (false)。
     * 默认情况下，与您的 defaultFormat 逻辑保持一致：0 和 '0' 被视为有效值。
     */
    zeroIsValid: {
      type: Boolean,
      default: true,
    },

    falseIsValid: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    /**
     * 判断传入的值是否是有效值（非空）。
     * 逻辑参考了您提供的 defaultFormat 函数。
     */
    const hasValue = computed(() => {
      const val = props.value;

      // 1. 特殊处理：如果 zeroIsValid 为 true (默认)，则 0 或 '0' 认为是有效值
      if (props.zeroIsValid && (val === 0 || val === '0')) {
        return true;
      }

      if (props.falseIsValid && val === false) {
        return true;
      }

      // 2. 判断值是否存在：使用 !val 检查 null, undefined, false, 空字符串等 Falsy 值。
      // 注意：如果 val 是空数组 [] 或空对象 {}，它们会被认为是有效值 (Truthy)。
      if (!val) {
        return false;
      }

      // 3. 其他非 Falsy 值，认为有效
      return true;
    });

    return {
      hasValue,
    };
  },
});
</script>