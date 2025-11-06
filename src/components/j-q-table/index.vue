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
      <template #loading>
        <q-inner-loading showing :label="$t('action.loading')" color="primary" label-class="text-primary text-weight-medium" spinner-color="black"></q-inner-loading>
      </template>
      <template #no-data> No data</template>
    </q-table>
    <Pagination v-if="!hidePagination && paginationInfo.rowsNumber" :paginationInfo="paginationInfo" class="q-pa-md" @pagination="onPaginationChange" />
    <slot name="append"></slot>
  </div>
</template>
<script lang="ts">
import { usePagination } from './pagination';
import { computed, defineComponent, ref } from 'vue';
import Pagination from './pagination.vue';

interface SelectionConditions {
  itemSelectDisable: (data: any) => boolean;
}

export default defineComponent({
  name: 'JQTableComponent',
  components: { Pagination },
  props: {
    autoHeight: { type: Boolean, default: false },
    autoScrollOnChangePage: { type: Boolean, default: true },
    columns: { type: Array, default: () => [] },
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
  setup(props, { emit, expose, slots }) {
    /* params */
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
    const computedSlotHeaderCellColumns = computed(() => props.columns?.filter((column: any) => Reflect.has(slots, `header-cell-${column.name}`)));
    const computedSlotBodyCellColumns = computed(() => props.columns?.filter(({ name }: any) => Reflect.has(slots, `body-cell-${name}`)));
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
    /* expose  给 ref 用的*/
    expose({ paginationInfo, getPaginationParam, getNum, setNum, setTotal, setSize, scrollTop });
    /* return 给template 用的 */
    return {
      computedSelected,
      hasSlot,
      computedTableHeaderClass,
      computedSlotHeaderCellColumns,
      computedSlotBodyCellColumns,
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
    };
  },
});
</script>

<style lang="scss">
.j-q-table-container {
  background-color: #ffffff;
  border-radius: 4px;
  .table-cell--fix-right,
  .table-cell--fix-left {
    position: sticky;
    z-index: 1;
    background-color: #ffffff;
    box-shadow: rgba($color: #000000, $alpha: 0.05) 0px 20px 27px 0px;
  }

  .table-cell--fix-right {
    right: 0;
  }

  .table-cell--fix-left {
    left: 0;
  }
}

// --- 表格高度和数据样式 (保持不变) ---

.j-q-table-container.table--auto-height td {
  height: auto;
  line-height: 1.5;
}

.j-q-table-container.table--no-data {
  .q-table__middle {
    flex-grow: 0;
  }

  .q-table__bottom {
    flex-grow: 1;
  }
}

/* table NO DATA */
.q-table__bottom--nodata {
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  height: 150px !important;

  i {
    font-size: 30px;
    margin-bottom: 10px;
    display: none;
  }

  &::before {
    content: '';
    margin-bottom: 10px;
    display: block;
    width: 60px;
    height: 60px;
    background: url(data:image/png;base64,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);
    background-size: 100% 100%;
  }
}
</style>