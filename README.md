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

This guide will help you get started with RTCPT in your Vue 3 project.

### Prerequisites

- Vue 3.x
- Quasar Framework 2.x
- TypeScript (recommended)
- Node.js 16+ and npm/yarn/pnpm

### 1. Installation

Install RTCPT and its peer dependencies:

```bash
npm install rtcpt quasar vue@^3.0.0
# or
yarn add rtcpt quasar vue@^3.0.0
# or
pnpm add rtcpt quasar vue@^3.0.0
```

### 2. Import Styles

In your main entry file (like `main.ts` or `main.js`), import RTCPT styles **before** initializing your app:

```typescript
// main.ts
import 'rtcpt/rtcpt.css'
import 'rtcpt/rtcpt-styles.css'
```

**Note:** Make sure to import styles before any component imports to ensure proper styling order.

### 3. Configure Quasar

RTCPT requires certain Quasar plugins to be registered. Configure Quasar in your main entry file:

```typescript
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,  // Required for JQMessage
    Dialog   // Required for JQDialog, JQConfirmDialog
  },
  iconSet: quasarIconSet
})
```

### 4. Initialize RTCPT

Initialize RTCPT with your app instance and router:

```typescript
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import { rtcptInit } from 'rtcpt'
import App from './App.vue'
import router from './router'
import { ref } from 'vue'

const app = createApp(App)

// Configure Quasar
app.use(Quasar, {
  plugins: {
    Notify,
    Dialog
  }
})

// Initialize RTCPT
rtcptInit({
  app,
  router,
  // Optional: Permission configuration
  // Provide a reactive ref for permission IDs
  pagePermissionIds: ref(['operation-all', 'user-edit', 'user-view']),
  
  // Optional: Custom color theme
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

app.mount('#app')
```

**Configuration Options:**

| Option              | Type            | Required | Description                      |
| ------------------- | --------------- | -------- | -------------------------------- |
| `app`               | `App`           | ✅ Yes    | Vue app instance                 |
| `router`            | `Router`        | ✅ Yes    | Vue Router instance              |
| `pagePermissionIds` | `Ref<string[]>` | No       | Reactive ref for permission IDs  |
| `colors`            | `ColorConfig`   | No       | Custom color theme configuration |

### 5. IconMapFn Configuration (Important)

`rtcptInit` registers RTCPT's built-in custom icons (e.g. `app:clear`, `app:copyText`) via Quasar's `iconMapFn`.

**⚠️ Important:** If your app later assigns a custom `iconMapFn` (common for theme/brand icons), it can **override** RTCPT's mapping and cause `app:*` icons to render as plain text.

**Solution:** Compose your theme iconMap with RTCPT's fallback:

```typescript
import { composeIconMapFn, rtcptIconMapFn } from 'rtcpt'

// In your component or composable
const setupCustomIcons = () => {
  const prev = this.$q.iconMapFn
  
  const themeIconMapFn = (iconName: string) => {
    // Your custom icon mapping logic
    if (iconName.startsWith('custom:')) {
      return { icon: `img:/icons/${iconName.replace('custom:', '')}.svg` }
    }
    return void 0
  }
  
  // Compose: theme → previous → rtcpt fallback
  this.$q.iconMapFn = composeIconMapFn(
    themeIconMapFn as any,
    prev as any,
    rtcptIconMapFn as any
  )
}
```

**Icon Composition Order:**
1. Your custom theme icons (highest priority)
2. Previous iconMapFn (if any)
3. RTCPT built-in icons (fallback)

### 6. Use Components

Now you can use RTCPT components in your Vue components:

#### Basic Form Components

