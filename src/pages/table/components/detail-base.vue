<template>
  <div>
    <j-q-detail-list :items="componentParams.items" :data="componentParams.data">
      <template #item-value-status="{ value }">
        [this is slot
        <q-badge :color="value === 'active' ? 'green' : 'red'"> {{ value === 'active' ? 'Enable' : 'Disable' }}</q-badge>
        ]
      </template>
      <template #item-value-created_at="{ value }">
        [this is slot
        <q-icon name="access_time" class="q-mr-xs j-text-color-red" />
        <span class="test-text">123123</span>
        {{ value }}
        ]
      </template>
    </j-q-detail-list>
    <j-c-title-line label="This is split title line" class="q-my-md" />
    <j-q-table ref="JQTableRef" :rows="componentParams.table.data" :columns="componentParams.table.columns" :loading="componentParams.table.loading" @paginationChange="onPaginationChange"></j-q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { JCTitleLine, JQDetailList, JQTable, jqTool, JQTooltip } from 'qcpt';

@Component({
  name: 'DetailBaseComponent',
  components: { JQDetailList, JQTooltip, JCTitleLine, JQTable },
})
export default class DetailBaseComponent extends Vue {
  $refs: any;

  mounted() {
    this.$refs.JQTableRef.setTotal(5);
  }

  public componentParams = {
    items: [
      {
        name: 'status',
        label: 'Status',
      },
      {
        name: 'created_at',
        label: 'Created At',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'address',
        label: 'Address',
      },
    ],
    data: {
      status: 0,
      created_at: +new Date(),
      age: 13,
    },
    table: {
      loading: false,
      data: [
        { id: 1, name: 'Alice', age: 31, description: 'this is description' },
        { id: 2, name: 'Bob', age: '', description: 'this is description large description large description  repeat repeat repeat repeat' },
        { id: 3, name: 'Charlie', age: 35 },
        { id: 4, name: 'David', age: 28 },
        { id: 5, name: 'Eve', age: 32 },
      ],
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', format: jqTool.defaultFormat() },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'age', label: 'Age', field: 'age', align: 'left', format: jqTool.defaultFormat() },
        {
          name: 'description',
          field: 'description',
          label: 'Description',
          align: 'left',
        },
      ],
    },
  };

  /* event */
  public onPaginationChange(paginationInfo: any) {
    console.log('paginationInfo', paginationInfo);
  }
}
</script>

<style scoped lang="scss">
.test-text {
  background: var(--j-color-green-light);
}
</style>
