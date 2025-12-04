import { App, isRef, ref, Ref } from 'vue';
import { DialogProvider } from '../components/j-q-dialog/index';
import { PAGE_PERMISSION_KEY } from '../components/j-c-permission/index.vue';
import { myIcons } from './custom-svg';
import { setCssVar } from 'quasar';
import defaultColors from '../config/colors.json';

export type ColorConfig = Partial<typeof defaultColors>;

export interface RtcptInitOptions {
  app: App;
  router?: any;
  store?: any;
  i18n?: any;
  pagePermissionIds?: Ref<string[]> | string[];
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
 *
 * rtcptInit({
 *   app,
 *   router,
 *   store,
 *   i18n,
 *   pagePermissionIds,
 *   colors: {
 *     primary: '#FF5722',  // 自定义主色
 *     grey: '#888888',     // 自定义灰色
 *   }
 * });
 * ```
 */
export function rtcptInit(options: RtcptInitOptions): void {
  const { app, router, store, i18n, pagePermissionIds, colors } = options;

  // 配置 Quasar 自定义图标映射函数
  const iconMapFn = (iconName: string) => {
    const iconPath = 'img:';
    const iconFile = myIcons[iconName];
    if (iconFile !== void 0) {
      return {
        icon: iconPath + iconFile,
      };
    }
    return void 0;
  };

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
    app.provide(PAGE_PERMISSION_KEY, permissionIdsRef);
  }

  // 应用自定义颜色到 CSS 变量
  if (colors) {
    applyCustomColors(colors);
  }

  console.log('[rtcpt] Initialization started...');
  // 配置主应用的 Quasar 自定义图标映射
  app.config.globalProperties.$q.iconMapFn = iconMapFn;

  console.log('[rtcpt] Initialization completed successfully.');
}

/**
 * 应用自定义颜色到 CSS 变量
 */
function applyCustomColors(customColors: ColorConfig): void {
  const finalColors = { ...defaultColors, ...customColors };

  // 设置 CSS 变量到 :root
  const root = document.documentElement;

  Object.entries(finalColors).forEach(([key, value]) => {
    root.style.setProperty(`--j-color-${key}`, value);
  });

  // 用 Quasar API 设置 Quasar 的颜色变量
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
