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
          <slot :name="`body-cell-${col.name}`" v-bind="props" />
        </q-td>
      </template>
      <template v-for="col in computedClickableColumns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">
        <q-td :props="props">
          <template v-if="isClickable(col, props.value, props.row)">
            <span class="link-type" @click="handleColumnClick(col, props.row)">
              {{ formatColumnValue(col, props.value) }}
            </span>
          </template>
          <template v-else>
            {{ formatColumnValue(col, props.value) }}
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
    const self_selected = ref<any[]>([]);
    const hasSlot = (slotName: string) => Reflect.has(slots, slotName);
    /* computed */
    const computedSelected = computed({
      get() {
        return props.selected ?? self_selected.value;
      },
      set(val) {
        emit('update:selected', val);
        (self_selected.value as any) = val;
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
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>