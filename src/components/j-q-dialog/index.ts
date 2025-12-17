import { createApp, nextTick } from 'vue';
import JQDialog from './index.vue';
import { formRules as formRulesCore } from './form-rules';
import { t as globalT } from 'src/composables/useI18n';

const dialogMapStore = new Map<string, { app: any; appInstance: any }>();

/**
 * 表单验证规则
 * @param t - 可选的国际化翻译函数，如果不传则使用全局的 t 函数
 */
export function formRules(t?: any) {
  return formRulesCore(t || globalT);
}

interface DialogProviderOptions {
  router?: any;
  store?: any;
  i18n?: any;
  plugins?: any[];
  iconMapFn?: (iconName: string) => any;
}

export type DialogPosition = 'standard' | 'right' | 'top' | 'bottom' | 'left';

export interface JQDialogRegisterProps {
  allowFocusOutside?: boolean;
  showFooter?: boolean;
  /** 控制确认按钮显示/隐藏（默认 true） */
  showConfirm?: boolean;

  component?: any;
  content?: any;
  componentBind?: Record<string, any>;
  componentOn?: Record<string, any>;

  closeOnEsc?: boolean;
  closeOnMask?: boolean;
  position?: DialogPosition;
  showHeader?: boolean;
  title?: string;
  maxWidth?: string | number;
  minHeight?: string | number;
}

export interface JQDialogExposed {
  open: () => void;
  close: () => void;
  setLoading: (loading: boolean) => void;
  changeCancelText: (text: string) => void;
  changeConfirmText: (text: string) => void;
  /** 命令式控制确认按钮显示/隐藏 */
  setShowConfirm: (show: boolean) => void;
  /** 绑定一个 Ref/ComputedRef<boolean>，用于响应式控制确认按钮显示/隐藏 */
  bindShowConfirm: (source: { value: boolean }) => void;
}

let globalOptions: DialogProviderOptions = {};

export const DialogProvider = {
  /**
   * 配置 DialogProvider 选项
   */
  configure(options: DialogProviderOptions) {
    globalOptions = options;
  },

  async register(props: JQDialogRegisterProps) {
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
