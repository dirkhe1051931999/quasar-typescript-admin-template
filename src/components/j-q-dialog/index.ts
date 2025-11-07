import { createApp, nextTick } from 'vue';
import router from 'src/router/index';
import store from 'src/store/index';
import { i18n } from 'src/boot/i18n';
import JQDialog from './index.vue';
import { Quasar } from 'quasar';

const dialogMapStore = new Map<string, { app: any; appInstance: any }>();

export const DialogProvider = {
  register(props: any) {
    const dialogId = Math.random().toString(36).slice(2);
    const app = createApp(JQDialog, { ...props, dialogId });
    app.use(router);
    app.use(store);
    app.use(i18n);
    app.use(Quasar);
    const mountEl = document.createElement('div');
    document.body.appendChild(mountEl);
    const appInstance: any = app.mount(mountEl);
    dialogMapStore.set(dialogId, { app, appInstance });
    nextTick(() => {
      appInstance.open();
    }).then((r) => {
      return r;
    });
    return appInstance;
  },
  destroy(dialogId: string) {
    const dialog = dialogMapStore.get(dialogId);
    if (!dialog) return;
    dialog.app.unmount();
    document.body.removeChild(dialog.app._container!);
    dialogMapStore.delete(dialogId);
  },
};