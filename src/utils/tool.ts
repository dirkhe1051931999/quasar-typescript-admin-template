import { date } from 'quasar';

/**
 * 默认填充函数，处理 falsy 值
 * @param val 要处理的值
 * @returns 默认填充的字符串
 */
export function defaultFill(val: any) {
  if (val === false) return false;
  if (val === 0 || String(val) === '0') return val;
  if (!val) return '--';
  else return val;
}

/**
 * 格式化数据
 * 把数字转成指定单位
 */
type TSizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export function formatSize(options: { maxUnit?: TSizeUnit; numberFormatOptions?: Intl.NumberFormatOptions; size: number; unit?: TSizeUnit }) {
  const { size, unit = 'B', maxUnit, numberFormatOptions } = options;
  const { size: finalSize, unit: finalUnit } = getUpperSize({ size, unit }, { maxUnit });
  return `${finalSize.toLocaleString(void 0, numberFormatOptions)} ${finalUnit}`;
}

export function getUpperSize(
  sizeUnit: { size: number; unit?: TSizeUnit },
  options?: { maxUnit?: TSizeUnit }
): {
  size: number;
  unit: TSizeUnit;
} {
  const SIZE_UNITS: TSizeUnit[] = ['B', 'KB', 'MB', 'GB', 'TB'];
  const { size, unit = 'B' } = sizeUnit;
  const unitIndex = SIZE_UNITS.indexOf(unit);
  if (unitIndex === -1 || unitIndex === SIZE_UNITS.length - 1) return { size, unit };
  const maxUnit = options?.maxUnit || 'TB';
  const maxUnitIndex = SIZE_UNITS.indexOf(maxUnit);
  if (unitIndex === maxUnitIndex) return { size, unit };
  if (size < 1024) return { size: size, unit };
  return getUpperSize({ size: size / 1024, unit: SIZE_UNITS[unitIndex + 1] }, options);
}

/**
 *
 * 1. 先检查值是不是数字0或字符串'0'，是的话就应用格式化或返回原值，保留0
 * 2. 再检查其他所有当空白处理的 falsy 值 (null, undefined, '', false, NaN)
 * 3. 否则应用可选的自定义格式化函数
 *
 * @param customFormatter 可选的自定义格式化函数
 * @param fallbackValue 默认的替代值，默认是 '--'
 * @returns QTable columns 接受的格式化函数
 */
export function defaultFormat(customFormatter?: (val: any, row: any) => string | number, fallbackValue: string = '--') {
  return (val: any, row: any) => {
    if (val === 0 || val === '0') {
      return customFormatter ? customFormatter(val, row) : val;
    }

    if (!val) {
      return fallbackValue;
    }

    if (customFormatter) {
      return customFormatter(val, row);
    }

    // 否则返回原值
    return val.toString();
  };
}

/**
 * Quasar支持的日期格式标记
 * * 年份: YYYY (4位), YY (2位)
 * 月份: MM (2位, 01-12), M (1-12)
 * 日期: DD (2位, 01-31), D (1-31)
 * 星期: ddd (周一), dd (Mon), d (M)
 * 小时 (24小时制): HH (00-23), H (0-23)
 * 小时 (12小时制): hh (01-12), h (1-12)
 * 分钟: mm (00-59), m (0-59)
 * 秒: ss (00-59), s (0-59)
 * 毫秒: SSS (000-999), SS (00-99), S (0-9)
 * AM/PM: A (AM/PM), a (am/pm)
 * 时区: Z (e.g., -05:00)
 * * 这是简化版示例，仅用于说明格式化概念
 * 在 Quasar 环境中使用时，建议直接用 Quasar 的 'date' 辅助函数，因为它已经包含了所有复杂逻辑
 */
export type DateFormatString = string;

/**
 * 可接受的日期输入类型
 */
export type DateInput = Date | string | number;

