import { date } from 'quasar';

export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = '';
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName);
  } catch (error) {
    console.error(error);
  }
  return cssVariableValue;
};

// loadBdScript
export function loadBdScript(scriptId: string, url: string, callback: () => void) {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  script.id = scriptId;
  document.getElementsByTagName('head')[0].appendChild(script);
}

export function defaultFill(val: any) {
  if (val === 0 || String(val) === '0') return val;
  if (!!!val) return '--';
  else return val;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function xmlToJson(xml: any) {
  var obj: any = {};
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue;
  }
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

/**
 *
 * 1. 首先检查值是否为数字0或字符串'0'，如果是则应用格式化或返回原值（保留0）。
 * 2. 其次检查其他所有被视为空白的 falsy 值 (null, undefined, '', false, NaN)。
 * 3. 否则，应用可选的自定义格式化函数。
 *
 * @param customFormatter 可选的自定义格式化函数。
 * @param fallbackValue 默认的替代值，默认为 '--'。
 * @returns QTable columns 接受的格式化函数。
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

    // 否则返回原始值
    return val.toString();
  };
}

/**
 * 格式化数据
 * 把数字转换为指定单位
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
 * * 这是一个简化的示例，仅用于说明格式化概念。
 * 如果您在 Quasar 环境中使用，建议直接使用并导入 Quasar 的 'date' 辅助函数，因为它已经包含了所有复杂逻辑。
 */
export type DateFormatString = string;

/**
 * 可接受的日期输入类型
 */
export type DateInput = Date | string | number;

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
  // 这样做可以确保与您提供的示例代码完全一致，并且复用 Quasar 强大的逻辑。
  return date.formatDate(dateInput, formatString);
}