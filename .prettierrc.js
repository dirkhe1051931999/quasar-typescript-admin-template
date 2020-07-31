module.exports = {
  useTabs: false, // 制表符缩进
  printWidth: 150, // 换行长度
  tabWidth: 2, // 缩进空格数
  singleQuote: true, // 使用单引号
  semi: true, // 末尾分号设置
  /**
   * 最后一个对象元素加逗号
   * 选项:
   *   - "none" - 不添加
   *   - "es5" - ES5中末尾添加逗号
   *   - "all" - 全部添加
   */
  trailingComma: 'all',
  bracketSpacing: true, // 对象，数组加空格
  jsxBracketSameLine: false, // JSX > 后是否另起一行
  arrowParens: 'always', // (x) => {}箭头函数值有一个参数是否要有小括号
  /**
   * Prettier解析器设置
   * 选项:
   *   - "flow" 流的形式
   *   - "babylon" babel解析器
   */
  // parser: 'babylon',
  // 是否要注释来决定是否格式化代码
  requirePragma: false,
  // 代码超出是否要换行 preserve保留
  proseWrap: 'preserve',
};
