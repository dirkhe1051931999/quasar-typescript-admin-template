<template>
  <div>
    <div class="row q-gutter-sm items-center justify-end">
      <q-btn label="update cancel btn label" @click="dialogInstance.changeCancelText('messages.pleaseEnter')" color="primary" no-caps />
      <q-btn label="update confirm btn label" @click="dialogInstance.changeConfirmText('messages.pleaseSelect')" color="primary" no-caps />
      <q-btn label="trigger parent component getData" @click="hanleClickGetData" color="primary" no-caps />
      <q-btn label="global message" @click="handleClickMessage" color="primary" no-caps />
      <q-btn label="change options" @click="handleChangeOptions" color="primary" no-caps />
    </div>
    <q-form ref="formRef" class="row q-col-gutter-x-md q-mt-md">
      <div class="col-6">
        <j-q-form-label label="Normal input" required>
          <j-q-input v-model="dialogParams.params.name" @update:model-value="onNameChange" :rules="dialogParams.rules.required" />
        </j-q-form-label>
      </div>
      <div class="col-6">
        <j-q-form-label label="Single choice, searchable" required>
          <template v-slot:label-hint>
            [this is slot icon
            <q-icon name="question_mark" size="16px" class="q-ml-xs">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" max-width="300px"> 123123123</q-tooltip>
            </q-icon>
            ]
          </template>
          <j-q-select v-model="dialogParams.params.area" :options="dialogParams.areaOptions" filterable :rules="dialogParams.rules.required" />
        </j-q-form-label>
      </div>
      <div class="col-6">
        <j-q-form-label label="Multiple selection, searchable" required>
          <j-q-select
            v-model="dialogParams.params.tags"
            multiple
            use-chips
            filterable
            :filter-fn="tagFilterFn"
            :options="dialogParams.tagsOptions"
            :rules="dialogParams.rules.required"
            ref="TagsRef"
          />
        </j-q-form-label>
      </div>
      <div class="col-12">
        <j-q-form-label label="File Upload" required>
          <j-q-file v-model="dialogParams.params.file" accept=".xls,.xlsx" :beforeHandle="beforeFile" :rules="dialogParams.rules.file" maxlength="1">
            <template #hint>
              <div class="download-btn">
                <span class="btn">Download</span>
              </div>
              <ul class="extra-info">
                <li class="text-grey">
                  <span>this is slot</span>
                </li>
              </ul>
            </template>
          </j-q-file>
        </j-q-form-label>
      </div>
      <div class="col-6">
        <j-q-form-label label="Date" required>
          <j-q-date v-model="dialogParams.params.date" :clearable="true" range :options="dialogParams.dateOptions" :rules="dialogParams.rules.required" />
        </j-q-form-label>
      </div>
      <div class="col-6">
        <j-q-form-label label="Radio" required>
          <j-q-option-group v-model="dialogParams.params.level" :options="dialogParams.levelOptions" inline color="primary" :rules="dialogParams.rules.required" type="radio" />
        </j-q-form-label>
      </div>
      <div class="col-6">
        <j-q-form-label label="Checkbox" required>
          <j-q-option-group
            v-model="dialogParams.params.hobbys"
            :options="dialogParams.hobbyOptions"
            inline
            color="primary"
            :rules="dialogParams.rules.required"
            type="checkbox"
            :disable="disableCheckbox"
          />
        </j-q-form-label>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { getCurrentInstance } from 'vue';
import globalConfirm from 'src/components/j-q-confirm-dialog';
import globalMessage from 'src/components/j-q-message';
import JQInput from 'components/j-q-input/index.vue';
import JQSelect from 'components/j-q-select/index.vue';
import JQFile from 'components/j-q-file/index.vue';
import JQDate from 'components/j-q-date/index.vue';
import JQRadio from 'components/j-q-option-group/index.vue';
import JQOptionGroup from 'components/j-q-option-group/index.vue';
import JQFormLabel from 'components/j-q-form-label/index.vue';
import { cloneDeep } from 'lodash';

