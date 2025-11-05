<template>
  <q-select
    autocomplete="off"
    class="j-q-select"
    v-model="innerValue"
    :clear-icon="clearIcon"
    :clearable="clearable"
    :dense="dense"
    :placeholder="filterable && !label && (!innerValue || (Array.isArray(innerValue) && innerValue.length === 0)) ? $t('messages.pleaseEnter') : ''"
    :disable="disable"
    :display-value="computedDisplayValue"
    :dropdown-icon="dropdownIcon"
    :emit-value="computedEmitValue"
    :input-debounce="filterFn ? 200 : 0"
    :label="label"
    :max-values="maxlength ?? maxValues"
    :multiple="multiple"
    :no-error-icon="noErrorIcon"
    :options="computedOptions"
    :option-label="optionLabel"
    :option-value="optionValue"
    :options-dense="dense"
    :outlined="outlined"
    :popup-content-class="computedPopupContentClass"
    :readonly="readonly"
    :rules="rules"
    :title="title ?? computedDisplayValue"
    :use-chips="useChips"
    :use-input="filterable ?? useInput"
    @filter="filter"
  >
    <template #selected v-if="slots['value-display']">
      <slot name="value-display"></slot>
    </template>

    <template #selected-item="scope" v-if="useChips">
      <span class="select-selected-item q-mr-xs q-mb-xs">
        <slot name="chip-value-display" v-bind="scope">{{ getSelectedItemLabelByIndex(scope.index) }}</slot>
        <q-icon name="close" class="cursor-pointer q-ml-xs" @click.stop="scope.removeAtIndex(scope.index)" color="grey" />
      </span>
    </template>

    <template #prepend v-if="slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #append v-if="slots.append">
      <slot name="append"></slot>
    </template>
    <template #after v-if="slots.after">
      <slot name="after"></slot>
    </template>
    <template #hint v-if="slots.hint">
      <slot name="hint"></slot>
    </template>

    <template v-if="slots['no-option'] || emptyOption" #no-option>
      <slot name="no-option">
        <q-item :dense="dense">
          <q-item-section class="text-grey text-caption">
            {{ $t('tip.noData') }}
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #option="scope" v-if="slots.option">
      <slot name="option" v-bind="scope"></slot>
    </template>

    <div v-show="!filterable && !label && (innerValue === null || innerValue === '' || innerValue === void 0 || (Array.isArray(innerValue) && innerValue.length === 0))" class="float-placeholder">
      {{ $t('messages.pleaseSelect') }}
    </div>
  </q-select>
</template>
<script lang="ts">
import type { QSelectProps } from 'quasar';
import { QSelect } from 'quasar';
import { computed, defineComponent, PropType, ref } from 'vue';

type TModelValue = QSelectProps['modelValue'];
// 明确要求 TFilterFn 返回一个布尔值
type TFilterFn = (inputValue: string, callback: (filterOptions?: any[]) => void) => void;
type TValueDisplayFn = (value: TModelValue) => string; // 明确返回字符串

