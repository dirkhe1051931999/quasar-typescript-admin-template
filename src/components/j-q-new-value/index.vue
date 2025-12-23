<template>
  <q-select
    class="j-q-select-new-value"
    :model-value="innerModel"
    @update:model-value="handleUpdateModelValue"
    :label="label"
    :dense="dense"
    :disable="disable"
    :readonly="readonly"
    :rules="rules"
    :options="options"
    use-input
    multiple
    hide-dropdown-icon
    outlined
    no-error-icon
    clearable
    :placeholder="innerModel.length === 0 ? t('messages.pleasePressEnterEnter') : ''"
    input-debounce="0"
    new-value-mode="add"
    ref="qSelectRef"
    @change="change"
    @filter="filterFn"
    @new-value="handleNewValue"
    @blur="handleBlur"
    clear-icon="app:clear"
    :use-chips="useChips"
    :error="!!newValueErrorMessage"
    :error-message="newValueErrorMessage"
  >
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
    <template #selected-item="scope" v-if="useChips">
      <span class="select-selected-item">
        <span>
          {{ scope.opt }}
        </span>
        <q-icon name="close" class="cursor-pointer q-ml-xs" @click.stop="scope.removeAtIndex(scope.index)" color="grey" />
      </span>
    </template>
  </q-select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import type { QInputProps, QSelectProps } from 'quasar';
import { QIcon, QSelect } from 'quasar';
import { executeValidation, formRules, parseRuleString } from '../j-q-dialog/form-rules';
import { useI18n } from 'src/composables/useI18n.ts';

type TModelValue = QSelectProps['modelValue'];
type TOptions = QSelectProps['options'];

export default defineComponent({
  name: 'JQNewValue',
  components: {
    QSelect,
    QIcon,
  },
  props: {
    modelValue: { type: Array as PropType<TModelValue>, default: () => [] },
    options: { type: Array as PropType<TOptions>, default: () => [] },
    label: { type: String as PropType<QInputProps['label']> },
    dense: { type: Boolean as PropType<QInputProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QInputProps['disable']> },
    readonly: { type: Boolean as PropType<QInputProps['readonly']> },
    rules: { type: Array as () => QInputProps['rules'] },
    addRulesName: { type: String as PropType<string>, default: '' },
    useChips: { type: Boolean as PropType<QSelectProps['useChips']>, default: false },
    allowDuplicates: { type: Boolean as PropType<boolean>, default: false },
    maxlength: { type: Number as PropType<number>, default: -1 },
  },
  emits: {
    change: (value: TModelValue) => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  setup(props, { emit, expose, slots }) {
    const innerModel = ref<TModelValue>(props.modelValue ?? []);
    const qSelectRef = ref<InstanceType<typeof QSelect> | null>(null);
    const { t } = useI18n();
    const newValueErrorMessage = ref('');

    // 获取所有 slot 的名称，显式指定类型
    const slotNames = computed<string[]>(() => Object.keys(slots));

    const filterFn = (val: string, update: (callback: () => void) => void) => {
      update(() => {});
    };

    const handleNewValue = (inputValue: string, doneFn: (item: string | null, mode: QSelectProps['newValueMode']) => void) => {
      const trimmedValue = inputValue.trim();
      newValueErrorMessage.value = '';
      if (trimmedValue.length > 0) {
        // 检查是否超过最大长度限制
        if (props.maxlength > 0 && innerModel.value && (innerModel.value as string[]).length >= props.maxlength) {
          newValueErrorMessage.value = t('messages.formRules.maxLengthExceeded', { max: props.maxlength });
          qSelectRef.value?.focus();
          return;
        }
        if (!props.allowDuplicates && innerModel.value && (innerModel.value as string[]).includes(trimmedValue)) {
          newValueErrorMessage.value = t('messages.formRules.duplicateItemNotAllowed', { value: trimmedValue });
          qSelectRef.value?.focus();
          return;
        }
        let validationError: true | string = true;
        const { name: ruleName, args: ruleArgs } = parseRuleString(props.addRulesName);
        if (props.addRulesName) {
          validationError = executeValidation(ruleName as keyof ReturnType<typeof formRules>, trimmedValue, ruleArgs, t);
        }
        if (validationError === true) {
          doneFn(trimmedValue, 'add');
        }
        if (validationError !== true) {
          newValueErrorMessage.value = validationError as string;
          qSelectRef.value?.focus();
        }
      }
    };

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
      (val) => {
        emit('update:modelValue', val);
        newValueErrorMessage.value = '';
        if (props.rules && props.rules.length > 0) {
          qSelectRef.value?.validate();
        }
      }
    );

    const handleUpdateModelValue = (val: TModelValue) => {
      innerModel.value = val;
      emit('update:modelValue', val);
    };

    const change = (val: TModelValue) => {
      emit('change', val);
    };

    const handleBlur = () => {
      newValueErrorMessage.value = '';
    };

    expose({
      validate: () => qSelectRef.value?.validate() ?? false,
      resetValidation: () => qSelectRef.value?.resetValidation(),
    });

    return {
      t,
      newValueErrorMessage,
      innerModel,
      qSelectRef,
      filterFn,
      handleNewValue,
      handleUpdateModelValue,
      handleBlur,
      change,
      slotNames,
    };
  },
});
</script>

<style lang="scss">
.j-q-select-new-value.q-select--multiple {
  .q-field__control-container {
    display: flex;
    flex-wrap: nowrap;

    .q-field__native {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .select-selected-item {
        padding: 2px 4px;
        border-radius: 2px;
        background-color: var(--j-color-grey-light);
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
