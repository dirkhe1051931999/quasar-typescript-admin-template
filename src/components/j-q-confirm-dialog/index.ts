import { Dialog } from 'quasar';
import ConfirmDialogComponent from './index.vue';

type ShowParams = {
  title: string;
  content: string;
};

// 接口定义保持不变
export interface IGlobalConfirm {
  show: (params: ShowParams) => Promise<boolean>;
}

class GlobalConfirm implements IGlobalConfirm {
  /**
   * 弹出自定义确认对话框，返回一个 Promise，resolve(true) 表示确定，resolve(false) 表示取消/关闭。
   */
  public async show({ title, content }: ShowParams): Promise<boolean> {
    return new Promise((resolve) => {
      Dialog.create({
        component: ConfirmDialogComponent,
        cancel: true,
        componentProps: {
          title,
          content,
        },
      })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        })
        .onDismiss(() => {});
    });
  }
}

const globalConfirm = new GlobalConfirm();
export default globalConfirm;
