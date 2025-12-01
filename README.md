# rtcpt

A Vue 3 component library built with Vite and TypeScript.

## Installation

```bash
npm install rtcpt
# or
yarn add rtcpt
```

## Peer Dependencies

This library requires the following peer dependencies:

- vue (^3.0.0)
- quasar (^2.0.0)

Ensure you have Quasar installed and configured in your project.

## Usage

### Importing Components

You can import individual components:

```typescript
import { jCsvg, JCDuoListEditor } from 'rtcpt';

// Use in your component
export default {
  components: {
    jCsvg,
    JCDuoListEditor
  }
}
```

### JCDuoListEditor

A double-list editor component.

```html
<template>
  <JCDuoListEditor
    v-model="listData"
    :default-new-item="{ name: 'New Item' }"
    action-mode="compact"
  >
    <template #item-content="{ item, updateItem }">
      <q-input
        :model-value="item.name"
        @update:model-value="val => updateItem(index, { name: val })"
        dense
      />
    </template>
  </JCDuoListEditor>
</template>

<script setup>
import { ref } from 'vue';
import { JCDuoListEditor } from 'rtcpt';

const listData = ref([{ name: 'Item 1' }]);
</script>
```

### jCsvg

An SVG icon wrapper component.

```html
<template>
  <jCsvg name="developer" size="24px" color="primary" />
</template>

<script setup>
import { jCsvg } from 'rtcpt';
</script>
```

## License

MIT

