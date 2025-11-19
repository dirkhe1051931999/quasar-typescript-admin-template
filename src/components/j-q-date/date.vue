<template>
  <q-field
    ref="fieldRef"
    class="j-q-date"
    :class="{
      'j-q-date--table': label,
      'j-q-date--form': !label,
    }"
    v-model="computedValue"
    :clearable="false"
    clear-icon="app:clear"
    :dense="dense"
    :disable="disable"
    :label="label"
    no-error-icon
    :outlined="outlined"
    :rules="rules"
    :title="computedValueDisplay"
    @clear="handleClear"
  >
    <div class="float-placeholder" v-show="!computedValueDisplay && !label">
      {{ $t('messages.pleaseSelect') }}
    </div>
    <template #control>
      <div class="date-value-display">{{ computedValueDisplay }}</div>
    </template>
    <q-popup-proxy v-model="popupVisible" @hide="onHidePopup">
      <div class="date-popup__inner" :style="popupInnerStyle">
        <div v-if="slots['popup-prepend']" class="date-popup-prepend">
          <slot name="popup-prepend" />
        </div>
        <q-date v-model="computedValue" minimal :options="options" :range="range" @range-start="onRangeStart" @range-end="onRangeEnd" />
      </div>
    </q-popup-proxy>
    <template #append>
      <q-icon
        v-if="clearable && !readonly && !disable && computedValue"
        name="app:clear"
        class="cursor-pointer q-field__focusable-action"
        @click.stop.prevent="handleClearClick"
        size="16px"
        color="grey"
      />
    </template>
  </q-field>
</template>
<script lang="ts">
import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue'; // 移除 watch, innerValue
import { date, QDateProps, QField, QFieldProps, QPopupProxyProps } from 'quasar';

// --- 类型定义优化 ---
type TModelValue = QDateProps['modelValue'];
type TValueDisplayFn = (value: TModelValue) => string | number | null | undefined; // 明确返回值类型

export default defineComponent({
  name: 'JQDate',
  props: {
    modelValue: { type: [String, Number, Object, Date] as PropType<TModelValue> },
    clearable: { type: Boolean, default: true },
    dense: { type: Boolean as PropType<QFieldProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    readonly: { type: Boolean, default: false },
    label: { type: String as PropType<QFieldProps['label']> },
    locales: { type: [String] as PropType<Intl.LocalesArgument> },
    mask: { type: String as PropType<QDateProps['mask']>, default: 'YYYY-MM-DD' },
    options: { type: [Array, Function] as PropType<QDateProps['options']> },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    popupInnerStyle: { type: [String, Object, Array] as PropType<CSSProperties> },
    range: { type: Boolean as PropType<QDateProps['range']> },
    rules: { type: Array as () => QFieldProps['rules'] },
    valueDisplayFn: { type: Function as PropType<TValueDisplayFn> },
  },
  emits: {
    hide: (...[evt]: Parameters<NonNullable<QPopupProxyProps['onHide']>>) => true,
    rangeStart: (...[from]: Parameters<NonNullable<QDateProps['onRangeStart']>>) => true,
    rangeEnd: (...[range]: Parameters<NonNullable<QDateProps['onRangeEnd']>>) => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: {
    'popup-prepend': void 0,
    append: void 0,
    control: void 0,
  },
  setup(props, { emit, expose, slots }) {
    const popupVisible = ref(false);
    const fieldRef = ref<InstanceType<typeof QField> | null>(null);

    // --- 优化 1: 简化 v-model 逻辑 (移除 innerValue 和 watch) ---
    const computedValue = computed({
      get() {
        let val = props.modelValue;

        if (props.range && val === '') {
          return null;
        }

        return val;
      },
      set(val) {
        emit('update:modelValue', val);
        // 如果 val 有值（即完成了选择，或取消了选择但有默认值），关闭弹窗
        // Quasar 默认行为是点击日期自动关闭，这里是为了确保逻辑覆盖
        if (val && props.modelValue !== val) {
          popupVisible.value = false;
        }
      },
    });

    // --- 优化 2: 修复 computedValueDisplay 逻辑 ---
    const computedValueDisplay = computed(() => {
      const val = computedValue.value;

      // 外部自定义函数优先
      if (props.valueDisplayFn) {
        return String(props.valueDisplayFn(val) ?? '');
      }
      // 值为空时，统一返回空字符串
      if (!val) return '';

      // 范围选择逻辑： val 是 { from: string, to: string }
      if (props.range && typeof val === 'object') {
        // 断言类型，确保访问 from 和 to 属性
        const { from, to } = val as { from: string; to: string };
        if (from && to) {
          return `${date.formatDate(from, props.mask)} - ${date.formatDate(to, props.mask)}`;
        }
        // 范围未选完时，返回空字符串
        return '';
      }

      return String(val);
    });

    // 优化 3: 简化 slot 检查
    const hasPopupPrepend = computed(() => !!slots['popup-prepend']);

    // --- 事件处理 (保持不变) ---
    const onRangeStart: QDateProps['onRangeStart'] = (from) => {
      emit('rangeStart', from);
    };
    const onRangeEnd: QDateProps['onRangeEnd'] = (range) => {
      emit('rangeEnd', range);
    };
    const onHidePopup: QPopupProxyProps['onHide'] = (evt) => {
      emit('hide', evt);
    };
    const handleClear = () => {
      computedValue.value = null;
      fieldRef.value!.blur();
    };
    const handleClearClick = () => {
      handleClear();
    };

    expose({ popupVisible });
    return {
      fieldRef,
      handleClear,
      handleClearClick,
      computedValue,
      computedValueDisplay,
      popupVisible,
      hasPopupPrepend,
      onHidePopup,
      onRangeStart,
      onRangeEnd,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>