# rtcpt

一个基于 Vite 和 TypeScript 的 Vue 3 组件库。包含 34+ 个开箱即用的组件，原生支持 Quasar 和 Chart.js。

[English Documentation](./README.md)

## 都有啥

- **34+ 个组件** - 表单、表格、图表、对话框，该有的都有
- **内置国际化** - 中英文翻译都帮你准备好了
- **图表组件** - 集成了 Chart.js，数据可视化直接用
- **TypeScript 支持** - 全量类型定义，IDE 自动补全贼爽
- **工具函数** - 日期格式化、文件下载、数据格式化等常用功能
- **按需加载** - Tree-shaking 支持，只打包你用到的代码

## 安装

```bash
npm install rtcpt
# 或者
yarn add rtcpt
```

## 对等依赖

这些依赖需要在你的项目里装好:

- **vue** (^3.0.0)
- **quasar** (^2.0.0)
- **chart.js** (^4.0.0) - 只有用图表组件 (j-ch 系列) 的时候才需要

```bash
npm install vue quasar chart.js
# 或者
yarn add vue quasar chart.js
```

确保你的项目已经配置好 Quasar。

**注意：** 样式会在你导入任何组件时自动注入，不需要手动导入 CSS 文件。

## 组件概览

### j-c 系列 (11 个组件) - 自定义组件
- `jCsvg` - SVG 图标封装
- `JCDuoListEditor` - 双列表编辑器
- `JCEditableProxy` - 可编辑代理，带弹窗编辑器
- `JCFallback` - 兜底显示组件
- `JCFormatLookup` - 格式查找组件
- `JCListEditor` - 列表编辑器
- `JCPermission` - 权限控制容器
- `JCTabs` - 标签页组件
- `JCTitleLine` - 标题线组件
- `JCTree` - 树形组件
- `JCTreeSelect` - 树形下拉选择

### j-ch 系列 (6 个组件) - Chart.js 图表
- `JChBar` - 柱状图
- `JChBarLine` - 柱状图和折线图混合
- `JChBubble` - 气泡图
- `JChLine` - 折线图
- `JChPieDoughnut` - 饼图/环形图
- `JChRadar` - 雷达图

### j-q 系列 (17 个组件) - Quasar 增强组件
- `JQAutocomplete` - 自动完成输入框
- `JQConfirm` - 确认对话框
- `JQDate` - 日期选择器
- `JQDatetime` - 日期时间选择器
- `JQDetailList` - 详情列表展示
- `JQDialog` - 增强对话框
- `JQFile` - 文件上传组件
- `JQFormLabel` - 表单标签容器
- `JQInput` - 增强输入框，带校验
- `JQNewValue` - 多值输入框（回车添加）
- `JQOptionGroup` - 选项组选择器
- `JQPopover` - 弹出层
- `JQSearchForm` - 搜索表单容器
- `JQSelect` - 增强下拉选择
- `JQTable` - 增强表格，带分页
- `JQTooltip` - 提示框

## 快速上手

### 基础用法

```vue
<template>
  <div>
    <!-- 输入框组件 -->
    <JQInput v-model="username" label="用户名" />
    
    <!-- 表格组件 -->
    <JQTable 
      :columns="columns"
      :rows="rows"
      @paginationChange="handlePaginationChange"
    />
    
    <!-- 图表组件 -->
    <JChBar 
      :labels="['一月', '二月', '三月']"
      :datasets="chartData"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { JQInput, JQTable, JChBar } from 'rtcpt';

const username = ref('');
const columns = [
  { name: 'name', label: '姓名', field: 'name' },
  { name: 'age', label: '年龄', field: 'age' }
];
const rows = ref([]);
const chartData = ref([
  { label: '销售额', data: [10, 20, 30] }
]);
</script>
```

## 国际化

组件库自带国际化系统，不会跟你项目的 i18n 冲突。

### 设置语言

