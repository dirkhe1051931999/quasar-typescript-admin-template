<template>
  <template v-if="hasMatch">
    <slot :label="displayLabel">
      <span>{{ displayLabel }}</span>
    </slot>
  </template>
  <template v-else>
    <span v-if="!rmDom">
      {{ defaultContent }}
    </span>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';

/**
 * 通用的选项类型定义
 */
export interface OptionItem {
  label: string;
  value: any; // value 可以是数字、字符串或任何类型
  [key: string]: any; // 允许其他属性
}

/**
 * 查找键的类型
 */
type LookupKey = 'label' | 'value';

export default defineComponent({
  name: 'JCFormatLookup',
  props: {
    /**
     * 要查找的值 (例如：表格行中的某个 ID 或名称)。
     */
    value: {
      type: null as unknown as PropType<any>,
      default: null,
    },
    /**
     * 选项列表，组件将在这个列表中进行查找。
     */
    options: {
      type: Array as PropType<OptionItem[]>,
      required: true,
    },
    /**
     * 指定查找时是匹配 options 元素的 'value' 还是 'label' 属性。
     * 默认会同时匹配 'value' 和 'label' (如果提供了两个键)。
     */
    matchKeys: {
      type: Array as PropType<LookupKey[]>,
      default: () => ['value', 'label'],
      validator: (val: LookupKey[]) => val.every((key) => ['value', 'label'].includes(key)),
    },
    /**
     * 查找失败时显示的默认内容
     */
    defaultContent: {
      type: String,
      default: '--',
    },
    /**
     * 是否在查找失败时彻底隐藏组件，而不是显示 defaultContent
     */
    rmDom: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    /**
     * 查找匹配的 OptionItem
     */
    const matchedOption = computed<OptionItem | undefined>(() => {
      const val = props.value;
      const options = props.options;
      const matchKeys = props.matchKeys;

      // 如果 value 是 null/undefined 或 options 为空，无需查找
      if (val === null || !options || options.length === 0) {
        return undefined;
      }

      // 遍历 options 列表进行查找
      return options.find((item) => {
        // 检查是否匹配任何一个指定的查找键
        return matchKeys.some((key) => {
          // 确保 item[key] 存在且与 val 相等
          return item[key] !== undefined && item[key] === val;
        });
      });
    });

    /**
     * 是否找到匹配项
     */
    const hasMatch = computed(() => !!matchedOption.value);

    /**
     * 最终显示的 label (如果找到)
     */
    const displayLabel = computed(() => {
      // 默认返回找到的 label
      return matchedOption.value ? matchedOption.value.label : props.defaultContent;
    });

    return {
      hasMatch,
      displayLabel,
    };
  },
});
</script>