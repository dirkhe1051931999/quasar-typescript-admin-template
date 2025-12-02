<template>
  <q-field
    class="j-q-option-group no-border-field"
    :label="label"
    :disable="disable"
    :rules="rules"
    :outlined="outlined"
    :dense="dense"
    no-error-icon
    stack-label
    borderless
    v-model="innerModel"
    :class="[{ 'inline-block': inline, 'q-mb-xs': !rules?.length }, filedClass]"
  >
    <template #control>
      <q-option-group
        v-model="innerModel"
        :class="computedInlineSpanClass"
        :options="computedOptions"
        :type="type"
        :disable="disable"
        :inline="inline"
        :size="size"
        :color="color"
        @change="change"
        :dense="dense"
      >
        <template #label="option">
          {{ option.label }}
          <q-icon name="app:question" size="14px" class="q-ml-xs" v-if="option.tip">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              {{ option.tip }}
            </q-tooltip>
          </q-icon>
        </template>
      </q-option-group>
    </template>
  </q-field>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
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
    inlineSpanCount: { type: Number, default: 3, required: false },
    filedClass: { type: String, default: '', required: false },
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

    const computedOptions = computed(() => {
      return props.options
        ? props.options!.map((option) => {
            const icon: any = {
              radio: {
                checkedIcon: 'app:radio-checked',
                uncheckedIcon: 'app:radio-unchecked',
              },
              checkbox: {
                checkedIcon: 'app:table-check',
                uncheckedIcon: 'app:table-not-check',
                indeterminateIcon: 'app:table-not-full-check',
              },
            };
            return {
              ...option,
              ...(icon[props.type!] || {}),
            };
          })
        : [];
    });
    const computedInlineSpanClass = computed(() => {
      return !props.inline ? `inline-span-${props.inlineSpanCount}` : '';
    });

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
      computedInlineSpanClass,
      innerModel,
      computedOptions,
      change,
    };
  },
});
</script>
<style lang="scss">
.j-q-option-group {
  .q-field__control {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .inline-span-3 {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
}
</style>
<style lang="scss" scoped>
.no-border-field {
  :deep(.q-field__control) {
    &:after {
      border: none !important;
    }

    &:before {
      border: none !important;
    }
  }
}
</style>