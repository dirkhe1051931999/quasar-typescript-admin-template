<template>
  <div class="j-q-table-container">
    <q-table
      ref="JQTableRef"
      v-model:selected="computedSelected"
      :class="[tableClass, 'j-q-table']"
      :columns="columns"
      :dense="dense"
      :flat="flat"
      :loading="loading"
      :pagination="clacPagination"
      :row-key="rowKey"
      :rows="rows"
      :table-header-class="computedTableHeaderClass"
      hide-pagination
      :binary-state-sort="false"
    >
      <template v-if="hasSlot('top')" #top>
        <slot name="top" />
      </template>
      <template v-if="hasSlot('header')" #header="props">
        <slot name="header" v-bind="props" />
      </template>
      <template v-if="hasSlot('body')" #body="props">
        <slot name="body" v-bind="props" />
      </template>
      <template v-for="col in computedSlotHeaderCellColumns" :key="col.name" v-slot:[`header-cell-${col.name}`]="props">
        <q-th v-bind:props="props">
          <slot :name="`header-cell-${col.name}`" v-bind="props" />
        </q-th>
      </template>
      <template v-for="col in computedSlotBodyCellColumns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">
        <q-td :props="props">
          <div v-if="col.limitWidth" class="cell-limit-width">
            <slot :name="`body-cell-${col.name}`" v-bind="props" />
          </div>
          <slot v-else :name="`body-cell-${col.name}`" v-bind="props" />
        </q-td>
      </template>
      <template v-for="col in computedLimitWidthColumns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">
        <q-td :props="props">
          <div class="cell-limit-width">
            {{ formatColumnValue(col, props.value) }}
          </div>
        </q-td>
      </template>
      <template v-for="col in computedWhiteSpaceColumns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">
        <q-td :props="props" :style="getCellStyle(col)">
          <div :class="getCellClass(col)" :ref="(el) => setEllipsisRef(el, `${col.name}-${props.row[rowKey]}`)">
            {{ formatColumnValue(col, props.value) }}
          </div>
          <q-tooltip v-if="shouldShowTooltip(`${col.name}-${props.row[rowKey]}`)" :style="getTooltipStyle()" :class="getTooltipClass()" anchor="top middle" self="bottom middle" :offset="[10, 10]">
            {{ formatColumnValue(col, props.value) }}
          </q-tooltip>
        </q-td>
      </template>
      <template v-for="col in computedClickableColumns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">
        <q-td :props="props" :style="getCellStyle(col)">
          <template v-if="isClickable(col, props.value, props.row)">
            <div
              class="link-type"
              :class="getCellClass(col)"
              :ref="col.whiteSpace ? (el) => setEllipsisRef(el, `${col.name}-${props.row[rowKey]}`) : undefined"
              @click="handleColumnClick(col, props.row)"
            >
              {{ formatColumnValue(col, props.value) }}
            </div>
            <q-tooltip
              v-if="col.whiteSpace && shouldShowTooltip(`${col.name}-${props.row[rowKey]}`)"
              :style="getTooltipStyle()"
              :class="getTooltipClass()"
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              {{ formatColumnValue(col, props.value) }}
            </q-tooltip>
          </template>
          <template v-else>
            <div :class="getCellClass(col)" :ref="col.whiteSpace ? (el) => setEllipsisRef(el, `${col.name}-${props.row[rowKey]}`) : undefined">
              {{ formatColumnValue(col, props.value) }}
            </div>
            <q-tooltip
              v-if="col.whiteSpace && shouldShowTooltip(`${col.name}-${props.row[rowKey]}`)"
              :style="getTooltipStyle()"
              :class="getTooltipClass()"
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              {{ formatColumnValue(col, props.value) }}
            </q-tooltip>
          </template>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing :label="t('messages.loading')" color="primary" label-class="text-primary text-weight-medium" spinner-color="black"></q-inner-loading>
      </template>
      <template #no-data>
        {{ t('messages.noData') }}
      </template>
    </q-table>
    <Pagination v-if="!hidePagination && paginationInfo.rowsNumber" :paginationInfo="paginationInfo" class="q-pa-md" @pagination="onPaginationChange" />
    <slot name="append"></slot>
  </div>