@Component({
  name: 'TableAddOrUpdateComponent',
  components: { JQFormLabel, JQOptionGroup, JQRadio, JQDate, JQFile, JQSelect, JQInput },
  emits: ['getData'],
})
export default class TableAddOrUpdateComponent extends Vue {
  @Prop() public dialogInstance: any;
  declare $refs: any;

  get disableCheckbox() {
    return this.dialogParams.params.level === 1;
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public dialogParams = {
    areaOptions: [
      { label: 'Beijing', value: 1 },
      { label: 'Shanghai', value: 2 },
      { label: 'Guangzhou', value: 3 },
      { label: 'Shenzhen', value: 4 },
    ],
    tagsOptions: [
      { label: 'Vue3', value: 'v3' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Quasar', value: 'qs' },
      { label: 'Composition API', value: 'comp' },
      { label: 'Options API', value: 'opt' },
    ],
    dateOptions: (date: any) => {
      const today = new Date();
      const dateValue = new Date(date);
      return dateValue.getTime() > today.getTime();
    },
    levelOptions: [
      { label: 'one', value: 1, checkedIcon: 'check', uncheckedIcon: 'sports_volleyball' },
      { label: 'two', value: 2 },
      { label: 'three', value: 3 },
    ],
    hobbyOptions: [
      { label: 'Basketball', value: 1, checkedIcon: 'check', uncheckedIcon: 'sports_basketball' },
      { label: 'Football', value: 2 },
      { label: 'Tennis', value: 3 },
    ],
    params: {
      name: '',
      area: '',
      tags: [],
      file: [],
      date: '',
      level: void 0,
      hobbys: [],
    },
    rules: {
      required: [
        (val?: any) => {
          const isEmptyArray = Array.isArray(val) && val.length === 0;
          const isFalsey = val === null || val === undefined || val === '';
          return (!isEmptyArray && !isFalsey) || 'Required';
        },
      ],
      file: [(val?: any) => !!val?.length || 'Required'],
    },
  };

  /* event */
  public handleClickCancel() {
    console.log('cancel');
    globalMessage.show({
      type: 'error',
      content: 'just a preset position for listening cancel event :)',
    });
  }

  public hanleClickGetData() {
    this.$emit('getData');
    globalMessage.show({
      type: 'success',
      content: 'trigger parent component getData event',
    });
  }

  public handleClickMessage() {
    globalMessage.show({
      type: 'success',
      content: 'success',
    });
  }

  public onNameChange(val: string) {
    console.log(val);
    const cloneData = cloneDeep(this.$refs.TagsRef.copyOptions);
    const have = cloneData.some((item: any) => item.label.toLowerCase().includes(val?.toLowerCase()));
    if (have && val) {
      this.dialogParams.tagsOptions = cloneData.filter((item: any) => item.label.toLowerCase().includes(val.toLowerCase()));
    } else {
      this.dialogParams.tagsOptions = cloneData;
    }
  }

  public handleChangeOptions() {
    this.dialogParams.areaOptions = this.dialogParams.areaOptions.filter((item) => item.value === 2);
  }

  public tagFilterFn(inputValue: any, callback: any) {
    if (inputValue === '') {
      callback(this.dialogParams.tagsOptions);
    } else {
      const filteredOptions = this.dialogParams.tagsOptions.filter((tag) => tag.label.toLowerCase().includes(inputValue.toLowerCase()));
      callback(filteredOptions);
    }
  }

  public beforeFile(files: File[]) {
    const file = files[0];
    if (2 < file.size / Math.pow(1024, 2)) {
      globalMessage.show({
        content: 'Max file size is 2MB',
        type: 'error',
      });
      return;
    }
    const format = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (['.xls', '.xlsx'].indexOf(format) === -1) {
      globalMessage.show({
        content: 'Unsupported file format',
        type: 'error',
      });
      return;
    }
    return files;
  }

  /* http */
  public async handleClickConfirm() {
    console.log('confirm');
    const valid = await this.$refs.formRef.validate();
    if (valid) {
      const result = await globalConfirm.show({
        title: 'confrim title',
        content: 'dude, this is a confirm',
      });
      if (result) {
        console.log(this.dialogParams.params);
      }
    }
  }
}
</script>

<style scoped></style>