import { ref, Ref } from 'vue';
import { messages, Locale } from '../i18n';

const currentLocale: Ref<Locale> = ref<Locale>('zh-CN');

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
 * @param template - 包含 {key} 占位符的模板字符串
 * @param variables - 变量对象
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
