<template>
  <div>
    <div class="query-form-and-action">
      <div class="action">
        <q-btn
          color="primary"
          icon="add"
          label="Add"
          no-caps
          class="m-r-15 h-40"
          @click="handleClickAdd"
        />
        <q-btn
          icon="file_upload"
          label="Upload"
          outline
          color="primary"
          no-caps
          class="h-40"
          @click="handleClickUpload"
        />
      </div>
      <q-form ref="queryFrom">
        <div class="row">
          <div class="row items-start col-10">
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
                map-options
              />
            </div>
          </div>
          <div class="col-2">
            <q-btn
              color="primary"
              icon="search"
              :label="$t('action.search')"
              no-caps
              class="m-r-15 h-40"
              :loading="queryParams.queryLoading"
              @click="handleQuery"
            />
            <q-btn
              icon="restart_alt"
              :label="$t('action.reset')"
              outline
              color="primary"
              no-caps
              class="h-40"
              :loading="queryParams.resetLoading"
              @click="handleResetQuery"
            />
          </div>
        </div>
      </q-form>
    </div>
    <q-table
      flat
      bordered
      :columns="tableParams.column"
      :rows="[]"
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
          <!-- ID -->
          <q-td class="text-left">
            <span>{{ tableParams.data.indexOf(props.row) + 1 }}</span>
          </q-td>
          <!-- name -->
          <q-td class="text-left">
            <span class="link-type" @click="handlerClickDetail(props.row)">{{
              props.row.name
            }}</span>
          </q-td>
          <!-- other -->
          <q-td
            v-for="col in props.cols.filter((item) => {
              return !item.inSlot;
            })"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <!-- action -->
          <q-td class="text-left">
            <span
              class="in-table-link-button"
              @click="handlerClickUpdate(props.row)"
              >{{ $t(`action.update`) }}</span
            >
            <span
              class="in-table-delete-button m-l-10"
              @click="handlerClickDelete(props.row)"
              >{{ $t(`action.delete`) }}</span
            >
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <!-- expand detail -->
          <q-td colspan="100%">
            <div class="text-left">Name:{{ props.row.name }}</div>
            <div>
              this is expand detail , it maybe json string or other special text
            </div>
          </q-td>
        </q-tr>
      </template>
      <!--      loading-->
      <template v-slot:loading>
        <q-inner-loading color="primary" showing />
      </template>
    </q-table>
    <div
      class="row items-center justify-end q-mt-md"
      v-if="tableParams.pagination.rowsNumber"
    >
      <p class="m-r-10">Total {{ tableParams.pagination.rowsNumber }}</p>
      <q-pagination
        v-model="tableParams.pagination.page"
        :input="false"
        :max-pages="6"
        :max="
          tableParams.pagination.rowsNumber /
            tableParams.pagination.rowsPerPage <
          1
            ? 1
            : Math.ceil(
                tableParams.pagination.rowsNumber /
                  tableParams.pagination.rowsPerPage
              )
        "
        @update:model-value="paginationInput"
        ellipses
        outline
        boundary-numbers
      ></q-pagination>
    </div>
    <q-dialog
      v-model="dialogAddUpdateParams.visiable"
      persistent
      @before-hide="monitorDialogAddUpdateHide"
    >
      <q-card class="dialog-input-form">
        <q-card-section class="row items-center justify-between p-b-20">
          <div class="text-h6 bold">{{ dialogAddUpdateParams.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="p-b-30 scroll" style="max-height: 50vh">
          <q-form :ref="dialogAddUpdateParams.id">
            <div v-for="(fahter, i) in dialogAddUpdateParams.input" :key="i">
              <div class="block-title">{{ fahter[0] }}</div>
              <div class="input">
                <div
                  v-for="(item, index) in fahter[1]"
                  :key="index"
                  class="input-item"
                >
                  <q-input
                    v-if="item.type === 'text'"
                    v-model.trim="dialogAddUpdateParams.params[item.id]"
                    :class="[
                      {
                        'm-b-30':
                          !item.rules || (item.rules && !item.rules.length),
                        'm-b-15': item.rules && item.rules.length,
                      },
                      item.class,
                    ]"
                    :label="
                      item.requiredPlaceholder
                        ? item.requiredPlaceholder
                        : item.placeholder
                    "
                    :rules="item.rules || []"
                    :spellcheck="false"
                    :type="item.inputType || 'text'"
                    :rows="item.rows || 1"
                    :disable="item.disable"
                    :readonly="item.readonly"
                    :ref="dialogAddUpdateParams.id + '_' + item.id"
                    @update:model-value="
                      monitorDialogInputChange(
                        item.id,
                        dialogAddUpdateParams.id
                      )
                    "
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    clearable
                    outlined
                    dense
                  >
                  </q-input>
                  <q-select
                    v-if="item.type === 'select'"
                    v-model="dialogAddUpdateParams.params[item.id]"
                    :class="[
                      {
                        'm-b-30':
                          !item.rules || (item.rules && !item.rules.length),
                        'm-b-15': item.rules && item.rules.length,
                      },
                      item.class,
                    ]"
                    :options="item.selectOption"
                    :label="
                      item.requiredPlaceholder
                        ? item.requiredPlaceholder
                        : item.placeholder
                    "
                    :rules="item.rules || []"
                    :disable="item.disable"
                    :readonly="item.readonly"
                    :ref="dialogAddUpdateParams.id + '_' + item.id"
                    @update:model-value="
                      monitorDialogInputChange(
                        item.id,
                        dialogAddUpdateParams.id
                      )
                    "
                    :spellcheck="false"
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    clearable
                    dense
                    options-dense
                    emit-value
                    map-options
                    outlined
                  />
                  <q-input
                    v-if="item.type === 'date'"
                    v-model="dialogAddUpdateParams.params[item.id]"
                    :label="
                      item.requiredPlaceholder
                        ? item.requiredPlaceholder
                        : item.placeholder
                    "
                    :rules="item.rules || []"
                    :disable="item.disable"
                    :readonly="item.readonly"
                    :ref="dialogAddUpdateParams.id + '_' + item.id"
                    :spellcheck="false"
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    clearable
                    outlined
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="event"
                        :class="{ 'cursor-pointer': !item.disableSelectDate }"
                      >
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          v-if="!item.disableSelectDate"
                        >
                          <q-date
                            v-model="dialogAddUpdateParams.params[item.id]"
                            mask="YYYY-MM-DD HH:mm:ss"
                            @update:model-value="
                              monitorDialogInputChange(
                                item.id,
                                dialogAddUpdateParams.id
                              )
                            "
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                :label="$t(`action.confirm`)"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon
                        style="color: rgba(0, 0, 0, 0.32)"
                        name="cancel"
                        v-show="dialogAddUpdateParams.params[item.id]"
                        class="cursor-pointer"
                        @click.prevent.stop="
                          dialogAddUpdateParams.params[item.id] = ''
                        "
                        v-if="!item.disableSelectDate && item.readonly"
                      ></q-icon>
                      <q-icon
                        name="access_time"
                        class="cursor-pointer"
                        v-if="!item.disableSelectDate"
                      >
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="dialogAddUpdateParams.params[item.id]"
                            mask="YYYY-MM-DD HH:mm:ss"
                            format24h
                            with-seconds
                            @update:model-value="
                              monitorDialogInputChange(
                                item.id,
                                dialogAddUpdateParams.id
                              )
                            "
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                :label="$t(`action.confirm`)"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-separator />
        <q-card-section
          align="right"
          v-if="
            dialogAddUpdateParams.dialogType === 'add' ||
            dialogAddUpdateParams.dialogType === 'update'
          "
        >
          <q-btn
            :label="$t(`action.cancel`)"
            v-close-popup
            :disable="dialogAddUpdateParams.clickLoading"
            outline
            color="primary"
            class="w-80"
          />
          <q-btn
            :label="$t(`action.confirm`)"
            color="primary"
            @click="
              dialogAddUpdateParams.dialogType === 'add'
                ? handlerClickDialogConfirmAddButton()
                : handlerClickDialogConfirmUpdateButton()
            "
            class="w-80 m-l-20"
            :loading="dialogAddUpdateParams.clickLoading"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogUpload.visiable"
      persistent
      @before-hide="monitorDialogUploadHide"
    >
      <q-card class="dialog-upload-form">
        <q-card-section class="row items-center justify-between p-b-20">
          <div class="text-h6 bold">{{ dialogUpload.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section
          q-card-section
          class="p-b-30 scroll container-wrap"
          style="max-height: 50vh"
        >
          <input
            type="file"
            class="hide"
            :ref="dialogUpload.id"
            accept=".xls"
            :draggable="false"
            @change="uploadFileSuccess"
          />
          <div class="title">Click to upload</div>
          <div class="container">
            <div class="center" @click="handleClickUploadFile">
              <img src="~assets/inbox.png" alt />
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
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn
            :label="$t(`action.cancel`)"
            v-close-popup
            :disable="dialogUpload.clickLoading"
            outline
            color="primary"
            class="w-80"
          />
          <q-btn
            :label="$t(`action.confirm`)"
            color="primary"
            @click="hanleCLickUploadConfirm()"
            class="w-80 m-l-20"
            :loading="dialogUpload.clickLoading"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogDetailParams.visiable" persistent>
      <q-card class="dialog-input-form">
        <q-card-section class="row items-center justify-between p-b-20">
          <div class="text-h6 bold">{{ dialogDetailParams.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section
          class="p-t-10 p-l-0 p-r-0 scroll"
          style="max-height: 50vh"
        >
          <q-list class="input">
            <q-item
              v-for="(item, index) in dialogDetailParams.data"
              :key="index"
              class="input-item"
              v-ripple
              clickable
            >
              <q-item-section>
                <q-item-label caption>{{ item.label }}：</q-item-label>
                <q-item-label :class="item.class">{{
                  item.value
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { defaultFill } from 'src/utils/tools';
const CONST_PARAMS: any = {
  query: { a: '', b: '', c: '' },
  dialog_add_update: { a: '', b: '', c: '', d: '', e: '' },
};
@Component({
  name: 'myComponentTableBeta',
})
export default class myComponentTableBeta extends Vue {
  /**instance */
  declare $refs: any;
  /**params */
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
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
      },
      {
        placeholder: 'Input1',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'a',
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
      [
        'text 1',
        [
          {
            placeholder: 'username',
            type: 'text',
            class: '',
            inputType: 'text',
            id: 'a',
            readonly: false,
            disable: false,
            rules: [],
          },
          {
            placeholder: 'new password',
            requiredPlaceholder: '* new password',
            type: 'text',
            class: 'input-password',
            inputType: 'text',
            id: 'b',
            readonly: false,
            disable: false,
            rules: [
              (val: string) =>
                (val && val.length > 0) || 'please enter password',
              (val: string) =>
                (val && val.length >= 8 && val.length <= 28) ||
                'password length is 8-28',
            ],
          },
          {
            placeholder: 'select',
            requiredPlaceholder: '* select',
            type: 'select',
            class: '',
            selectOption: [
              {
                label: 'option1',
                value: '1',
              },
              {
                label: 'option2',
                value: '2',
              },
            ],
            id: 'c',
            readonly: false,
            disable: false,
            rules: [
              (val: string) =>
                (val && val.length > 0) || 'please select option',
            ],
          },
        ],
      ],
      [
        'text 2',
        [
          {
            placeholder: 'start time',
            requiredPlaceholder: '* start time',
            type: 'date',
            class: '',
            id: 'd',
            readonly: true,
            disable: false,
            disableSelectDate: false,
            rules: [
              (val: string): any => {
                return (
                  +new Date(val) <
                    +new Date(this.dialogAddUpdateParams.params.e) ||
                  'start time < end time'
                );
              },
            ],
          },
          {
            placeholder: 'end time',
            requiredPlaceholder: '* end time',
            type: 'date',
            class: '',
            id: 'e',
            readonly: true,
            disable: false,
            disableSelectDate: false,
            rules: [
              (val: string): any => {
                return (
                  +new Date(val) >
                    +new Date(this.dialogAddUpdateParams.params.d) ||
                  'start time < end time'
                );
              },
            ],
          },
        ],
      ],
    ],
  };
  private dialogUpload = {
    id: 'dialog_upload_file',
    clickLoading: false,
    visiable: false,
    title: '',
    params: { file: '', fileName: '' },
  };
  private dialogDetailParams = {
    title: 'Detail',
    visiable: false,
    data: [
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
    if (
      this.tableParams.pagination.rowsNumber /
        this.tableParams.pagination.rowsPerPage <
      1
    )
      return;
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
    this.dialogAddUpdateParams.title = 'add';
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
          return 'text-red';
        default:
          return '';
      }
    };
    const arr = cloneDeep(this.dialogDetailParams.data);
    for (let item of arr) {
      for (let key in row) {
        if (item.id === key) {
          item.value = getValue(row, key);
          item.class = getClass(row, key);
        }
      }
    }
    this.dialogDetailParams.data = arr;
    this.dialogDetailParams.visiable = true;
  }
  private handlerClickUpdate(row: any) {
    this.dialogAddUpdateParams.visiable = true;
    this.dialogAddUpdateParams.dialogType = 'update';
    this.dialogAddUpdateParams.title = 'update';
  }
  private handleClickUpload() {
    this.dialogUpload.visiable = true;
    this.dialogUpload.title = 'Upload';
    this.$nextTick(() => {
      this.$refs[this.dialogUpload.id].type = 'text';
      this.dialogUpload.params.fileName = '';
      this.dialogUpload.params.file = '';
      setTimeout(() => {
        this.$refs[this.dialogUpload.id].type = 'file';
        this.$refs[this.dialogUpload.id].value = '';
      }, 100);
    });
  }
  private handleClickUploadFile() {
    this.$refs[this.dialogUpload.id].click();
  }
  private uploadFileSuccess() {
    const files = this.$refs[this.dialogUpload.id].files;
    let postFiles = Array.prototype.slice.call(files);
    postFiles = postFiles.slice(0, 1);
    postFiles.forEach((rawFile: any) => {
      this.dialogUpload.params.fileName = rawFile.name;
      this.dialogUpload.params.file = rawFile;
    });
  }
  private _findDialogInputIndex(id: string) {
    const input = this.dialogAddUpdateParams.input;
    const index = input.findIndex((item: any) => {
      return item.id === id;
    });
    return index;
  }
  // 监听dialog input input事件
  private monitorDialogInputChange(input_id: any, formId: any) {
    if (input_id === 'd' || input_id === 'e') {
      if (
        this.$refs[`${this.dialogAddUpdateParams.id}_d`] &&
        this.$refs[`${this.dialogAddUpdateParams.id}_d`][0] &&
        this.$refs[`${this.dialogAddUpdateParams.id}_e`] &&
        this.$refs[`${this.dialogAddUpdateParams.id}_e`][0]
      ) {
        this.$refs[`${this.dialogAddUpdateParams.id}_d`][0].validate();
        this.$refs[`${this.dialogAddUpdateParams.id}_e`][0].validate();
      }
    }

    if (input_id === 'password') {
      // this.dialogAddUpdateParams.input.password = this.dialogAddUpdateParams.params.password.replace(/[\u4e00-\u9fa5]/gi, '');
      // this.$refs.dialogRePassword[0].validate();
    }
    if (input_id === 'rePassword') {
      // this.dialogAddUpdateParams.params.rePassword = this.dialogAddUpdateParams.params.rePassword.replace(/[\u4e00-\u9fa5]/gi, '');
      // this.$refs.dialogPassword[0].validate();
    }
  }
  // 监听dialog隐藏
  private monitorDialogAddUpdateHide() {
    this.dialogAddUpdateParams.params = cloneDeep(
      CONST_PARAMS[this.dialogAddUpdateParams.id]
    );
    this.$refs[this.dialogAddUpdateParams.id].resetValidation();
  }
  private monitorDialogUploadHide() {
    this.dialogUpload.params.fileName = '';
    this.dialogUpload.params.file = '';
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
  // 确定新增
  private handlerClickDialogConfirmAddButton() {
    this.$refs[this.dialogAddUpdateParams.id]
      .validate()
      .then(async (valid: boolean) => {
        if (valid) {
          this.$q
            .dialog({
              title: this.$t('messages.tishi') as string,
              message: this.$t('messages.addConfirm') as string,
              cancel: true,
              persistent: true,
            })
            .onOk(async () => {
              try {
                this.dialogAddUpdateParams.clickLoading = true;
                // await HTTP_REQUEST()
                this.dialogAddUpdateParams.clickLoading = false;
                this.dialogAddUpdateParams.visiable = false;
                this.$q.notify({
                  message: 'Add success',
                  color: 'primary',
                  multiLine: true,
                  icon: 'mood',
                  actions: [
                    {
                      label: 'Close',
                      color: 'white',
                    },
                  ],
                });
                this.getData();
              } catch (error) {
                this.dialogAddUpdateParams.clickLoading = false;
              }
            });
        }
      });
  }
  // 确定更新
  private handlerClickDialogConfirmUpdateButton() {
    this.$refs[this.dialogAddUpdateParams.id]
      .validate()
      .then(async (valid: boolean) => {
        if (valid) {
          this.$q
            .dialog({
              title: this.$t('messages.tishi') as string,
              message: this.$t('messages.updateConfirm') as string,
              cancel: true,
              persistent: true,
            })
            .onOk(() => {
              try {
                this.dialogAddUpdateParams.clickLoading = true;
                // await HTTP_REQUEST()
                this.dialogAddUpdateParams.clickLoading = false;
                this.dialogAddUpdateParams.visiable = false;
                this.$q.notify({
                  message: 'Update success',
                  color: 'primary',
                  multiLine: true,
                  icon: 'mood',
                  actions: [
                    {
                      label: 'Close',
                      color: 'white',
                    },
                  ],
                });
                this.getData();
              } catch (error) {
                this.dialogAddUpdateParams.clickLoading = false;
              }
            });
        }
      });
  }
  private handlerClickDelete(row: any) {
    this.$q
      .dialog({
        title: this.$t('messages.tishi') as string,
        message: this.$t('messages.deleteConfirm') as string,
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        if (
          this.tableParams.data.length === 1 &&
          this.tableParams.pagination.page > 1
        ) {
          this.tableParams.pagination.page--;
        }
        try {
          // await HTTP_REQUEST()
          this.$q.notify({
            message: 'Delete success',
            color: 'primary',
            multiLine: true,
            icon: 'mood',
            actions: [
              {
                label: 'Close',
                color: 'white',
              },
            ],
          });
          this.getData();
        } catch (error) {}
        // console.log('OK')
      });
  }
  private hanleCLickUploadConfirm() {
    try {
      const form = new FormData();
      form.append('file', this.dialogUpload.params.file);
      this.dialogUpload.clickLoading = true;
      // await HTTP_REQUEST()
      this.$q.notify({
        message: 'Upload success',
        color: 'primary',
        multiLine: true,
        icon: 'mood',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
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
// .my-table {
//   /* specifying max-width so the example can
//     highlight the sticky column on any browser window */
//   max-width: 100%;
// }
// .my-table thead tr:first-child th:first-child {
//   /* bg color is important for th; just specify one */
//   background-color: #fff;
// }
// .my-table td:first-child {
//   background-color: #f3f3f3;
// }
// .my-table th:first-child,
// .my-table td:first-child {
//   position: sticky;
//   left: 0;
//   z-index: 1;
// }
</style>
<style lang="scss" scoped>
.dialog-input-form {
  width: 50vw;
  max-width: 80vw;
  &::-webkit-scrollbar {
    display: none;
  }
  .block-title {
    font-size: 14px;
    color: #8c8c8c;
    padding-top: 10px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    &::before {
      content: '';
      width: 4px;
      height: 15px;
      background: var(--q-color-primary);
      margin-right: 10px;
      border-radius: 2px;
    }
  }
  .input {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .input-item {
      width: 49%;
    }
  }
}
.dialog-upload-form {
  width: 25vw;
  max-width: 40vw;
  &::-webkit-scrollbar {
    display: none;
  }
  .container-wrap {
    .title {
      font-size: 14px;
      color: #8c8c8c;
      padding-bottom: 10px;
    }
    .container {
      height: 195px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      border: 1px dashed rgba(0, 0, 0, 0.15);
      position: relative;
      .center {
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        cursor: pointer;
        img {
          width: 48px;
          height: 48px;
        }
        .click {
          color: #262626;
          font-size: 16px;
          padding-top: 20px;
        }
        .format {
          color: #8c8c8c;
          font-size: 12px;
          padding-top: 5px;
        }
        .fileName {
          color: #8c8c8c;
          font-size: 12px;
          padding-top: 10px;
        }
      }
    }
    .upload-limit {
      padding-top: 10px;
      font-size: 14px;
      color: #595959;
    }
  }
}
</style>