export default defineComponent({
  name: 'JQSelect',
  components: { QSelect },
  props: {
    modelValue: { type: [String, Number, Array, Object] as PropType<TModelValue> },
    clearable: { type: Boolean, default: true },
    clearIcon: { type: String as PropType<QSelectProps['clearIcon']>, default: 'app:clear' },
    dense: { type: Boolean as PropType<QSelectProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QSelectProps['disable']> },
    dropdownIcon: { type: String as PropType<QSelectProps['dropdownIcon']>, default: 'expand_more' },
    emptyOption: { type: Boolean, default: true },
    filterFn: { type: Function as PropType<TFilterFn> },
    filterable: { type: Boolean, default: void 0 },
    label: { type: String as PropType<QSelectProps['label']> },
    maxlength: { type: [String, Number] },
    maxValues: { type: [String, Number] as PropType<QSelectProps['maxValues']> },
    multiple: { type: Boolean },
    noErrorIcon: { type: Boolean as PropType<QSelectProps['noErrorIcon']>, default: true },
    options: { type: Array as () => any[], default: () => [] },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    outlined: { type: Boolean as PropType<QSelectProps['outlined']>, default: true },
    popupContentClass: { type: String as PropType<QSelectProps['popupContentClass']> },
    readonly: { type: Boolean },
    rules: { type: Array as PropType<QSelectProps['rules']> },
    title: { type: String as PropType<HTMLElement['title']> },
    useChips: { type: Boolean as PropType<QSelectProps['useChips']> },
    useInput: { type: Boolean as PropType<QSelectProps['useInput']> },
    valueDisplayFn: { type: Function as PropType<TValueDisplayFn> },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: {
    after: void 0,
    append: void 0,
    'chip-value-display': void 0,
    hint: void 0,
    'no-option': void 0,
    option: void 0,
    'value-display': void 0,
  },
  setup(props, { emit, slots }) {
    const innerValue = computed<TModelValue>({
      get() {
        if (props.multiple && (props.modelValue === null || props.modelValue === undefined)) {
          return [];
        }
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });
    const inputValue = ref('');
    const filterOptions = ref<typeof props.options | undefined>(undefined);
    const computedEmitValue = computed(() => !!props.optionValue);
    const computedOptions = computed(() => {
      if (filterOptions.value) return filterOptions.value;
      if (inputValue.value) {
        return props.options.filter((option) => {
          const label = option?.[props.optionLabel] ?? JSON.stringify(option);
          return String(label).toLowerCase().includes(inputValue.value.toLowerCase());
        });
      }
      return props.options;
    });

    const computedDisplayValue = computed(() => {
      let val = innerValue.value;

      if (props.valueDisplayFn) {
        // 使用类型断言确保返回字符串
        return props.valueDisplayFn(val) as string;
      }

      // 处理值为空的情况
      if (val === null || val === undefined || (Array.isArray(val) && val.length === 0)) {
        return '';
      }

      if (props.multiple) {
        // 确保 val 是数组
        const valArray = Array.isArray(val) ? val : [];

        const labels = valArray.map((item: any) => {
          if (computedEmitValue.value) {
            // emit-value 模式下，item 是值，需要查找对象
            const option = props.options.find((option) => option?.[props.optionValue] === item);
            return option?.[props.optionLabel] ?? item;
          }
          // 非 emit-value 模式下，item 是对象
          return item?.[props.optionLabel] ?? item;
        });
        return labels.join(', ');
      }

      // 单选逻辑
      if (computedEmitValue.value) {
        const option = props.options.find((option) => option?.[props.optionValue] === val);
        return option?.[props.optionLabel] ?? val;
      }
      return val?.[props.optionLabel] ?? val;
    });

    const getSelectedItemLabelByIndex = (index: number) => {
      const val = innerValue.value;
      if (!Array.isArray(val)) return '';

      const itemValue = val[index];
      // 这里的逻辑只适用于 emit-value 模式，因为 itemValue 是 'value'
      const option = props.options.find((item) => item?.[props.optionValue] === itemValue);
      return option?.[props.optionLabel] ?? itemValue;
    };

    // 优化 3: 默认过滤逻辑直接在 @filter 事件中完成
    const filter: QSelectProps['onFilter'] = (inputVal, doneFn, _abortFn) => {
      const normalizedInput = inputVal.trim().toLowerCase();

      if (props.filterFn) {
        // 外部自定义过滤 (异步/同步)
        try {
          props.filterFn(normalizedInput, (newOptions: any) => {
            doneFn(newOptions);
          });
        } catch {
          doneFn([] as any);
        }
        inputValue.value = normalizedInput;
        filterOptions.value = undefined;
        return;
      }

      // 内部默认同步过滤
      if (normalizedInput) {
        const filtered: any = props.options.filter((option) => {
          const label = option?.[props.optionLabel] ?? JSON.stringify(option);
          return String(label).toLowerCase().includes(normalizedInput);
        });
        doneFn(filtered); // 传递过滤后的结果
      } else {
        doneFn(props.options as any);
      }
      inputValue.value = normalizedInput;
      filterOptions.value = undefined;
    };

    const computedPopupContentClass = computed(() => {
      let val = 'j-q-select-popup select-popup-content height1';
      props.popupContentClass && (val += ` ${props.popupContentClass}`);
      return val;
    });

    return {
      innerValue,
      computedEmitValue,
      computedDisplayValue,
      getSelectedItemLabelByIndex,
      filter,
      computedPopupContentClass,
      computedOptions,
      slots,
    };
  },
});
</script>

<style lang="scss">
.j-q-select {
  .q-field__native > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.j-q-select-popup {
  max-height: 20rem !important;
}

.float-placeholder {
  font-size: 12px;
  color: #969799;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

.select-selected-item {
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
