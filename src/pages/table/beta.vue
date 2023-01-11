<template>
  <div>
    <div class="query-form-and-action">
      <div class="action"></div>
      <q-form ref="queryFrom">
        <div class="row">
          <div class="row items-start">
            <div v-for="(item, index) in queryParams.input" :key="index">
              <q-input
                v-model.trim="queryParams.params[item.id]"
                :type="item.inputType"
                :class="['', item.class]"
                :label="item.placeholder"
                v-if="item.type === 'text'"
                autocapitalize="off"
                autocomplete="new-password"
                autocorrect="off"
                clearable
                dense
                outlined
                dropdown-icon="app:topbar-arrow-bottom"
                clear-icon="app:clear"
                :spellcheck="false"
              />
              <q-select
                v-if="item.type === 'select'"
                :class="['', item.class]"
                v-model="queryParams.params[item.id]"
                :options="item.selectOption"
                :label="item.placeholder"
                :spellcheck="false"
                autocapitalize="off"
                autocomplete="new-password"
                autocorrect="off"
                clearable
                dense
                options-dense
                outlined
                emit-value
                dropdown-icon="app:topbar-arrow-bottom"
                clear-icon="app:clear"
                map-options
              />
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              icon="search"
              :label="$t('action.search')"
              no-caps
              class="m-r-15"
              :loading="queryParams.queryLoading"
              @click="handleQuery"
            />
            <q-btn
              icon="restart_alt"
              :label="$t('action.reset')"
              outline
              color="primary"
              no-caps
              :loading="queryParams.resetLoading"
              @click="handleResetQuery"
            />
          </div>
        </div>
      </q-form>
    </div>
    <div class="p-12 bg-white b-r-8">
      <q-table
        flat
        bordered
        :columns="tableParams.column"
        :rows="tableParams.data"
        :loading="tableParams.loading"
        :pagination="tableParams.pagination"
        hide-pagination
        :no-data-label="$t(`tip.noData`)"
        class="my-table"
        :selected-rows-label="
          (numberOfRows) => `select ${numberOfRows} ${$t(`table.per`)}`
        "
        selection="multiple"
        v-model:selected="tableParams.selected"
        row-key="name"
      >
        <template #top>
          <div class="full-width justify-end row">
            <q-btn
              color="primary"
              icon="o_add"
              label="Add"
              no-caps
              class="m-r-15"
              @click="handleClickAdd"
            />
            <q-btn
              icon="o_upload"
              label="Upload"
              outline
              color="primary"
              no-caps
              @click="handleClickUpload"
            />
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <!-- selected -->
            <q-th style="text-align: left">
              <q-checkbox color="primary" v-model="props.selected" />
            </q-th>
            <!-- expand -->
            <q-th auto-width>Expand</q-th>
            <!-- other -->
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="text-align: left"
            >
              <!-- {{ col.label+'123' }} -->
              {{
                col.label.indexOf('$') !== -1
                  ? $t(`table.${col.label.replace('$', '')}`)
                  : col.label
              }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:header-cell-action="props">
          <q-th :props="props"> </q-th>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- selected -->
            <q-td class="text-left">
              <q-checkbox color="primary" v-model="props.selected" />
            </q-td>
            <!-- expand -->
            <q-td auto-width>
              <q-toggle
                v-model="props.expand"
                checked-icon="add"
                unchecked-icon="remove"
              />
            </q-td>
            <!-- other -->
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-left"
            >
              <span v-if="!col.inSlot">{{ col.value }}</span>
              <div class="text-left" v-else>
                <!-- id -->
                <div v-if="col.name === 'id'">
                  <span>{{ tableParams.data.indexOf(props.row) + 1 }}</span>
                </div>
                <!-- name -->
                <div v-if="col.name === 'name'">
                  <span
                    class="link-type"
                    @click="handlerClickDetail(props.row)"
                    >{{ props.row.name }}</span
                  >
                </div>
                <!-- action -->
                <div v-if="col.name === 'action'">
                  <span
                    class="in-table-link-button"
                    @click="handlerClickUpdate(props.row)"
                    >{{ $t(`action.update`) }}
                  </span>
                  <span
                    class="in-table-delete-button m-l-10"
                    @click="handlerClickDelete(props.row)"
                    >{{ $t(`action.delete`) }}
                  </span>
                  <span
                    class="in-table-link-button m-l-10"
                    style="width: 100px"
                  >
                    {{ $t(`action.more`) }}
                    <q-icon name="o_expand_more"></q-icon>
                    <q-popup-proxy>
                      <q-list>
                        <q-item clickable dense v-close-popup>
                          <q-item-section class="text-center">
                            <span
                              class="in-table-delete-button"
                              @click="handlerClickDelete(props.row)"
                              >{{ $t(`action.delete`) }}
                            </span>
                          </q-item-section>
                        </q-item>
                        <q-item clickable dense v-close-popup>
                          <q-item-section class="text-center">
                            <span
                              class="in-table-delete-button"
                              @click="handlerClickDelete(props.row)"
                              >{{ $t(`action.delete`) }}
                            </span>
                          </q-item-section>
                        </q-item>
                        <q-item clickable dense v-close-popup>
                          <q-item-section class="text-center">
                            <span
                              class="in-table-delete-button"
                              @click="handlerClickDelete(props.row)"
                              >{{ $t(`action.delete`) }}
                            </span>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-popup-proxy>
                  </span>
                </div>
              </div>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <!-- expand detail -->
            <q-td colspan="100%">
              <div class="text-left">Name:{{ props.row.name }}</div>
              <div>
                this is expand detail , it maybe json string or other special
                text
              </div>
            </q-td>
          </q-tr>
        </template>
        <!--      loading-->
        <template v-slot:loading>
          <q-inner-loading color="primary" showing />
        </template>
      </q-table>
      <MyPagination
        :paginationParams="tableParams.pagination"
        v-if="tableParams.pagination.rowsNumber > 0"
        @pagination="paginationInput"
      ></MyPagination>
    </div>
    <MyDialog
      :option="{
        id: dialogAddUpdateParams.id,
        dialogType: dialogAddUpdateParams.dialogType,
        clickLoading: dialogAddUpdateParams.clickLoading,
        getDataLoading: dialogAddUpdateParams.getDataLoading,
        visiable: dialogAddUpdateParams.visiable,
        title: dialogAddUpdateParams.title,
        params: dialogAddUpdateParams.params,
      }"
      @close="dialogAddUpdateCloseEvent"
      @confirm="dialogAddUpdateConfirmEvent"
      @before-hide="dialogAddUpdateBeforeHideEvent"
    >
      <div class="row q-col-gutter-x-md">
        <div
          v-for="(item, index) in dialogAddUpdateParams.input"
          :key="index"
          class="col-6"
        >
          <MyFormSelect
            v-if="item.type === 'select'"
            :option="{
              inputId: `${dialogAddUpdateParams.id}-select-${item.model}`,
              rules: item.rules,
              classes: item.classes,
              model: dialogAddUpdateParams.params[item.model],
              label: item.label,
              inputSelectOption: item.inputSelectOption,
              userInput: true,
            }"
            @input="(data) => (dialogAddUpdateParams.params[item.model] = data)"
          />
          <MyFormDate
            v-if="item.type === 'date'"
            :option="{
              rules: item.rules,
              classes: item.classes,
              model: dialogAddUpdateParams.params[item.model],
              label: item.label,
            }"
            @input="(data) => (dialogAddUpdateParams.params[item.model] = data)"
          />
          <MyFormMultipleSelect
            v-if="item.type === 'multiple-select'"
            :option="{
              inputId: `${dialogAddUpdateParams.id}-multiple-select-${item.model}`,
              rules: item.rules,
              classes: item.classes,
              model: dialogAddUpdateParams.params[item.model],
              label: item.label,
              inputSelectOption: item.inputSelectOption,
              multiple: item.multiple,
              userInput: true,
            }"
            @input="(data) => (dialogAddUpdateParams.params[item.model] = data)"
          >
            <template #subTitle>
              <el-popover
                placement="top"
                title="popover-title"
                :width="320"
                popper-style="z-index:9999"
                trigger="hover"
              >
                <p
                  v-for="(item, index) in ['test1', 'test2', 'test3']"
                  :key="index"
                >
                  {{ index + 1 }}. {{ item }}
                </p>
                <template #reference>
                  <q-icon
                    name="o_info"
                    class="text-grey-4 cursor-pointer fs-16"
                  />
                </template>
              </el-popover>
            </template>
          </MyFormMultipleSelect>
          <MyFormInput
            v-if="item.type === 'text'"
            :option="{
              model: dialogAddUpdateParams.params[item.model],
              rules: item.rules,
              classes: item.classes,
              label: item.label,
            }"
            @input="(data) => (dialogAddUpdateParams.params[item.model] = data)"
          >
            <template #subTitle>
              <el-popover
                placement="top"
                title="popover-title"
                :width="320"
                popper-style="z-index:9999"
                trigger="hover"
              >
                <p
                  v-for="(item, index) in ['test1', 'test2', 'test3']"
                  :key="index"
                >
                  {{ index + 1 }}. {{ item }}
                </p>
                <template #reference>
                  <q-icon
                    name="o_info"
                    class="text-grey-4 cursor-pointer fs-16"
                  />
                </template>
              </el-popover>
            </template>
          </MyFormInput>
          <MyMaskInput
            v-if="item.type === 'mask-input'"
            :option="{
              model: dialogAddUpdateParams.params[item.model],
              rules: item.rules,
              classes: item.classes,
              label: item.label,
              mask: '####/####/####/####',
              hint: '####/####/####/####',
            }"
            @input="(data) => (dialogAddUpdateParams.params[item.model] = data)"
          >
          </MyMaskInput>
        </div>
      </div>
    </MyDialog>
    <MyDialog
      :option="{
        id: dialogUpload.id,
        dialogType: 'upload',
        clickLoading: dialogUpload.clickLoading,
        getDataLoading: dialogUpload.getDataLoading,
        visiable: dialogUpload.visiable,
        title: dialogUpload.title,
        params: dialogUpload.params,
      }"
      width="30vw"
      @close="dialogUploadCloseEvent"
      @confirm="hanleCLickUploadConfirm"
      @before-hide="dialogUploadBeforeHideEvent"
    >
      <div class="dialog-upload-form">
        <input
          type="file"
          class="hide"
          :ref="dialogUpload.fileID"
          :accept="dialogUpload.accept"
          :draggable="false"
          @change="uploadFileSuccess"
        />
        <div class="container">
          <div class="center" @click="handleClickUploadFile">
            <!-- <img src="~assets/inbox.png" alt /> -->
            <q-icon
              name="o_cloud_upload"
              class="fs-50"
              color="primary"
            ></q-icon>
            <p class="click">Click to upload</p>
            <p class="format">File type is: xlsx</p>
            <p class="fileName" v-if="dialogUpload.params.fileName">
              {{ dialogUpload.params.fileName }}
            </p>
          </div>
        </div>
        <div class="upload-limit">
          <span class="link-type">{{ $t('action.download_template') }}</span>
          Here's some text
        </div>
      </div>
    </MyDialog>
    <MyDialog
      :option="{
        id: dialogDetailParams.id,
        dialogType: 'detail',
        clickLoading: dialogDetailParams.clickLoading,
        getDataLoading: dialogDetailParams.getDataLoading,
        visiable: dialogDetailParams.visiable,
        title: dialogDetailParams.title,
        params: dialogDetailParams.params,
        showAction: false,
      }"
      @close="dialogDetailCloseEvent"
      @before-hide="dialogDetailBeforeHideEvent"
    >
      <q-list class="row q-col-gutter-x-md">
        <q-item
          v-for="(item, index) in dialogDetailParams.params"
          :key="index"
          :clickable="false"
          class="col-6"
        >
          <q-item-section>
            <q-item-label caption>{{ item.label }}：</q-item-label>
            <q-item-label :class="item.class">{{ item.value }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </MyDialog>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { defaultFill } from 'src/utils/tools';
import { getCurrentInstance } from 'vue';
const CONST_PARAMS: any = {
  query: { a: '', b: '', c: '' },
  dialog_add_update: { a: '', b: '', c: '', d: [], e: '' },
};
@Component({
  name: 'myComponentTableBeta',
})
export default class myComponentTableBeta extends Vue {
  /**instance */
  declare $refs: any;
  /**params */
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private queryParams: any = {
    id: 'query',
    queryLoading: false,
    resetLoading: false,
    params: cloneDeep(CONST_PARAMS.query),
    input: [
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
        inputType: 'text',
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
        inputType: 'text',
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
        inputType: 'text',
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
        inputType: 'text',
      },
      {
        placeholder: 'Input2',
        type: 'select',
        class: 'w-250 m-r-15 m-b-15',
        selectOption: [
          {
            label: 'option 1',
            value: '1',
          },
          {
            label: 'option 2',
            value: '2',
          },
        ],
        id: 'b',
      },
      {
        placeholder: 'Input3',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'c',
        inputType: 'text',
      },
    ],
  };
  private tableParams = {
    selected: [],
    loading: false,
    data: [
      {
        name: 'jen.he.female',
        sex: 'female',
        c: 'ccccccccccccccccc1',
        d: 'ddddddddddddddddd1',
        e: 'eeeeeeeeeeeeeeeee1',
        f: 'fffffffffffffffff1',
        g: 'ggggggggggggggggg1',
        h: 'hhhhhhhhhhhhhhhhh1',
        i: 'iiiiiiiiiiiiiiiii1',
      },
      {
        name: 'jen.he.male',
        sex: 'male',
        c: 'ccccccccccccccccc2',
        d: 'ddddddddddddddddd2',
        e: 'eeeeeeeeeeeeeeeee2',
        f: 'fffffffffffffffff2',
        g: 'ggggggggggggggggg2',
        h: 'hhhhhhhhhhhhhhhhh2',
        i: 'iiiiiiiiiiiiiiiii2',
      },
    ],
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 2,
    },
    column: [
      {
        name: 'id',
        label: 'ID',
        inSlot: true,
      },
      {
        name: 'name',
        label: 'Name',
        inSlot: true,
      },
      {
        name: 'sex',
        label: 'Sex',
        align: 'left',
        field: (row: any) => row.sex,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'c',
        label: 'Table4',
        align: 'left',
        field: (row: any) => row.c,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'd',
        label: 'Table5',
        align: 'left',
        field: (row: any) => row.d,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'e',
        label: 'Table6',
        align: 'left',
        field: (row: any) => row.e,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'f',
        label: 'Table7',
        align: 'left',
        field: (row: any) => row.f,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'g',
        label: 'Table8',
        align: 'left',
        field: (row: any) => row.g,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'h',
        label: 'Table9',
        align: 'left',
        field: (row: any) => row.h,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'i',
        label: 'Table10',
        align: 'left',
        field: (row: any) => row.i,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'action',
        label: '$action',
        field: 'action',
        align: 'left',
        inSlot: true,
      },
    ],
  };
  private dialogAddUpdateParams = {
    id: 'dialog_add_update',
    dialogType: 'add',
    clickLoading: false,
    getDataLoading: false,
    visiable: false,
    title: '',
    params: cloneDeep(CONST_PARAMS.dialog_add_update),
    input: [
      {
        model: 'a',
        type: 'text',
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        label: 'Username',
      },
      {
        model: 'b',
        type: 'text',
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        classes: 'input-password',
        label: 'New password',
      },
      {
        model: 'c',
        type: 'select',
        inputSelectOption: [
          {
            label: 'option1',
            value: '1',
          },
          {
            label: 'option2',
            value: '2',
          },
        ],
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        label: 'select',
      },
      {
        model: 'd',
        type: 'multiple-select',
        multiple: true,
        inputSelectOption: [
          {
            label: 'option1',
            value: '1',
          },
          {
            label: 'option2',
            value: '2',
          },
        ],
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        label: 'Multipl Select',
      },
      {
        model: 'e',
        type: 'date',
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        label: 'Date',
      },
      {
        model: 'f',
        type: 'mask-input',
        rules: [
          (val: string | number | undefined | null) => {
            return (
              (val && String(val).length > 0) ||
              this.globals.$t('messages.required')
            );
          },
        ],
        label: 'Mask Input',
      },
    ],
  };
  private dialogUpload = {
    id: 'dialog-upload-file',
    fileID: 'dialog_upload_file',
    clickLoading: false,
    getDataLoading: false,
    visiable: false,
    title: '',
    accept: '.xls',
    params: { file: '', fileName: '' },
  };
  private dialogDetailParams = {
    id: 'dialog-upload-file',
    getDataLoading: false,
    clickLoading: false,
    visiable: false,
    title: 'Detail',
    params: [
      { label: 'Name', value: '', id: 'name', class: '' },
      { label: 'Sex', value: '', id: 'sex', class: '' },
      { label: 'C', value: '', id: 'c', class: '' },
      { label: 'D', value: '', id: 'd', class: '' },
      { label: 'E', value: '', id: 'e', class: '' },
      { label: 'F', value: '', id: 'f', class: '' },
      { label: 'g', value: '', id: 'g', class: '' },
      { label: 'h', value: '', id: 'h', class: '' },
      { label: 'I', value: '', id: 'i', class: '' },
    ],
  };
  /**event */
  private paginationInput() {
    this.getData();
  }
  private async handleQuery() {
    this.queryParams.queryLoading = true;
    this.tableParams.pagination.page = 1;
    await this.getData();
    this.queryParams.queryLoading = false;
  }
  private async handleResetQuery() {
    this.queryParams.resetLoading = true;
    this.queryParams.params = cloneDeep(CONST_PARAMS.query);
    this.tableParams.pagination.page = 1;
    await this.getData();
    this.queryParams.resetLoading = false;
  }
  private handleClickAdd() {
    this.dialogAddUpdateParams.visiable = true;
    this.dialogAddUpdateParams.dialogType = 'add';
    this.dialogAddUpdateParams.title = 'Add';
  }
  private handlerClickUpdate(row: any) {
    this.dialogAddUpdateParams.visiable = true;
    this.dialogAddUpdateParams.dialogType = 'update';
    this.dialogAddUpdateParams.title = 'Update';
  }
  private handleClickUpload() {
    this.dialogUpload.visiable = true;
    this.dialogUpload.title = 'Upload';
    this.$nextTick(() => {
      this.$refs[this.dialogUpload.fileID].type = 'text';
      this.dialogUpload.params.fileName = '';
      this.dialogUpload.params.file = '';
      setTimeout(() => {
        this.$refs[this.dialogUpload.fileID].type = 'file';
        this.$refs[this.dialogUpload.fileID].value = '';
      }, 100);
    });
  }
  private handleClickUploadFile() {
    this.$refs[this.dialogUpload.fileID].click();
  }
  private uploadFileSuccess() {
    const files = this.$refs[this.dialogUpload.fileID].files;
    let postFiles = Array.prototype.slice.call(files);
    postFiles = postFiles.slice(0, 1);
    postFiles.forEach((rawFile: any) => {
      this.dialogUpload.params.fileName = rawFile.name;
      this.dialogUpload.params.file = rawFile;
    });
  }
  private handlerClickDetail(row: any) {
    const getValue = (row: any, key: string): string => {
      switch (key) {
        case 'name':
          return `${row[key]}-description`;
        default:
          return row[key] || '--';
      }
    };
    const getClass = (row: any, key: string): string => {
      switch (key) {
        case 'sex':
          return 'text-primary';
        default:
          return '';
      }
    };
    const arr = cloneDeep(this.dialogDetailParams.params);
    for (let item of arr) {
      for (let key in row) {
        if (item.id === key) {
          item.value = getValue(row, key);
          item.class = getClass(row, key);
        }
      }
    }
    this.dialogDetailParams.params = arr;
    this.dialogDetailParams.visiable = true;
  }
  private monitorDialogUploadHide() {
    this.dialogUpload.params.fileName = '';
    this.dialogUpload.params.file = '';
  }
  private dialogAddUpdateCloseEvent(data: { type: string }) {
    this.dialogAddUpdateParams.visiable = false;
  }
  private dialogAddUpdateBeforeHideEvent(data: { type: string; params: any }) {
    if (data.params) {
      this.dialogAddUpdateParams.params = data.params;
    }
  }
  private dialogUploadCloseEvent(data: { type: string }) {
    this.dialogUpload.visiable = false;
  }
  private dialogUploadBeforeHideEvent(data: { type: string; params: any }) {
    if (data.params) {
      this.dialogUpload.params = data.params;
    }
  }
  private dialogDetailCloseEvent(data: { type: string }) {
    this.dialogDetailParams.visiable = false;
  }
  private dialogDetailBeforeHideEvent(data: { type: string; params: any }) {
    if (data.params) {
      this.dialogAddUpdateParams.params = data.params;
    }
  }
  /**http */
  private getData() {
    try {
      this.tableParams.loading = true;
      this.tableParams.loading = false;
    } catch (error) {
      this.tableParams.loading = false;
    } finally {
      return Promise.resolve();
    }
  }
  private async dialogAddUpdateConfirmEvent() {
    try {
      this.dialogAddUpdateParams.clickLoading = true;
      // await HTTP_REQUEST()
      this.dialogAddUpdateParams.clickLoading = false;
      this.dialogAddUpdateParams.visiable = false;
      this.$globalMessage.show({
        type: 'success',
        content: this.$t('messages.success'),
      });
      this.getData();
    } catch (error) {
      this.dialogAddUpdateParams.clickLoading = false;
    }
  }
  private async handlerClickDelete(row: any) {
    try {
      await this.$globalConfirm.show({
        title: this.$t('messages.tishi'),
        color: 'primary',
        content: this.$t('messages.areYouSure'),
        confirmButtonText: this.$t('action.yes'),
      });
      // await HTTP_REQUEST()
      this.$globalMessage.show({
        type: 'success',
        content: this.$t('messages.success'),
      });
      this.getData();
    } catch (error) {}
  }
  private async hanleCLickUploadConfirm() {
    try {
      const form = new FormData();
      form.append('file', this.dialogUpload.params.file);
      this.dialogUpload.clickLoading = true;
      // await HTTP_REQUEST()
      this.$globalMessage.show({
        type: 'success',
        content: this.$t('messages.success'),
      });
      this.dialogUpload.clickLoading = false;
      this.dialogUpload.visiable = false;
      this.getData();
    } catch (error) {
      this.dialogUpload.clickLoading = false;
    }
  }
}
</script>
<style lang="scss">
.my-table {
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%;
}
.my-table thead tr:last-child th:last-child {
  /* bg color is important for th; just specify one */
  background-color: #fff;
}
.my-table td:last-child {
  background-color: #fff;
}
.my-table th:last-child,
.my-table td:last-child {
  box-shadow: rgb(0 0 0 / 5%) 0px 20px 27px 0px;
  position: sticky;
  right: 0;
  z-index: 1;
}
</style>
<style lang="scss" scoped>
</style>