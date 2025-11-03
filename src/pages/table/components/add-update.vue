<template>
  <div>
    TableAddOrUpdateComponent
    <div class="row q-gutter-sm items-center justify-end">
      <q-btn label="修改cancel标题" @click="dialogInstance.changeCancelText('cancel')" color="primary" no-caps />
      <q-btn label="修改confirm标题" @click="dialogInstance.changeConfirmText('confirm')" color="primary" no-caps />
      <q-btn label="触发父级的事件" @click="hanleClickGetData" color="primary" no-caps />
      <q-btn label="global message" @click="handleClickMessage" color="primary" no-caps />
    </div>
    <q-form ref="formRef">
      <j-q-form-label label="Normal input" required>
        <j-q-input v-model="dialogParams.params.name" @update:model-value="onNameChange" :rules="dialogParams.rules.required" />
      </j-q-form-label>
      <p>Single choice, searchable</p>
      <j-q-select v-model="dialogParams.params.area" :options="dialogParams.areaOptions" filterable />
      <p>Multiple selection, searchable</p>
      <JQSelect v-model="dialogParams.params.tags" multiple use-chips filterable :filter-fn="tagFilterFn" :options="dialogParams.tagsOptions" />
      <p>File Upload</p>
      <j-q-file v-model="dialogParams.params.file" accept=".xls,.xlsx" :beforeHandle="beforeFile" :rules="dialogParams.rules.file" maxlength="1">
        <template #hint>
          <ul class="pl-4">
            <li class="list-disc">
              <a class="link-type">download</a>
            </li>
            <li class="list-disc">
              <span>123123</span>
            </li>
          </ul>
        </template>
      </j-q-file>
      <p>date</p>
      <j-q-date v-model="dialogParams.params.date" :clearable="true" range :options="dialogParams.dateOptions" />
      <p>radio</p>
      <j-q-option-group v-model="dialogParams.params.level" :options="dialogParams.levelOptions" inline color="primary" :rules="dialogParams.rules.required" type="radio" />
      <p>checkbox</p>
      <j-q-option-group v-model="dialogParams.params.hobbys" :options="dialogParams.hobbyOptions" inline color="primary" :rules="dialogParams.rules.required" type="checkbox" />
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
      <p class="fs-32">checkbox</p>
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

@Component({
  name: 'TableAddOrUpdateComponent',
  components: { JQOptionGroup, JQRadio, JQDate, JQFile, JQSelect, JQInput },
  emits: ['getData'],
})
export default class TableAddOrUpdateComponent extends Vue {
  @Prop() public dialogInstance: any;
  declare $refs: any;

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public dialogParams = {
    areaOptions: [
      { label: '北京', value: 1 },
      { label: '上海', value: 2 },
      { label: '广州', value: 3 },
      { label: '深圳', value: 4 },
    ],
    tagsOptions: [
      { label: 'Vue3', value: 'v3' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Quasar', value: 'qs' },
      { label: 'Composition API', value: 'comp' },
      { label: '前端框架', value: 'fe' },
    ],
    dateOptions: (date: any) => {
      const today = new Date();
      const dateValue = new Date(date);
      return dateValue.getTime() > today.getTime();
    },
    levelOptions: [
      { label: 'one', value: 1, checkedIcon: 'check', uncheckedIcon: 'close' },
      { label: 'two', value: 2 },
      { label: 'three', value: 3 },
    ],
    hobbyOptions: [
      { label: 'Basketball', value: 1, checkedIcon: 'check', uncheckedIcon: 'close' },
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
      required: [(val?: any) => !!val || 'Required'],
      file: [(val?: any) => !!val?.length || 'Required'],
    },
  };

  /* event */
  public handleClickCancel() {
    console.log('cancel');
  }

  public hanleClickGetData() {
    this.$emit('getData');
  }

  public handleClickMessage() {
    globalMessage.show({
      type: 'success',
      content: 'success',
    });
  }

  public onNameChange(val: string) {
    console.log(val);
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
        title: '123123',
        content: '123123',
      });
      if (result) {
        console.log(this.dialogParams.params);
      }
    }
  }
}
</script>

<style scoped></style>