```typescript
import { setLocale } from 'rtcpt';

// 设置为中文
setLocale('zh-CN');

// 设置为英文
setLocale('en-US');
```

### 在应用初始化时设置

```typescript
// main.ts
import { createApp } from 'vue';
import { setLocale } from 'rtcpt';
import App from './App.vue';

const app = createApp(App);

// 根据用户偏好设置语言
const userLocale = localStorage.getItem('locale') || 'zh-CN';
setLocale(userLocale as 'zh-CN' | 'en-US');

app.mount('#app');
```

### 动态切换语言

```vue
<template>
  <q-select
    v-model="currentLang"
    :options="langOptions"
    @update:model-value="handleLangChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { setLocale, getLocale } from 'rtcpt';

const currentLang = ref(getLocale());
const langOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
];

const handleLangChange = (val) => {
  setLocale(val);
};
</script>
```

### 在组件中使用国际化

```typescript
import { useI18n, t } from 'rtcpt';

// 在组件 setup 中使用
const { t } = useI18n();
console.log(t('action.confirm')); // "确认" 或 "Confirm"

// 直接使用
import { t } from 'rtcpt';
const message = t('messages.pleaseSelect'); // "请选择" 或 "Please select"
```

## 工具函数

所有工具函数都可以通过 `jqTool` 命名空间访问：

```typescript
import { jqTool } from 'rtcpt';

// 使用 jqTool.* 访问所有工具函数
jqTool.formatDate(Date.now(), 'YYYY-MM-DD');
jqTool.JQDownloadFile(blob, 'file.pdf');
jqTool.transformTreeUseLabelAndValue(treeData);
```

### 文件下载

```typescript
import { jqTool } from 'rtcpt';

// 下载文件
const blob = new Blob([data], { type: 'application/json' });
jqTool.JQDownloadFile(blob, 'data.json');

// 生成带时间戳的文件名
const filename = jqTool.generateDownloadFileName('报表', 'xlsx');
// 输出: "报表_20251202143025.xlsx"
```

### 日期格式化

```typescript
import { jqTool } from 'rtcpt';

// 格式化日期
const formatted = jqTool.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss');
// 输出: "2025-12-02 14:30:25"

// 创建用于表格列的格式化器
const dateFormatter = jqTool.defaultDateFormat('YYYY-MM-DD');
const displayValue = dateFormatter(timestamp, row);
```

### 数据大小格式化

```typescript
import { jqTool } from 'rtcpt';

// 格式化大小
const size = jqTool.formatSize({ size: 1024000, unit: 'B' });
// 输出: "1,000 KB"

// 自动转换到合适的单位
const { size: newSize, unit } = jqTool.getUpperSize({ size: 2048, unit: 'MB' });
// 输出: { size: 2, unit: 'GB' }

// 创建用于表格列的格式化器
const sizeFormatter = jqTool.defaultDataFormat('--', { digits: 2 });
```

### 数据格式化

```typescript
import { jqTool } from 'rtcpt';

// 处理空值
jqTool.defaultFill(null);        // "--"
jqTool.defaultFill(0);          // 0
jqTool.defaultFill('value');    // "value"

// 创建自定义格式化器
const formatter = jqTool.defaultFormat((val) => `¥${val}`, '暂无');
formatter(100, row);     // "¥100"
formatter(null, row);    // "暂无"
```

### 树形数据转换

```typescript
import { jqTool } from 'rtcpt';

// 转换树形数据使用 label/value
const transformedTree = jqTool.transformTreeUseLabelAndValue(treeData, {
  optionLabel: 'name',
  optionValue: 'id',
  optionChildren: 'children'
});
```

## 服务

### 对话框服务

编程方式创建对话框:

```typescript
import { DialogProvider } from 'rtcpt';

// 基础用法
const dialog = DialogProvider.register({
  title: '编辑用户',
  component: UserEditForm,
  componentBind: {
    userId: 123
  }
});

// 可选: 配置 router、store、i18n（如果需要的话）
DialogProvider.configure({
  router,
  store,
  i18n
});
```

