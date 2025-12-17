# RTCPT - Vue 3 + Quasar Component Library

A modern enterprise-grade component library built with Vue 3, TypeScript, and Quasar.

---

## What's Inside

- Modern UI components based on Quasar
- Full TypeScript support
- Ready-to-use enterprise components
- Built-in i18n (English)
- Permission control system
- Chart.js powered visualizations
- Highly customizable themes

---

## Installation

```bash
npm install rtcpt
# or
yarn add rtcpt
# or
pnpm add rtcpt
```

### Peer Dependencies

```json
{
  "vue": "^3.0.0",
  "quasar": "^2.0.0",
  "chart.js": "^4.0.0"
}
```

### Required Quasar Plugins

You need to register these Quasar plugins in your app:

```typescript
import { Quasar, Notify, Dialog } from 'quasar'

app.use(Quasar, {
  plugins: {
    Notify,  // required for messages
    Dialog   // required for dialogs
  }
})
```

---

## Quick Start

### 1. Import Styles

In your main entry file (like `main.ts`):

```typescript
import 'rtcpt/rtcpt.css'
import 'rtcpt/rtcpt-styles.css'
```

### 2. Initialize

```typescript
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import { rtcptInit } from 'rtcpt'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog
  }
})

rtcptInit({
  app,
  router,
  // optional: permission config
  pagePermissionIds: ref(['operation-all', 'user-edit']),
  // optional: custom colors
  colors: {
    primary: '#1976D2',
    grey: '#666666'
  }
})

app.mount('#app')
```

### 3. Use Components

```vue
<template>
  <div>
    <j-q-input 
      v-model="value" 
      label="Username"
      :rules="[val => !!val || 'Username is required']"
    />
    
    <j-q-select
      v-model="selectedValue"
      :options="options"
      label="Select"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQInput, JQSelect } from 'rtcpt'

const value = ref('')
const selectedValue = ref(null)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 }
])
</script>
```

---

## Components

### Form Components

| Component           | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| **JQInput**         | Input field with validation, password toggle, secret masking |
| **JQSelect**        | Dropdown with single/multi select, search, remote data       |
| **JQDate**          | Date picker, single or range mode                            |
| **JQDatetime**      | Date and time combined picker                                |
| **JQFile**          | File upload with drag-drop support                           |
| **JQAutocomplete**  | Auto-complete input with remote search                       |
| **JQFormLabel**     | Form label with required marker and tips                     |
| **JQSearchForm**    | Quick search form with query/reset buttons                   |
| **JCListEditor**    | Dynamic list item editor                                     |
| **JCDuoListEditor** | Key-value pair list editor                                   |

### Data Display Components

| Component        | Description                                    |
| ---------------- | ---------------------------------------------- |
| **JQTable**      | Data table with pagination, sorting, selection |
| **JQDetailList** | Structured detail display                      |
| **JCTree**       | Tree view with selection                       |
| **JCTreeSelect** | Dropdown tree selector                         |
| **JQTooltip**    | Smart tooltip                                  |
| **JQPopover**    | Popover content                                |
| **JCTabs**       | Tab switching                                  |
| **JCTitleLine**  | Section title separator                        |

### Chart Components

All chart components are built on Chart.js.

| Component          | Description           |
| ------------------ | --------------------- |
| **JChLine**        | Line chart            |
| **JChBar**         | Bar chart             |
| **JChBarLine**     | Mixed bar-line chart  |
| **JChPieDoughnut** | Pie or doughnut chart |
| **JChRadar**       | Radar chart           |
| **JChBubble**      | Bubble chart          |

### Utility Components

| Component           | Description                           |
| ------------------- | ------------------------------------- |
| **JQDialog**        | Dialog with dynamic component support |
| **JQConfirm**       | Quick confirm action                  |
| **JQConfirmDialog** | Confirm dialog with icon              |
| **JQMessage**       | Global message notifications          |
| **JCCopy**          | Copy to clipboard button              |
| **JCPermission**    | Permission-based content display      |
| **JCEditableProxy** | Double-click to edit                  |
| **JCFallback**      | Async component loading placeholder   |
| **JCFormatLookup**  | Data format display                   |
| **JQOptionGroup**   | Radio/checkbox button group           |
| **JQNewValue**      | New/modified value marker             |

