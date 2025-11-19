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
      {{ $t('messages.pleaseSelect') }}
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
                <div class="fs-12 text-grey h-30 row items-center q-mt-sm">{{ t('date.start') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input
                    key="fromH"
                    v-model="fromH"
                    type="text"
                    :label="t('date.hour')"
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
                    :label="t('date.minute')"
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
                    :label="t('date.second')"
                    dense
                    style="width: 80px"
                    mask="##"
                    @wheel.prevent="handleTimeWheel($event, fromTimeParts, 's', 59, 'from')"
                  />
                </div>
              </div>
              <div class="row column q-mb-md">
                <div class="fs-12 text-grey h-30 row items-center">{{ t('date.end') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input key="toH" v-model="toH" type="text" :label="t('date.hour')" dense style="width: 80px" mask="##" @wheel.prevent="handleTimeWheel($event, toTimeParts, 'h', 23, 'to')" />
                  <div class="text-caption">:</div>
                  <q-input key="toM" v-model="toM" type="text" :label="t('date.minute')" dense style="width: 80px" mask="##" @wheel.prevent="handleTimeWheel($event, toTimeParts, 'm', 59, 'to')" />
                  <div class="text-caption">:</div>
                  <q-input key="toS" v-model="toS" type="text" :label="t('date.second')" dense style="width: 80px" mask="##" @wheel.prevent="handleTimeWheel($event, toTimeParts, 's', 59, 'to')" />
                </div>
              </div>
            </template>

            <template v-else>
              <div class="row column q-mb-md q-mt-auto">
                <div class="fs-12 text-grey h-30 row items-center q-mt-sm">{{ t('date.hour') }}/{{ t('date.minute') }}/{{ t('date.second') }}</div>
                <div class="row q-gutter-x-xs items-center">
                  <q-input
                    key="singleH"
                    v-model="singleH"
                    type="text"
                    :label="t('date.hour')"
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
                    :label="t('date.minute')"
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
                    :label="t('date.second')"
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

            <q-btn :label="t('date.confirm')" @click="handleConfirm" unelevated outline class="q-mt-auto" no-caps />
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
import { computed, CSSProperties, defineComponent, PropType, reactive, ref, watch } from 'vue';
import { date, QDateProps, QField, QFieldProps, QPopupProxyProps } from 'quasar';
import { useI18n } from 'vue-i18n';

// --- 自定义类型定义 ---
interface TimeParts {
  h: number;
  m: number;
  s: number;
}

interface DateTimeRangeValue {
  from: string | null;
  to: string | null;
}

interface QDateRangeValue {
  from: string;
  to: string;
}

type TModelValue = DateTimeRangeValue | SingleDateTimeValue; // 允许 DateTimeRangeValue 或 SingleDateTimeValue
type TValueDisplayFn = (value: TModelValue) => string | number | null | undefined;
type SingleDateTimeValue = string | null;

const messages = {
  'zh-CN': {
    messages: { pleaseSelect: '请选择' },
    date: {
      start: '起始时间',
      end: '结束时间',
      confirm: '确认',
      hour: '时',
      minute: '分',
      second: '秒',
    },
  },
  'en-US': {
    messages: { pleaseSelect: 'Please select' },
    date: {
      start: 'Start Date',
      end: 'End Date',
      confirm: 'Confirm',
      hour: 'Hour',
      minute: 'Minute',
      second: 'Second',
    },
  },
};

const DATETIME_MASK = 'YYYY-MM-DD HH:mm:ss';
const DATE_MASK = 'YYYY-MM-DD';
const DATE_MASK_QDATE = 'YYYY/MM/DD';

// 辅助函数：限制时间值 (小时: 0-23, 分/秒: 0-59)
const clampTime = (val: number, max: number): number => {
  let num = Math.floor(val);
  num = Math.max(0, num); // 最小为 0
  num = Math.min(max, num); // 最大为 max
  return num;
};
const parseTimeParts = (dateTimeStr: string | null): TimeParts => {
  if (dateTimeStr) {
    const parsedDate = date.extractDate(dateTimeStr, DATETIME_MASK);
    return {
      h: parsedDate.getHours(),
      m: parsedDate.getMinutes(),
      s: parsedDate.getSeconds(),
    };
  }
  return { h: 0, m: 0, s: 0 };
};
const wrapTime = (val: number, max: number): number => {
  // max 是最大值 (例如：小时是 23, 分/秒是 59)
  const range = max + 1;
  let result = val % range;
  if (result < 0) {
    result += range;
  }
  return result;
};

const combineDateTime = (dateStr: string | null, time: TimeParts): string | null => {
  if (!dateStr) return null;
  const timeStr = `${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`;
  const cleanDateStr = dateStr.replace(/\//g, '-');
  return `${cleanDateStr} ${timeStr}`;
};

export default defineComponent({
  name: 'JQDateTime',
  components: {},
  props: {
    // modelValue 类型现在可以接受 String/Date/Number (单选) 或 Object (范围)
    modelValue: { type: [String, Number, Object, Date] as PropType<TModelValue>, default: () => null },
    clearable: { type: Boolean, default: true },
    dense: { type: Boolean as PropType<QFieldProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    readonly: { type: Boolean, default: false },
    label: { type: String as PropType<QFieldProps['label']> },
    options: { type: [Array, Function] as PropType<QDateProps['options']> },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    popupInnerStyle: { type: [String, Object, Array] as PropType<CSSProperties> },
    rules: { type: Array as () => QFieldProps['rules'] },
    valueDisplayFn: { type: Function as PropType<TValueDisplayFn> },
    range: { type: Boolean, default: false }, // 控制单选/范围选择
  },
  emits: {
    hide: (...[evt]: Parameters<NonNullable<QPopupProxyProps['onHide']>>) => true,
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: { 'popup-prepend': void 0 },

  setup(props, { emit, expose, slots }) {
    const { t } = useI18n({ messages, useScope: 'local' });

    const popupVisible = ref(false);
    const fieldRef = ref<InstanceType<typeof QField> | null>(null);
    const isClearing = ref(false);

    // --- 范围选择状态 (range=true) ---
    const currentRange = ref<DateTimeRangeValue>({ from: null, to: null });
    const currentRangeDate = ref<QDateRangeValue | string>({
      from: date.formatDate(new Date(), DATE_MASK_QDATE),
      to: date.formatDate(new Date(), DATE_MASK_QDATE),
    });
    const fromTimeParts = reactive<TimeParts>(parseTimeParts(null));
    const toTimeParts = reactive<TimeParts>(parseTimeParts(null));

    // --- 单选状态 (range=false) ---
    const currentSingle = ref<SingleDateTimeValue>(null); // 完整的 YYYY-MM-DD HH:mm:ss 字符串
    const currentSingleDate = ref<string>(date.formatDate(new Date(), DATE_MASK_QDATE)); // QDate 使用的 YYYY/MM/DD
    const singleTimeParts = reactive<TimeParts>(parseTimeParts(null)); // 时分秒对象

    // 1. 统一的 computedValue
    const computedValue = computed({
      get: () => {
        const val = props.modelValue;
        if (typeof val === 'string' && val === '') {
          return null;
        }
        return val;
      },
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    // 2. 时间或日期变化时，更新 currentRange/currentSingle 状态
    const updateTime = (key: 'from' | 'to' | 'single') => {
      if (key === 'single') {
        // 单选模式
        currentSingle.value = combineDateTime(currentSingleDate.value, singleTimeParts);
      } else {
        // 范围选择模式
        const parts = key === 'from' ? fromTimeParts : toTimeParts;
        let datePart: string | null = null;

        if (typeof currentRangeDate.value === 'object') {
          datePart = key === 'from' ? currentRangeDate.value.from : currentRangeDate.value.to;
        } else if (key === 'from') {
          // 在范围模式下，如果 QDate 只有单值，认为是 from
          datePart = currentRangeDate.value;
        }

        if (datePart) {
          currentRange.value[key] = combineDateTime(datePart, parts);
        }
      }
    };

    // 辅助函数，创建 Hour/Minute/Second 的双向 computed 属性
    const createTimeComputed = (parts: TimeParts, key: 'h' | 'm' | 's', max: number, modeKey: 'from' | 'to' | 'single') => {
      return computed({
        get: () => String(parts[key]).padStart(2, '0'),
        set: (val) => {
          let num = parseInt(val, 10);
          if (isNaN(num)) {
            num = 0;
          }
          // 限制数值在 [0, max] 范围内
          parts[key] = clampTime(num, max);

          // 实时更新完整的日期时间字符串
          updateTime(modeKey);
        },
      });
    };

    // Range 模式的时间计算属性
    const fromH = createTimeComputed(fromTimeParts, 'h', 23, 'from');
    const fromM = createTimeComputed(fromTimeParts, 'm', 59, 'from');
    const fromS = createTimeComputed(fromTimeParts, 's', 59, 'from');

    const toH = createTimeComputed(toTimeParts, 'h', 23, 'to');
    const toM = createTimeComputed(toTimeParts, 'm', 59, 'to');
    const toS = createTimeComputed(toTimeParts, 's', 59, 'to');

    // Single 模式的时间计算属性
    const singleH = createTimeComputed(singleTimeParts, 'h', 23, 'single');
    const singleM = createTimeComputed(singleTimeParts, 'm', 59, 'single');
    const singleS = createTimeComputed(singleTimeParts, 's', 59, 'single');

    // --- 范围选择模式的 Watchers ---
    watch(
      currentRangeDate,
      (newRangeDate, oldRangeDate) => {
        if (!props.range) return; // 仅在范围模式下执行

        if (typeof newRangeDate === 'object') {
          const newFromDateStr = newRangeDate.from;
          const newToDateStr = newRangeDate.to;

          // 检查起始日期是否变化
          if (oldRangeDate && typeof oldRangeDate === 'object' && newFromDateStr !== oldRangeDate.from) {
            // 起始日期发生变化，重置起始时间为 00:00:00
            Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
          }

          // 检查结束日期是否变化
          if (oldRangeDate && typeof oldRangeDate === 'object' && newToDateStr !== oldRangeDate.to) {
            // 结束日期发生变化，重置结束时间为 00:00:00
            Object.assign(toTimeParts, { h: 0, m: 0, s: 0 });
          }

          if (newFromDateStr && newToDateStr) {
            // QDate 自动更新了日期部分，我们需要将时间部分合并
            currentRange.value.from = combineDateTime(newFromDateStr, fromTimeParts);
            currentRange.value.to = combineDateTime(newToDateStr, toTimeParts);
          }
        } else if (typeof newRangeDate === 'string' && typeof oldRangeDate === 'object') {
          // 用户从范围选择切换到了单日期选择 (例如在 QDate 上只点击了一个日期)
          // 默认将 from 日期更新，并重置 from 时间
          Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
          currentRange.value.from = combineDateTime(newRangeDate, fromTimeParts);
        }
      },
      { deep: true }
    );

    watch(
      currentRange,
      (newRange) => {
        if (!props.range) return; // 仅在范围模式下执行

        if (newRange.from && newRange.to) {
          const finalFrom = date.extractDate(newRange.from, DATETIME_MASK);
          const finalTo = date.extractDate(newRange.to, DATETIME_MASK);

          // 确保范围顺序正确
          if (finalFrom.getTime() > finalTo.getTime()) {
            computedValue.value = { from: newRange.to, to: newRange.from };
          } else {
            computedValue.value = newRange;
          }
        } else {
          // 如果范围不完整，不更新 modelValue
        }
      },
      { deep: true }
    );

    // --- 单选模式的 Watchers ---
    watch(currentSingleDate, (newDate, oldDate) => {
      if (props.range) return; // 仅在单选模式下执行
      if (isClearing.value) return;
      // 日期变化，重置时间为 00:00:00
      if (newDate !== oldDate) {
        Object.assign(singleTimeParts, { h: 0, m: 0, s: 0 });
      }
      currentSingle.value = combineDateTime(newDate, singleTimeParts);
    });

    watch(currentSingle, (newSingle) => {
      if (props.range) return; // 仅在单选模式下执行
      computedValue.value = newSingle;
    });

    const handleConfirm = () => {
      // 确认只负责关闭弹窗
      popupVisible.value = false;
    };

    const handleClear = () => {
      isClearing.value = true; // **设置为 true**

      if (props.range) {
        currentRange.value = { from: null, to: null };
        Object.assign(fromTimeParts, { h: 0, m: 0, s: 0 });
        Object.assign(toTimeParts, { h: 0, m: 0, s: 0 });
        currentRangeDate.value = { from: '', to: '' };
      } else {
        currentSingle.value = null;
        Object.assign(singleTimeParts, { h: 0, m: 0, s: 0 });
        // **保持 currentSingleDate 不变或使用空字符串，而不是今天**
        // 使用空字符串 '' 可能在 QDate 中会显示今天的日期，但不会触发 watch 里的日期变化
        currentSingleDate.value = '';
      }
      computedValue.value = null;

      fieldRef.value!.blur();
      popupVisible.value = false;

      // 确保在下一个 tick 之后重置，防止 watch 仍然触发
      setTimeout(() => {
        isClearing.value = false; // **设置为 false**
      }, 0);
    };
    const handleClearClick = () => {
      handleClear();
    };

    const handleFieldClick = () => {
      if (props.disable || props.readonly) return;

      if (props.range) {
        // 范围模式初始化
        currentRange.value = (computedValue.value as DateTimeRangeValue) || { from: null, to: null };
        Object.assign(fromTimeParts, parseTimeParts(currentRange.value.from));
        Object.assign(toTimeParts, parseTimeParts(currentRange.value.to));

        const fromDate = currentRange.value.from ? date.formatDate(currentRange.value.from, DATE_MASK_QDATE) : date.formatDate(new Date(), DATE_MASK_QDATE);
        const toDate = currentRange.value.to ? date.formatDate(currentRange.value.to, DATE_MASK_QDATE) : fromDate;

        currentRangeDate.value = { from: fromDate, to: toDate };
      } else {
        // 单选模式初始化
        const val = computedValue.value as SingleDateTimeValue;
        currentSingle.value = val;
        Object.assign(singleTimeParts, parseTimeParts(val));

        currentSingleDate.value = val ? date.formatDate(val, DATE_MASK_QDATE) : date.formatDate(new Date(), DATE_MASK_QDATE);
      }

      popupVisible.value = true;
    };

    const computedValueDisplay = computed(() => {
      if (props.valueDisplayFn) {
        return String(props.valueDisplayFn(props.modelValue) ?? '');
      }

      if (props.range) {
        const { from, to } = (props.modelValue as DateTimeRangeValue) || { from: null, to: null };
        if (from && to) {
          return `${date.formatDate(from, DATETIME_MASK)} - ${date.formatDate(to, DATETIME_MASK)}`;
        }
      } else {
        const val = props.modelValue as SingleDateTimeValue;
        if (val) {
          return date.formatDate(val, DATETIME_MASK);
        }
      }
      return '';
    });

    const handleTimeWheel = (event: WheelEvent, parts: TimeParts, key: 'h' | 'm' | 's', max: number, modeKey: 'from' | 'to' | 'single') => {
      // 阻止默认滚动行为，防止页面滚动
      event.preventDefault();

      // event.deltaY > 0 表示向下滚动 (减小时间), < 0 表示向上滚动 (增加时间)
      const direction = event.deltaY > 0 ? -1 : 1;
      let newTime = parts[key] + direction;

      // 使用新的 wrapTime 实现循环 0-max
      parts[key] = wrapTime(newTime, max);

      // 实时更新完整的日期时间字符串
      updateTime(modeKey);
    };

    const onHidePopup: QPopupProxyProps['onHide'] = (evt) => {
      emit('hide', evt);
    };

    expose({ popupVisible });
    return {
      handleTimeWheel,
      t,
      fieldRef,
      handleClear,
      handleClearClick,
      handleFieldClick,
      computedValue,
      computedValueDisplay,
      popupVisible,
      onHidePopup,
      handleConfirm,
      updateTime,
      currentRange,
      currentRangeDate,
      fromH,
      fromM,
      fromS,
      toH,
      toM,
      toS,
      fromTimeParts,
      toTimeParts,
      currentSingle,
      currentSingleDate,
      singleH,
      singleM,
      singleS,
      singleTimeParts,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use 'index';
</style>