```vue
<template>
  <div class="q-pa-md">
    <j-q-input 
      v-model="username" 
      label="Username"
      placeholder="Enter your username"
      :rules="[val => !!val || 'Username is required']"
    />
    
    <j-q-select
      v-model="selectedValue"
      :options="options"
      option-label="label"
      option-value="value"
      label="Select an option"
    />
    
    <j-q-date 
      v-model="date" 
      label="Select date" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQInput, JQSelect, JQDate } from 'rtcpt'

const username = ref('')
const selectedValue = ref(null)
const date = ref('')

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
])
</script>
```

#### Data Display Components

```vue
<template>
  <div class="q-pa-md">
    <!-- Detail List -->
    <j-q-detail-list :items="detailItems" :data="userData" />
    
    <!-- Table -->
    <j-q-table
      ref="tableRef"
      :columns="columns"
      :rows="rows"
      :loading="loading"
      row-key="id"
      @pagination-change="handlePaginationChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQDetailList, JQTable } from 'rtcpt'
import type { DetailItem } from 'rtcpt'

const userData = ref({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
})

const detailItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: 'Name', span: 6, format: (v) => v },
  { name: 'email', label: 'Email', span: 12, format: (v) => v }
]

const tableRef = ref()
const loading = ref(false)
const rows = ref([])

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' }
]

const handlePaginationChange = async (pagination: any) => {
  loading.value = true
  // Fetch data...
  loading.value = false
}
</script>
```

#### Utility Components

```vue
<template>
  <div class="q-pa-md">
    <!-- Copy to clipboard -->
    <span>API Key: {{ apiKey }}</span>
    <j-c-copy :text="apiKey" />
    
    <!-- Permission wrapper -->
    <j-c-permission permission-id="user-edit">
      <q-btn label="Edit" @click="handleEdit" />
    </j-c-permission>
    
    <!-- Confirm dialog -->
    <q-btn label="Delete" @click="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCCopy, JCPermission, JQConfirmDialog } from 'rtcpt'

const apiKey = ref('sk-1234567890abcdef')

const handleEdit = () => {
  // Edit logic
}

const handleDelete = async () => {
  const confirmed = await JQConfirmDialog.show({
    title: 'Confirm Delete',
    content: 'Are you sure you want to delete this item?',
    isDelete: true
  })
  
  if (confirmed) {
    // Delete logic
  }
}
</script>
```

### 7. TypeScript Support

RTCPT is fully typed with TypeScript. Import types as needed:

```typescript
import type { DetailItem } from 'rtcpt'
import type { TableColumn } from 'rtcpt' // If using custom table columns
```

### 8. Common Patterns

#### Global Message Notifications

```typescript
import { JQMessage } from 'rtcpt'

// Success message
JQMessage.show({ type: 'success', content: 'Operation completed!' })

// Error message
JQMessage.show({ type: 'error', content: 'Something went wrong' })

// Warning message
JQMessage.show({ type: 'warn', content: 'Please check your input' })
```

#### Permission-Based Rendering

```vue
<template>
  <j-c-permission permission-id="user-edit">
    <q-btn label="Edit" @click="edit" />
  </j-c-permission>
  
  <j-c-permission permission-id="user-delete">
    <q-btn label="Delete" color="negative" @click="delete" />
  </j-c-permission>
</template>
```

#### Dialog Usage

```vue
<template>
  <j-q-dialog ref="dialogRef" title="User Form" :max-width="600">
    <div>Dialog content here</div>
  </j-q-dialog>
  
  <q-btn label="Open Dialog" @click="openDialog" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQDialog } from 'rtcpt'

const dialogRef = ref()

const openDialog = () => {
  dialogRef.value?.open()
}
</script>
```

### Troubleshooting

**Icons not showing (`app:*` icons render as text):**
- Make sure you're composing iconMapFn correctly (see IconMapFn Configuration above)
- Check that `rtcptInit` is called before any custom iconMapFn assignment

**Styles not applying:**
- Ensure RTCPT styles are imported before component imports
- Check that Quasar styles are imported correctly
- Verify CSS import order in your main entry file

