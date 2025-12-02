import zhCN from './zh-CN';
import enUS from './en-US';

export type Locale = 'zh-CN' | 'en-US';

export interface I18nMessages {
  action: {
    confirm: string;
    cancel: string;
  };
}

export const messages: Record<Locale, I18nMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export { zhCN, enUS };

