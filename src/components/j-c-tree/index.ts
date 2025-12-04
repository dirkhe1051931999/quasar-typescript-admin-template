// 定义原始数组元素的通用接口
interface RawItem extends Record<string, any> {
  [key: string]: any;
}

// 定义目标数组元素的接口
interface TargetOption {
  label: string;
  value: string | number;
  row: RawItem;
  children?: TargetOption[];
}

// 定义配置接口
interface TransformConfig {
  optionLabel?: string;
  optionValue?: string;
  optionChildren?: string;
}

/**
 * 把通用数组转成 label/value/children 格式的数组。
 *
 * @param array 待转换的原始数组。
 * @param config 包含自定义键名的配置对象。
 * @returns 转换后的 TargetOption 数组。
 */
export function transformTreeUseLabelAndValue(array: RawItem[], config: TransformConfig = {}): TargetOption[] {
  if (!Array.isArray(array)) {
    return [];
  }

  // 结构赋值并设置默认值
  const { optionLabel = 'label', optionValue = 'value', optionChildren = 'children' } = config;

  return array.map((item) => {
    // 提取 label 和 value
    const label = String(item[optionLabel] ?? '');
    const value = item[optionValue] as string | number;

    // 创建新的目标对象
    const targetItem: TargetOption = {
      label,
      value,
      row: item, // 保留原始对象
    };

    // 检查并递归处理子数组
    const rawChildren = item[optionChildren];
    if (Array.isArray(rawChildren) && rawChildren.length > 0) {
      // 递归调用时，需要把 config 对象完整传递下去
      targetItem.children = transformTreeUseLabelAndValue(rawChildren, config);
    }

    return targetItem;
  });
}
