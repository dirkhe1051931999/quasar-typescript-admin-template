<template>
  <div>
    <ul class="j-c-tabs" :class="{ 'j-c-tabs--disabled': disable, 'j-c-tabs--flat': variant === 'flat', 'j-c-tabs--line': variant === 'line' }">
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{
          active: modelValue === item.value,
          'is-disabled': disable || item.disable,
        }"
        @click="handleClickTab(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

// --- 类型定义 ---

type TModelValue = string | number | null;
type TabVariant = 'default' | 'flat' | 'line';

// 标签项的结构
export interface TabOption {
  label: string;
  value: TModelValue;
  disable?: boolean;
}

export default defineComponent({
  name: 'JCTabs',
  props: {
    // 绑定当前选中的值 (v-model)
    modelValue: {
      type: [String, Number] as PropType<TModelValue>,
      default: null,
    },
    // 标签选项列表
    options: {
      type: Array as PropType<TabOption[]>,
      required: true,
    },
    // 禁用整个组件
    disable: {
      type: Boolean,
      default: false,
    },
    // 样式
    variant: {
      type: String as PropType<TabVariant>,
      default: 'default', // 默认使用 Tab 样式
      validator: (val: string) => ['default', 'flat', 'line'].includes(val),
    },
  },
  emits: {
    // 双向绑定事件
    'update:modelValue': (value: TModelValue) => true,
    // 点击事件，通常用于通知父组件值已更改
    change: (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    // 1. 处理标签点击事件
    const handleClickTab = (value: TModelValue) => {
      // 如果组件被禁用，或者点击的值与当前值相同，则不执行任何操作
      if (props.disable || props.modelValue === value) {
        return;
      }

      // 检查被点击的选项是否被单独禁用
      const clickedOption = props.options.find((opt) => opt.value === value);
      if (clickedOption?.disable) {
        return;
      }

      // 2. 更新 v-model
      emit('update:modelValue', value);

      // 3. 发射 change 事件
      emit('change', value);
    };

    return {
      handleClickTab,
    };
  },
});
</script>
<style lang="scss" scoped>
@use './index';
</style>