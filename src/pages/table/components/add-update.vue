<template>
  <div>
    TableAddOrUpdateComponent
    <div class="row q-gutter-sm items-center justify-end">
      <q-btn label="修改cancel标题" @click="dialogInstance.changeCancelText('cancel')" color="primary" no-caps />
      <q-btn label="修改confirm标题" @click="dialogInstance.changeConfirmText('confirm')" color="primary" no-caps />
      <q-btn label="触发父级的事件" @click="hanleClickGetData" color="primary" no-caps />
      <q-btn label="global message" @click="handleClickMessage" color="primary" no-caps />
    </div>
    <q-form>
      <j-q-input v-model="dialogParams.params.name" @update:model-value="onNameChange" />
      <p>名称 地区选择器示例 (单选)</p>
      <j-q-select v-model="dialogParams.params.area" :options="dialogParams.areaOptions" filterable />
      <p>选择标签 (可搜索)</p>
      <JQSelect v-model="dialogParams.params.tags" multiple use-chips filterable :filter-fn="tagFilterFn" :options="dialogParams.tagsOptions" />
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

@Component({
  name: 'TableAddOrUpdateComponent',
  components: { JQSelect, JQInput },
  emits: ['getData'],
})
export default class TableAddOrUpdateComponent extends Vue {
  @Prop() public dialogInstance: any;

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
    params: {
      name: '',
      area: '',
      tags: [],
    },
  };

  /* event */
  public handleClickCancel() {
    console.log('cancel');
  }

  public handleClickConfirm() {
    console.log('confirm');
    globalConfirm.show({
      title: '123123',
      content: '123123',
    });
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
}
</script>

<style scoped></style>