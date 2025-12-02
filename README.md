# rtcpt

A Vue 3 component library built with Vite and TypeScript. Got 34+ components that work with Quasar and Chart.js out of the box.

[中文文档](./README.zh-CN.md)

## What's Inside

- **34+ Components** - Forms, tables, charts, dialogs, you name it
- **i18n Built-in** - Chinese and English translations ready to go
- **Chart Components** - Chart.js integration for data viz
- **TypeScript Support** - Fully typed, your IDE will thank you
- **Utility Functions** - Date formatting, file downloads, data formatting stuff
- **Tree-shakable** - Only bundle what you actually use

## Installation

```bash
npm install rtcpt
# or
yarn add rtcpt
```

## Peer Dependencies

You'll need these installed in your project:

- **vue** (^3.0.0)
- **quasar** (^2.0.0)
- **chart.js** (^4.0.0) - Only if you're using the chart components (j-ch series)

```bash
npm install vue quasar chart.js
# or
yarn add vue quasar chart.js
```

## Quasar Setup

**Important:** This library uses Quasar components internally. All Quasar components used in this library are **already registered within each component**, so you **don't need** to globally register Quasar in your project.

### For Quasar Projects

If you're already using Quasar, you're all set! Just install rtcpt and start using it.

### For Non-Quasar Vue Projects

You **still need to install and import Quasar styles**, but you don't need to register the Quasar plugin:

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

// Import Quasar styles (required for components to look correct)
import 'quasar/dist/quasar.css';

// Optional: Import this library's custom styles
import 'rtcpt/style.css';

const app = createApp(App);
app.mount('#app');
```

**Why?** Each component in this library explicitly imports and registers the Quasar components it needs (like `QBtn`, `QInput`, etc.), so they'll work even without global Quasar registration.

## Styles

**Styles are now optional!** You can import them separately:

```typescript
// Import component library styles (optional)
import 'rtcpt/style.css';
```

If you don't import the styles, the components will still work but won't have the custom styling that comes with this library. The base Quasar components will still have their normal Quasar styling.

## Components Overview

### j-c Series (11 components) - Custom Components
- `jCsvg` - SVG icon wrapper
- `JCDuoListEditor` - Double list editor
- `JCEditableProxy` - Editable proxy with popup editor
- `JCFallback` - Fallback display component
- `JCFormatLookup` - Format lookup component
- `JCListEditor` - List editor
- `JCPermission` - Permission control wrapper
- `JCTabs` - Tab component
- `JCTitleLine` - Title line component
- `JCTree` - Tree component
- `JCTreeSelect` - Tree select dropdown

### j-ch Series (6 components) - Chart.js Charts
- `JChBar` - Bar chart
- `JChBarLine` - Combined bar and line chart
- `JChBubble` - Bubble chart
- `JChLine` - Line chart
- `JChPieDoughnut` - Pie/Doughnut chart
- `JChRadar` - Radar chart

### j-q Series (17 components) - Quasar Enhanced Components
- `JQAutocomplete` - Autocomplete input
- `JQConfirm` - Confirm dialog component
- `JQDate` - Date picker
- `JQDatetime` - DateTime picker with time selection
- `JQDetailList` - Detail list display
- `JQDialog` - Enhanced dialog component
- `JQFile` - File upload component
- `JQFormLabel` - Form label wrapper
- `JQInput` - Enhanced input with validation
- `JQNewValue` - Multi-value input (press enter to add)
- `JQOptionGroup` - Option group selector
- `JQPopover` - Popover component
- `JQSearchForm` - Search form wrapper
- `JQSelect` - Enhanced select component
- `JQTable` - Enhanced table with pagination
- `JQTooltip` - Tooltip component

## Quick Start

### Basic Usage

```vue
<template>
  <div>
    <!-- Input Component -->
    <JQInput v-model="username" label="Username" />
    
    <!-- Table Component -->
    <JQTable 
      :columns="columns"
      :rows="rows"
      @paginationChange="handlePaginationChange"
    />
    
    <!-- Chart Component -->
    <JChBar 
      :labels="['Jan', 'Feb', 'Mar']"
      :datasets="chartData"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { JQInput, JQTable, JChBar } from 'rtcpt';

const username = ref('');
const columns = [
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'age', label: 'Age', field: 'age' }
];
const rows = ref([]);
const chartData = ref([
  { label: 'Sales', data: [10, 20, 30] }
]);
</script>
```

## Internationalization

The library comes with its own i18n system that won't mess with your project's i18n setup.

### Set Language

```typescript
import { setLocale } from 'rtcpt';

