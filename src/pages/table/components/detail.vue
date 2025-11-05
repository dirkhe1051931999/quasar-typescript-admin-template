<template>
  <div>
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="default" class="q-mb-md" />
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="flat" class="q-mb-sm" />
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="line" class="q-mb-md" />
    <j-q-detail-list :items="dialogParams.items" :data="dialogParams.data">
      <template #item-value-status="{ value }">
        [this is slot
        <q-badge :color="value === 'active' ? 'green' : 'red'"> {{ value === 'active' ? 'Enable' : 'Disable' }} </q-badge>]
      </template>
      <template #item-value-created_at="{ value }">
        [this is slot
        <q-icon name="access_time" class="q-mr-xs" />
        {{ value }}
        ]
      </template>
    </j-q-detail-list>
    <j-c-title-line label="This is split title line" class="q-my-md" />
    <j-q-table ref="JQTableRef" :rows="dialogParams.table.data" :columns="dialogParams.table.columns" :loading="dialogParams.table.loading" @paginationChange="onPaginationChange"></j-q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import JQDetailList from 'components/j-q-detail-list/index.vue';
import JCTabs from 'components/j-c-tabs/index.vue';
import JCTitleLine from 'components/j-c-title-line/index.vue';
import { defaultFormat } from 'src/utils/tools';
import SQTooltip from 'components/j-q-tooltip/index.vue';

@Component({
  name: 'TableDetailComponent',
  components: { SQTooltip, JCTitleLine, JCTabs, JQDetailList },
})
export default class TableDetailComponent extends Vue {
  $refs: any;

  mounted() {
    this.$refs.JQTableRef.setTotal(5);
  }

  public dialogParams = {
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
    tab: {
      options: [
        { label: 'DAY', value: 'day' },
        { label: 'WEEK', value: 'week' },
        { label: 'MONTH', value: 'month' },
        { label: 'QUARTER', value: 'quarter', disable: true },
      ],
      model: 'day',
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
        { name: 'id', label: 'ID', field: 'id', align: 'left', format: defaultFormat() },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'age', label: 'Age', field: 'age', align: 'left', format: defaultFormat() },
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

<style scoped></style>