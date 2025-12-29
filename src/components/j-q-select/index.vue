<template>
  <q-select
    ref="qSelectRef"
    :class="{
      'j-q-select--table': label,
      'j-q-select--form': !label && !smInput,
      'j-q-input--sm': smInput && !label,
    }"
    autocomplete="off"
    class="j-q-select"
    v-model="innerValue"
    clear-icon="app:clear"
    :clearable="clearable"
    :dense="dense"
    :placeholder="filterable && !label && (!innerValue || (Array.isArray(innerValue) && innerValue.length === 0)) ? t('messages.pleaseSelect') : ''"
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
    :use-input="computedUseInput"
    :loading="loading"
    @filter="filter"
    :hide-dropdown-icon="readonly"
  >
    <template #loading>
      <q-spinner color="primary" size="14px" :thickness="2" />
    </template>
    <template #selected v-if="slots['value-display']">
      <slot name="value-display"></slot>
    </template>

    <template #selected-item="scope" v-if="useChips">
      <span class="select-selected-item">
        <slot name="chip-value-display" v-bind="scope">{{ getSelectedItemLabelByIndex(scope.index) }}</slot>
        <q-icon name="close" class="cursor-pointer q-ml-xs" @click.stop="scope.removeAtIndex(scope.index)" color="grey" v-if="!getSelectedItemOptionByIndex(scope.index)?.hideRemove" />
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
            {{ t('messages.noData') }}
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #option="scope" v-if="slots.option">
      <slot name="option" v-bind="scope"></slot>
    </template>

    <div v-show="!filterable && !label && (innerValue === null || innerValue === '' || innerValue === void 0 || (Array.isArray(innerValue) && innerValue.length === 0))" class="float-placeholder">
      {{ t('messages.pleaseSelect') }}
    </div>
  </q-select>
</template>
<script lang="ts">
import type { QSelectProps } from 'quasar';
import { QSelect, QSpinner, QItem, QItemSection, QIcon } from 'quasar';
import { computed, defineComponent, PropType, ref, SlotsType, watch, onMounted, nextTick } from 'vue';
import { useI18n } from 'src/composables/useI18n.ts';

type TModelValue = QSelectProps['modelValue'];
// 明确要求 TFilterFn 返回布尔值
type TFilterFn = (inputValue: string, callback: (filterOptions?: any[]) => void) => void;
type TValueDisplayFn = (value: TModelValue) => string; // 明确返回字符串

export default defineComponent({
  name: 'JQSelect',
  components: {
    QSelect,
    QSpinner,
    QItem,
    QItemSection,
    QIcon,
  },
  props: {
    modelValue: { type: [String, Number, Array, Object] as PropType<TModelValue> },
    clearable: { type: Boolean, default: true },
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
    closeOnSelect: { type: Boolean, default: false },
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
    loading: { type: Boolean as PropType<QSelectProps['loading']> },
    smInput: { type: Boolean, default: false },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: Object as SlotsType<{
    prepend?: void;
    after?: void;
    append?: void;
    'chip-value-display'?: void;
    hint?: void;
    'no-option'?: void;
    option?: void;
    'value-display'?: void;
  }>,
  setup(props, { emit, slots, expose }) {
    const qSelectRef = ref<QSelect | null>(null);
    const { t } = useI18n();
    const hasEllipsis = ref(false);
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
    const copyOptions = ref<typeof props.options | undefined>(props.options);
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

    // 使用 computed 并显式依赖 options 和 innerValue
    const computedDisplayValue = computed(() => {
      // 显式读取 options 的 length 和内容，确保响应式追踪
      const options = props.options;
      const optionsLength = options.length;
      let val = innerValue.value;

      if (props.valueDisplayFn) {
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
            const option = options.find((option) => option?.[props.optionValue] === item);
            if (!option && optionsLength === 0) {
              return '';
            }
            return option?.[props.optionLabel] ?? item;
          }
          // 非 emit-value 模式下，item 是对象
          return item?.[props.optionLabel] ?? item;
        });
        return labels.filter(Boolean).join(', ');
      }

      // 单选逻辑
      if (computedEmitValue.value) {
        const option = options.find((option) => option?.[props.optionValue] === val);
        if (!option && optionsLength === 0) {
          return '';
        }
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

    const getSelectedItemOptionByIndex = (index: number): any | undefined => {
      const val = innerValue.value;
      if (!Array.isArray(val)) return undefined;
      const itemValue = val[index];
      if (computedEmitValue.value) {
        return props.options.find((item) => item?.[props.optionValue] === itemValue);
      }
      return typeof itemValue === 'object' && itemValue !== null ? itemValue : undefined;
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

    // 检测文本是否显示省略号
    const checkEllipsis = () => {
      nextTick(() => {
        if (qSelectRef.value) {
          const selectEl = qSelectRef.value.$el as HTMLElement;
          const displayEl = selectEl?.querySelector('.q-field__native span') as HTMLElement;
          if (displayEl) {
            hasEllipsis.value = displayEl.scrollWidth > displayEl.clientWidth;
          }
        }
      });
    };

    // 计算 use-input 属性
    const computedUseInput = computed(() => {
      // 如果是 filterable 且显示省略号，则返回 false
      if (props.filterable && hasEllipsis.value) {
        return false;
      }
      return props.filterable ?? props.useInput;
    });

    // 监听 innerValue 和 computedDisplayValue 变化，重新检测省略号
    watch([innerValue, computedDisplayValue], () => {
      if (props.filterable) {
        checkEllipsis();
      }
    });

    onMounted(() => {
      if (props.filterable) {
        checkEllipsis();
      }
    });
    watch(
      innerValue,
      (newValue, oldValue) => {
        if (props.multiple && props.closeOnSelect && qSelectRef.value) {
          if (Array.isArray(newValue) && Array.isArray(oldValue) && newValue.length !== oldValue.length) {
            qSelectRef.value.hidePopup();
          }
        }
      },
      { deep: true }
    );
    expose({
      copyOptions,
      validate: () => qSelectRef.value?.validate() ?? false,
      resetValidation: () => qSelectRef.value?.resetValidation(),
    });
    return {
      t,
      qSelectRef,
      innerValue,
      computedEmitValue,
      computedDisplayValue,
      computedUseInput,
      getSelectedItemLabelByIndex,
      getSelectedItemOptionByIndex,
      filter,
      computedPopupContentClass,
      computedOptions,
      slots,
    };
  },
});
</script>

<style lang="scss"></style>