**Components not found:**
- Make sure RTCPT is installed: `npm list rtcpt`
- Verify imports are correct: `import { ComponentName } from 'rtcpt'`
- Check that `rtcptInit` was called successfully

**Permission components not working:**
- Ensure `pagePermissionIds` is provided as a reactive ref in `rtcptInit`
- Verify permission IDs match your backend/API permission system

### Next Steps

- Explore [Component Examples](#component-examples) for detailed usage
- Check [API Documentation](#components) for component props and methods
- Review [Theming](#theming) for custom color configuration
- See [Utilities](#utilities) for helper functions

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
  cellMaxWidth?: number
  cellMaxWidthSmall?: number
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

#### whiteSpace (Multi-line Text Ellipsis)

The `whiteSpace` property controls how text is displayed in table cells with automatic ellipsis and tooltip support.

**Usage:**
- Set `whiteSpace: 1` for single-line ellipsis (default behavior)
- Set `whiteSpace: 2` for two-line ellipsis
- Set `whiteSpace: 3` for three-line ellipsis

**Features:**
- Automatically applies ellipsis when content overflows
- Shows tooltip on hover when content is truncated
- Tooltip max-width adapts based on cell width (300px for small screens, 500px for large screens)
- Works with both regular columns and clickable columns (`onClick`)

**Example:**

```vue
const columns = [
  { 
    name: 'description', 
    label: 'Description', 
    field: 'description',
    whiteSpace: 2  // Two-line ellipsis
  },
  { 
    name: 'title', 
    label: 'Title', 
    field: 'title',
    whiteSpace: 1  // Single-line ellipsis
  },
  { 
    name: 'content', 
    label: 'Content', 
    field: 'content',
    whiteSpace: 3  // Three-line ellipsis
  }
]
```

**Note:** When using `whiteSpace`, the cell width is automatically set based on `cellMaxWidth` / `cellMaxWidthSmall` (table-level or column-level). The cell will have fixed width, max-width, and min-width set to the same value.

#### limitWidth (Max Width Limitation)

The `limitWidth` property limits the maximum width of table cells, preventing them from expanding too wide.

**Usage:**
- Set `limitWidth: true` on a column to enable width limitation
- The cell content will be wrapped in a `.cell-limit-width` container
- Responsive behavior: 500px on large screens (>1440px), 300px on small screens (≤1440px)

**Features:**
- Uses CSS variable `--cell-max-width` (default: 500px) for large screens
- Uses CSS variable `--cell-max-width-small` (default: 300px) for small screens
- Can be customized at table-level via `cellMaxWidth` / `cellMaxWidthSmall` props
- Can be customized at column-level via `cellMaxWidth` / `cellMaxWidthSmall` properties (column-level takes priority)

**Example:**

```vue
<template>
  <!-- Table-level configuration -->
  <j-q-table
    :columns="columns"
    :rows="rows"
    :cell-max-width="600"
    :cell-max-width-small="400"
  />
</template>

<script setup>
const columns = [
  { 
    name: 'email', 
    label: 'Email', 
    field: 'email',
    limitWidth: true  // Uses table-level defaults (600px/400px)
  },
  { 
    name: 'url', 
    label: 'URL', 
    field: 'url',
    limitWidth: true,
    cellMaxWidth: 800,        // Column-level override for large screens
    cellMaxWidthSmall: 500    // Column-level override for small screens
  }
]
</script>
```

**Note:** `limitWidth` can be combined with `whiteSpace` when using custom slots (`body-cell-{name}`). When both are used without custom slots, `whiteSpace` takes precedence and `limitWidth` is ignored.

#### cellMaxWidth / cellMaxWidthSmall (Max Width Configuration)

These properties control the maximum width for cells that use `whiteSpace` or `limitWidth`.

**Table-level Props:**
- `cellMaxWidth` (default: `500`): Maximum width in pixels for large screens (>1440px)
- `cellMaxWidthSmall` (default: `300`): Maximum width in pixels for small screens (≤1440px)

**Column-level Properties:**
- `cellMaxWidth`: Column-specific max width for large screens (overrides table-level)
- `cellMaxWidthSmall`: Column-specific max width for small screens (overrides table-level)

**Priority:** Column-level configuration takes priority over table-level configuration.

**Example:**

```vue
<template>
  <j-q-table
    :columns="columns"
    :rows="rows"
    :cell-max-width="600"
    :cell-max-width-small="400"
  />
</template>

<script setup>
const columns = [
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    whiteSpace: 2,
    // Uses table-level: 600px (large) / 400px (small)
  },
  {
    name: 'content',
    label: 'Content',
    field: 'content',
    whiteSpace: 3,
    cellMaxWidth: 800,        // Override: 800px for large screens
    cellMaxWidthSmall: 500   // Override: 500px for small screens
  },
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    limitWidth: true,
    cellMaxWidth: 700,       // Override: 700px for large screens
    // cellMaxWidthSmall not set, uses table-level: 400px for small screens
  }
]
</script>
```

**How it works:**
- For `whiteSpace` columns: Sets `width`, `max-width`, and `min-width` of the cell (`<td>`) directly
- For `limitWidth` columns: Sets CSS variable `--cell-max-width` or `--cell-max-width-small` on the `.cell-limit-width` wrapper div
- Screen size detection: Uses `window.innerWidth <= 1440` to determine small vs large screen

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

**Note:** When using custom slots with `limitWidth`, the slot content will be wrapped in a `.cell-limit-width` div automatically.

#### Column extensions (enhanced fields compared to QTable)

- **`whiteSpace?: 1 | 2 | 3`**: Multi-line ellipsis, auto show tooltip on content overflow (recommended for text columns). Sets fixed cell width based on `cellMaxWidth` / `cellMaxWidthSmall`.
- **`limitWidth?: boolean`**: Limit max width (responsive 500px / 300px by default), wrapped in `.cell-limit-width`. Can be customized via table-level or column-level `cellMaxWidth` / `cellMaxWidthSmall`.
- **`cellMaxWidth?: number`**: Column-level max width for large screens (>1440px). Overrides table-level `cellMaxWidth` prop.
- **`cellMaxWidthSmall?: number`**: Column-level max width for small screens (≤1440px). Overrides table-level `cellMaxWidthSmall` prop.
- **`onClick?: (row) => void`**: Make the column render as "link style", trigger callback on click
- **`clickable?: (value, row) => boolean`**: Works with `onClick`, conditionally decide if the cell is clickable (default: `null/undefined` not clickable)

Example (fixed columns): Add `table-cell--fix-left` / `table-cell--fix-right` to column's `classes/headerClasses`.

#### API (Quasar style)

##### Props

| Name                     | Type                        | Default | Description                                                                                                                                                 |
| ------------------------ | --------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`                | `any[]`                     | `[]`    | Column definitions (compatible with `QTable` columns, with additional support for `whiteSpace/limitWidth/onClick/clickable/cellMaxWidth/cellMaxWidthSmall`) |
| `rows`                   | `any[]`                     | `[]`    | Table data                                                                                                                                                  |
| `rowKey`                 | `string \| ((row) => any)`  | `'id'`  | Unique row key                                                                                                                                              |
| `loading`                | `boolean`                   | `false` | Loading state (shows built-in loading)                                                                                                                      |
| `flat`                   | `boolean`                   | `true`  | Passed through to `QTable`                                                                                                                                  |
| `dense`                  | `boolean`                   | `false` | Passed through to `QTable`                                                                                                                                  |
| `hidePagination`         | `boolean`                   | `false` | Hide bottom pagination                                                                                                                                      |
| `selected`               | `any[] \| null`             | `null`  | Selected rows (v-model:selected). If not provided, the component manages internally                                                                         |
| `tableClass`             | `string \| object \| any[]` | -       | Class attached to `QTable`                                                                                                                                  |
| `tableHeaderClass`       | `string \| object \| any[]` | -       | Passed through to `QTable` as `table-header-class`                                                                                                          |
| `autoScrollOnChangePage` | `boolean`                   | `true`  | Auto scroll to table top after page change or pageSize change                                                                                               |
| `autoHeight`             | `boolean`                   | `false` | Reserved field (you need to manually add style class `table--auto-height` via `tableClass`)                                                                 |
| `cellMaxWidth`           | `number`                    | `500`   | Maximum width (px) for cells with `whiteSpace` or `limitWidth` on large screens (>1440px). Can be overridden at column level.                               |
| `cellMaxWidthSmall`      | `number`                    | `300`   | Maximum width (px) for cells with `whiteSpace` or `limitWidth` on small screens (≤1440px). Can be overridden at column level.                               |

##### Events

| Name                | Payload                             | Description                                            |
| ------------------- | ----------------------------------- | ------------------------------------------------------ |
| `update:selected`   | `any[]`                             | v-model:selected update                                |
| `pagination-change` | `{ page, rowsPerPage, rowsNumber }` | Pagination change (from built-in pagination component) |

##### Slots

| Name                 | Scope                      | Description                           |
| -------------------- | -------------------------- | ------------------------------------- |
| `top`                | -                          | `QTable` top area                     |
| `header`             | `QTable` header scope      | Customize entire header row           |
| `body`               | `QTable` body scope        | Customize entire body row             |
| `append`             | -                          | Append content at table bottom        |
| `header-cell-{name}` | `QTable` header-cell scope | Customize specific column header cell |
| `body-cell-{name}`   | `QTable` body-cell scope   | Customize specific column cell        |

##### Exposed (via `ref`)

| Name                    | Type                                      | Description                                                  |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `setTotal(total)`       | `(total?: number) => void`                | Set total count (pagination display depends on `rowsNumber`) |
| `setNum(page)`          | `(page?: number) => void`                 | Set current page (default 1)                                 |
| `setSize(rowsPerPage)`  | `(rowsPerPage?: number) => void`          | Set rows per page                                            |
| `getPaginationParam()`  | `() => { page; rowsPerPage; rowsNumber }` | Get pagination parameters                                    |
| `scrollTop()`           | `() => void`                              | Smooth scroll to table top                                   |
| `ROWS_PER_PAGE_OPTIONS` | `number[]`                                | Default rows per page options                                |
| `DEFAULT_ROWS_PER_PAGE` | `number`                                  | Default rows per page (15)                                   |

### JQDetailList (detail-list)

> A flexible and feature-rich component for displaying object details in various layouts. Supports options mapping, date formatting, conditional display, custom rendering, click handlers, and multi-line text truncation.

#### Features

- 🎨 **Multiple Layouts**: Vertical, horizontal-between, and horizontal-left layouts
- 📝 **Text Truncation**: Configurable multi-line text truncation with ellipsis (`whiteSpace`)
- 🖱️ **Click Handlers**: Built-in support for clickable items (`onClick`, `clickable`)
- 🎯 **Options Mapping**: Map values to display labels using options array
- 📅 **Date Formatting**: Built-in date formatting support
- 🎨 **Custom Rendering**: Use slots for custom field rendering
- 👁️ **Conditional Display**: Show/hide fields based on data conditions
- 💡 **Tooltips**: Support for field tips and automatic tooltip on text overflow

#### Basic Usage

```vue
<template>
  <j-q-detail-list :items="items" :data="detail" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DetailItem } from 'components/j-q-detail-list/index.vue'

const detail = ref({
  id: 1,
  name: 'Alice',
  status: 'active',
  createdAt: '2025-12-01 10:20:30',
  description: 'A long description that might overflow...'
})

const items: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: 'Name', span: 6, tip: 'User display name in the system', format: (v) => v },
  {
    name: 'status',
    label: 'Status',
    span: 6,
    options: [
      { value: 'active', label: 'Enabled', class: 'text-positive' },
      { value: 'disabled', label: 'Disabled', class: 'text-grey' }
    ],
    findByKey: 'value',
    displayKey: 'label',
    format: (v) => v
  },
  { name: 'createdAt', label: 'Created At', span: 6, date: 'YYYY-MM-DD HH:mm:ss', format: (v) => v },
  { name: 'description', label: 'Description', span: 12, whiteSpace: 3, format: (v) => v }
]
</script>
```

#### Layouts

The component supports three layout types:

**1. Vertical Layout (default)**

Labels are displayed above values in a grid layout:

```vue
<j-q-detail-list :items="items" :data="data" layout="vertical" />
```

**2. Horizontal Between Layout**

Labels and values are displayed side by side with space-between alignment:

```vue
<j-q-detail-list :items="items" :data="data" layout="horizontal-between" />
```

**3. Horizontal Left Layout**

Labels and values are displayed side by side with left alignment. Label width is configurable:

```vue
<j-q-detail-list 
  :items="items" 
  :data="data" 
  layout="horizontal-left" 
  label-width="120px" 
/>
```

#### whiteSpace (Multi-line Text Truncation)

The `whiteSpace` property controls how text is displayed with automatic ellipsis and tooltip support.

**Usage:**
- `whiteSpace: 1` - Single-line ellipsis (default)
- `whiteSpace: 2` - Two-line ellipsis
- `whiteSpace: 3` - Three-line ellipsis

**Features:**
- Automatically applies ellipsis when content overflows
- Shows tooltip on hover when content is truncated
- Works with all layout types

**Example:**

```vue
const items: DetailItem[] = [
  {
    name: 'description',
    label: 'Description',
    span: 12,
    whiteSpace: 3,  // Show max 3 lines before ellipsis
    format: (v) => v
  },
  {
    name: 'summary',
    label: 'Summary',
    span: 12,
    whiteSpace: 2,  // Show max 2 lines before ellipsis
    format: (v) => v
  }
]
```

#### Click Handlers (onClick & clickable)

Make items clickable with custom click handlers.

**Usage:**

```vue
<script setup lang="ts">
const toDevicePage = (deviceId: string) => {
  console.log('Navigate to device:', deviceId)
  // router.push(`/devices/${deviceId}`)
}

const items: DetailItem[] = [
  {
    name: 'deviceId',
    label: 'Device ID',
    span: 6,
    onClick: (value) => toDevicePage(value),
    clickable: true,  // Always clickable
    format: (v) => v
  },
  {
    name: 'status',
    label: 'Status',
    span: 6,
    onClick: (value) => console.log('Status clicked:', value),
    clickable: (row) => row.status === 'online',  // Dynamic: only clickable when online
    format: (v) => v
  }
]
</script>
```

**Behavior:**
- When `clickable` is `true`: Item is always clickable
- When `clickable` is `false`: Item is never clickable
- When `clickable` is a function: Dynamic check based on data: `(row: TDetailData) => boolean`
- When `clickable` is `undefined`: Clickable if `onClick` is provided (default behavior)
- Clickable items display with primary color and pointer cursor
- Clickable items use `display: inline-block` for proper click area

#### Options Mapping

Map raw values to display labels using options array:

```vue
const items: DetailItem[] = [
  {
    name: 'status',
    label: 'Status',
    span: 6,
    options: [
      { value: 'active', label: 'Active', class: 'text-positive' },
      { value: 'inactive', label: 'Inactive', class: 'text-grey' },
      { value: 'pending', label: 'Pending', class: 'text-warning' }
    ],
    findByKey: 'value',      // Match data.status against option.value
    displayKey: 'label',      // Display option.label (default)
    format: (v) => v
  }
]
```

The matched option can also have a `class` property for custom styling.

#### Conditional Display

Show/hide fields based on data conditions:

```vue
const items: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  {
    name: 'paidAt',
    label: 'Paid At',
    span: 6,
    date: 'YYYY-MM-DD HH:mm:ss',
    visible: (row) => row.status === 'paid',  // Only show when paid
    format: (v) => v
  },
  {
    name: 'cancelledAt',
    label: 'Cancelled At',
    span: 6,
    date: 'YYYY-MM-DD HH:mm:ss',
    visible: (row) => row.status === 'cancelled',  // Only show when cancelled
    format: (v) => v
  }
]
```

#### Custom Rendering with Slots

Use `item-value-{name}` slot to customize rendering for specific fields:

```vue
<template>
  <j-q-detail-list :items="items" :data="detail">
    <template #item-value-status="{ value, item, data, fieldName }">
      <q-badge :color="value === 'active' ? 'positive' : 'grey'" :label="value" />
    </template>
    
    <template #item-value-image="{ value }">
      <q-img :src="value" style="width: 100px; height: 100px" />
    </template>
    
    <template #item-value-price="{ value }">
      <span class="text-h6 text-primary">${{ value.toFixed(2) }}</span>
    </template>
  </j-q-detail-list>
