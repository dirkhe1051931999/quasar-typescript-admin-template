<template>
  <div>
    <q-dialog transition-show="jump-down" transition-hide="jump-up" v-model="myDialogParams.visiable" persistent @before-hide="handlerBeforeHide">
      <q-card class="my-dialog" :style="'width:' + width">
        <div class="title f-bold q-pa-md fs-18">
          {{ myDialogParams.title }}
          <!-- <div class="close">
            <q-icon name="close" class="icon" @click="handlerClickCancel()" />
          </div>-->
        </div>
        <div class="split-line h-1"></div>
        <div class="scroll content" style="max-height: 500px">
          <q-form :ref="myDialogParams.id">
            <slot></slot>
          </q-form>
        </div>
        <div class="split-line h-1"></div>
        <div class="text-center q-pa-md row justify-end">
          <q-btn :label="$t(`action.cancel`)" :disable="myDialogParams.clickLoading" @click="handlerClickCancel()" outline color="primary" />
          <q-btn :label="$t(`action.confirm`)" color="primary" class="q-ml-md" @click="handlerClickDialogConfirmButton()" :loading="myDialogParams.clickLoading" v-show="myDialogParams.showConfirm" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import { getCurrentInstance } from 'vue';
import { cloneDeep } from 'lodash';
@Component({
  name: 'MyDialogComponent',
  emits: ['close', 'confirm', 'before-hide'],
})
export default class MyDialogComponent extends Vue {
  declare $refs: any;
  @Prop({ default: '50vw' }) width!: string;
  @Prop({
    default: {
      id: 'my-dialog',
      dialogType: 'add',
      clickLoading: false,
      getDataLoading: false,
      visiable: false,
      title: '',
      showConfirm: true,
      params: {},
      customComfirm: false,
      noTwiceConfirm: false,
    },
  })
  option!: {
    id: string;
    dialogType: string;
    getDataLoading: boolean;
    clickLoading: boolean;
    visiable: boolean;
    title: string;
    showConfirm: boolean;
    params: any;
    customComfirm: boolean;
    noTwiceConfirm: boolean;
  };
  @Watch('option.visiable')
  onVisiableChange(newVal: boolean) {
    if (newVal) {
      this.$nextTick(() => {
        this.$refs[this.myDialogParams.id] && this.$refs[this.myDialogParams.id].resetValidation();
      });
    }
    this.myDialogParams.visiable = newVal;
  }
  @Watch('option.dialogType')
  onDialogTypeChange(newVal: string) {
    this.myDialogParams.dialogType = newVal;
  }
  @Watch('option.clickLoading')
  onClickLoadingChange(newVal: boolean) {
    this.myDialogParams.clickLoading = newVal;
  }
  @Watch('option.getDataLoading')
  onGetDataLoadingChange(newVal: boolean) {
    this.myDialogParams.getDataLoading = newVal;
  }
  @Watch('option.title')
  onTitleChange(newVal: string) {
    this.myDialogParams.title = newVal;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private bakParams = {};
  private myDialogParams = {
    id: '',
    dialogType: '',
    clickLoading: false,
    getDataLoading: false,
    visiable: false,
    title: '',
    showConfirm: true,
    params: {},
  };
  mounted() {
    this.myDialogParams.id = this.option.id;
    this.myDialogParams.dialogType = this.option.dialogType;
    this.myDialogParams.getDataLoading = this.option.getDataLoading;
    this.myDialogParams.clickLoading = this.option.clickLoading;
    this.myDialogParams.visiable = this.option.visiable;
    this.myDialogParams.title = this.option.title;
    this.myDialogParams.showConfirm = this.option.showConfirm ?? true;
    this.myDialogParams.params = this.option.params;
    this.bakParams = cloneDeep(this.option.params);
  }
  /* event */
  private handlerClickCancel() {
    this.$nextTick(() => {
      this.$emit('close', { type: this.myDialogParams.dialogType });
      this.$refs[this.myDialogParams.id].resetValidation();
    });
  }
  private handlerClickDialogConfirmButton() {
    if (!this.option.customComfirm) {
      this.$refs[this.myDialogParams.id].validate().then(async (valid: boolean) => {
        if (valid) {
          if (this.option.noTwiceConfirm) {
            this.$emit('confirm', { type: this.myDialogParams.dialogType });
          } else {
            const result = await this.$globalConfirm.show({
              title: this.$t('messages.tishi'),
              color: 'primary',
              content: this.$t('messages.areYouSure'),
              confirmButtonText: this.$t('action.yes'),
            });
            if (result) {
              this.$emit('confirm', { type: this.myDialogParams.dialogType });
            }
          }
        }
      });
    } else {
      this.$emit('confirm', { type: this.myDialogParams.dialogType });
    }
  }
  private handlerBeforeHide() {
    this.myDialogParams.params = cloneDeep(this.bakParams);
    this.$emit('before-hide', {
      type: this.myDialogParams.dialogType,
      params: this.myDialogParams.params,
    });
  }
  public validForm() {
    this.$refs[this.myDialogParams.id].validate();
  }
}
</script>

<style lang="scss" scoped>
.body--dark {
  .my-dialog {
    background: #000000;
  }
  .title {
    .close {
      &:hover {
        color: #000000;
        background: #eeeeee;
      }
    }
  }
}
.body--light {
  .my-dialog {
    background: #ffffff;
  }
  .title {
    .close {
      &:hover {
        background: var(--my-grey-1);
      }
    }
  }
}
.my-dialog {
  max-width: 70vw;
  width: 60vw;
  border-radius: 12px;
  .title {
    padding: 16px;
    font-size: 16px;
    position: relative;
    .close {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--my-white);
      transition: all 0.2s;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .content {
    padding: 0 16px;
    margin: 10px 0;
  }
}
</style>
