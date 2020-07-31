const { resolve } = require('path');
module.exports = {
  root: true,
  parserOptions: {
    // extraFileExtensions: ['.vue'],
    // parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    // tsconfigRootDir: __dirname,
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',
    // consider disabling this class of rules if linting takes too long
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    'plugin:vue/essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',
    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用 tab
    'no-tabs': 'off',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/class-name-casing': 'off',
    // 禁止使用 var
    'no-var': 'error',
    // 没用到的变量warn
    'no-unused-vars': 'warn',
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 'error',
    // 要求回调函数使用箭头函数
    'prefer-arrow-callback': 'error',
    // 要求使用模板字面量而非字符串连接
    'prefer-template': 'error',
    // 禁止修改 const 声明的变量
    'no-const-assign': 'error',
    // 在定义变量前不允许使用变量
    'no-use-before-define': 'error',
    // 不允许无用的return
    'no-useless-return': 'error',
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 'error',
    // 禁止重复模块导入
    // 'no-duplicate-imports': 'error',
    // 禁止console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': 'off',
    'no-unsafe-any': 0,
  },
};
