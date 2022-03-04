<template>
  <div>
    <q-banner inline-actions rounded class="bg-blue text-white m-b-20" v-show="banner">
      Encapsulate q-table, traverse the array to render q-table, without writing a bunch of html
      <template v-slot:action>
        <q-btn flat label="close" @click="banner = false" />
      </template>
    </q-banner>
    <div class="query-form-and-action">
      <div class="action">
        <q-btn color="primary" icon="add" label="Add" no-caps class="m-r-15 h-40" @click="handleClickAddSite" />
        <q-btn icon="file_upload" label="Upload" outline color="primary" no-caps class="h-40" @click="handleClickUploadSite" />
      </div>
      <q-form class="query" ref="queryFrom">
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
        <q-btn color="primary" icon="search" :label="$t('action.search')" no-caps class="m-r-15 h-40" :loading="queryParams.queryLoading" />
        <q-btn icon="restart_alt" :label="$t('action.reset')" outline color="primary" no-caps class="h-40" :loading="queryParams.resetLoading" />
      </q-form>
    </div>
    <div class="q-table-container">
      <q-table
        :columns="tableParams.column"
        :data="tableParams.data"
        :loading="tableParams.loading"
        :pagination="tableParams.pagination"
        hide-pagination
        :no-data-label="$t(`tip.noData`)"
        class="my-table"
        :selected-rows-label="(numberOfRows) => `select ${numberOfRows} ${$t(`table.per`)}`"
        selection="multiple"
        :selected.sync="tableParams.selected"
        row-key="a"
      >
        <template v-slot:header-selection="props">
          <q-checkbox color="primary" v-model="props.selected" />
        </template>
        <template v-slot:body-selection="props">
          <q-checkbox color="primary" v-model="props.selected" />
        </template>
        <template v-slot:body-cell-id="props">
          <q-td class="text-left">
            <span>{{ tableParams.data.indexOf(props.row) + 1 }}</span>
          </q-td>
        </template>
        <!-- detail -->
        <template v-slot:body-cell-a="props">
          <q-td class="text-left">
            <span class="link-type" @click="handlerClickDetail">{{ props.row.a }}</span>
          </q-td>
        </template>
        <!--      loading-->
        <template v-slot:loading>
          <q-inner-loading color="primary" showing />
        </template>
        <!--      actions-->
        <template v-slot:body-cell-action="props">
          <q-td class="text-left">
            <span class="in-table-link-button" @click="handlerClickUpdate(props.row)">{{ $t(`action.update`) }}</span>
            <span class="in-table-delete-button m-l-10" @click="handlerClickDelete(props.row)">{{ $t(`action.delete`) }}</span>
          </q-td>
        </template>
      </q-table>
    </div>
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
    <q-dialog v-model="dialogAddUpdateDetailParams.visiable" persistent @before-hide="monitorDialogAddUpdateDetailHide">
      <q-card class="dialog-input-form">
        <q-card-section class="flex a-center j-between q-pb-none">
          <div class="text-h6 bold">{{ dialogAddUpdateDetailParams.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section :class="dialogAddUpdateDetailParams.dialogType !== 'detail' ? 'q-pb-none' : 'p-b-30'">
          <q-form :ref="dialogAddUpdateDetailParams.id">
            <div v-for="(fahter, i) in dialogAddUpdateDetailParams.input" :key="i">
              <div class="block-title">{{ fahter[0] }}</div>
              <div class="input">
                <div v-for="(item, index) in fahter[1]" :key="index" class="input-item">
                  <q-input
                    v-if="item.type === 'text'"
                    v-model.trim="dialogAddUpdateDetailParams.params[item.id]"
                    :class="[
                      {
                        'm-b-30': !item.rules || (item.rules && !item.rules.length),
                        'm-b-15': item.rules && item.rules.length,
                      },
                      item.class,
                    ]"
                    :label="
                      dialogAddUpdateDetailParams.dialogType !== 'detail' && item.requiredPlaceholder ? item.requiredPlaceholder : item.placeholder
                    "
                    :rules="item.rules || []"
                    :outlined="dialogAddUpdateDetailParams.dialogType !== 'detail'"
                    :type="item.inputType || 'text'"
                    :rows="item.rows || 1"
                    :disable="item.disable"
                    :readonly="dialogAddUpdateDetailParams.dialogType === 'detail' || item.readonly"
                    :ref="dialogAddUpdateDetailParams.id + '_' + item.id"
                    @input="monitorDialogInputChange(item.id, dialogAddUpdateDetailParams.id)"
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    clearable
                    dense
                    :spellcheck="false"
                  >
                  </q-input>
                  <q-select
                    v-if="item.type === 'select'"
                    v-model="dialogAddUpdateDetailParams.params[item.id]"
                    :class="[
                      {
                        'm-b-30': !item.rules || (item.rules && !item.rules.length),
                        'm-b-15': item.rules && item.rules.length,
                      },
                      item.class,
                    ]"
                    :options="item.selectOption"
                    :label="
                      dialogAddUpdateDetailParams.dialogType !== 'detail' && item.requiredPlaceholder ? item.requiredPlaceholder : item.placeholder
                    "
                    :rules="item.rules || []"
                    :outlined="dialogAddUpdateDetailParams.dialogType !== 'detail'"
                    :disable="item.disable"
                    :readonly="dialogAddUpdateDetailParams.dialogType === 'detail' || item.readonly"
                    :ref="dialogAddUpdateDetailParams.id + '_' + item.id"
                    @input="monitorDialogInputChange(item.id, dialogAddUpdateDetailParams.id)"
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    :spellcheck="false"
                    clearable
                    dense
                    options-dense
                    emit-value
                    map-options
                  />
                  <q-input
                    v-if="item.type === 'date'"
                    v-model="dialogAddUpdateDetailParams.params[item.id]"
                    :label="
                      dialogAddUpdateDetailParams.dialogType !== 'detail' && item.requiredPlaceholder ? item.requiredPlaceholder : item.placeholder
                    "
                    :rules="item.rules || []"
                    :outlined="dialogAddUpdateDetailParams.dialogType !== 'detail'"
                    :disable="item.disable"
                    :readonly="dialogAddUpdateDetailParams.dialogType === 'detail' || item.readonly"
                    :ref="dialogAddUpdateDetailParams.id + '_' + item.id"
                    autocapitalize="off"
                    autocomplete="new-password"
                    autocorrect="off"
                    :spellcheck="false"
                    clearable
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="event"
                        :class="{ 'cursor-pointer': !item.disableSelectDate && dialogAddUpdateDetailParams.dialogType !== 'detail' }"
                      >
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                          v-if="!item.disableSelectDate && dialogAddUpdateDetailParams.dialogType !== 'detail'"
                        >
                          <q-date
                            v-model="dialogAddUpdateDetailParams.params[item.id]"
                            mask="YYYY-MM-DD HH:mm:ss"
                            @input="monitorDialogInputChange(item.id, dialogAddUpdateDetailParams.id)"
                          >
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup :label="$t(`action.confirm`)" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon
                        style="color: rgba(0, 0, 0, 0.32)"
                        name="cancel"
                        v-show="dialogAddUpdateDetailParams.params[item.id]"
                        class="cursor-pointer"
                        @click.prevent.stop="dialogAddUpdateDetailParams.params[item.id] = ''"
                        v-if="!item.disableSelectDate && item.readonly && dialogAddUpdateDetailParams.dialogType !== 'detail'"
                      ></q-icon>
                      <q-icon
                        name="access_time"
                        class="cursor-pointer"
                        v-if="!item.disableSelectDate && dialogAddUpdateDetailParams.dialogType !== 'detail'"
                      >
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time
                            v-model="dialogAddUpdateDetailParams.params[item.id]"
                            mask="YYYY-MM-DD HH:mm:ss"
                            format24h
                            with-seconds
                            @input="monitorDialogInputChange(item.id, dialogAddUpdateDetailParams.id)"
                          >
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup :label="$t(`action.confirm`)" color="primary" flat />
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
        <q-card-section align="right" v-if="dialogAddUpdateDetailParams.dialogType === 'add' || dialogAddUpdateDetailParams.dialogType === 'update'">
          <q-btn
            :label="$t(`action.cancel`)"
            v-close-popup
            :disable="dialogAddUpdateDetailParams.clickLoading"
            outline
            color="primary"
            class="w-80"
          />
          <q-btn
            :label="$t(`action.confirm`)"
            color="primary"
            @click="dialogAddUpdateDetailParams.dialogType === 'add' ? handlerClickDialogConfirmAddButton() : handlerClickDialogConfirmUpdateButton()"
            class="w-80 m-l-20"
            :loading="dialogAddUpdateDetailParams.clickLoading"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { defaultFill } from '@/utils';
