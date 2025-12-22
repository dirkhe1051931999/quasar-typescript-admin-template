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

### IconMapFn (important)

`rtcptInit` registers rtcpt's built-in custom icons (e.g. `app:clear`, `app:copyText`) via Quasar's `iconMapFn`.

If your app later assigns `this.$q.iconMapFn = (...) => ...` (common for theme/brand icons), it can **override** rtcpt's mapping and cause `app:*` icons to render as plain text.

Recommended: **compose** your theme iconMap with rtcpt's fallback:

```typescript
import { composeIconMapFn, rtcptIconMapFn } from 'rtcpt'

const prev = this.$q.iconMapFn
const themeIconMapFn = (iconName: string) => {
  // return { icon: 'img:...' } when matched, otherwise return void 0
}

this.$q.iconMapFn = composeIconMapFn(themeIconMapFn as any, prev as any, rtcptIconMapFn as any)
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

> `JQTable` is an enterprise table component based on Quasar's `QTable`, with built-in custom pagination (the component internally hides `QTable`'s native pagination), and additionally supports:
>
> - **Column click**: Use `columns[].onClick` to make cells clickable links
> - **Long text ellipsis**: Use `columns[].whiteSpace` (1~3) for multi-line ellipsis + auto tooltip on overflow
> - **Width limit**: Use `columns[].limitWidth` to limit max width (responsive 500/300px)
> - **ref methods**: Expose pagination and scroll controls via `ref` (e.g., `setTotal` / `setNum` / `scrollTop`)

#### Usage

The most common usage is **server-side pagination**: you listen to `pagination-change`, fetch data then update `rows`, and call `setTotal(total)` to update the total count (otherwise pagination won't display).

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

// For example purposes: column structure is compatible with QTable columns, with additional support for whiteSpace/limitWidth/onClick/clickable
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

Like Quasar's `QTable`, you can customize column rendering using `body-cell-{colName}`:

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

#### Column extensions (enhanced fields compared to QTable)

- **`whiteSpace?: 1 | 2 | 3`**: Multi-line ellipsis, auto show tooltip on content overflow (recommended for text columns)
- **`limitWidth?: boolean`**: Limit max width (responsive 500px / 300px), wrapped in `.cell-limit-width`
- **`onClick?: (row) => void`**: Make the column render as "link style", trigger callback on click
- **`clickable?: (value, row) => boolean`**: Works with `onClick`, conditionally decide if the cell is clickable (default: `null/undefined` not clickable)

Example (fixed columns): Add `table-cell--fix-left` / `table-cell--fix-right` to column's `classes/headerClasses`.

#### API (Quasar style)

##### Props

| Name                     | Type                        | Default | Description                                                                                                           |
| ------------------------ | --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `columns`                | `any[]`                     | `[]`    | Column definitions (compatible with `QTable` columns, with additional support for `whiteSpace/limitWidth/onClick/clickable`) |
| `rows`                   | `any[]`                     | `[]`    | Table data                                                                                                            |
| `rowKey`                 | `string \| ((row) => any)`  | `'id'`  | Unique row key                                                                                                        |
| `loading`                | `boolean`                   | `false` | Loading state (shows built-in loading)                                                                                |
| `flat`                   | `boolean`                   | `true`  | Passed through to `QTable`                                                                                            |
| `dense`                  | `boolean`                   | `false` | Passed through to `QTable`                                                                                            |
| `hidePagination`         | `boolean`                   | `false` | Hide bottom pagination                                                                                                |
| `selected`               | `any[] \| null`             | `null`  | Selected rows (v-model:selected). If not provided, the component manages internally                                   |
| `tableClass`             | `string \| object \| any[]` | -       | Class attached to `QTable`                                                                                            |
| `tableHeaderClass`       | `string \| object \| any[]` | -       | Passed through to `QTable` as `table-header-class`                                                                    |
| `autoScrollOnChangePage` | `boolean`                   | `true`  | Auto scroll to table top after page change or pageSize change                                                         |
| `autoHeight`             | `boolean`                   | `false` | Reserved field (you need to manually add style class `table--auto-height` via `tableClass`)                           |

##### Events

| Name                | Payload                             | Description                                        |
| ------------------- | ----------------------------------- | -------------------------------------------------- |
| `update:selected`   | `any[]`                             | v-model:selected update                            |
| `pagination-change` | `{ page, rowsPerPage, rowsNumber }` | Pagination change (from built-in pagination component) |

##### Slots

| Name                 | Scope                      | Description                          |
| -------------------- | -------------------------- | ------------------------------------ |
| `top`                | -                          | `QTable` top area                    |
| `header`             | `QTable` header scope      | Customize entire header row          |
| `body`               | `QTable` body scope        | Customize entire body row            |
| `append`             | -                          | Append content at table bottom       |
| `header-cell-{name}` | `QTable` header-cell scope | Customize specific column header cell |
| `body-cell-{name}`   | `QTable` body-cell scope   | Customize specific column cell       |

##### Exposed (via `ref`)

| Name                    | Type                                      | Description                                                 |
| ----------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `setTotal(total)`       | `(total?: number) => void`                | Set total count (pagination display depends on `rowsNumber`) |
| `setNum(page)`          | `(page?: number) => void`                 | Set current page (default 1)                                |
| `setSize(rowsPerPage)`  | `(rowsPerPage?: number) => void`          | Set rows per page                                           |
| `getPaginationParam()`  | `() => { page; rowsPerPage; rowsNumber }` | Get pagination parameters                                   |
| `scrollTop()`           | `() => void`                              | Smooth scroll to table top                                  |
| `ROWS_PER_PAGE_OPTIONS` | `number[]`                                | Default rows per page options                               |
| `DEFAULT_ROWS_PER_PAGE` | `number`                                  | Default rows per page (15)                                  |

### JQDetailList (detail-list)

> The detail-list component in the project (referred to as `j-c-list`) is actually `JQDetailList` (tag: `<j-q-detail-list />`), used to display object details in grid layout, with support for options mapping, date formatting, conditional display, and custom rendering by field.

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
  { name: 'name', label: 'Name', span: 6, tip: 'User display name in the system' },
  {
    name: 'status',
    label: 'Status',
    span: 6,
    options: [
      { value: 'active', label: 'Enabled', class: 'text-positive' },
      { value: 'disabled', label: 'Disabled', class: 'text-grey' }
    ],
    findByKey: 'value',
    displayKey: 'label'
  },
  { name: 'createdAt', label: 'Created At', span: 6, date: 'YYYY-MM-DD HH:mm:ss' }
]
</script>
```

