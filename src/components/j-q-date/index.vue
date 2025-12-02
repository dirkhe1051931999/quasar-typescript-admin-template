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
      {{ t('messages.pleaseSelect') }}
    </div>
    <template #control>
      <div class="date-value-display">{{ computedValueDisplay }}</div>
    </template>
    <q-popup-proxy v-model="popupVisible" @hide="onHidePopup">
      <div class="date-popup__inner" :style="popupInnerStyle">
        <div v-if="slots['popup-prepend']" class="date-popup-prepend">
          <slot name="popup-prepend" />
        </div>
        <q-date v-model="computedValue" minimal :mask="mask" :options="options" :range="range" @range-start="onRangeStart" @range-end="onRangeEnd" />
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
import type { CSSProperties, PropType, SlotsType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { date, QDateProps, QField, QFieldProps, QPopupProxyProps } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

// --- 类型定义 ---
type TModelValue =
  | QDateProps['modelValue']
  | number
  | Date
  | {
      from: number | string | Date;
      to: number | string | Date;
    }; // 扩展支持的时间类型
type TValueDisplayFn = (value: TModelValue) => string | number | null | undefined;

// --- 核心辅助函数：统一转 Date ---
const DATETIME_MASK = 'YYYY-MM-DD HH:mm:ss'; // 用于解析可能带时间的字符串

const toDate = (value: any): Date | null => {
  if (value === null || typeof value === 'undefined' || value === '') return null;

  // 1. 处理纯数字字符串或数字 (时间戳)
  if (typeof value === 'number') return new Date(value);
  if (typeof value === 'string' && /^\d+$/.test(value)) return new Date(Number(value));

  // 2. 处理 Date 对象
  if (value instanceof Date) return value;

  // 3. 处理字符串 (尝试解析)
  // 如果是标准的 YYYY-MM-DD，date.extractDate 能解
  // 如果带时间，也尝试解一下
  let result = date.extractDate(value, 'YYYY-MM-DD');
  if (isNaN(result.getTime())) {
    result = date.extractDate(value, DATETIME_MASK);
  }
  // 还是解不出来，尝试用 mask 属性解 (针对自定义 mask)
  // 注意：setup 里拿不到 this，后续在 computed 里处理 mask 解析

  return isNaN(result.getTime()) ? null : result;
};

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
    'update:modelValue': (value: any) => true,
  },
  slots: Object as SlotsType<{
    'popup-prepend': void;
    append: void;
    control: void;
  }>,
  setup(props, { emit, expose, slots }) {
    const popupVisible = ref(false);
    const fieldRef = ref<InstanceType<typeof QField> | null>(null);
    const { t } = useI18n();

    // --- 优化：强大的 computedValue ---
    // 负责将外部各种花里胡哨的格式 (时间戳、Date、Object) 转成 q-date 唯一认识的 String (Mask格式)
    const computedValue = computed({
      get() {
        const val = props.modelValue;

        if (val === null || val === undefined || val === '') {
          return null;
        }

        // --- 范围选择模式 ---
        if (props.range) {
          if (typeof val === 'object' && val !== null) {
            // 这里可能是 { from: 1764232..., to: 1765... } 或者是 { from: '2025...', to: ... }
            const rawFrom = (val as any).from;
            const rawTo = (val as any).to;

            const dFrom = toDate(rawFrom);
            const dTo = toDate(rawTo);

            // 只要有一个有效，就尽量显示
            if (dFrom || dTo) {
              return {
                from: dFrom ? date.formatDate(dFrom, props.mask) : '',
                to: dTo ? date.formatDate(dTo, props.mask) : '',
              };
            }
          }
          return null;
        }

        // --- 单选模式 ---
        const dVal = toDate(val);
        if (dVal) {
          return date.formatDate(dVal, props.mask);
        }

        // 如果实在转不了，原样返回（防止是某种特殊的字符串格式 q-date 能认但 toDate 认不了）
        return val as string;
      },
      set(val) {
        emit('update:modelValue', val);
        // 如果有值，且不相等（防抖），且不是范围选择的一半状态（范围选择时 val 可能是 object），关闭弹窗
        // 注意：范围选择时，q-date 会多次 emit，直到选完。
        if (val) {
          if (!props.range) {
            popupVisible.value = false;
          } else {
            // 范围选择：只有 from 和 to 都有值时，才自动关闭（可选体验优化）
            // 如果你希望选完两个日期自动关闭，可以解开下面的注释
            // if (typeof val === 'object' && (val as any).from && (val as any).to) {
            //    popupVisible.value = false;
            // }
          }
        }
      },
    });

    // --- 显示逻辑 ---
    // 因为 computedValue 已经被我们标准化成 String/Object String 了，这里处理显示就很简单
    const computedValueDisplay = computed(() => {
      // 1. 优先外部自定义
      if (props.valueDisplayFn) {
        return String(props.valueDisplayFn(props.modelValue as any) ?? '');
      }

      const val = computedValue.value; // 这里已经是格式化后的字符串了
      if (!val) return '';

      if (props.range && typeof val === 'object') {
        const { from, to } = val as { from: string; to: string };
        if (from && to) {
          return `${from} - ${to}`; // computedValue 已经按 mask 格式化了，直接拼
        }
        return '';
      }

      return String(val);
    });

    const hasPopupPrepend = computed(() => !!slots['popup-prepend']);

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

    // 你特意嘱咐的 handleClearClick，必须要在！
    const handleClearClick = () => {
      handleClear();
    };

    expose({ popupVisible });

    return {
      t,
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
@use '../j-q-date/index';
</style>