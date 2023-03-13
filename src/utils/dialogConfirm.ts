// globalConfirm.ts
import { Dialog, DialogChainObject } from 'quasar';
import ConfirmDialogComponent from 'src/components/confirmDialog/index.vue';
type showParams = {
  title: string;
  color: string;
  content: string;
  confirmButtonText: string;
};
export interface IGlobalConfirm {
  show: (params: showParams) => Promise<unknown>;
}
class GlobalConfirm {
  constructor() {}
  public async show({ title, color, content, confirmButtonText }: showParams) {
    return new Promise((resolve, reject) => {
      Dialog.create({
        component: ConfirmDialogComponent,
        cancel: true,
        componentProps: {
          title,
          color,
          content,
          confirmButtonText,
        },
      })
        .onOk(() => {
          return resolve(true);
        })
        .onCancel(() => {
          return resolve(false);
        });
    });
  }
}

export default new GlobalConfirm();