### 消息提示服务

显示通知:

```typescript
import { JQMessage } from 'rtcpt';

// 成功消息
JQMessage.show({
  type: 'success',
  content: '操作成功！'
});

// 错误消息
JQMessage.show({
  type: 'error',
  content: '出错了',
  isNotify: true  // 显示关闭按钮
});
```

### 确认对话框

显示确认对话框:

```typescript
import { JQConfirmDialog } from 'rtcpt';

const confirmed = await JQConfirmDialog.show({
  title: '删除确认',
  content: '确定要删除这条数据吗？'
});

if (confirmed) {
  // 用户点击了确认
} else {
  // 用户点击了取消
}
```

## 更多示例

### 带权限的可编辑字段

```vue
<template>
  <JCEditableProxy v-model="userEmail" code="user.edit">
    <template #editor="{ tempValue, updateTempValue, setEditorRef }">
      <q-input
        :model-value="tempValue"
        @update:model-value="updateTempValue"
        :ref="setEditorRef"
        type="email"
        :rules="[(val) => !!val || '邮箱不能为空']"
      />
    </template>
  </JCEditableProxy>
</template>

<script setup>
import { ref } from 'vue';
import { JCEditableProxy } from 'rtcpt';

const userEmail = ref('user@example.com');
</script>
```

### 树形选择

```vue
<template>
  <JCTreeSelect
    v-model="selectedValues"
    :options="treeOptions"
    multiple
    option-label="label"
    option-value="id"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JCTreeSelect } from 'rtcpt';

const selectedValues = ref([]);
const treeOptions = ref([
  {
    id: 1,
    label: '父节点 1',
    children: [
      { id: 11, label: '子节点 1-1' },
      { id: 12, label: '子节点 1-2' }
    ]
  }
]);
</script>
```

### 图表示例

```vue
<template>
  <JChBar 
    :labels="months"
    :datasets="salesData"
    :height="400"
  />
</template>

<script setup>
import { ref } from 'vue';
import { JChBar } from 'rtcpt';

const months = ['一月', '二月', '三月', '四月', '五月', '六月'];
const salesData = ref([
  {
    label: '2024年',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(54, 162, 235, 0.5)'
  }
]);
</script>
```

## API 参考

### 国际化函数

```typescript
// 设置语言
setLocale(locale: 'zh-CN' | 'en-US'): void

// 获取当前语言
getLocale(): 'zh-CN' | 'en-US'

// 带变量的翻译
t(key: string, variables?: Record<string, any>): string

// 带变量的示例
t('messages.formRules.rangeInt', { min: 1, max: 100 })
// 输出: "值必须是 1 到 100 之间的整数" 或 "Value must be an integer between 1 and 100"

// 在组件中使用
const { t, locale, setLocale, getLocale } = useI18n();
```

### 工具函数

所有工具函数都可以通过 `jqTool` 命名空间访问：

```typescript
import { jqTool } from 'rtcpt';

// 文件操作
jqTool.JQDownloadFile(blob: Blob, filename: string): void
jqTool.generateDownloadFileName(baseName: string, ext: string): string

// 日期格式化
jqTool.formatDate(date: Date | string | number, format?: string): string
jqTool.defaultDateFormat(format?: string, fallback?: string): Function

// 数据大小格式化
jqTool.formatSize(options: { size: number; unit?: 'B'|'KB'|'MB'|'GB'|'TB' }): string
jqTool.getUpperSize(sizeUnit: { size: number; unit?: string }, options?: any): { size: number; unit: string }
jqTool.defaultDataFormat(fallback?: string, options?: { digits?: number; unit?: string }): Function

// 通用格式化
jqTool.defaultFill(val: any): any
jqTool.defaultFormat(formatter?: Function, fallback?: string): Function

// 树形数据转换
jqTool.transformTreeUseLabelAndValue(array: any[], config?: {
  optionLabel?: string;
  optionValue?: string;
  optionChildren?: string;
}): any[]
```

