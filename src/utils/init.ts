import { App, isRef, ref, Ref } from 'vue';
import { DialogProvider } from '../components/j-q-dialog/index';
import { PAGE_ACTION_PERMISSION_KEY, PAGE_PERMISSION_KEY } from '../components/j-c-permission/index.vue';
import { ClosePopup, setCssVar } from 'quasar';
import type { QVueGlobals } from 'quasar';
import defaultColors from '../config/colors.json';
import { setQuasarInstance, setLocale, type Locale } from '../composables/useI18n';
import JQMessage from '../components/j-q-message/index';
import JQConfirmDialog from '../components/j-q-confirm-dialog/index';
import { composeIconMapFn, rtcptIconMapFn } from './icon-map';

export type ColorConfig = Partial<typeof defaultColors>;

export interface RtcptInitOptions {
  app: App;
  router?: any;
  store?: any;
  i18n?: any;
  pagePermissionIds?: Ref<string[]> | string[];
  pageActionPermissionIds?: Ref<string[]> | string[];
  defaultLanguage?: Locale; // 默认语言
  colors?: ColorConfig; // 自定义颜色配置
}

/**
 * 初始化 rtcpt 组件库
 * @param options 初始化配置选项
 * @example
 * ```typescript
 * import { createApp } from 'vue';
 * import { rtcptInit } from 'rtcpt';
 *
 * const app = createApp(App);
 * const pagePermissionIds = ref(['operation-all', 'user-edit']);
 * const pageActionPermissionIds = ref(['action-edit', 'action-delete']);
 *
 * rtcptInit({
 *   app,
 *   router,
 *   store,
 *   i18n,
 *   pagePermissionIds,
 *   pageActionPermissionIds,
 *   defaultLanguage: 'en-US',  // 设置默认语言
 *   colors: {
 *     primary: '#FF5722',  // 自定义主色
 *     grey: '#888888',     // 自定义灰色
 *   }
 * });
 * ```
 */
export function rtcptInit(options: RtcptInitOptions): void {
  const { app, router, store, i18n, pagePermissionIds, pageActionPermissionIds, defaultLanguage, colors } = options;

  // 注册 rtcpt 依赖的 Quasar directives（外部项目只要调用 rtcptInit 即可）
  registerQuasarDirectives(app);

  // 保存 Quasar 实例供 useI18n 使用
  const $q = app.config.globalProperties.$q;
  if ($q) {
    setQuasarInstance($q);

    // 设置 JQMessage 的 Quasar 实例
    JQMessage.setQuasarInstance($q);

    // 设置 JQConfirmDialog 的 Quasar 实例
    JQConfirmDialog.setQuasarInstance($q);

    // 验证必需的 Quasar 插件是否已注册
    validateQuasarPlugins($q);
  } else {
    console.warn('[rtcpt] Quasar instance not found. Make sure you have installed Quasar.');
  }

  // 设置默认语言
  if (defaultLanguage) {
    setLocale(defaultLanguage);
    console.log(`[rtcpt] Default language set to: ${defaultLanguage}`);
  }

  // rtcpt 内置 iconMapFn（base64 svg）
  const iconMapFn = rtcptIconMapFn;

  // 配置 DialogProvider，把 iconMapFn 传进去
  DialogProvider.configure({
    router,
    store,
    i18n,
    iconMapFn,
  });

  // 提供权限 IDs
  if (pagePermissionIds) {
    const permissionIdsRef = isRef(pagePermissionIds) ? pagePermissionIds : ref(pagePermissionIds);
    console.log('[rtcpt] Permission IDs provided:', permissionIdsRef.value);
    app.provide(PAGE_PERMISSION_KEY, permissionIdsRef);
  }

  // 提供操作权限 IDs
  if (pageActionPermissionIds) {
    const actionPermissionIdsRef = isRef(pageActionPermissionIds) ? pageActionPermissionIds : ref(pageActionPermissionIds);
    console.log('[rtcpt] Action Permission IDs provided:', actionPermissionIdsRef.value);
    app.provide(PAGE_ACTION_PERMISSION_KEY, actionPermissionIdsRef);
  }

  // 应用自定义颜色到 CSS 变量（传入 $q 实例）
  if (colors && $q) {
    applyCustomColors(colors, $q);
  }

  console.log('[rtcpt] Initialization started...');
  // 配置主应用的 Quasar 自定义图标映射
  // 这里不强行覆盖现有的 iconMapFn：如果外部项目已经设置过（例如主题图标），
  // 就把 rtcpt 的映射作为 fallback 合并进去，避免出现 app:copyText 等图标丢失。
  if ($q) {
    ($q as any).iconMapFn = composeIconMapFn(($q as any).iconMapFn, iconMapFn);
  }

  console.log('[rtcpt] Initialization completed successfully.');
}

/**
 * 应用自定义颜色到 CSS 变量
 * @param customColors 自定义颜色配置
 * @param $q Quasar 实例（用于确保在正确的应用上下文中）
 */
function applyCustomColors(customColors: ColorConfig, $q: QVueGlobals): void {
  const finalColors = { ...defaultColors, ...customColors };

  // 设置 CSS 变量到 :root
  const root = document.documentElement;

  Object.entries(finalColors).forEach(([key, value]) => {
    root.style.setProperty(`--j-color-${key}`, value);
  });

  // 使用 Quasar 的 setCssVar API 设置 Quasar 的颜色变量
  // 注意：setCssVar 是全局 API，但我们通过传入 $q 来确保在正确的上下文中调用
  if (finalColors.primary) {
    setCssVar('primary', finalColors.primary);
  }
  if (finalColors.negative) {
    setCssVar('negative', finalColors.negative);
  }
  // 可选：设置更多 Quasar 颜色
  if (finalColors.green) {
    setCssVar('positive', finalColors.green);
  }
  if (finalColors.yellow) {
    setCssVar('warning', finalColors.yellow);
  }
  if (finalColors.dark) {
    setCssVar('dark', finalColors.dark);
  }

  console.log('[rtcpt] Custom colors applied:', customColors);
}

/**
 * 验证必需的 Quasar 插件是否已注册
 * @param $q Quasar 实例
 */
function validateQuasarPlugins($q: QVueGlobals): void {
  const requiredPlugins = ['notify', 'dialog'];
  const missingPlugins: string[] = [];

  requiredPlugins.forEach((plugin) => {
    if (!$q[plugin as keyof QVueGlobals]) {
      missingPlugins.push(plugin);
    }
  });

  if (missingPlugins.length > 0) {
    console.warn(`[rtcpt] Missing required Quasar plugins: ${missingPlugins.join(', ')}. ` + `Please register them in your main app with app.use(Quasar, { plugins: { Notify, Dialog } })`);
  }
}

/**
 * 注册 rtcpt 组件内部用到的 Quasar directives
 * - v-close-popup -> ClosePopup
 */
function registerQuasarDirectives(app: App): void {
  const directives = (app as any)?._context?.directives as Record<string, any> | undefined;
  if (directives?.['close-popup']) return;
  app.directive('close-popup', ClosePopup);
}