---

## Component Examples

### JQInput

Basic input:

```vue
<j-q-input v-model="username" label="Username" placeholder="Enter username" />
```

With validation:

```vue
<j-q-input 
  v-model="email" 
  label="Email"
  :rules="[
    val => !!val || 'Email is required',
    val => /.+@.+\..+/.test(val) || 'Invalid email format'
  ]"
/>
```

Password input:

```vue
<j-q-input v-model="password" label="Password" custom-type="password">
  <template #append="{ toggleVisibility, isContentVisible }">
    <q-icon 
      :name="isContentVisible ? 'visibility' : 'visibility_off'"
      @click="toggleVisibility"
      class="cursor-pointer"
    />
  </template>
</j-q-input>
```

### JQSelect

Basic select:

```vue
<j-q-select
  v-model="value"
  :options="options"
  option-label="label"
  option-value="value"
  label="Choose one"
/>
```

Multi-select with chips:

```vue
<j-q-select
  v-model="selectedValues"
  :options="options"
  multiple
  use-chips
  label="Multi-select"
/>
```

### JQDate

Single date:

```vue
<j-q-date v-model="date" label="Pick a date" />
```

Date range:

```vue
<j-q-date v-model="dateRange" label="Date range" range />
```

### JQFile

File upload:

```vue
<j-q-file 
  v-model="files"
  accept="image/*"
  max-file-size="5 MB"
/>
```

### JQTable

> `JQTable` 是基于 Quasar 的 `QTable` 封装的企业表格组件，内置了自定义分页（组件内部隐藏了 `QTable` 自带分页），并额外支持：
>
> - **列点击**：通过 `columns[].onClick` 让单元格变为可点击链接
> - **长文本省略**：通过 `columns[].whiteSpace`（1~3）做多行省略 + 溢出自动 tooltip
> - **宽度限制**：通过 `columns[].limitWidth` 限制最大宽度（响应式 500/300px）
> - **ref 方法**：通过 `ref` 暴露分页与滚动控制（例如 `setTotal` / `setNum` / `scrollTop`）

#### Usage

最常见的用法是**服务端分页**：你监听 `pagination-change`，请求数据后更新 `rows`，并调用 `setTotal(total)` 更新总数（否则分页不会显示）。

```vue
<template>
  <j-q-table
    ref="tableRef"
    :columns="columns"
    :rows="rows"
    :loading="loading"
    row-key="id"
    @pagination-change="handlePaginationChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Row = { id: number; name: string; email: string; status: 'active' | 'disabled' }

// 仅用于示例说明：列结构兼容 QTable columns，并额外支持 whiteSpace/limitWidth/onClick/clickable
type TableColumn = Record<string, any> & {
  name: string
  whiteSpace?: 1 | 2 | 3
  limitWidth?: boolean
  onClick?: (row: any) => void
  clickable?: (value: any, row: any) => boolean
}

const tableRef = ref<any>()
const loading = ref(false)
const rows = ref<Row[]>([])

const columns: TableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'left', whiteSpace: 2 },
  { name: 'email', label: 'Email', field: 'email', limitWidth: true },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
    onClick: (row) => console.log('clicked', row),
    clickable: (value, row) => !!row?.id
  }
]

const handlePaginationChange = async (pagination: { page: number; rowsPerPage: number }) => {
  loading.value = true
  const data = await fetchData({
    page: pagination.page,
    pageSize: pagination.rowsPerPage
  })
  rows.value = data.rows
  tableRef.value.setTotal(data.total)
  loading.value = false
}
</script>
```

#### Custom cell slot

和 Quasar 的 `QTable` 一样，你可以通过 `body-cell-{colName}` 来自定义列渲染：

