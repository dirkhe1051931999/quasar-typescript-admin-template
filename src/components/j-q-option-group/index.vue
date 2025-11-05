<template>
  <q-field class="j-q-option-group no-border-field" :label="label" :disable="disable" :rules="rules" :outlined="outlined" :dense="dense" no-error-icon stack-label borderless v-model="innerModel">
    <template #control>
      <q-option-group class="j-q-option-group" v-model="innerModel" :options="options" :type="type" :disable="disable" :inline="inline" :size="size" :color="color" @change="change" :dense="dense" />
    </template>
  </q-field>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import type { QFieldProps, QOptionGroupProps } from 'quasar';

// --- 类型定义 ---
type TModelValue = QOptionGroupProps['modelValue'];
// 确保 options 是一个数组，即使在 PropType 中也是如此
type TQOptions = QOptionGroupProps['options'];

export default defineComponent({
  name: 'JQOptionGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array] as PropType<TModelValue>,
      default: null,
    },
    options: {
      type: Array as PropType<TQOptions>,
      required: true,
    },
    disable: { type: Boolean as PropType<QOptionGroupProps['disable']>, default: false },
    inline: { type: Boolean as PropType<QOptionGroupProps['inline']>, default: false },
    size: { type: String as PropType<QOptionGroupProps['size']> },
    color: { type: String as PropType<QOptionGroupProps['color']> },
    label: { type: String as PropType<QFieldProps['label']> },
    rules: { type: Array as () => QFieldProps['rules'] },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    dense: { type: Boolean as PropType<QFieldProps['dense']>, default: true },
    type: { type: String as PropType<QOptionGroupProps['type']>, default: 'radio' },
  },
  emits: {
    // change 事件在 q-option-group 中会在值变化后触发一次
    change: (value: TModelValue) => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  // q-option-group 不支持 slots 扩展，故省略 slots 定义
  setup(props, { emit }) {
    // --- 响应式状态和 v-model 逻辑 ---
    const innerModel = ref<TModelValue>(props.modelValue ?? null);

    // 1. 监听外部 modelValue 变化，同步到内部状态
    watch(
      () => props.modelValue,
      (val) => {
        // 只有当外部值与内部值不同时才更新，避免不必要的重新渲染
        if (val !== innerModel.value) {
          innerModel.value = val ?? null;
        }
      },
      { immediate: true } // 立即执行一次，确保初始值设置正确
    );

    // 2. 监听内部状态变化，并同步到外部
    watch(
      () => innerModel.value,
      (val) => {
        // radio group 没有输入限制函数，直接同步
        emit('update:modelValue', val);
      }
    );

    const change = (val: TModelValue) => {
      emit('change', val);
    };

    return {
      innerModel,
      change,
    };
  },
});
</script>

<style lang="scss"></style>