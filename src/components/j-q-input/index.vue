<template>
  <q-input
    class="j-q-input"
    :class="computedClass"
    :model-value="computedInputValue"
    @update:model-value="innerModel = $event"
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
    :placeholder="!label ? t('messages.pleaseEnter') : ''"
    clear-icon="app:clear"
    clearable
    ref="qInputRef"
    :autofocus="false"
  >
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #append v-if="$slots.append">
      <slot name="append" :toggle-visibility="toggleVisibility" :custom-type="customType" :raw-value="modelValue" :display-value="computedDisplayValue" :is-content-visible="isContentVisible"></slot>
    </template>
    <template #after v-if="$slots.after">
      <slot name="after"></slot>
    </template>
  </q-input>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref, SlotsType, watch } from 'vue';
import { QInput } from 'quasar';
import type { QInputProps } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

type TModelValue = QInputProps['modelValue'];
type TInputLimitFn = (value: TModelValue) => boolean;
type TMaxlength = string | number | null;
type TCustomType = 'text' | 'password' | 'secret';

export default defineComponent({
  name: 'JQInput',
  components: {
    QInput,
  },
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
    maxlength: { type: [String, Number] as PropType<TMaxlength>, default: 64 },
    outlined: { type: Boolean as PropType<QInputProps['outlined']>, default: true },
    readonly: { type: Boolean },
    rules: { type: Array as () => QInputProps['rules'] },
    type: { type: String as PropType<QInputProps['type']> },
    customType: { type: String as PropType<TCustomType>, default: 'text', required: false },
    smInput: { type: Boolean, default: false },
  },
  emits: {
    change: (value: TModelValue): true => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: Object as SlotsType<{
    after?: void;
    append?: void;
    prepend?: void;
    default?: void;
  }>,
  setup(props, { emit, slots, expose }) {
    const { t } = useI18n();
    const innerModel = ref<TModelValue>(props.modelValue ?? '');
    const qInputRef = ref<InstanceType<typeof QInput> | null>(null);
    const isContentVisible = ref(props.customType !== 'secret' && props.customType !== 'password');
    const computedDisplayValue = computed(() => {
      const value = String(props.modelValue ?? '');
      if (props.customType === 'secret' && !isContentVisible.value) {
        if (value.length === 0) {
          return '';
        }
        if (value.length <= 6) {
          return '***';
        }
        const start = value.substring(0, 3);
        const end = value.substring(value.length - 3);
        return `${start}***${end}`;
      }
      return value;
    });
    const computedInputValue = computed(() => {
      return props.customType === 'secret' ? computedDisplayValue.value : innerModel.value;
    });
    const computedClass = computed(() => {
      return {
        'input-password': props.customType === 'password' && !isContentVisible.value,
        'j-q-input--table': props.label,
        'j-q-input--form': !props.label && props.type !== 'textarea' && !props.smInput,
        'j-q-input--textarea': props.type === 'textarea' && !props.label && !props.smInput,
        'j-q-input--sm': props.smInput && !props.label,
      };
    });
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
    const toggleVisibility = () => {
      isContentVisible.value = !isContentVisible.value;
    };
    expose({
      validate: () => qInputRef.value?.validate() ?? false,
      resetValidation: () => qInputRef.value?.resetValidation(),
      toggleVisibility,
    });
    return {
      t,
      innerModel,
      computedInputValue,
      computedDisplayValue,
      computedClass,
      change,
      qInputRef,
      isContentVisible,
      toggleVisibility,
    };
  },
});
</script>

<style lang="scss"></style>
