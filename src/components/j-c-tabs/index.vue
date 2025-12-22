<template>
  <div>
    <ul
      class="j-c-tabs"
      :class="{
        'j-c-tabs--disabled': disable,
        'j-c-tabs--flat': variant === 'flat',
        'j-c-tabs--line': variant === 'line',
        'j-c-tabs--wrap': wrap,
        'j-c-tabs--expand': expand,
      }"
    >
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="{
          active: modelValue === item.value,
          'is-disabled': disable || item.disable,
        }"
        @click="handleClickTab(item.value)"
      >
        <slot :name="`item-${slotKey(item, index)}`" :item="item" :index="index" :active="modelValue === item.value" :label-style="getItemLabelStyle(item)">
          <slot name="item" :item="item" :index="index" :active="modelValue === item.value" :label-style="getItemLabelStyle(item)">
            <JQTooltip :content="item.label" :lines="1" :content-style="getItemLabelStyle(item)" />
          </slot>
        </slot>
      </li>
    </ul>
    <slot />
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import JQTooltip from 'components/j-q-tooltip/index.vue';

// --- 类型定义 ---

type TModelValue = string | number | null;
type TabVariant = 'default' | 'flat' | 'line';

// 标签项的结构
export interface TabOption {
  label: string;
  value: TModelValue;
  disable?: boolean;
  /** 单个 tab 的最大宽度（优先级高于 itemMaxWidth） */
  maxWidth?: string | number;
}

export default defineComponent({
  name: 'JCTabs',
  components: {
    JQTooltip,
  },
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
    /** tabs 支持换行（多行展示） */
    wrap: {
      type: Boolean,
      default: false,
    },
    /** tabs 扩展铺满（每个 item 等分） */
    expand: {
      type: Boolean,
      default: false,
    },
    /** tab item 最大宽度，超出省略号，hover tooltip 显示完整内容 */
    itemMaxWidth: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
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

    const slotKey = (item: TabOption, index: number) => {
      // 用 value 作为 key，保证可预测；value 为空时回退 index
      return item.value === null || item.value === undefined ? String(index) : String(item.value);
    };

    const normalizeWidth = (val?: string | number): string | undefined => {
      if (val === null || val === undefined || val === '') return undefined;
      return typeof val === 'number' ? `${val}px` : val;
    };

    const getItemLabelStyle = (item: TabOption): string => {
      const maxWidth = normalizeWidth(item.maxWidth ?? props.itemMaxWidth);
      const base = 'display:inline-block; vertical-align:middle;';
      if (!maxWidth) return `${base}`;
      return `${base} max-width:${maxWidth};`;
    };

    return {
      handleClickTab,
      slotKey,
      getItemLabelStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
@use './index';
</style>