```vue
<template #body-cell-status="props">
  <q-td :props="props">
    <q-badge
      :color="props.row.status === 'active' ? 'green' : 'grey'"
      :label="props.row.status"
    />
  </q-td>
</template>
```

#### Column extensions（相比 QTable 的增强字段）

- **`whiteSpace?: 1 | 2 | 3`**：多行省略，内容溢出时自动显示 tooltip（建议用于文本列）
- **`limitWidth?: boolean`**：限制最大宽度（响应式 500px / 300px），并包裹到 `.cell-limit-width`
- **`onClick?: (row) => void`**：让该列呈现“链接样式”，点击触发回调
- **`clickable?: (value, row) => boolean`**：配合 `onClick`，按条件决定该单元格是否可点（默认：`null/undefined` 不可点）

示例（固定列）：给 column 的 `classes/headerClasses` 增加 `table-cell--fix-left` / `table-cell--fix-right`。

#### API（Quasar 风格）

##### Props

| Name                     | Type                        | Default | Description                                                                               |
| ------------------------ | --------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `columns`                | `any[]`                     | `[]`    | 列定义（兼容 `QTable` columns，并支持扩展字段 `whiteSpace/limitWidth/onClick/clickable`） |
| `rows`                   | `any[]`                     | `[]`    | 表格数据                                                                                  |
| `rowKey`                 | `string \| ((row) => any)`  | `'id'`  | 行唯一键                                                                                  |
| `loading`                | `boolean`                   | `false` | 加载态（显示内置 loading）                                                                |
| `flat`                   | `boolean`                   | `true`  | 透传给 `QTable`                                                                           |
| `dense`                  | `boolean`                   | `false` | 透传给 `QTable`                                                                           |
| `hidePagination`         | `boolean`                   | `false` | 隐藏底部分页                                                                              |
| `selected`               | `any[] \| null`             | `null`  | 选中行（v-model:selected）。不传则组件内部自管                                            |
| `tableClass`             | `string \| object \| any[]` | -       | 附加到 `QTable` 的 class                                                                  |
| `tableHeaderClass`       | `string \| object \| any[]` | -       | 透传给 `QTable` 的 `table-header-class`                                                   |
| `autoScrollOnChangePage` | `boolean`                   | `true`  | 翻页/改 pageSize 后自动滚动到表格顶部                                                     |
| `autoHeight`             | `boolean`                   | `false` | 预留字段（样式类 `table--auto-height` 需要你通过 `tableClass` 自行加上）                  |

##### Events

| Name                | Payload                             | Description                  |
| ------------------- | ----------------------------------- | ---------------------------- |
| `update:selected`   | `any[]`                             | v-model:selected 更新        |
| `pagination-change` | `{ page, rowsPerPage, rowsNumber }` | 分页改变（来自内置分页组件） |

##### Slots

| Name                 | Scope                      | Description          |
| -------------------- | -------------------------- | -------------------- |
| `top`                | -                          | `QTable` top 区域    |
| `header`             | `QTable` header scope      | 自定义表头整行       |
| `body`               | `QTable` body scope        | 自定义表体整行       |
| `append`             | -                          | 表格底部追加内容     |
| `header-cell-{name}` | `QTable` header-cell scope | 自定义某列表头单元格 |
| `body-cell-{name}`   | `QTable` body-cell scope   | 自定义某列单元格     |

##### Exposed (via `ref`)

| Name                    | Type                                      | Description                             |
| ----------------------- | ----------------------------------------- | --------------------------------------- |
| `setTotal(total)`       | `(total?: number) => void`                | 设置总条数（分页显示依赖 `rowsNumber`） |
| `setNum(page)`          | `(page?: number) => void`                 | 设置当前页（默认 1）                    |
| `setSize(rowsPerPage)`  | `(rowsPerPage?: number) => void`          | 设置每页条数                            |
| `getPaginationParam()`  | `() => { page; rowsPerPage; rowsNumber }` | 获取分页参数                            |
| `scrollTop()`           | `() => void`                              | 平滑滚动到表格顶部                      |
| `ROWS_PER_PAGE_OPTIONS` | `number[]`                                | 默认每页条数选项                        |
| `DEFAULT_ROWS_PER_PAGE` | `number`                                  | 默认每页条数（15）                      |