</template>
<script lang="ts">
import { DEFAULT_ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS, usePagination } from './pagination';
import { computed, defineComponent, PropType, type SlotsType, ref } from 'vue';
import { QTable, QTh, QTd, QInnerLoading } from 'quasar';
import Pagination from './pagination.vue';
import { useI18n } from 'src/composables/useI18n.ts';
import type { QTableColumn } from 'quasar';

export interface SelectionConditions {
  itemSelectDisable: (data: any) => boolean;
}

export interface TableColumn extends Partial<QTableColumn> {
  name: string;
  [key: string]: any;
}

export default defineComponent({
  name: 'JQTableComponent',
  components: {
    Pagination,
    QTable,
    QTh,
    QTd,
    QInnerLoading,
  },
  props: {
    autoHeight: { type: Boolean, default: false },
    autoScrollOnChangePage: { type: Boolean, default: true },
    columns: { type: Array as PropType<any[]>, default: () => [] },
    dense: { type: Boolean, default: false },
    flat: { type: Boolean, default: true },
    hidePagination: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    rowKey: { default: 'id' },
    rows: { type: Array, default: () => [] },
    selected: { type: Array, default: null },
    tableHeaderClass: { type: [String, Object, Array] },
    tableClass: { type: [String, Object, Array] },
    selectionConditions: {
      type: Object as () => SelectionConditions | null,
      default: null,
    },
  },
  slots: Object as SlotsType<
    {
      top?: void;
      header?: any;
      body?: any;
      append?: void;
    } & Record<`header-cell-${string}`, any> &
      Record<`body-cell-${string}`, any>
  >,
  setup(props, { emit, expose, slots }) {
    /* params */
    const { t } = useI18n();
    const JQTableRef = ref(null);
    const innerSelected = ref<any[]>([]);
    const ellipsisRefs = ref<Map<string, HTMLElement>>(new Map());
    const hasSlot = (slotName: string) => Reflect.has(slots, slotName);
    /* computed */
    const computedSelected = computed({
      get() {
        return props.selected ?? innerSelected.value;
      },
      set(val) {
        emit('update:selected', val);
        (innerSelected.value as any) = val;
      },
    });
    const computedTableHeaderClass = computed(() => {
      return props.tableHeaderClass;
    });
    const computedSlotHeaderCellColumns = computed(() => {
      return (props.columns?.filter((column: any) => Reflect.has(slots, `header-cell-${column.name}`)) || []) as any[];
    });
    const computedSlotBodyCellColumns = computed(() => {
      return (props.columns?.filter(({ name, onClick }: any) => {
        return Reflect.has(slots, `body-cell-${name}`) && !onClick;
      }) || []) as any[];
    });
    const computedClickableColumns = computed(() => {
      return (props.columns?.filter(({ onClick }: any) => onClick) || []) as any[];
    });
    const computedWhiteSpaceColumns = computed(() => {
      return (props.columns?.filter(({ whiteSpace, onClick, name }: any) => {
        return whiteSpace && !onClick && !Reflect.has(slots, `body-cell-${name}`);
      }) || []) as any[];
    });
    // 只有 limitWidth 的列（没有 whiteSpace、onClick、slot）
    const computedLimitWidthColumns = computed(() => {
      return (props.columns?.filter(({ limitWidth, whiteSpace, onClick, name }: any) => {
        return limitWidth && !whiteSpace && !onClick && !Reflect.has(slots, `body-cell-${name}`);
      }) || []) as any[];
    });
    const { paginationInfo, getPaginationParam, getNum, setNum, setTotal, setSize } = usePagination();
    const clacPagination = computed(() => ({
      rowsPerPage: 0,
    }));
    /* event */
    const changeNum = () => {
      emit('changeNum', paginationInfo);
      props.autoScrollOnChangePage && scrollTop();
    };
    const changeSize = () => {
      emit('changeSize', paginationInfo);
      props.autoScrollOnChangePage && scrollTop();
    };

    const onPaginationChange = (data: any) => {
      emit('paginationChange', data);
      props.autoScrollOnChangePage && scrollTop();
    };

    const scrollTop = () => {
      const tableEl = (JQTableRef.value as any)?.$el as HTMLElement;
      tableEl?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatColumnValue = (col: any, value: any) => {
      if (col.format && typeof col.format === 'function') {
        return col.format(value);
      }
      return value;
    };

    const handleColumnClick = (col: any, row: any) => {
      if (col.onClick && typeof col.onClick === 'function') {
        col.onClick(row);
      }
    };

    const isClickable = (col: any, value: any, row: any) => {
      // 如果 column 有自定义 clickable 函数，使用它
      if (col.clickable && typeof col.clickable === 'function') {
        return col.clickable(value, row);
      }
      // 默认：只有 null 和 undefined 不可点击
      return value !== null && value !== undefined;
    };

    // 获取列的最大宽度
    const getMaxWidth = () => {
      return window.innerWidth <= 1440 ? 300 : 500;
    };

    // 获取单元格样式
    const getCellStyle = (col: any) => {
      if (!col.whiteSpace) return {};

      const maxWidth = getMaxWidth();
      return {
        width: `${maxWidth}px`,
        maxWidth: `${maxWidth}px`,
        minWidth: `${maxWidth}px`,
      };
    };

    // 获取单元格内容的 class
    const getCellClass = (col: any) => {
      if (!col.whiteSpace) return '';

      const lines = Math.min(Math.max(1, Number(col.whiteSpace) || 1), 3);
      return `cell-ellipsis cell-ellipsis--${lines}`;
    };

    // 获取 tooltip 样式
    const getTooltipStyle = () => {
      return {
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      };
    };

    // 获取 tooltip 的 class (用于设置 max-width，因为 Quasar 会过滤掉内联样式中的 maxWidth)
    const getTooltipClass = () => {
      const maxWidth = getMaxWidth();
      return maxWidth <= 300 ? 'j-tooltip--small' : 'j-tooltip--large';
    };

    // 设置元素引用
    const setEllipsisRef = (el: any, key: string) => {
      if (el) {
        ellipsisRefs.value.set(key, el);
      }
    };

    // 判断是否需要显示 tooltip（检测内容是否溢出）
    const shouldShowTooltip = (key: string) => {
      const el = ellipsisRefs.value.get(key);
      if (!el) return false;

      // 检测是否有横向或纵向溢出
      return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
    };
    /* expose 给 ref 用的 */
    expose({
      JQTableRef,
      paginationInfo,
      getPaginationParam,
      getNum,
      setNum,
      setTotal,
      setSize,
      scrollTop,
      ROWS_PER_PAGE_OPTIONS,
      DEFAULT_ROWS_PER_PAGE,
    });
    /* return 给 template 用的 */
    return {
      t,
      computedSelected,
      hasSlot,
      computedTableHeaderClass,
      computedSlotHeaderCellColumns,
      computedSlotBodyCellColumns,
      computedClickableColumns,
      computedWhiteSpaceColumns,
      computedLimitWidthColumns,
      paginationInfo,
      getPaginationParam,
      getNum,
      setNum,
      setTotal,
      setSize,
      clacPagination,
      changeNum,
      changeSize,
      onPaginationChange,
      formatColumnValue,
      handleColumnClick,
      isClickable,
      getCellStyle,
      getCellClass,
      getTooltipStyle,
      getTooltipClass,
      setEllipsisRef,
      shouldShowTooltip,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>