// Set to Chinese
setLocale('zh-CN');

// Set to English
setLocale('en-US');
```

### In Your App Setup

```typescript
// main.ts
import { createApp } from 'vue';
import { setLocale } from 'rtcpt';
import App from './App.vue';

const app = createApp(App);

// Set language based on user preference
const userLocale = localStorage.getItem('locale') || 'zh-CN';
setLocale(userLocale as 'zh-CN' | 'en-US');

app.mount('#app');
```

### Dynamic Language Switching

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

### Use i18n in Your Components

```typescript
import { useI18n, t } from 'rtcpt';

// In component setup
const { t } = useI18n();
console.log(t('action.confirm')); // "确认" or "Confirm"

// Direct usage
import { t } from 'rtcpt';
const message = t('messages.pleaseSelect'); // "请选择" or "Please select"
```

## Utility Functions

All utility functions are available under the `jqTool` namespace:

```typescript
import { jqTool } from 'rtcpt';

// Use jqTool.* to access all utilities
jqTool.formatDate(Date.now(), 'YYYY-MM-DD');
jqTool.JQDownloadFile(blob, 'file.pdf');
jqTool.transformTreeUseLabelAndValue(treeData);
```

### File Download

```typescript
import { jqTool } from 'rtcpt';

// Download a file
const blob = new Blob([data], { type: 'application/json' });
jqTool.JQDownloadFile(blob, 'data.json');

// Generate filename with timestamp
const filename = jqTool.generateDownloadFileName('report', 'xlsx');
// Output: "report_20251202143025.xlsx"
```

### Date Formatting

```typescript
import { jqTool } from 'rtcpt';

// Format a date
const formatted = jqTool.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss');
// Output: "2025-12-02 14:30:25"

// Create a formatter for table columns
const dateFormatter = jqTool.defaultDateFormat('YYYY-MM-DD');
const displayValue = dateFormatter(timestamp, row);
```

### Data Size Formatting

```typescript
import { jqTool } from 'rtcpt';

// Format size
const size = jqTool.formatSize({ size: 1024000, unit: 'B' });
// Output: "1,000 KB"

// Auto convert to appropriate unit
const { size: newSize, unit } = jqTool.getUpperSize({ size: 2048, unit: 'MB' });
// Output: { size: 2, unit: 'GB' }

// Create a formatter for table columns
const sizeFormatter = jqTool.defaultDataFormat('--', { digits: 2 });
```

### Data Formatting

```typescript
import { jqTool } from 'rtcpt';

// Handle falsy values
jqTool.defaultFill(null);        // "--"
jqTool.defaultFill(0);          // 0
jqTool.defaultFill('value');    // "value"

// Create custom formatter
const formatter = jqTool.defaultFormat((val) => `$${val}`, 'N/A');
formatter(100, row);     // "$100"
formatter(null, row);    // "N/A"
```

### Tree Data Transformation

```typescript
import { jqTool } from 'rtcpt';

// Transform tree data to use label/value
const transformedTree = jqTool.transformTreeUseLabelAndValue(treeData, {
  optionLabel: 'name',
  optionValue: 'id',
  optionChildren: 'children'
});
```

## Services

### Dialog Provider

Create dialogs programmatically:

```typescript
import { DialogProvider } from 'rtcpt';

// Basic usage
const dialog = DialogProvider.register({
  title: 'Edit User',
  component: UserEditForm,
  componentBind: {
    userId: 123
  }
});

// Optional: Configure with router, store, i18n (if needed)
DialogProvider.configure({
  router,
  store,
  i18n
});
```

### Message Service

Show notifications:

```typescript
import { JQMessage } from 'rtcpt';

// Success message
JQMessage.show({
  type: 'success',
  content: 'Operation successful!'
});

// Error message
JQMessage.show({
  type: 'error',
  content: 'Something went wrong',
  isNotify: true  // Shows close button
});
```

### Confirm Dialog

Show confirmation dialogs:

```typescript
import { JQConfirmDialog } from 'rtcpt';

const confirmed = await JQConfirmDialog.show({
  title: 'Delete Confirmation',
  content: 'Are you sure you want to delete this item?'
});