</template>
```

**Slot Props:**
- `value`: The raw value from data object
- `item`: The DetailItem configuration object
- `data`: The entire data object
- `fieldName`: The field name (same as `item.name`)

#### Complete Examples

**Example 1: User Profile with Clickable ID**

```vue
<template>
  <j-q-detail-list :items="items" :data="userData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DetailItem } from 'components/j-q-detail-list/index.vue'

const userData = ref({
  id: 1001,
  username: 'johndoe',
  email: 'john@example.com',
  role: 'admin',
  createdAt: '2024-01-15 10:30:00'
})

const toUserPage = (userId: string) => {
  console.log('Navigate to user:', userId)
}

const items: DetailItem[] = [
  {
    name: 'id',
    label: 'User ID',
    span: 6,
    onClick: (value) => toUserPage(value),
    clickable: true,
    format: (v) => v
  },
  { name: 'username', label: 'Username', span: 6, format: (v) => v },
  { name: 'email', label: 'Email', span: 6, format: (v) => v },
  {
    name: 'role',
    label: 'Role',
    span: 6,
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'user', label: 'User' }
    ],
    findByKey: 'value',
    format: (v) => v
  },
  { name: 'createdAt', label: 'Created', span: 6, date: true, format: (v) => v }
]
</script>
```

**Example 2: Article with Multi-line Content**

```vue
<template>
  <j-q-detail-list :items="items" :data="articleData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DetailItem } from 'components/j-q-detail-list/index.vue'

