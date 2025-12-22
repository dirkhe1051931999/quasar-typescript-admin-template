// 动态导入语言包，实现按需加载
export type Locale = 'zh-CN' | 'en-US';

export interface I18nMessages {
  action: {
    confirm: string;
    cancel: string;
  };
}

// 懒加载语言包
export const loadLocaleMessages = async (locale: Locale): Promise<I18nMessages> => {
  const modules = {
    'zh-CN': () => import('./zh-CN'),
    'en-US': () => import('./en-US'),
  };
  
  const module = await modules[locale]();
  return module.default;
};

// 缓存已加载的语言包
const loadedMessages: Partial<Record<Locale, I18nMessages>> = {};

export const getMessages = async (locale: Locale): Promise<I18nMessages> => {
  if (!loadedMessages[locale]) {
    loadedMessages[locale] = await loadLocaleMessages(locale);
  }
  return loadedMessages[locale]!;
};

// 兼容性导出：同步方式（用于类型检查）
export const messages: Record<Locale, I18nMessages> = {} as any;