#### Custom item slot

You can use `item-value-{name}` to precisely override the display of a specific field:

```vue
<j-q-detail-list :items="items" :data="detail">
  <template #item-value-status="{ value }">
    <q-badge :color="value === 'active' ? 'positive' : 'grey'" :label="value" />
  </template>
</j-q-detail-list>
```

#### API (Quasar style)

##### Props

| Name     | Type                  | Default             | Description                       |
| -------- | --------------------- | ------------------- | --------------------------------- |
| `items`  | `DetailItem[]`        | -                   | Display configuration (required)  |
| `data`   | `Record<string, any>` | -                   | Detail data object (required)     |
| `gutter` | `string`              | `'q-col-gutter-md'` | Gutter class for outer row        |

##### Slots

| Name                | Scope                              | Description                         |
| ------------------- | ---------------------------------- | ----------------------------------- |
| `item-value-{name}` | `{ value, item, data, fieldName }` | Customize value rendering for a specific field |

##### `DetailItem` Field Description

| Field        | Type                            | Description                                                                 |
| ------------ | ------------------------------- | --------------------------------------------------------------------------- |
| `name`       | `string`                        | Field name (corresponds to `data[name]`)                                    |
| `label`      | `string`                        | Title                                                                       |
| `span`       | `number`                        | Grid column width (`col-{span}`), default 6                                 |
| `align`      | `'left' \| 'center' \| 'right'` | Value alignment, default left                                               |
| `tip`        | `string`                        | Tooltip next to title                                                       |
| `visible`    | `boolean \| (data) => boolean`  | Control whether this item is displayed                                      |
| `format`     | `(value) => any`                | Custom formatting (takes priority over date/options)                        |
| `date`       | `true \| string`                | Date formatting: `true` uses default format; string uses specified format   |
| `options`    | `Record<string, any>[]`         | Value mapping list (like a dictionary)                                      |
| `findByKey`  | `string`                        | Which key in `options` to match the value by                                |
| `displayKey` | `string`                        | Which key from `options` to display, default `'label'`                      |

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

Hide confirm button (footer still shown):

```vue
<j-q-dialog ref="dialogRef" title="View Only" :show-confirm="false">
  <div>Readonly content</div>
</j-q-dialog>
```

Control confirm button via `dialogRef` (reactive/computed):

```vue
<j-q-dialog ref="dialogRef" title="User Info">
  <div>Dialog content</div>
</j-q-dialog>

<script setup lang="ts">
import { computed, ref } from 'vue'

const dialogRef = ref<any>()
const readonlyMode = ref(false)
const showConfirm = computed(() => !readonlyMode.value)

const open = () => {
  dialogRef.value.open()
  dialogRef.value.bindShowConfirm(showConfirm)
  // or: dialogRef.value.setShowConfirm(false)
}
</script>
```

Sidebar mode:

```vue
<j-q-dialog ref="dialogRef" title="Details" position="right">
  <div>Sidebar content</div>
</j-q-dialog>
```

DialogProvider usage:

```ts
import { DialogProvider } from 'rtcpt'

DialogProvider.register({
  title: 'Preview',
  showFooter: true,
  showConfirm: false
})
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