const articleData = ref({
  title: 'Article Title',
  content: 'This is a very long article content that will be truncated after 3 lines with ellipsis...',
  summary: 'Short summary text'
})

const items: DetailItem[] = [
  { name: 'title', label: 'Title', span: 12, format: (v) => v },
  {
    name: 'content',
    label: 'Content',
    span: 12,
    whiteSpace: 3,  // Show max 3 lines before ellipsis
    format: (v) => v
  },
  { name: 'summary', label: 'Summary', span: 12, whiteSpace: 2, format: (v) => v }
]
</script>
```

**Example 3: Horizontal Layout**

```vue
<template>
  <j-q-detail-list 
    :items="items" 
    :data="data" 
    layout="horizontal-left"
    label-width="150px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DetailItem } from 'components/j-q-detail-list/index.vue'

const data = ref({
  field1: 'Value 1',
  field2: 'Value 2',
  field3: 'Value 3'
})

const items: DetailItem[] = [
  { name: 'field1', label: 'Field 1', span: 6, format: (v) => v },
  { name: 'field2', label: 'Field 2', span: 6, format: (v) => v },
  { name: 'field3', label: 'Field 3', span: 6, format: (v) => v }
]
</script>
```

#### API (Quasar style)

##### Props

| Name         | Type                                                      | Default             | Description                              |
| ------------ | --------------------------------------------------------- | ------------------- | ---------------------------------------- |
| `items`      | `DetailItem[]`                                            | -                   | Display configuration (required)         |
| `data`       | `Record<string, any>`                                     | -                   | Detail data object (required)            |
| `layout`     | `'vertical' \| 'horizontal-between' \| 'horizontal-left'` | `'vertical'`        | Layout type for displaying items         |
| `gutter`     | `string`                                                  | `'q-col-gutter-md'` | CSS class for column gutter spacing      |
| `labelWidth` | `string`                                                  | `'100px'`           | Label width for `horizontal-left` layout |

##### Slots

| Name                | Scope                              | Description                                    |
| ------------------- | ---------------------------------- | ---------------------------------------------- |
| `item-value-{name}` | `{ value, item, data, fieldName }` | Customize value rendering for a specific field |

##### `DetailItem` Interface

```typescript
export interface DetailItem {
  name: string                    // Field name in data object (required)
  label: string                  // Display label (required)
  span?: number                  // Column span (1-12, default: 6)
  align?: 'left' | 'right' | 'center'  // Text alignment (default: 'left', only applies to vertical layout)
  date?: boolean | string        // Date formatting: true for default format, string for custom format
  options?: Record<string, any>[] // Options array for value mapping
  findByKey?: string             // Key to find option in options array
  displayKey?: string            // Key to display from matched option (default: 'label')
  tip?: string                   // Tooltip text shown next to label
  whiteSpace?: number            // Maximum lines before ellipsis (default: 1)
  onClick?: (value: string) => void  // Click handler function
  clickable?: boolean | ((row: TDetailData) => boolean)  // Whether item is clickable
  format: (value: any) => any    // Value formatter function (required)
  visible?: boolean | ((row: TDetailData) => boolean)  // Show/hide condition
}
```

##### `DetailItem` Field Descriptions

| Field        | Type                            | Description                                                               |
| ------------ | ------------------------------- | ------------------------------------------------------------------------- |
| `name`       | `string`                        | Field name (corresponds to `data[name]`) - **required**                   |
| `label`      | `string`                        | Display label - **required**                                              |
| `span`       | `number`                        | Grid column width (`col-{span}`), default 6                               |
| `align`      | `'left' \| 'center' \| 'right'` | Value alignment, default left (only applies to `vertical` layout)         |
| `tip`        | `string`                        | Tooltip text shown next to label with a question icon                     |
| `visible`    | `boolean \| (data) => boolean`  | Control whether this item is displayed                                    |
| `format`     | `(value) => any`                | Custom formatting function - **required**                                 |
| `date`       | `true \| string`                | Date formatting: `true` uses default format; string uses specified format |
| `options`    | `Record<string, any>[]`         | Value mapping list (like a dictionary)                                    |
| `findByKey`  | `string`                        | Which key in `options` to match the value by                              |
| `displayKey` | `string`                        | Which key from `options` to display, default `'label'`                    |
| `whiteSpace` | `number`                        | Maximum lines before ellipsis (1, 2, or 3), default 1                     |
| `onClick`    | `(value: string) => void`       | Click handler function that receives the formatted value string           |
| `clickable`  | `boolean \| (row) => boolean`   | Whether item is clickable. If function, dynamic check based on data       |

#### Notes

- Empty values (`null`, `undefined`, `''`) are displayed as `'--'`
- The `format` function is always called, even for empty values
- Options mapping happens before formatting
- Date formatting happens after options mapping and custom formatting
- Click handlers receive the final formatted string value
- Custom slots override default rendering completely
- When `clickable` is `undefined` and `onClick` is provided, the item is clickable by default
- Clickable items automatically use `display: inline-block` for proper click area

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