### JQDetailList（detail-list）

> 项目中的 detail-list（你提到的 `j-c-list`）组件实际为 `JQDetailList`（标签：`<j-q-detail-list />`），用于把「对象详情」按栅格布局展示，并支持 options 映射、日期格式化、条件显示、以及按字段自定义渲染。

#### Usage

```vue
<template>
  <j-q-detail-list :items="items" :data="detail" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

type DetailItem = {
  name: string
  label: string
  span?: number
  align?: 'left' | 'right' | 'center'
  date?: boolean | string
  options?: Record<string, any>[]
  findByKey?: string
  displayKey?: string
  tip?: string
  format?: (value: any) => any
  visible?: boolean | ((data: Record<string, any>) => boolean)
}

const detail = ref({
  id: 1,
  name: 'Alice',
  status: 'active',
  createdAt: '2025-12-01 10:20:30'
})

const items: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6 },
  { name: 'name', label: '姓名', span: 6, tip: '用户在系统中的显示名' },
  {
    name: 'status',
    label: '状态',
    span: 6,
    options: [
      { value: 'active', label: '启用', class: 'text-positive' },
      { value: 'disabled', label: '停用', class: 'text-grey' }
    ],
    findByKey: 'value',
    displayKey: 'label'
  },
  { name: 'createdAt', label: '创建时间', span: 6, date: 'YYYY-MM-DD HH:mm:ss' }
]
</script>
```

#### Custom item slot

你可以用 `item-value-{name}` 精准覆盖某个字段的展示：

```vue
<j-q-detail-list :items="items" :data="detail">
  <template #item-value-status="{ value }">
    <q-badge :color="value === 'active' ? 'positive' : 'grey'" :label="value" />
  </template>
</j-q-detail-list>
```

#### API（Quasar 风格）

##### Props

| Name     | Type                  | Default             | Description              |
| -------- | --------------------- | ------------------- | ------------------------ |
| `items`  | `DetailItem[]`        | -                   | 展示配置（必填）         |
| `data`   | `Record<string, any>` | -                   | 详情数据对象（必填）     |
| `gutter` | `string`              | `'q-col-gutter-md'` | 外层 row 的 gutter class |

##### Slots

| Name                | Scope                              | Description                 |
| ------------------- | ---------------------------------- | --------------------------- |
| `item-value-{name}` | `{ value, item, data, fieldName }` | 自定义某个字段的 value 渲染 |

##### `DetailItem` 字段说明

| Field        | Type                            | Description                                        |
| ------------ | ------------------------------- | -------------------------------------------------- |
| `name`       | `string`                        | 字段名（对应 `data[name]`）                        |
| `label`      | `string`                        | 标题                                               |
| `span`       | `number`                        | 栅格列宽（`col-{span}`），默认 6                   |
| `align`      | `'left' \| 'center' \| 'right'` | value 对齐方式，默认 left                          |
| `tip`        | `string`                        | 标题旁的提示 tooltip                               |
| `visible`    | `boolean \| (data) => boolean`  | 控制该项是否显示                                   |
| `format`     | `(value) => any`                | 自定义格式化（优先于 date/options）                |
| `date`       | `true \| string`                | 日期格式化：`true` 用默认格式；string 则用指定格式 |
| `options`    | `Record<string, any>[]`         | 值映射列表（如字典）                               |
| `findByKey`  | `string`                        | 在 `options` 中按哪个 key 匹配 value               |
| `displayKey` | `string`                        | 显示 `options` 的哪个 key，默认 `'label'`          |

### JQDialog

Basic dialog:

```vue
<j-q-dialog ref="dialogRef" title="User Info" :max-width="600">
  <div>Dialog content</div>
</j-q-dialog>

<script setup>
const dialogRef = ref()
const openDialog = () => dialogRef.value.open()
</script>
```

