<template>
  <div class="q-pa-md">
    <q-form class="row query-list m-b-30" ref="queryFrom">
      <div v-for="(item, index) in queryInput" :key="index">
        <q-input
          v-model.trim="queryParams[item.id]"
          :type="item.type"
          :class="['', item.class]"
          :label="item.placeholder"
          v-if="item.inputType === 'text'"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          clearable
          dense
          outlined
          :spellcheck="false"
        />
        <q-select
          v-if="item.inputType === 'select'"
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
      <q-btn color="primary" icon="search" label="Query" no-caps class="q-mr-md h-40" :loading="queryLoading" />
      <q-btn icon="youtube_searched_for" label="Reset" outline color="primary" no-caps class="h-40" :loading="resetLoading" />
    </q-form>
    <q-table
      flat
      bordered
      :columns="tableParams.column"
      :rows="tableParams.data"
      :loading="tableParams.loading"
      :pagination="tableParams.pagination"
      hide-pagination
      no-data-label="NO DATA"
      class="my-table"
    >
      <!-- top -->
      <template v-slot:top>
        <div class="row justify-between full-width items-center">
          <span class="fs-20">Table</span>
          <q-btn color="primary" label="New" class="w-100" icon="add" dense @click="handlerClickTableAdd" />
        </div>
      </template>
      <!-- detail -->
      <template v-slot:body-cell-iccid="props">
        <q-td class="text-left">
          <span class="link-type" @click="handlerClickDetail">{{ props.row.iccid }}</span>
        </q-td>
      </template>
      <!-- image -->
      <template v-slot:body-cell-img="props">
        <q-td class="text-left relative">
          <photo-provider>
            <photo-consumer v-for="src in [props.row.img]" :intro="src" :key="src" :src="src">
              <img :src="src" style="height: 170px; width: 300px" />
              <div class="absolute-bottom text-subtitle4 text-center view-subtitle">Preview image</div>
            </photo-consumer>
          </photo-provider>
        </q-td>
      </template>
      <!--      loading-->
      <template v-slot:loading>
        <q-inner-loading color="primary" showing />
      </template>
      <template v-slot:header-cell-action="props">
        <q-th :props="props">{{ props.col.label.indexOf('$') !== -1 ? $t(`table.${props.col.label.replace('$', '')}`) : props.col.label }}</q-th>
      </template>
      <!--      actions-->
      <template v-slot:body-cell-action="props">
        <q-td class="text-left">
          <span class="in-table-link-button" v-if="props">Active</span>
          <span class="in-table-delete-button q-ml-sm">Suspend</span>
        </q-td>
      </template>
    </q-table>
    <div class="row items-center justify-end q-mt-md" v-if="tableParams.pagination.rowsNumber">
      <p class="q-mr-md">Total {{ tableParams.pagination.rowsNumber }}</p>
      <q-pagination
        v-model="tableParams.pagination.page"
        :input="false"
        :max-pages="6"
        :max="tableParams.pagination.rowsNumber / tableParams.pagination.rowsPerPage < 1 ? 1 : Math.ceil(tableParams.pagination.rowsNumber / tableParams.pagination.rowsPerPage)"
        @update:model-value="paginationInput"
        ellipses
        outline
        boundary-numbers
      ></q-pagination>
    </div>
    <q-dialog v-model="addVisiable" persistent>
      <q-card style="max-width: 1000px">
        <q-card-section class="row items-center">
          <div class="text-h6">Add Form</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none" style="width: 1000px; max-width: 1000px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Please type something']" />
            <q-input
              filled
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'Please type your age', (val) => (val > 0 && val < 100) || 'Please type a real age']"
            />
            <q-toggle v-model="accept" label="I accept the license and terms" />
            <div class="text-right">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { defaultFill } from 'src/utils/tools';
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
  name: 'myComponentMenu2TableIndex',
})
export default class myComponentMenu2TableIndex extends Vue {
  private queryParams = cloneDeep(QUERY_PARAMS);
  private queryLoading = false;
  private resetLoading = false;
  private queryInput: any = [
    {
      placeholder: 'IMSI',
      type: 'text',
      class: 'w-250 q-mr-md q-mb-md',
      inputType: 'number',
      id: 'imsi',
    },
    {
      placeholder: 'ICCID',
      type: 'text',
      class: 'w-250 q-mr-md q-mb-md',
      inputType: 'number',
      id: 'iccid',
    },
    {
      placeholder: 'Plan',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      id: 'package',
      selectArr: ['Plan1', 'Plan2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Operator',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      id: 'operator',
      selectArr: ['Operator1', 'Operator2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Area',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      id: 'area',
      selectArr: ['Province1', 'Province2'],
      selectArrObject: [],
    },
    {
      placeholder: 'Profile status',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      id: 'state',
      selectArr: ['Active', 'Deactivate'],
      selectArrObject: [],
    },
    {
      placeholder: 'Occupation status',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      id: 'allocated',
      selectArr: ['Occupied', 'Unoccupied'],
      selectArrObject: [],
    },
    {
      placeholder: 'Plan type',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      selectArr: ['Type1', 'Type2'],
      selectArrObject: [],
      id: 'statusType',
    },
    {
      placeholder: 'Affiliation',
      type: 'select',
      class: 'w-250 q-mr-md q-mb-md',
      selectArr: ['Org1', 'Org2'],
      selectArrObject: [],
      id: 'ascription',
    },
  ];
  private tableParams = {
    loading: false,
    data: [],
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
        name: 'img',
        label: 'Image',
        align: 'left',
        field: (row: any) => row.img,
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
      { name: 'action', label: '$action', field: 'action', align: 'left' },
    ],
  };
  private addVisiable = false;
  private name = null;
  private age = null;
  private previewImgUrl = '';
  private accept = false;
  private paginationInput() {
    if (this.tableParams.pagination.rowsNumber / this.tableParams.pagination.rowsPerPage < 1) return;
    this.getData();
  }
  private handlerClickTableAdd() {
    this.addVisiable = true;
  }
  private onSubmit() {
    if (this.accept !== true) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'You need to accept the license and terms first',
      });
    } else {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted',
      });
    }
  }
  private onReset() {
    this.name = null;
    this.age = null;
    this.accept = false;
  }
  private handlerClickDetail() {
    this.$q.notify({
      message: 'uhhh... no details',
      icon: 'announcement',
      position: 'bottom',
    });
  }
  private getData() {}
}
</script>
<style lang="scss">
.body--dark {
  :deep(.view-subtitle) {
    background: rgba($color: #ffffff, $alpha: 0.4);
  }
}
.body--light {
  :deep(.view-subtitle) {
    background: rgba($color: #000000, $alpha: 0.4);
  }
}
.my-table {
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%;
}
.my-table thead tr:first-child th:first-child {
  /* bg color is important for th; just specify one */
  background-color: var(--my-white);
}
.my-table td:first-child {
  background-color: var(--my-white);
}
.my-table th:first-child,
.my-table td:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>
<style lang="scss" scoped>
.preview-img {
  height: 170px;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
:deep(.view-subtitle) {
  height: 32px;
  line-height: 32px;
  color: var(--my-white);
  width: 300px;
  margin: 0 auto;
}
</style>
