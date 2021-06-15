<template>
  <div class="q-pa-md">
    <q-form class="flex flex-wrap query-list m-b-30" ref="queryFrom">
      <div v-for="(item, index) in queryInput" :key="index">
        <q-input
          v-model.trim="queryParams[item.id]"
          :type="item.inputType"
          :class="['', item.class]"
          :label="item.placeholder"
          v-if="item.type === 'text'"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          clearable
          dense
          outlined
          :spellcheck="false"
        />
        <q-select
          v-if="item.type === 'select'"
          :class="['', item.class]"
          v-model="queryParams[item.id]"
          :options="item.selectArr"
          :label="item.placeholder"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          clearable
          dense
          outlined
          :spellcheck="false"
        />
      </div>
      <q-btn color="primary" icon="search" label="Query" no-caps class="m-r-15 h-40" :loading="queryLoading" />
      <q-btn icon="youtube_searched_for" label="Reset" outline color="primary" no-caps class="h-40" :loading="resetLoading" />
    </q-form>
    <q-table
      :columns="tableParams.column"
      :data="tableParams.data"
      :loading="tableParams.loading"
      :pagination="tableParams.pagination"
      hide-pagination
      no-data-label="No data"
    >
      <!--      loading-->
      <template v-slot:loading>
        <q-inner-loading color="primary" showing />
      </template>
      <!--      actions-->
      <template v-slot:body-cell-action="props">
        <q-td class="text-left">
          <span class="in-table-link-button" v-if="props">Active</span>
          <span class="in-table-delete-button m-l-5">Suspend</span>
        </q-td>
      </template>
    </q-table>
    <div class="flex a-center j-end q-mt-md" v-if="tableParams.pagination.rowsNumber">
      <p class="m-r-10">Total {{ tableParams.pagination.rowsNumber }}</p>
      <q-pagination
        v-model="tableParams.pagination.page"
        :input="false"
        :max-pages="6"
        :max="
          tableParams.pagination.rowsNumber / tableParams.pagination.rowsPerPage < 1
            ? 1
            : Math.ceil(tableParams.pagination.rowsNumber / tableParams.pagination.rowsPerPage)
        "
        @input="paginationInput"
        ellipses
        outline
        boundary-numbers
      ></q-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { defaultFill } from '@/utils';
const QUERY_PARAMS = {
  imsi: '',
  iccid: '',
  package: '',
  operator: '',
  area: '',
  state: '',
  allocated: '',
  statusType: '',
  ascription: '',
};
@Component({
  name: 'Index',
})
export default class extends Vue {
  private queryParams = cloneDeep(QUERY_PARAMS);
  private queryLoading = false;
  private resetLoading = false;
  private queryInput: any = [
    {
      placeholder: 'IMSI',
      type: 'text',
      class: 'w-250 m-r-15 m-b-15',
      inputType: 'number',
      id: 'imsi',
    },
    {
      placeholder: 'ICCID',
      type: 'text',
      class: 'w-250 m-r-15 m-b-15',
      inputType: 'number',
      id: 'iccid',
    },
    {
      placeholder: 'Plan',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      id: 'package',
      selectArr: ['Plan1', 'Plan2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Operator',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      id: 'operator',
      selectArr: ['Operator1', 'Operator2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Area',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      id: 'area',
      selectArr: ['Province1', 'Province2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Profile status',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      id: 'state',
      selectArr: ['Activated', 'Deactivate'],
      selectArrObject: [],
    },
    {
      placeholder: 'Occupation status',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      id: 'allocated',
      selectArr: ['Occupied', 'Unoccupied'],
      selectArrObject: [],
    },
    {
      placeholder: 'Plan type',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      selectArr: ['Type1', 'Type2'],
      selectArrObject: [],
      id: 'statusType',
    },
    {
      placeholder: 'Affiliation',
      type: 'select',
      class: 'w-250 m-r-15 m-b-15',
      selectArr: ['Org1', 'Org2'],
      selectArrObject: [],
      id: 'ascription',
    },
  ];
  private tableParams = {
    loading: false,
    data: [
      {
        imsi: '1',
        iccid: '1',
        carrierName: '1',
        area: '1',
        bundleName: '1',
        bundleTypeId: '1',
        state: '1',
        allocated: '1',
      },
    ],
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 1,
    },
    column: [
      {
        name: 'imsi',
        label: 'IMSI',
        align: 'left',
        field: (row: any) => row.imsi,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'iccid',
        label: 'ICCID',
        field: (row: any) => row.iccid,
        format: (val: any) => `${defaultFill(val)}`,
        align: 'left',
      },
      {
        name: 'operator',
        label: 'Operator',
        align: 'left',
        field: (row: any) => row.carrierName,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'area',
        label: 'Area',
        align: 'left',
        field: (row: any) => row.area,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'bundleName',
        label: 'Plan',
        align: 'left',
        field: (row: any) => row.bundleName,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'statusType',
        label: 'Plan type',
        align: 'left',
        field: (row: any) => row.bundleTypeId,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'bootUpSatus',
        label: 'Profile type',
        align: 'left',
        field: (row: any) => row.state,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'occupancyStatus',
        label: 'Affiliation',
        align: 'left',
        field: (row: any) => row.allocated,
        format: (val: any) => `${defaultFill(val)}`,
      },
      { name: 'action', label: 'Actions', field: 'action', align: 'left' },
    ],
  };
  private paginationInput() {
    if (this.tableParams.pagination.rowsNumber / this.tableParams.pagination.rowsPerPage < 1) return;
    this.getData();
  }
  private getData() {}
}
</script>
