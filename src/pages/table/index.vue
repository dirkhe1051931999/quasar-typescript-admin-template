<template>
  <div>
    <j-q-table
      ref="JQTableRef"
      :rows="tableParams.data"
      :columns="tableParams.columns"
      :loading="tableParams.loading"
      v-model:selected="tableParams.selected"
      @paginationChange="onPaginationChange"
      :sortNames="['age']"
    >
      <template #top>
        <div class="row items-center">
          <q-btn color="primary" label="Add" @click="handleClickAdd" />
        </div>
      </template>
      <template #header-cell-selection>
        <q-checkbox :model-value="canSelectAll" dense :disable="!tableParams.data.length" @update:model-value="handleClickSelectAll" />
      </template>
      <template #header-cell-age="props">
        <span @click="handleClickSort(props.col.name, tableParams.sortMap.age)">{{ props.col.label }}</span>
        <q-icon name="arrow_upward" size="xs" class="q-ml-sm" v-if="tableParams.sortMap.age === 'asc'" />
        <q-icon name="arrow_downward" size="xs" class="q-ml-sm" v-if="tableParams.sortMap.age === 'desc'" />
      </template>
      <template #body-cell-selection="{ row }">
        <q-checkbox :model-value="isItemSelected(row)" dense :disable="itemSelectDisable(row)" @update:model-value="(val: any) => handleClickSelectItem(val, row)"></q-checkbox>
      </template>
      <template #body-cell-name="{ row }">
        {{ row.name }}
        [custom text in name]
      </template>
      <template #body-cell-description="{ row }">
        <s-q-tooltip :content="row.description" contentStyle="max-width: 200px" v-if="row.description" />
      </template>
      <template #body-cell-operation="{ row }">
        <j-q-confirm title="Delete?" @confirm="handleClickDelete(row)" :confirmText="$t('action.confirm')" :cancelText="$t('action.cancel')">
          <q-btn flat dense round icon="delete" v-if="row.id !== 1" />
        </j-q-confirm>
        <q-btn flat dense round icon="info" @click="handleClickDetail(row)" />
      </template>
    </j-q-table>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-facing-decorator';
import JQTable from 'components/j-q-table/index.vue';
import TableSelectionMixin from './mixins/selected';
import { DialogProvider } from 'src/components/j-q-dialog';
import { defineAsyncComponent, getCurrentInstance } from 'vue';
import JQConfirm from 'components/j-q-confirm/index.vue';
import SQTooltip from 'components/j-q-tooltip/index.vue';
import { defaultFormat } from 'src/utils/tools';

@Component({
  name: 'TablePage',
  components: {
    SQTooltip,
    JQConfirm,
    JQTable,
  },
})
export default class extends TableSelectionMixin {
  $refs: any;

  mounted() {
    this.$refs.JQTableRef.setTotal(20);
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public tableParams = {
    selected: [],
    sortMap: {
      age: '',
    },
    data: [
      { id: 1, name: 'Alice', age: 31, description: 'this is description' },
      { id: 2, name: 'Bob', age: '', description: 'this is description large description large description  repeat repeat repeat repeat' },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'David', age: 28 },
      { id: 5, name: 'Eve', age: 32 },
      { id: 6, name: 'Frank', age: 27 },
      { id: 7, name: 'Grace', age: 31 },
      { id: 8, name: 'Henry', age: 29 },
      { id: 9, name: 'Ivy', age: 33 },
      { id: 10, name: 'Jack', age: 26 },
      { id: 11, name: 'Kate', age: 34 },
      { id: 12, name: 'Luke', age: 30 },
      { id: 13, name: 'Mia', age: 28 },
      { id: 14, name: 'Nora', age: 32 },
      { id: 15, name: 'Oscar', age: 27 },
      { id: 16, name: 'Piper', age: 31 },
      { id: 17, name: 'Quinn', age: 29 },
      { id: 18, name: 'Riley', age: 33 },
      { id: 19, name: 'Sally', age: 26 },
      { id: 20, name: 'Tina', age: 34 },
    ],
    columns: [
      {
        name: 'selection',
        field: 'selection',
        label: '',
        align: 'left',
      },
      { name: 'id', label: 'ID', field: 'id', align: 'left', format: defaultFormat() },
      { name: 'name', label: '姓名', field: 'name', align: 'left' },
      { name: 'age', label: '年龄', field: 'age', align: 'left', format: defaultFormat() },
      {
        name: 'description',
        field: 'description',
        label: 'Description',
        align: 'left',
      },
      {
        name: 'operation',
        field: 'operation',
        label: 'Operation',
        align: 'left',
      },
    ],
    loading: false,
  };

  /* event */
  public onPaginationChange(paginationInfo: any) {
    console.log('paginationInfo', paginationInfo);
  }

  public handleClickDelete(row: any) {
    this.tableParams.data.splice(this.tableParams.data.indexOf(row), 1);
    this.$refs.JQTableRef.setTotal(this.tableParams.data.length);
  }

  public handleClickAdd() {
    DialogProvider.register({
      title: 'Add',
      component: defineAsyncComponent(() => import('./components/add-update.vue')),
      componentBind: { type: 'add', data: [] },
      componentOn: {
        getData: () => {
          console.log('getData');
        },
      },
    });
  }

  public handleClickDetail(row: any) {
    DialogProvider.register({
      title: 'Detail',
      position: 'right',
      component: defineAsyncComponent(() => import('./components/detail.vue')),
      componentBind: { type: 'detail', row },
      componentOn: {},
    });
  }

  public handleClickSort(name: string, order: string) {
    if (order === 'asc') {
      (this.tableParams.sortMap as any)[name] = 'desc';
    } else if (order === 'desc') {
      (this.tableParams.sortMap as any)[name] = '';
    } else {
      (this.tableParams.sortMap as any)[name] = 'asc';
    }
    console.log((this.tableParams.sortMap as any)[name]);
  }
}
</script>

<style scoped></style>