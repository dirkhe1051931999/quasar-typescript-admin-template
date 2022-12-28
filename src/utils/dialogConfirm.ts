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
    return new Promise((resolve) => {
      Dialog.create({
        component: ConfirmDialogComponent,
        componentProps: {
          title,
          color,
          content,
          confirmButtonText,
        },
      }).onOk(() => {
        resolve(true);
      });
    });
  }
}

export default new GlobalConfirm();
