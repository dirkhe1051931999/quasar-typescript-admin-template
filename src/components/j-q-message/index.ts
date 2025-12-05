import type { QNotifyCreateOptions, QVueGlobals } from 'quasar';
import { getLocale } from 'src/composables/useI18n.ts';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined;
type showParams = {
  type: string;
  content: string;
  position?: Position;
  isNotify?: boolean;
};

export interface IGlobalMessage {
  show: (params: showParams) => void;
  setQuasarInstance: (instance: QVueGlobals) => void;
}

const DEFAULT_PARAMS: QNotifyCreateOptions = {
  timeout: 3000,
  html: true,
  progress: true,
  iconSize: '20px',
};

// 存储 Quasar 实例的引用
let quasarInstance: QVueGlobals | null = null;

class GlobalMessage implements IGlobalMessage {
  constructor() {}

  /**
   * 设置 Quasar 实例（在 rtcptInit 中调用）
   */
  public setQuasarInstance(instance: QVueGlobals): void {
    quasarInstance = instance;
  }

  public show({ type, content, position, isNotify }: showParams) {
    const data = Object.assign(DEFAULT_PARAMS, {
      message: content,
      position: position ?? 'top',
      multiLine: isNotify ?? false,
      icon: type === 'error' ? 'highlight_off' : type === 'warn' ? 'warning' : 'check_circle', // error warn success
      actions: isNotify
        ? [
            {
              color: 'white',
              label: getLocale() === 'en-US' ? 'Close' : '关闭',
            },
          ]
        : [],
      badgeStyle: `background-color: #fff;box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;${type === 'success' ? 'color: #2DA641;' : 'color: #D40000;'}`,
      classes: `q-message-style  q-message-style--${type}`,
    });
    try {
      if (quasarInstance?.notify) {
        quasarInstance.notify(data);
      } else {
        console.error('[JQMessage] Quasar Notify plugin not available. Make sure rtcptInit has been called.');
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(data.message);
    }
  }
}

export default new GlobalMessage();
