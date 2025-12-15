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

| Component | Description |
| --- | --- |
| **JQInput** | Input field with validation, password toggle, secret masking |
| **JQSelect** | Dropdown with single/multi select, search, remote data |
| **JQDate** | Date picker, single or range mode |
| **JQDatetime** | Date and time combined picker |
| **JQFile** | File upload with drag-drop support |
| **JQAutocomplete** | Auto-complete input with remote search |
| **JQFormLabel** | Form label with required marker and tips |
| **JQSearchForm** | Quick search form with query/reset buttons |
| **JCListEditor** | Dynamic list item editor |
| **JCDuoListEditor** | Key-value pair list editor |

### Data Display Components

| Component | Description |
| --- | --- |
| **JQTable** | Data table with pagination, sorting, selection |
| **JQDetailList** | Structured detail display |
| **JCTree** | Tree view with selection |
| **JCTreeSelect** | Dropdown tree selector |
| **JQTooltip** | Smart tooltip |
| **JQPopover** | Popover content |
| **JCTabs** | Tab switching |
| **JCTitleLine** | Section title separator |

### Chart Components

All chart components are built on Chart.js.

| Component | Description |
| --- | --- |
| **JChLine** | Line chart |
| **JChBar** | Bar chart |
| **JChBarLine** | Mixed bar-line chart |
| **JChPieDoughnut** | Pie or doughnut chart |
| **JChRadar** | Radar chart |
| **JChBubble** | Bubble chart |

### Utility Components

| Component | Description |
| --- | --- |
| **JQDialog** | Dialog with dynamic component support |
| **JQConfirm** | Quick confirm action |
| **JQConfirmDialog** | Confirm dialog with icon |
| **JQMessage** | Global message notifications |
| **JCCopy** | Copy to clipboard button |
| **JCPermission** | Permission-based content display |
| **JCEditableProxy** | Double-click to edit |
| **JCFallback** | Async component loading placeholder |
| **JCFormatLookup** | Data format display |
| **JQOptionGroup** | Radio/checkbox button group |
| **JQNewValue** | New/modified value marker |

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
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]

const handlePaginationChange = async (pagination) => {
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

Custom column:

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
