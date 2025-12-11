import type { QVueGlobals } from 'quasar';
import ConfirmDialogComponent from './index.vue';

export type ShowParams = {
  title: string;
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  color?: string;
};

// 接口定义保持不变
export interface IGlobalConfirm {
  show: (params: ShowParams) => Promise<boolean>;
  setQuasarInstance: (instance: QVueGlobals) => void;
}

// 存储 Quasar 实例的引用
let quasarInstance: QVueGlobals | null = null;

class GlobalConfirm implements IGlobalConfirm {
  /**
   * 设置 Quasar 实例（在 rtcptInit 中调用）
   */
  public setQuasarInstance(instance: QVueGlobals): void {
    quasarInstance = instance;
  }

  /**
   * 弹出自定义确认对话框，返回一个 Promise，resolve(true) 表示确定，resolve(false) 表示取消/关闭。
   */
  public async show({ title, color, content, confirmButtonText, cancelButtonText, showCancelButton }: ShowParams): Promise<boolean> {
    if (!quasarInstance?.dialog) {
      console.error('[JQConfirmDialog] Quasar Dialog plugin not available. Make sure rtcptInit has been called.');
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      quasarInstance!
        .dialog({
          component: ConfirmDialogComponent,
          cancel: showCancelButton === undefined ? true : showCancelButton,
          componentProps: {
            title,
            color,
            content,
            confirmButtonText,
            cancelButtonText,
            cancel: showCancelButton === undefined ? true : showCancelButton,
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