/**
 *
 * 把输入值转成 Date 对象或 13 位时间戳（如果是有效的时间戳）
 * 10 位时间戳（秒）会自动扩展为 13 位（毫秒）
 * 对于 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss 等字符串，直接返回，交给 Quasar 解析
 *
 * @param val 要处理的值
 * @returns {number | string | Date | null} 13位时间戳、Date对象、原始日期字符串或null
 */
function normalizeDateInput(val: DateInput | null | undefined): DateInput | null {
  if (val === null || val === undefined) {
    return null;
  }

  if (val instanceof Date) {
    return val;
  }

  const numVal = Number(val);

  // 检查是不是有效数字，而且不是 NaN
  if (Number.isFinite(numVal)) {
    const length = String(Math.floor(numVal)).length;

    if (length === 10) {
      return numVal * 1000;
    }

    if (length === 13) {
      return numVal;
    }

    if (numVal === 0) {
      return 0;
    }
  }

  return val;
}

/**
 * 格式化日期/时间戳的工具函数。
 * * 示例:
 * formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
 * formatDate('2025-11-13T23:00:57.123Z', 'YYYY年MM月DD日')
 * * @param dateInput 要格式化的日期或时间戳。
 * @param dateInput
 * @param formatString 格式化字符串 (例如 'YYYY-MM-DD HH:mm:ss.SSS')。
 * @returns 格式化后的日期字符串。
 */

export function formatDate(dateInput: DateInput, formatString: DateFormatString = 'YYYY-MM-DD HH:mm:ss'): string {
  // 核心实现：直接调用 Quasar 的 date 辅助函数
  // 这样可以确保与示例代码完全一致，并且复用 Quasar 强大的逻辑。
  const normalizedVal = normalizeDateInput(dateInput);
  return normalizedVal ? defaultFill(date.formatDate(normalizedVal!, formatString)) : defaultFill(dateInput);
}

/**
 *
 * 结合 defaultFormat 的空值处理逻辑和 formatDate 的日期格式化功能
 * 1. 先检查值是不是数字0或字符串'0'，是的话就返回原值，保留0
 * 2. 再检查其他所有当空白处理的 falsy 值 (null, undefined, '', false, NaN)
 * 3. 否则应用 formatDate 进行格式化
 *
 * @param formatString 格式化字符串 (例如 'YYYY-MM-DD HH:mm:ss')
 * @param fallbackValue 默认的替代值，默认是 '--'
 * @returns QTable columns 接受的格式化函数
 */
export function defaultDateFormat(formatString: DateFormatString = 'YYYY-MM-DD HH:mm:ss', fallbackValue: string = '--') {
  return (val: DateInput | null | undefined, row: any): string => {
    if (val === 0 || val === '0') {
      return String(val);
    }

    const normalizedVal = normalizeDateInput(val);

    if (!val || val === 'Invalid Date') {
      return fallbackValue;
    }

    try {
      const formattedDate = date.formatDate(normalizedVal!, formatString);

      if (!formattedDate || formattedDate === 'Invalid Date') {
        return fallbackValue;
      }

      return formattedDate;
    } catch (e) {
      console.error('Date formatting failed:', e);
      return fallbackValue;
    }
  };
}

/**
 * 流量数据格式化函数：
 * 1. 用 defaultFormat 处理 falsy 值，显示 '--'，0 除外
 * 2. 用 formatSize 进行流量单位转换，默认从 B 开始转换
 */
export function defaultDataFormat(
  fallbackValue: string = '--',
  options?: {
    digits?: number;
    unit?: TSizeUnit;
  }
) {
  const sizeFormatter = (val: any) => {
    const size = typeof val === 'string' ? Number(val) : val;

    if (!Number.isFinite(size)) {
      return val;
    }

    return formatSize({
      size: size,
      unit: options?.unit || 'B',
      numberFormatOptions: {
        maximumFractionDigits: options?.digits,
        minimumFractionDigits: options?.digits,
      },
    });
  };

  return defaultFormat(sizeFormatter, fallbackValue);
}
