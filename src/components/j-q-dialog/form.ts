import { getUpperSize } from 'src/utils/tool.ts';

/**
 * @function val2Str
 * @description 对输入的值进行类型转换，把数字转成字符串，把 null/undefined 转成空字符串。
 * @param {any} value 需要转换的值。
 * @returns {string | T} 转换后的值或原始值。
 */
export function val2Str<T>(value: T): string | T {
  if (value === null || typeof value === 'undefined') {
    return '';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'bigint') {
    return value.toString();
  }
  // 处理 BigNumber 对象（bignumber.js, decimal.js 等大数库）
  if (typeof value === 'object' && value !== null) {
    // 检查是否有 toString 方法（BigNumber 对象都有）
    if (typeof (value as any).toString === 'function') {
      // 检查是否是 BigNumber 类型（通过构造函数名称或特征属性）
      const constructor = (value as any).constructor?.name;
      if (constructor === 'BigNumber' || constructor === 'Decimal' || 
          's' in value && 'e' in value && 'c' in value) {
        return (value as any).toString();
      }
    }
  }
  return value;
}

/**
 * @function valSplit
 * @description 把逗号分隔的字符串转成字符串数组。安全处理 null 或 undefined 输入。
 * @param {string | null | undefined} input 可能包含逗号分隔值的输入。
 * @returns {string[]} 分割后的字符串数组。
 */
export function valSplit(input: string | null | undefined): any {
  if (input === null || typeof input === 'undefined') {
    return [];
  }

  if (typeof input !== 'string') {
    return [];
  }

  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function dataCvSize(size: any, unit: any, maxUnit: any = 'TB') {
  size = Number(size) || 0;
  return getUpperSize({ size, unit }, { maxUnit }) as any;
}

/**
 * @function obj2Arr
 * @description 提取传入的 JSON 数组字符串中的 MCC 数组。
 * @param {string | any} data 输入数据，必须是 JSON 数组字符串，或空值。
 * @param keyToExtract
 * @returns {string[]} 提取到的 MCC 字符串数组。
 */
export function obj2Arr(data: string | any, keyToExtract: string): any {
  if (data === null || typeof data === 'undefined') {
    return [];
  }

  let parsedArray: any;

  if (typeof data === 'string') {
    try {
      parsedArray = JSON.parse(data);
    } catch (e) {
      console.error('Input string is not a valid JSON array string.', e);
      return [];
    }
  } else if (Array.isArray(data)) {
    parsedArray = data;
  } else {
    return [];
  }

  if (!Array.isArray(parsedArray)) {
    return [];
  }

  return parsedArray
    .map((item: any) => {
      if (item && typeof item === 'object' && item[keyToExtract] && typeof item[keyToExtract] === 'string') {
        return item[keyToExtract];
      }
      return null;
    })
    .filter((value): value is string => value !== null);
}
