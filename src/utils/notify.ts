//globalMessage.ts
import { Notify, QNotifyCreateOptions } from 'quasar';
import { AppModule } from 'src/store/modules/app';
type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | undefined;
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
      multiLine: isNotify,
      icon: type !== 'success' ? 'o_info' : 'o_check_circle',
      actions: isNotify
        ? [
            {
              color: 'white',
              label: AppModule.language === 'en-US' ? 'Close' : '关闭',
            },
          ]
        : [],
      classes: `q-message-${type}-style min-h-36`,
    });
    Notify.create(data);
  }
}

export default new GlobalMessage();