if (confirmed) {
  // User clicked confirm
} else {
  // User clicked cancel
}
```

## More Examples

### Editable Field with Permission

```vue
<template>
  <JCEditableProxy v-model="userEmail" code="user.edit">
    <template #editor="{ tempValue, updateTempValue, setEditorRef }">
      <q-input
        :model-value="tempValue"
        @update:model-value="updateTempValue"
        :ref="setEditorRef"
        type="email"
        :rules="[(val) => !!val || 'Email is required']"
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

### Tree Select

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
    label: 'Parent 1',
    children: [
      { id: 11, label: 'Child 1-1' },
      { id: 12, label: 'Child 1-2' }
    ]
  }
]);
</script>
```

### Chart Example

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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const salesData = ref([
  {
    label: '2024',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(54, 162, 235, 0.5)'
  }
]);
</script>
```

## API Reference

### i18n Functions

```typescript
// Set locale
setLocale(locale: 'zh-CN' | 'en-US'): void

// Get current locale
getLocale(): 'zh-CN' | 'en-US'

// Translate with variables
t(key: string, variables?: Record<string, any>): string

// Example with variables
t('messages.formRules.rangeInt', { min: 1, max: 100 })
// Output: "值必须是 1 到 100 之间的整数" or "Value must be an integer between 1 and 100"

// Use in component
const { t, locale, setLocale, getLocale } = useI18n();
```

### Utility Functions

All utility functions are available under the `jqTool` namespace:

```typescript
import { jqTool } from 'rtcpt';

// File operations
jqTool.JQDownloadFile(blob: Blob, filename: string): void
jqTool.generateDownloadFileName(baseName: string, ext: string): string

// Date formatting
jqTool.formatDate(date: Date | string | number, format?: string): string
jqTool.defaultDateFormat(format?: string, fallback?: string): Function

// Data size formatting
jqTool.formatSize(options: { size: number; unit?: 'B'|'KB'|'MB'|'GB'|'TB' }): string
jqTool.getUpperSize(sizeUnit: { size: number; unit?: string }, options?: any): { size: number; unit: string }
jqTool.defaultDataFormat(fallback?: string, options?: { digits?: number; unit?: string }): Function

// General formatting
jqTool.defaultFill(val: any): any
jqTool.defaultFormat(formatter?: Function, fallback?: string): Function

// Tree data transformation
jqTool.transformTreeUseLabelAndValue(array: any[], config?: {
  optionLabel?: string;
  optionValue?: string;
  optionChildren?: string;
}): any[]
```

## TypeScript Support

Everything's fully typed. Import types as you need them:

```typescript
import type { 
  Locale,
  DateTimeRangeValue,
  SelectionConditions,
  TableColumn 
} from 'rtcpt';
```

## Complete Component List

### Import Components

```typescript
// Named imports (recommended)
import {
  // j-c series
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
  
  // j-ch series (requires chart.js)
  JChBar,
  JChBarLine,
  JChBubble,
  JChLine,
  JChPieDoughnut,
  JChRadar,
  
  // j-q series
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

// Or import all at once
import * as RTCPT from 'rtcpt';
```

## Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Publish (runs build automatically)
npm run prepublishOnly
```

## License

MIT

---

## More Examples

### Table with Formatting

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
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { 
    name: 'created', 
    label: 'Created', 
    field: 'created',
    format: (val) => jqTool.formatDate(val, 'YYYY-MM-DD HH:mm')
  },
  { 
    name: 'size', 
    label: 'Size', 
    field: 'size',
    format: (val) => jqTool.formatSize({ size: val, unit: 'B' })
  },
  { name: 'status', label: 'Status', field: 'status' }
];

const users = ref([]);
</script>
```

### Form with Validation

```vue
<template>
  <div class="q-gutter-md">
    <JQInput
      v-model="form.email"
      label="Email"
      type="email"
      :rules="[
        (val) => !!val || t('messages.formRules.required'),
        (val) => /.+@.+\..+/.test(val) || t('messages.formRules.emailInvalid')
      ]"
    />
    
    <JQDatetime
      v-model="form.birthday"
      label="Birthday"
      range
    />
    
    <JQSelect
      v-model="form.role"
      :options="roleOptions"
      label="Role"
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

### Permission-based Display

```vue
<template>
  <div>
    <!-- Only shows if user has permission -->
    <JCPermission code="user.delete">
      <q-btn color="negative" label="Delete" @click="handleDelete" />
    </JCPermission>
    
    <!-- Shows fallback if no data -->
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

## Contributing

Contributions welcome! This library is extracted from real-world production projects.

## Support

Got questions or found a bug? Open an issue on GitHub.
