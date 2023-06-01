<template>
  <q-dialog ref="dialogRef" transition-show="jump-up" transition-hide="jump-down" persistent>
    <q-card class="q-dialog-confirm-plugin">
      <div class="title f-bold">
        {{ title }}
        <div class="close">
          <q-icon name="app:navigation-close" class="icon" @click="onCancelClick"></q-icon>
        </div>
      </div>
      <div class="content">
        {{ getJsx(content) }}
      </div>
      <div class="action">
        <q-btn :color="color" :label="confirmButtonText" @click="onOKClick" class="q-mr-md" />
        <q-btn :color="color" outline :label="$t('action.cancel')" @click="onCancelClick" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({
  name: 'dialogConfirmComponent',
  emits: ['ok', 'hide'],
})
export default class dialogConfirmComponent extends Vue {
  declare $refs: any;
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) content!: string;
  @Prop({ default: '' }) confirmButtonText!: string;
  @Prop({ default: 'primary' }) color!: string;
  private show() {
    this.$refs.dialogRef.show();
  }
  private hide() {
    this.$refs.dialogRef.hide();
  }
  public onOKClick() {
    this.$emit('ok');
    this.hide();
  }
  public onCancelClick() {
    this.hide();
    this.$emit('hide');
  }
  public getJsx(content: string) {
    this.$nextTick(() => {
      document.querySelector('.q-dialog-confirm-plugin .content')!.innerHTML = content;
    });
  }
}
</script>

<style lang="scss" scoped>
.body--dark {
  .q-dialog-confirm-plugin {
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
  .q-dialog-confirm-plugin {
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
.q-dialog-confirm-plugin {
  width: 480px;
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
    padding: 16px;
    font-size: 14px;
    line-height: 21px;
  }
  .action {
    padding: 16px;
    text-align: right;
  }
}
</style>
