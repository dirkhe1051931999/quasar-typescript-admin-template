<template>
  <q-field
    ref="fieldRef"
    class="j-q-datetime j-q-datetime-range"
    :class="{
      'j-q-datetime--table': label,
      'j-q-datetime--form': !label,
    }"
    :model-value="computedValue"
    :clearable="false"
    clear-icon="app:clear"
    :dense="dense"
    :disable="disable"
    :label="label"
    no-error-icon
    :outlined="outlined"
    :rules="rules"
    :title="computedValueDisplay"
    @click="handleFieldClick"
  >
    <div class="float-placeholder" v-show="!computedValueDisplay && !label">
      {{ t('messages.pleaseSelect') }}
    </div>
    <template #control>
      <div class="date-value-display">{{ computedValueDisplay }}</div>
    </template>
    <q-popup-proxy v-model="popupVisible" @hide="onHidePopup">
      <div class="date-popup__inner date-datetime-range-popup">
        <div v-if="slots['popup-prepend']" class="date-popup-prepend">
          <slot name="popup-prepend" />
        </div>
        <div class="row no-wrap items-stretch">
          <q-date
            :model-value="range ? currentRangeDate : currentSingleDate"
            @update:model-value="range ? (currentRangeDate = $event) : (currentSingleDate = $event)"
            minimal
            :options="options"
            :range="range"
          />
          <div class="column items-stretch justify-center date-time-control">
            <template v-if="range">
              <div class="row column q-mb-md q-mt-auto">
                <div class="fs-12 text-grey h-30 row items-center q-mt-sm">{{ t('messages.date.start') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input
                    key="fromH"
                    v-model="fromH"
                    type="text"
                    :label="t('messages.date.hour')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, fromTimeParts, 'h', 23, 'from')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="fromM"
                    v-model="fromM"
                    type="text"
                    :label="t('messages.date.minute')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, fromTimeParts, 'm', 59, 'from')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="fromS"
                    v-model="fromS"
                    type="text"
                    :label="t('messages.date.second')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, fromTimeParts, 's', 59, 'from')"
                  />
                </div>
              </div>
              <div class="row column q-mb-md">
                <div class="fs-12 text-grey h-30 row items-center">{{ t('messages.date.end') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input
                    key="toH"
                    v-model="toH"
                    type="text"
                    :label="t('messages.date.hour')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, toTimeParts, 'h', 23, 'to')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="toM"
                    v-model="toM"
                    type="text"
                    :label="t('messages.date.minute')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, toTimeParts, 'm', 59, 'to')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="toS"
                    v-model="toS"
                    type="text"
                    :label="t('messages.date.second')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, toTimeParts, 's', 59, 'to')"
                  />
                </div>
              </div>
            </template>

            <template v-else>
              <div class="row column q-mb-md q-mt-auto">
                <div class="fs-12 text-grey h-30 row items-center q-mt-sm">{{ t('messages.date.hour') }}/{{ t('messages.date.minute') }}/{{ t('messages.date.second') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input
                    key="singleH"
                    v-model="singleH"
                    type="text"
                    :label="t('messages.date.hour')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, singleTimeParts, 'h', 23, 'single')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="singleM"
                    v-model="singleM"
                    type="text"
                    :label="t('messages.date.minute')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, singleTimeParts, 'm', 59, 'single')"
                  />
                  <div class="text-caption">:</div>
                  <q-input
                    key="singleS"
                    v-model="singleS"
                    type="text"
                    :label="t('messages.date.second')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, singleTimeParts, 's', 59, 'single')"
                  />
                </div>
              </div>
              <div class="row column q-mb-md">
                <div class="fs-12 text-grey h-30 row items-center">&nbsp;</div>
                <div class="row q-gutter-x-xs items-center"></div>
              </div>
            </template>

            <q-btn :label="t('messages.date.confirm')" @click="handleConfirm" unelevated outline class="q-mt-auto" no-caps />
          </div>
        </div>
      </div>
    </q-popup-proxy>

    <template #append>
      <q-icon
        v-if="clearable && !readonly && !disable && computedValue"
        name="app:clear"
        class="cursor-pointer q-field__focusable-action q-mr-xs"
        @click.stop.prevent="handleClearClick"
        size="16px"
        color="grey"
      />
    </template>
  </q-field>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, PropType, reactive, ref, watch, nextTick } from 'vue';
import { date, QDateProps, QField, QFieldProps, QPopupProxyProps } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

// --- 类型定义 ---
export interface TimeParts {
  h: number;
  m: number;
  s: number;
}
export interface DateTimeRangeValue {
  from: string | null;
  to: string | null;
}
export interface QDateRangeValue {
  from: string;
  to: string;
}
type TModelValue = DateTimeRangeValue | SingleDateTimeValue | number | Date;
type TValueDisplayFn = (value: TModelValue) => string | number | null | undefined;
type SingleDateTimeValue = string | null;

const DATETIME_MASK = 'YYYY-MM-DD HH:mm:ss';
const DATE_MASK_QDATE = 'YYYY/MM/DD';

// 辅助函数
const clampTime = (val: number, max: number): number => Math.min(max, Math.max(0, Math.floor(val)));
const wrapTime = (val: number, max: number): number => {
  const range = max + 1;
  let result = val % range;
  return result < 0 ? result + range : result;
};
// 增强的 toDate
const toDate = (value: TModelValue | string | number | Date | null): Date | null => {
  if (value === null || typeof value === 'undefined') return null;
  let finalValue: any = value;
  if (typeof value === 'string' && /^\d+$/.test(value)) finalValue = Number(value);
  if (typeof finalValue === 'number') return new Date(finalValue);
  if (finalValue instanceof Date) return finalValue;
  const result = date.extractDate(finalValue as string, DATETIME_MASK);
  return isNaN(result.getTime()) ? null : result;
};
const parseTimeParts = (dateTimeValue: string | number | Date | null): TimeParts => {
  const parsedDate = toDate(dateTimeValue);
  if (parsedDate) {
    return { h: parsedDate.getHours(), m: parsedDate.getMinutes(), s: parsedDate.getSeconds() };
  }
  return { h: 0, m: 0, s: 0 };
};
const combineDateTime = (dateStr: string | null, time: TimeParts): string | null => {
  if (!dateStr) return null;
  const cleanDateStr = dateStr.replace(/\//g, '-');
  const timeStr = `${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`;
  return `${cleanDateStr} ${timeStr}`;
};

export default defineComponent({
  name: 'JQDateTime',
  props: {
    modelValue: { type: [String, Number, Object, Date] as PropType<TModelValue>, default: () => null },
    clearable: { type: Boolean, default: true },
    dense: { type: Boolean, default: true },
    disable: Boolean,
    readonly: Boolean,
    label: String,
    options: [Array, Function] as PropType<QDateProps['options']>,
    outlined: { type: Boolean, default: true },
    rules: Array as () => QFieldProps['rules'],
    valueDisplayFn: Function as PropType<TValueDisplayFn>,
    range: { type: Boolean, default: false },
  },
  emits: ['hide', 'update:modelValue'],

  setup(props, { emit, expose, slots }) {
    const { t } = useI18n();
    const popupVisible = ref(false);
    const fieldRef = ref<InstanceType<typeof QField> | null>(null);
    const isClearing = ref(false);

    // 🔥 标志位：区分代码更新还是用户点击
    const isProgrammaticUpdate = ref(false);

    // Range State
    const currentRange = ref<DateTimeRangeValue>({ from: null, to: null });
    const currentRangeDate = ref<QDateRangeValue | string>({
      from: date.formatDate(new Date(), DATE_MASK_QDATE),
      to: date.formatDate(new Date(), DATE_MASK_QDATE),
    });
    const fromTimeParts = reactive<TimeParts>(parseTimeParts(null));
    const toTimeParts = reactive<TimeParts>(parseTimeParts(null));

    // Single State
    const currentSingle = ref<SingleDateTimeValue>(null);
    const currentSingleDate = ref<string>(date.formatDate(new Date(), DATE_MASK_QDATE));
    const singleTimeParts = reactive<TimeParts>(parseTimeParts(null));

    const computedValue = computed({
      get: () => (typeof props.modelValue === 'string' && props.modelValue === '' ? null : props.modelValue),
      set: (val) => emit('update:modelValue', val),
    });

    // --- 核心同步逻辑 ---
    const syncStateFromModel = () => {
      if (isClearing.value) return;

      // 开启防重置保护
      isProgrammaticUpdate.value = true;

      const val = computedValue.value;
      if (props.range) {
        const rangeVal = (val as any) || { from: null, to: null };

        const dFrom = toDate(rangeVal.from);
        Object.assign(fromTimeParts, parseTimeParts(rangeVal.from));
        const fromDateStr = dFrom ? date.formatDate(dFrom, DATE_MASK_QDATE) : date.formatDate(new Date(), DATE_MASK_QDATE);

        const dTo = toDate(rangeVal.to);
        Object.assign(toTimeParts, parseTimeParts(rangeVal.to));
        const toDateStr = dTo ? date.formatDate(dTo, DATE_MASK_QDATE) : fromDateStr;

        currentRange.value = {
          from: dFrom ? date.formatDate(dFrom, DATETIME_MASK) : null,
          to: dTo ? date.formatDate(dTo, DATETIME_MASK) : null,
        };
        currentRangeDate.value = { from: fromDateStr, to: toDateStr };
      } else {
        const dVal = toDate(val as any);
        Object.assign(singleTimeParts, parseTimeParts(val as any));
        currentSingle.value = dVal ? date.formatDate(dVal, DATETIME_MASK) : null;
        currentSingleDate.value = dVal ? date.formatDate(dVal, DATE_MASK_QDATE) : date.formatDate(new Date(), DATE_MASK_QDATE);
      }

      // 下一帧关闭保护
      nextTick(() => {
        isProgrammaticUpdate.value = false;
      });
    };

    watch(() => props.modelValue, syncStateFromModel, { immediate: true });

    // --- Range Watcher ---
    watch(
      currentRangeDate,
      (newVal, oldVal) => {
        if (!props.range) return;
        if (isProgrammaticUpdate.value) return; // 🔥 拦截自动重置

        if (typeof newVal === 'object') {
          const newFrom = newVal.from;
          const newTo = newVal.to;

          if (oldVal && typeof oldVal === 'object') {
            if (newFrom !== oldVal.from) Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
            if (newTo !== oldVal.to) Object.assign(toTimeParts, { h: 0, m: 0, s: 0 });
          } else if (typeof oldVal === 'string') {
            Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
          }

          if (newFrom && newTo) {
            currentRange.value.from = combineDateTime(newFrom, fromTimeParts);
            currentRange.value.to = combineDateTime(newTo, toTimeParts);
          }
        } else if (typeof newVal === 'string' && typeof oldVal === 'object') {
          Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
          currentRange.value.from = combineDateTime(newVal, fromTimeParts);
        }
      },
      { deep: true }
    );

    // --- Single Watcher ---
    watch(currentSingleDate, (newDate, oldDate) => {
      if (props.range) return;
      if (isClearing.value) return;
      if (isProgrammaticUpdate.value) return; // 🔥 拦截自动重置

      if (newDate !== oldDate) {
        Object.assign(singleTimeParts, { h: 0, m: 0, s: 0 });
      }
      currentSingle.value = combineDateTime(newDate, singleTimeParts);
    });

    const updateTime = (key: 'from' | 'to' | 'single') => {
      if (key === 'single') {
        currentSingle.value = combineDateTime(currentSingleDate.value, singleTimeParts);
      } else {
        const parts = key === 'from' ? fromTimeParts : toTimeParts;
        let datePart = '';
        if (typeof currentRangeDate.value === 'object') {
          datePart = key === 'from' ? currentRangeDate.value.from : currentRangeDate.value.to;
        } else if (key === 'from') {
          datePart = currentRangeDate.value as string;
        }
        if (datePart) currentRange.value[key] = combineDateTime(datePart, parts);
      }
    };

    // 反向同步（内部变化通知外部）
    watch(
      currentRange,
      (newRange) => {
        if (!props.range || isProgrammaticUpdate.value) return;
        if (newRange.from && newRange.to) {
          const f = toDate(newRange.from);
          const t = toDate(newRange.to);
          if (f && t && f.getTime() > t.getTime()) {
            computedValue.value = { from: newRange.to, to: newRange.from };
          } else {
            computedValue.value = newRange;
          }
        }
      },
      { deep: true }
    );

    watch(currentSingle, (newSingle) => {
      if (props.range || isProgrammaticUpdate.value) return;
      computedValue.value = newSingle;
    });

    const createTimeComputed = (parts: TimeParts, key: 'h' | 'm' | 's', max: number, modeKey: 'from' | 'to' | 'single') => {
      return computed({
        get: () => String(parts[key]).padStart(2, '0'),
        set: (val) => {
          let num = parseInt(val, 10);
          if (isNaN(num)) num = 0;
          parts[key] = clampTime(num, max);
          updateTime(modeKey);
        },
      });
    };

    // Range Computed
    const fromH = createTimeComputed(fromTimeParts, 'h', 23, 'from');
    const fromM = createTimeComputed(fromTimeParts, 'm', 59, 'from');
    const fromS = createTimeComputed(fromTimeParts, 's', 59, 'from');
    const toH = createTimeComputed(toTimeParts, 'h', 23, 'to');
    const toM = createTimeComputed(toTimeParts, 'm', 59, 'to');
    const toS = createTimeComputed(toTimeParts, 's', 59, 'to');

    // Single Computed
    const singleH = createTimeComputed(singleTimeParts, 'h', 23, 'single');
    const singleM = createTimeComputed(singleTimeParts, 'm', 59, 'single');
    const singleS = createTimeComputed(singleTimeParts, 's', 59, 'single');

    const handleConfirm = () => (popupVisible.value = false);

    const handleClear = () => {
      isClearing.value = true;
      if (props.range) {
        currentRange.value = { from: null, to: null };
        Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
        Object.assign(toTimeParts, { h: 0, m: 0, s: 0 });
        currentRangeDate.value = { from: '', to: '' };
      } else {
        currentSingle.value = null;
        Object.assign(singleTimeParts, { h: 0, m: 0, s: 0 });
        currentSingleDate.value = '';
      }
      computedValue.value = null;
      fieldRef.value?.blur();
      popupVisible.value = false;
      setTimeout(() => (isClearing.value = false), 0);
    };

    // 🔥 补上了！
    const handleClearClick = () => {
      handleClear();
    };

    const handleTimeWheel = (event: WheelEvent, parts: TimeParts, key: 'h' | 'm' | 's', max: number, modeKey: 'from' | 'to' | 'single') => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? -1 : 1;
      parts[key] = wrapTime(parts[key] + direction, max);
      updateTime(modeKey);
    };

    const computedValueDisplay = computed(() => {
      if (props.valueDisplayFn) return String(props.valueDisplayFn(props.modelValue) ?? '');
      if (props.range) {
        const { from, to } = (props.modelValue as any) || {};
        const dFrom = toDate(from);
        const dTo = toDate(to);
        if (dFrom && dTo) return `${date.formatDate(dFrom, DATETIME_MASK)} - ${date.formatDate(dTo, DATETIME_MASK)}`;
      } else {
        const dVal = toDate(props.modelValue as any);
        if (dVal) return date.formatDate(dVal, DATETIME_MASK);
      }
      return '';
    });

    const handleFieldClick = () => {
      if (props.disable || props.readonly) return;
      syncStateFromModel();
      popupVisible.value = true;
    };

    const onHidePopup: QPopupProxyProps['onHide'] = (evt) => {
      emit('hide', evt);
    };

    expose({ popupVisible });
    return {
      t,
      fieldRef,
      popupVisible,
      handleClear,
      handleClearClick,
      handleFieldClick,
      handleConfirm,
      handleTimeWheel,
      computedValue,
      computedValueDisplay,
      currentRangeDate,
      currentSingleDate,
      fromH,
      fromM,
      fromS,
      toH,
      toM,
      toS,
      singleH,
      singleM,
      singleS,
      fromTimeParts,
      toTimeParts,
      singleTimeParts,
      onHidePopup,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use '../j-q-date/index';
</style>
