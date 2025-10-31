import { Notify, QNotifyCreateOptions } from 'quasar';
import { AppModule } from 'src/store/modules/app';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined;
type showParams = {
  type: string;
  content: string;
  position?: Position;
  isNotify?: boolean;
};

export interface IGlobalMessage {
  show: (params: showParams) => void;
}

const DEFAULT_PARAMS: QNotifyCreateOptions = {
  timeout: 3000,
  html: true,
  progress: true,
  iconSize: '20px',
};

class GlobalMessage {
  constructor() {}

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
              label: AppModule.language === 'en-US' ? 'Close' : '关闭',
            },
          ]
        : [],
      badgeStyle: `background-color: #fff;box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;${type === 'success' ? 'color: #2DA641;' : 'color: #D40000;'}`,
      classes: type === 'success' ? `q-message-${type}-style min-h-36 m-t-55` : `q-message-${type}-style min-h-36 m-t-55`,
    });
    try {
      Notify.create(data);
    } catch (error) {
      alert(data.message);
    }
  }
}

export default new GlobalMessage();