## TypeScript 支持

所有组件和工具都有完整的类型定义，按需导入就行:

```typescript
import type { 
  Locale,
  DateTimeRangeValue,
  SelectionConditions,
  TableColumn 
} from 'rtcpt';
```

## 完整组件列表

### 导入组件

```typescript
// 按需导入（推荐）
import {
  // j-c 系列
  jCsvg,
  JCDuoListEditor,
  JCEditableProxy,
  JCFallback,
  JCFormatLookup,
  JCListEditor,
  JCPermission,
  JCTabs,
  JCTitleLine,
  JCTree,
  JCTreeSelect,
  
  // j-ch 系列（需要 chart.js）
  JChBar,
  JChBarLine,
  JChBubble,
  JChLine,
  JChPieDoughnut,
  JChRadar,
  
  // j-q 系列
  JQAutocomplete,
  JQConfirm,
  JQDate,
  JQDatetime,
  JQDetailList,
  JQDialog,
  JQFile,
  JQFormLabel,
  JQInput,
  JQNewValue,
  JQOptionGroup,
  JQPopover,
  JQSearchForm,
  JQSelect,
  JQTable,
  JQTooltip,
} from 'rtcpt';

// 或者全部导入
import * as RTCPT from 'rtcpt';
```

## 开发

```bash
# 安装依赖
npm install

# 构建库
npm run build

# 发布（会自动构建）
npm run prepublishOnly
```

## 开源协议

MIT

---

## 更多示例

### 带格式化的表格

```vue
<template>
  <JQTable
    :columns="columns"
    :rows="users"
    @paginationChange="loadData"
  >
    <template #body-cell-status="props">
      <q-badge :color="props.row.status === 'active' ? 'green' : 'grey'">
        {{ props.row.status }}
      </q-badge>
    </template>
  </JQTable>
</template>

<script setup>
import { JQTable, jqTool } from 'rtcpt';

const columns = [
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { 
    name: 'created', 
    label: '创建时间', 
    field: 'created',
    format: (val) => jqTool.formatDate(val, 'YYYY-MM-DD HH:mm')
  },
  { 
    name: 'size', 
    label: '大小', 
    field: 'size',
    format: (val) => jqTool.formatSize({ size: val, unit: 'B' })
  },
  { name: 'status', label: '状态', field: 'status' }
];

const users = ref([]);
</script>
```

### 带校验的表单

```vue
<template>
  <div class="q-gutter-md">
    <JQInput
      v-model="form.email"
      label="邮箱"
      type="email"
      :rules="[
        (val) => !!val || t('messages.formRules.required'),
        (val) => /.+@.+\..+/.test(val) || t('messages.formRules.emailInvalid')
      ]"
    />
    
    <JQDatetime
      v-model="form.birthday"
      label="生日"
      range
    />
    
    <JQSelect
      v-model="form.role"
      :options="roleOptions"
      label="角色"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { JQInput, JQDatetime, JQSelect, useI18n } from 'rtcpt';

const { t } = useI18n();
const form = reactive({
  email: '',
  birthday: null,
  role: null
});
const roleOptions = ['admin', 'user', 'guest'];
</script>
```

### 基于权限的显示

```vue
<template>
  <div>
    <!-- 只有有权限才显示 -->
    <JCPermission code="user.delete">
      <q-btn color="negative" label="删除" @click="handleDelete" />
    </JCPermission>
    
    <!-- 没数据时显示兜底内容 -->
    <JCFallback :value="userData">
      <template #default>{{ userData.name }}</template>
    </JCFallback>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { JCPermission, JCFallback } from 'rtcpt';

const userData = ref(null);
</script>
```

## 贡献

欢迎贡献代码！这个库是从实际项目中提取出来的。

## 支持

有问题或发现 bug？去 GitHub 开个 issue 就行。

