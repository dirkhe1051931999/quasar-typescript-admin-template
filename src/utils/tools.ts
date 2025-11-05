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
    return val;
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
