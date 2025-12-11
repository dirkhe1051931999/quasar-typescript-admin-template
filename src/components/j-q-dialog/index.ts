import { createApp, nextTick } from 'vue';
import JQDialog from './index.vue';

const dialogMapStore = new Map<string, { app: any; appInstance: any }>();

interface DialogProviderOptions {
  router?: any;
  store?: any;
  i18n?: any;
  plugins?: any[];
  iconMapFn?: (iconName: string) => any;
}

let globalOptions: DialogProviderOptions = {};

export const DialogProvider = {
  /**
   * 配置 DialogProvider 选项
   */
  configure(options: DialogProviderOptions) {
    globalOptions = options;
  },

  async register(props: any) {
    const dialogId = Math.random().toString(36).slice(2);
    const app = createApp(JQDialog, { ...props, dialogId });

    if (globalOptions.router) {
      app.use(globalOptions.router);
    }
    if (globalOptions.store) {
      app.use(globalOptions.store);
    }
    if (globalOptions.i18n) {
      app.use(globalOptions.i18n);
    }
    if (globalOptions.plugins) {
      globalOptions.plugins.forEach((plugin) => app.use(plugin));
    }

    // 动态导入 Quasar 和插件（避免静态导入问题）
    const { Quasar, Notify, Dialog, Loading } = await import('quasar');
    
    app.use(Quasar, {
      plugins: {
        Notify,
        Dialog,
        Loading,
      },
      animations: 'all' as any,
    } as any);

    // 配置自定义图标映射
    if (globalOptions.iconMapFn) {
      app.config.globalProperties.$q.iconMapFn = globalOptions.iconMapFn;
    }

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