const CONST_PARAMS = {
  query: { siteNumber: '', gatewayNumber: '', constructionWorker: '' },
  dialog_add_update_detail: { a: '', b: '', c: '', d: '', e: '' },
};
@Component({
  name: 'siteManagement-index',
})
export default class extends Vue {
  /**instance */
  $refs: any;
  mounted() {}
  /**params */
  private banner = true;
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
        id: 'siteNumber',
      },
      {
        placeholder: 'Input2',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        selectOption: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        id: 'gatewayNumber',
      },
      {
        placeholder: 'Input3',
        type: 'text',
        class: 'w-250 m-r-15 m-b-15',
        id: 'constructionWorker',
      },
    ],
  };
  private tableParams = {
    selected: [],
    loading: false,
    data: [
      {
        a: 'just',
        b: 'do',
        c: 'something',
        d: 'what',
        e: 'you',
        f: 'like',
        g: 'that',
        h: 'is',
        i: 'right',
      },
      {
        a: 'just2',
        b: 'do2',
        c: 'something2',
        d: 'what2',
        e: 'you2',
        f: 'like2',
        g: 'that2',
        h: 'is2',
        i: 'right2',
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
        label: 'Table1',
        align: 'left',
      },
      {
        name: 'a',
        label: 'Table2',
        align: 'left',
        required: true,
        field: (row: any) => row.a,
        format: (val: any) => `${defaultFill(val)}`,
      },
      {
        name: 'b',
        label: 'Table3',
        field: (row: any) => row.b,
        format: (val: any) => `${defaultFill(val)}`,
        align: 'left',
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
      { name: 'action', label: this.$t(`table.action`), field: 'action', align: 'left' },
    ],
  };
  private dialogAddUpdateDetailParams = {
    id: 'dialog_add_update_detail',
    dialogType: 'add',
    clickLoading: false,
    getDataLoading: false,
    visiable: false,
    title: '',
    params: cloneDeep(CONST_PARAMS.dialog_add_update_detail),
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
              (val: string) => (val && val.length > 0) || `please enter password`,
              (val: string) => (val && val.length >= 8 && val.length <= 28) || `password length is 8-28`,
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
            rules: [(val: string) => (val && val.length > 0) || `please select option`],
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
                return +new Date(val) < +new Date(this.dialogAddUpdateDetailParams.params.e) || 'start time < end time';
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
                return +new Date(val) > +new Date(this.dialogAddUpdateDetailParams.params.d) || 'start time < end time';
              },
            ],
          },
        ],
      ],
    ],
  };
  /**event */
  private paginationInput() {
    if (this.tableParams.pagination.rowsNumber / this.tableParams.pagination.rowsPerPage < 1) return;
    this.getData();
  }
  private handleClickAddSite() {
    this.dialogAddUpdateDetailParams.visiable = true;
    this.dialogAddUpdateDetailParams.dialogType = 'add';
    this.dialogAddUpdateDetailParams.title = 'add';
  }
  private handlerClickDetail() {
    this.dialogAddUpdateDetailParams.visiable = true;
    this.dialogAddUpdateDetailParams.dialogType = 'detail';
    this.dialogAddUpdateDetailParams.title = 'detail';
  }
  private handlerClickUpdate(row: any) {
    this.dialogAddUpdateDetailParams.visiable = true;
    this.dialogAddUpdateDetailParams.dialogType = 'update';
    this.dialogAddUpdateDetailParams.title = 'update';
  }
  private handleClickUploadSite() {}
  // 移除汉字
  private _findDialogInputIndex(id: string) {
    const input = this.dialogAddUpdateDetailParams.input;
    const index = input.findIndex((item: any) => {
      return item.id === id;
    });
    return index;
  }
  // 监听dialog input input事件
  private monitorDialogInputChange(input_id: any, formId: any) {
    if (input_id === 'd' || input_id === 'e') {
      if (
        this.$refs[this.dialogAddUpdateDetailParams.id + '_d'] &&
        this.$refs[this.dialogAddUpdateDetailParams.id + '_d'][0] &&
        this.$refs[this.dialogAddUpdateDetailParams.id + '_e'] &&
        this.$refs[this.dialogAddUpdateDetailParams.id + '_e'][0]
      ) {
        this.$refs[this.dialogAddUpdateDetailParams.id + '_d'][0].validate();
        this.$refs[this.dialogAddUpdateDetailParams.id + '_e'][0].validate();
      }
    }

    if (input_id === 'password') {
      // this.dialogAddUpdateDetailParams.input.password = this.dialogAddUpdateDetailParams.params.password.replace(/[\u4e00-\u9fa5]/gi, '');
      // this.$refs.dialogRePassword[0].validate();
    }
    if (input_id === 'rePassword') {
      // this.dialogAddUpdateDetailParams.params.rePassword = this.dialogAddUpdateDetailParams.params.rePassword.replace(/[\u4e00-\u9fa5]/gi, '');
      // this.$refs.dialogPassword[0].validate();
    }
  }
  // 监听dialog隐藏
  private monitorDialogAddUpdateDetailHide() {
    this.dialogAddUpdateDetailParams.params = cloneDeep(CONST_PARAMS[this.dialogAddUpdateDetailParams.id]);
    this.$refs[this.dialogAddUpdateDetailParams.id].resetValidation();
  }
  /**http */
  private getData() {}
  // 确定新增
  private handlerClickDialogConfirmAddButton() {
    this.$refs[this.dialogAddUpdateDetailParams.id].validate().then(async (valid: boolean) => {
      if (valid) {
        this.$q
          .dialog({
            title: this.$t('messages.tishi') as string,
            message: this.$t('messages.addConfirm') as string,
          })
          .onOk(() => {
            console.log('OK');
          });
      }
    });
  }
  // 确定更新
  private handlerClickDialogConfirmUpdateButton() {
    this.$refs[this.dialogAddUpdateDetailParams.id].validate().then(async (valid: boolean) => {
      if (valid) {
        this.$q
          .dialog({
            title: this.$t('messages.tishi') as string,
            message: this.$t('messages.updateConfirm') as string,
          })
          .onOk(() => {
            // console.log('OK')
          });
      }
    });
  }
  private handlerClickDelete(row: any) {
    this.$q
      .dialog({
        title: this.$t('messages.tishi') as string,
        message: this.$t('messages.deleteConfirm') as string,
      })
      .onOk(() => {
        // console.log('OK')
      });
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
.query-form-and-action {
  background: $white;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 25px 20px 20px;
  margin-bottom: 30px;
  .action {
    margin-bottom: 18px;
  }
  .query {
    display: flex;
    align-items: flex-start;
  }
}
.q-table-container {
  background: $white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
}
.dialog-input-form {
  padding: 10px;
  width: 50vw;
  max-width: 80vw;
  max-height: 40vw;
  &::-webkit-scrollbar {
    width: 12px;
    height: 10px;
    max-height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
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
      background: $blue;
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
</style>