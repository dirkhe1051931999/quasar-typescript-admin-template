<template>
  <q-input
    class="j-q-input"
    v-model="innerModel"
    :borderless="borderless"
    :dense="dense"
    :disable="disable"
    :label="label"
    :maxlength="maxlength ?? void 0"
    no-error-icon
    :outlined="outlined"
    :readonly="readonly"
    :rules="rules"
    :type="type"
    :bg-color="bgColor"
    @change="change"
    :placeholder="!label ? $t('messages.pleaseEnter') : ''"
    clearable
  >
    <template #prepend v-if="slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #append v-if="slots.append">
      <slot name="append"></slot>
    </template>
    <template #after v-if="slots.after">
      <slot name="after"></slot>
    </template>
  </q-input>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import type { QInputProps } from 'quasar';

type TModelValue = QInputProps['modelValue'];
type TInputLimitFn = (value: TModelValue) => boolean;
type TMaxlength = string | number | null;

export default defineComponent({
  name: 'JQInput',
  props: {
    modelValue: { type: [String, Number] as PropType<TModelValue> },
    bgColor: { type: String as PropType<QInputProps['bgColor']> },
    borderless: { type: Boolean as PropType<QInputProps['borderless']> },
    dense: { type: Boolean as PropType<QInputProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QInputProps['disable']> },
    inputLimitFn: {
      type: Function as PropType<TInputLimitFn>,
      default: () => true,
    },
    label: { type: String as PropType<QInputProps['label']> },
    maxlength: { type: [String, Number] as PropType<TMaxlength>, default: 32 },
    outlined: { type: Boolean as PropType<QInputProps['outlined']>, default: true },
    readonly: { type: Boolean },
    rules: { type: Array as () => QInputProps['rules'] },
    type: { type: String as PropType<QInputProps['type']> },
  },
  emits: {
    change: (value: TModelValue) => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: {
    after: void 0,
    append: void 0,
    prepend: void 0,
  },
  setup(props, { emit, slots }) {
    const innerModel = ref<TModelValue>(props.modelValue ?? '');
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerModel.value) {
          innerModel.value = val;
        }
      },
      { immediate: true }
    );
    watch(
      () => innerModel.value,
      (val, oldVal) => {
        if (val !== oldVal && props.inputLimitFn && !props.inputLimitFn(val)) {
          innerModel.value = oldVal;
          return;
        }

        emit('update:modelValue', val);
      }
    );
    const change = (val: TModelValue) => {
      emit('change', val);
    };
    return {
      innerModel,
      change,
      slots,
    };
  },
});
</script>

<style lang="scss"></style>
