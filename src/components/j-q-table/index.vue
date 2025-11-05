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
</style>