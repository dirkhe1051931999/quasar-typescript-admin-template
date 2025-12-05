import { ref, Ref } from 'vue';
import { messages, Locale } from '../i18n';
import type { QVueGlobals } from 'quasar';

// 重新导出 Locale 类型供外部使用
export type { Locale };

// 动态导入 Quasar 语言包
const quasarLangModules = {
  'zh-CN': () => import('quasar/lang/zh-CN'),
  'en-US': () => import('quasar/lang/en-US'),
};

const currentLocale: Ref<Locale> = ref<Locale>('zh-CN');

// 存储 Quasar 实例的引用
let quasarInstance: QVueGlobals | null = null;

/**
 * 设置 Quasar 实例（在 rtcptInit 中调用）
 * @param $q Quasar 实例
 */
export function setQuasarInstance($q: QVueGlobals): void {
  quasarInstance = $q;
}

function getValueByPath(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the path itself if not found
    }
  }

  return typeof result === 'string' ? result : path;
}

/**
 * 替换字符串中的变量占位符
 * @param template 包含 {key} 占位符的模板字符串
 * @param variables 变量对象
 */
function interpolate(template: string, variables?: Record<string, any>): string {
  if (!variables) return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

export function t(key: string, variables?: Record<string, any>): string {
  const locale = currentLocale.value;
  const message = messages[locale];
  const template = getValueByPath(message, key);
  return interpolate(template, variables);
}

export function setLocale(locale: Locale): void {
  currentLocale.value = locale;

  // 同步更新 Quasar locale
  const loadQuasarLang = quasarLangModules[locale];
  if (loadQuasarLang && quasarInstance) {
    loadQuasarLang()
      .then((langModule) => {
        quasarInstance!.lang.set(langModule.default);
      })
      .catch((error) => {
        console.error(`Failed to load Quasar locale for ${locale}:`, error);
      });
  }
}

export function getLocale(): Locale {
  return currentLocale.value;
}

export function useI18n() {
  return {
    t,
    locale: currentLocale,
    setLocale,
    getLocale,
  };
}