Sidebar mode:

```vue
<j-q-dialog ref="dialogRef" title="Details" position="right">
  <div>Sidebar content</div>
</j-q-dialog>
```

### JQMessage

```typescript
import { JQMessage } from 'rtcpt'

JQMessage.show({ type: 'success', content: 'Done!' })
JQMessage.show({ type: 'error', content: 'Something went wrong' })
JQMessage.show({ type: 'warn', content: 'Please check your input' })
```

### JQConfirmDialog

```typescript
import { JQConfirmDialog } from 'rtcpt'

const confirmed = await JQConfirmDialog.show({
  title: 'Confirm Delete',
  message: 'This action cannot be undone. Continue?',
  confirmText: 'Delete',
  cancelText: 'Cancel'
})

if (confirmed) {
  await deleteItem(id)
}
```

### JCCopy

```vue
<span>{{ apiKey }}</span>
<j-c-copy :text="apiKey" />
```

### JCPermission

```vue
<j-c-permission permission-id="user-edit">
  <q-btn label="Edit" @click="handleEdit" />
</j-c-permission>
```

Setup permissions in init:

```typescript
rtcptInit({
  app,
  pagePermissionIds: ref(['user-view', 'user-edit', 'user-delete'])
})
```

### Chart Components

Line chart:

```vue
<j-ch-line :labels="['Jan', 'Feb', 'Mar']" :datasets="datasets" :height="400" />
```

Bar chart:

```vue
<j-ch-bar :labels="['A', 'B', 'C']" :datasets="datasets" />
```

Pie chart:

```vue
<j-ch-pie-doughnut :labels="labels" :datasets="datasets" chart-type="pie" />
```

---

## i18n

Built-in i18n support:

```typescript
import { useI18n, setLocale, getLocale } from 'rtcpt'

const { t } = useI18n()

setLocale('en-US')

const message = t('messages.pleaseEnter')  // "Please enter"
```

---

## Theming

### Custom Colors

Set colors during init:

```typescript
rtcptInit({
  app,
  colors: {
    primary: '#1976D2',
    secondary: '#26A69A',
    accent: '#9C27B0',
    positive: '#21BA45',
    negative: '#C10015',
    info: '#31CCEC',
    warning: '#F2C037',
    dark: '#1D1D1D',
    grey: '#666666'
  }
})
```

### CSS Variables

Colors are available as CSS variables:

```scss
.my-component {
  color: var(--j-color-primary);
  background: var(--j-color-grey);
}
```

---

## Utilities

```typescript
import { jqTool } from 'rtcpt'

// Transform tree data field names
const transformed = jqTool.transformTreeUseLabelAndValue(
  treeData,
  { labelKey: 'name', valueKey: 'id' }
)

// Download file
jqTool.JQDownloadFile({ url: 'https://example.com/file.pdf', filename: 'doc.pdf' })

// Generate filename with timestamp
const filename = jqTool.generateDownloadFileName('report', 'xlsx')
// Result: 'report_20251204_143025.xlsx'
```

---

## Development

```bash
# Install deps
npm install

# Dev mode
npm run dev

# Build
npm run build

# Build colors config
npm run build:colors

# Build custom SVG
npm run build:svg
```

### Versioning

```bash
npm run patch  # 0.0.x
npm run minor  # 0.x.0
npm run major  # x.0.0
```

### Project Structure

```
rtcpt/
├── src/
│   ├── assets/svg/       # SVG icons
│   ├── components/       # Components
│   │   ├── j-c-*/        # General components
│   │   ├── j-ch-*/       # Chart components
│   │   └── j-q-*/        # Quasar enhanced components
│   ├── composables/      # Composables
│   ├── config/           # Config files
│   ├── css/              # Styles
│   ├── i18n/             # i18n
│   ├── utils/            # Utilities
│   └── index.ts          # Entry
├── vite.config.js
├── tsconfig.json
└── package.json
```

---

## License

MIT
