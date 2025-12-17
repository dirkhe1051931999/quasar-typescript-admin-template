import { myIcons } from './custom-svg';

// 对齐 Quasar iconMapFn 允许的返回结构（img:xxx 或 class+content 形式）
export type IconMapResult = { icon: string } | { cls: string; content?: string };
export type IconMapFn = (iconName: string) => IconMapResult | void;

/**
 * rtcpt 内置 iconMapFn（基于 src/utils/custom-svg.ts 的 base64 svg）。
 *
 * 注意：Quasar 在某些场景下可能会对 iconName 做规范化（例如转小写 / 去掉前缀），
 * 这里做“多候选 key”匹配，兼容：
 * - 带/不带 `app:` 前缀
 * - 原样/小写
 */
export const rtcptIconMapFn: IconMapFn = (iconName: string) => {
  const iconPath = 'img:';

  const candidates: string[] = [iconName, iconName.toLowerCase()];
  if (iconName.startsWith('app:')) {
    const raw = iconName.slice(4);
    candidates.push(raw, raw.toLowerCase());
  } else {
    candidates.push(`app:${iconName}`, `app:${iconName.toLowerCase()}`);
  }

  const matchedKey = candidates.find((k) => myIcons[k] !== void 0);
  if (matchedKey) {
    return { icon: iconPath + myIcons[matchedKey] };
  }
  return void 0;
};

/**
 * 组合多个 iconMapFn：按顺序尝试，谁先返回结果就用谁的。
 */
export function composeIconMapFn(...fns: Array<IconMapFn | undefined | null>): IconMapFn {
  return (iconName: string) => {
    for (const fn of fns) {
      if (!fn) continue;
      const res = fn(iconName);
      if (res !== void 0) return res;
    }
    return void 0;
  };
}


