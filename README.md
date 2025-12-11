# RTCPT - Vue 3 + Quasar 企业级组件库

<div align="center">

[![npm version](https://img.shields.io/npm/v/rtcpt.svg)](https://www.npmjs.com/package/rtcpt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个基于 Vue 3、TypeScript 和 Quasar 构建的现代化企业级组件库。

[English](./README.md) | 简体中文

</div>

---

## 📖 目录

- [特性](#-特性)
- [安装](#-安装)
- [快速开始](#-快速开始)
- [组件列表](#-组件列表)
  - [表单组件](#表单组件)
  - [数据展示组件](#数据展示组件)
  - [图表组件](#图表组件)
  - [工具组件](#工具组件)
- [详细使用文档](#-详细使用文档)
- [国际化](#-国际化)
- [主题定制](#-主题定制)
- [工具函数](#-工具函数)
- [开发指南](#-开发指南)

---

## ✨ 特性

- 🎨 **现代化设计** - 基于 Quasar UI 框架的美观组件
- 🚀 **TypeScript** - 完整的类型定义支持
- 📦 **开箱即用** - 丰富的企业级组件
- 🌍 **国际化** - 内置中英文支持
- 🎯 **权限控制** - 灵活的权限管理组件
- 📊 **数据可视化** - 基于 Chart.js 的图表组件
- 🔧 **高度可定制** - 灵活的主题和样式配置

---

## 📦 安装

```bash
# npm
npm install rtcpt

# yarn
yarn add rtcpt

# pnpm
pnpm add rtcpt
```

### 依赖要求

```json
{
  "vue": "^3.0.0",
  "quasar": "^2.0.0",
  "chart.js": "^4.0.0"
}
```

### Quasar 插件要求

使用 rtcpt 组件库时，需要在你的应用中注册以下 Quasar 插件：

```typescript
import { Quasar, Notify, Dialog } from 'quasar'

app.use(Quasar, {
  plugins: {
    Notify,  // 必需：用于消息提示
    Dialog   // 必需：用于对话框
  }
})
```

**注意**：rtcpt 组件库不依赖 `LoadingBar` 插件，你可以根据自己的需求选择是否在应用中使用它来显示HTTP请求的加载进度条。

---

## 🚀 快速开始

### 1. 引入样式

在你的主入口文件（如 `main.ts`）中引入样式：

```typescript
import 'rtcpt/rtcpt.css'
import 'rtcpt/rtcpt-styles.css'
```

### 2. 初始化组件库

```typescript
import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'
import { rtcptInit } from 'rtcpt'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 配置 Quasar，注册必需的插件
app.use(Quasar, {
  plugins: {
    Notify,  // 必需
    Dialog   // 必需
  }
})

// 初始化 rtcpt
rtcptInit({
  app,
  router,
  // 可选：权限配置
  pagePermissionIds: ref(['operation-all', 'user-edit']),
  // 可选：自定义颜色
  colors: {
    primary: '#1976D2',
    grey: '#666666'
  }
})

app.mount('#app')
```

### 3. 使用组件

```vue
<template>
  <div>
    <j-q-input 
      v-model="value" 
      label="用户名"
      :rules="[val => !!val || '请输入用户名']"
    />
    
    <j-q-select
      v-model="selectedValue"
      :options="options"
      label="选择项"
    />
    
    <j-q-button @click="handleSubmit">
      提交
    </j-q-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQInput, JQSelect } from 'rtcpt'

const value = ref('')
const selectedValue = ref(null)
const options = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 }
])
</script>
```

---

## 📋 组件列表

### 表单组件

| 组件名              | 说明           | 主要功能                               |
| ------------------- | -------------- | -------------------------------------- |
| **JQInput**         | 输入框         | 支持多种类型、验证规则、密码显隐       |
| **JQSelect**        | 下拉选择器     | 支持单选/多选、搜索过滤、远程数据      |
| **JQDate**          | 日期选择器     | 支持单日期/日期范围选择                |
| **JQDatetime**      | 日期时间选择器 | 日期和时间组合选择                     |
| **JQFile**          | 文件上传       | 支持拖拽上传、多文件、文件大小限制     |
| **JQAutocomplete**  | 自动完成输入框 | 支持远程搜索、模糊匹配                 |
| **JQFormLabel**     | 表单标签       | 统一的表单标签样式，支持必填标记和提示 |
| **JQSearchForm**    | 搜索表单       | 快速构建搜索条件表单                   |
| **JCListEditor**    | 列表编辑器     | 动态添加/删除列表项                    |
| **JCDuoListEditor** | 双列表编辑器   | 键值对形式的列表编辑                   |

### 数据展示组件

| 组件名           | 说明       | 主要功能                       |
| ---------------- | ---------- | ------------------------------ |
| **JQTable**      | 数据表格   | 支持分页、排序、选择、自定义列 |
| **JQDetailList** | 详情列表   | 展示结构化详情数据             |
| **JCTree**       | 树形控件   | 树形数据展示和选择             |
| **JCTreeSelect** | 树形选择器 | 下拉形式的树形选择             |
| **JQTooltip**    | 工具提示   | 智能定位的提示信息             |
| **JQPopover**    | 弹出框     | 内容弹出显示                   |
| **JCTabs**       | 标签页     | 选项卡切换                     |
| **JCTitleLine**  | 标题线     | 区域标题分隔                   |

### 图表组件

| 组件名             | 说明        | 基于 Chart.js |
| ------------------ | ----------- | ------------- |
| **JChLine**        | 折线图      | ✓             |
| **JChBar**         | 柱状图      | ✓             |
| **JChBarLine**     | 柱线混合图  | ✓             |
| **JChPieDoughnut** | 饼图/环形图 | ✓             |
| **JChRadar**       | 雷达图      | ✓             |
| **JChBubble**      | 气泡图      | ✓             |

### 工具组件

| 组件名              | 说明       | 主要功能                 |
| ------------------- | ---------- | ------------------------ |
| **JQDialog**        | 对话框     | 支持动态组件、侧边栏模式 |
| **JQConfirm**       | 确认框     | 快速确认操作             |
| **JQConfirmDialog** | 确认对话框 | 带图标的确认对话框       |
| **JQMessage**       | 消息提示   | 全局消息通知             |
| **JCCopy**          | 复制按钮   | 一键复制文本             |
| **JCPermission**    | 权限控制   | 基于权限的内容显示       |
| **JCEditableProxy** | 可编辑代理 | 双击编辑功能             |
| **JCFallback**      | 加载占位   | 异步组件加载占位         |
| **JCFormatLookup**  | 格式化查找 | 数据格式化显示           |
| **JQOptionGroup**   | 选项组     | 单选/多选按钮组          |
| **JQNewValue**      | 新值标记   | 标记新增或修改的值       |

---

## 📚 详细使用文档

### 表单组件

#### JQInput - 输入框

基础的表单输入组件，支持多种输入类型和验证。

**基础用法**

```vue
<template>
  <j-q-input 
    v-model="username" 
    label="用户名"
    placeholder="请输入用户名"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQInput } from 'rtcpt'

const username = ref('')
</script>
```

**表单验证**

```vue
<template>
  <j-q-input 
    v-model="email" 
    label="邮箱"
    :rules="[
      val => !!val || '请输入邮箱',
      val => /.+@.+\..+/.test(val) || '邮箱格式不正确'
    ]"
  />
</template>
```

**密码输入（带显示/隐藏）**

```vue
<template>
  <j-q-input 
    v-model="password" 
    label="密码"
    custom-type="password"
  >
    <template #append="{ toggleVisibility, isContentVisible }">
      <q-icon 
        :name="isContentVisible ? 'visibility' : 'visibility_off'"
        @click="toggleVisibility"
        class="cursor-pointer"
      />
    </template>
  </j-q-input>
</template>
```

**秘钥输入（自动脱敏）**

```vue
<template>
  <!-- 显示为: abc***xyz -->
  <j-q-input 
    v-model="apiKey" 
    label="API Key"
    custom-type="secret"
  />
</template>
```

**Props**

| 属性           | 类型                               | 默认值   | 说明                            |
| -------------- | ---------------------------------- | -------- | ------------------------------- |
| `modelValue`   | `String \| Number`                 | -        | 输入值                          |
| `label`        | `String`                           | -        | 标签文本                        |
| `dense`        | `Boolean`                          | `true`   | 紧凑模式                        |
| `outlined`     | `Boolean`                          | `true`   | 外边框模式                      |
| `readonly`     | `Boolean`                          | `false`  | 只读                            |
| `disable`      | `Boolean`                          | `false`  | 禁用                            |
| `maxlength`    | `String \| Number`                 | `64`     | 最大长度                        |
| `rules`        | `Array`                            | -        | 验证规则                        |
| `type`         | `String`                           | `'text'` | 输入类型（text/number/email等） |
| `customType`   | `'text' \| 'password' \| 'secret'` | `'text'` | 自定义类型                      |
| `inputLimitFn` | `Function`                         | -        | 输入限制函数                    |

**Slots**

- `prepend` - 前置内容
- `append` - 后置内容（接收 toggleVisibility, isContentVisible 等参数）
- `after` - 输入框后面的内容

**Events**

- `update:modelValue` - 值变化事件
- `change` - 值变更事件

---

#### JQSelect - 下拉选择器

功能强大的下拉选择组件，支持单选、多选、搜索等功能。

**基础用法**

```vue
<template>
  <j-q-select
    v-model="value"
    :options="options"
    option-label="label"
    option-value="value"
    label="选择项"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQSelect } from 'rtcpt'

const value = ref(null)
const options = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
])
</script>
```

**多选模式**

```vue
<template>
  <j-q-select
    v-model="selectedValues"
    :options="options"
    multiple
    use-chips
    label="多选"
  />
</template>

<script setup lang="ts">
const selectedValues = ref([])
</script>
```

**支持搜索过滤**

```vue
<template>
  <j-q-select
    v-model="value"
    :options="options"
    filterable
    label="可搜索选择"
  />
</template>
```

**远程搜索**

```vue
<template>
  <j-q-select
    v-model="value"
    :options="remoteOptions"
    :filter-fn="handleFilter"
    :loading="loading"
    filterable
    label="远程搜索"
  />
</template>

<script setup lang="ts">
const loading = ref(false)
const remoteOptions = ref([])

const handleFilter = async (inputValue: string, callback: Function) => {
  loading.value = true
  try {
    const response = await fetch(`/api/search?q=${inputValue}`)
    const data = await response.json()
    callback(data)
  } finally {
    loading.value = false
  }
}
</script>
```

**自定义显示内容**

```vue
<template>
  <j-q-select
    v-model="value"
    :options="users"
    label="用户"
  >
    <template #option="{ opt }">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="opt.avatar">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
          <q-item-label caption>{{ opt.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </j-q-select>
</template>
```

**Props**

| 属性             | 类型                                  | 默认值    | 说明                 |
| ---------------- | ------------------------------------- | --------- | -------------------- |
| `modelValue`     | `String \| Number \| Array \| Object` | -         | 选中值               |
| `options`        | `Array`                               | `[]`      | 选项列表             |
| `optionLabel`    | `String`                              | `'label'` | 选项显示字段         |
| `optionValue`    | `String`                              | `'value'` | 选项值字段           |
| `multiple`       | `Boolean`                             | `false`   | 多选模式             |
| `filterable`     | `Boolean`                             | -         | 可搜索               |
| `filterFn`       | `Function`                            | -         | 自定义过滤函数       |
| `loading`        | `Boolean`                             | -         | 加载状态             |
| `clearable`      | `Boolean`                             | `true`    | 可清除               |
| `dense`          | `Boolean`                             | `true`    | 紧凑模式             |
| `useChips`       | `Boolean`                             | -         | 使用芯片显示（多选） |
| `maxValues`      | `String \| Number`                    | -         | 最大选择数量         |
| `valueDisplayFn` | `Function`                            | -         | 自定义值显示函数     |

**Slots**

- `option` - 自定义选项内容
- `value-display` - 自定义已选值显示
- `chip-value-display` - 自定义芯片显示
- `no-option` - 无数据时显示
- `prepend/append/after` - 插槽位置

---

#### JQDate - 日期选择器

日期选择组件，支持单日期和日期范围选择。

**单日期选择**

```vue
<template>
  <j-q-date 
    v-model="date" 
    label="选择日期"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQDate } from 'rtcpt'

const date = ref('2025-12-04')
</script>
```

**日期范围选择**

```vue
<template>
  <j-q-date 
    v-model="dateRange" 
    label="日期范围"
    range
  />
</template>

<script setup lang="ts">
const dateRange = ref({
  from: '2025-12-01',
  to: '2025-12-31'
})
</script>
```

**自定义日期格式**

```vue
<template>
  <j-q-date 
    v-model="date" 
    label="自定义格式"
    mask="YYYY/MM/DD"
  />
</template>
```

**限制可选日期**

```vue
<template>
  <j-q-date 
    v-model="date" 
    label="限制日期"
    :options="date => date >= '2025/01/01'"
  />
</template>
```

**Props**

| 属性             | 类型                                 | 默认值         | 说明           |
| ---------------- | ------------------------------------ | -------------- | -------------- |
| `modelValue`     | `String \| Number \| Date \| Object` | -              | 日期值         |
| `label`          | `String`                             | -              | 标签           |
| `mask`           | `String`                             | `'YYYY-MM-DD'` | 日期格式       |
| `range`          | `Boolean`                            | `false`        | 范围选择       |
| `options`        | `Function \| Array`                  | -              | 限制可选日期   |
| `clearable`      | `Boolean`                            | `true`         | 可清除         |
| `readonly`       | `Boolean`                            | `false`        | 只读           |
| `valueDisplayFn` | `Function`                           | -              | 自定义显示函数 |

**Events**

- `update:modelValue` - 值变化
- `rangeStart` - 范围开始选择
- `rangeEnd` - 范围结束选择
- `hide` - 弹出层隐藏

---

#### JQFile - 文件上传

文件上传组件，支持拖拽上传、多文件、预览等功能。

**基础用法**

```vue
<template>
  <j-q-file 
    v-model="files"
    accept="image/*"
    max-file-size="5 MB"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQFile } from 'rtcpt'

const files = ref<File[]>([])
</script>
```

**限制文件类型和数量**

```vue
<template>
  <j-q-file 
    v-model="files"
    accept=".pdf,.doc,.docx"
    :maxlength="3"
    max-file-size="10 MB"
  />
</template>
```

**文件上传前处理**

```vue
<template>
  <j-q-file 
    v-model="files"
    :before-handle="handleBeforeUpload"
  />
</template>

<script setup lang="ts">
const handleBeforeUpload = async (files: File[]) => {
  // 可以进行文件验证、压缩等处理
  const validFiles = files.filter(file => {
    if (file.size > 5 * 1024 * 1024) {
      console.error('文件过大')
      return false
    }
    return true
  })
  
  return validFiles
}
</script>
```

**Props**

| 属性           | 类型               | 默认值   | 说明             |
| -------------- | ------------------ | -------- | ---------------- |
| `modelValue`   | `File[]`           | -        | 文件列表         |
| `accept`       | `String`           | -        | 接受的文件类型   |
| `maxlength`    | `String \| Number` | -        | 最大文件数量     |
| `maxFileSize`  | `String`           | `'2 MB'` | 单个文件最大大小 |
| `beforeHandle` | `Function`         | -        | 上传前处理函数   |
| `disable`      | `Boolean`          | -        | 禁用             |

**Slots**

- `hint` - 提示信息

---

#### JQFormLabel - 表单标签

统一的表单项标签组件，提供一致的表单布局。

**基础用法**

```vue
<template>
  <j-q-form-label label="用户名" required>
    <j-q-input v-model="username" />
  </j-q-form-label>
</template>
```

**带提示信息**

```vue
<template>
  <j-q-form-label 
    label="密码" 
    required
    tip="密码长度至少8位，需包含字母和数字"
  >
    <j-q-input v-model="password" type="password" />
  </j-q-form-label>
</template>
```

**水平/垂直布局**

```vue
<template>
  <!-- 水平布局 -->
  <j-q-form-label label="姓名" horizontal>
    <j-q-input v-model="name" />
  </j-q-form-label>
  
  <!-- 垂直布局 -->
  <j-q-form-label label="简介" vertical>
    <q-input v-model="bio" type="textarea" />
  </j-q-form-label>
</template>
```

**Props**

| 属性         | 类型                        | 默认值  | 说明         |
| ------------ | --------------------------- | ------- | ------------ |
| `label`      | `String`                    | -       | 标签文本     |
| `required`   | `Boolean`                   | `false` | 必填标记     |
| `tip`        | `String`                    | -       | 提示信息     |
| `horizontal` | `Boolean`                   | `false` | 水平布局     |
| `vertical`   | `Boolean`                   | `false` | 垂直布局     |
| `labelClass` | `String \| Object \| Array` | -       | 标签样式类   |
| `valueClass` | `String \| Object \| Array` | -       | 值区域样式类 |

**Slots**

- `default` - 表单控件内容
- `label-hint` - 标签提示内容
- `form-item-detail` - 表单项详情

---

#### JQSearchForm - 搜索表单

快速构建搜索条件表单，带查询和重置功能。

**基础用法**

```vue
<template>
  <j-q-search-form
    v-model="searchForm"
    :query-loading="loading"
    @query="handleQuery"
    @reset="handleReset"
  >
    <j-q-form-label label="用户名">
      <j-q-input v-model="searchForm.username" />
    </j-q-form-label>
    
    <j-q-form-label label="状态">
      <j-q-select 
        v-model="searchForm.status" 
        :options="statusOptions"
      />
    </j-q-form-label>
    
    <j-q-form-label label="创建时间">
      <j-q-date v-model="searchForm.createTime" range />
    </j-q-form-label>
  </j-q-search-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQSearchForm } from 'rtcpt'

const loading = ref(false)
const searchForm = ref({
  username: '',
  status: null,
  createTime: null
})

const handleQuery = async () => {
  loading.value = true
  try {
    // 执行查询
    await fetchData(searchForm.value)
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  console.log('表单已重置')
}
</script>
```

**自定义操作按钮**

```vue
<template>
  <j-q-search-form v-model="searchForm" @query="handleQuery">
    <!-- 搜索条件 -->
    <j-q-form-label label="关键词">
      <j-q-input v-model="searchForm.keyword" />
    </j-q-form-label>
    
    <!-- 额外操作按钮 -->
    <template #extra-operation>
      <q-btn 
        label="导出" 
        @click="handleExport" 
        outline
      />
      <q-btn 
        label="高级搜索" 
        @click="showAdvanced = true"
      />
    </template>
  </j-q-search-form>
</template>
```

**Props**

| 属性               | 类型      | 默认值 | 说明         |
| ------------------ | --------- | ------ | ------------ |
| `modelValue`       | `Object`  | -      | 表单数据对象 |
| `queryLoading`     | `Boolean` | -      | 查询加载状态 |
| `resetLoading`     | `Boolean` | -      | 重置加载状态 |
| `resetVisible`     | `Boolean` | `true` | 显示重置按钮 |
| `operationVisible` | `Boolean` | `true` | 显示操作按钮 |

**Events**

- `query` - 点击查询按钮
- `reset` - 点击重置按钮
- `update:modelValue` - 表单数据更新

**Slots**

- `default` - 搜索条件表单项
- `extra-operation` - 额外的操作按钮

---

#### JCListEditor - 列表编辑器

动态添加和删除列表项的编辑器组件。

**基础用法**

```vue
<template>
  <j-c-list-editor
    v-model="emails"
    label="邮箱列表"
    required
    :max-items="10"
    :rules="[val => /.+@.+\..+/.test(val) || '邮箱格式不正确']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCListEditor } from 'rtcpt'

const emails = ref(['admin@example.com'])
</script>
```

**自定义默认值**

```vue
<template>
  <j-c-list-editor
    v-model="urls"
    label="URL列表"
    placeholder="请输入URL"
    default-new-value="https://"
    :max-items="5"
  />
</template>
```

**Props**

| 属性              | 类型       | 默认值  | 说明         |
| ----------------- | ---------- | ------- | ------------ |
| `modelValue`      | `String[]` | `['']`  | 列表数据     |
| `label`           | `String`   | -       | 标签（必填） |
| `required`        | `Boolean`  | `false` | 必填标记     |
| `rules`           | `Array`    | -       | 验证规则     |
| `readonly`        | `Boolean`  | `false` | 只读         |
| `placeholder`     | `String`   | -       | 占位符       |
| `defaultNewValue` | `String`   | `''`    | 新增项默认值 |
| `maxItems`        | `Number`   | `5`     | 最大项数     |

---

### 数据展示组件

#### JQTable - 数据表格

功能强大的数据表格组件，支持分页、排序、选择等。

**基础用法**

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
import { ref, onMounted } from 'vue'
import { JQTable } from 'rtcpt'

const tableRef = ref()
const loading = ref(false)
const rows = ref([])

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true
  },
  {
    name: 'name',
    label: '名称',
    field: 'name',
    align: 'left'
  },
  {
    name: 'email',
    label: '邮箱',
    field: 'email'
  },
  {
    name: 'status',
    label: '状态',
    field: 'status'
  },
  {
    name: 'actions',
    label: '操作',
    field: 'actions',
    align: 'center'
  }
]

const handlePaginationChange = async (pagination) => {
  loading.value = true
  try {
    const data = await fetchData({
      page: pagination.page,
      pageSize: pagination.rowsPerPage
    })
    rows.value = data.rows
    tableRef.value.setTotal(data.total)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handlePaginationChange({ page: 1, rowsPerPage: 10 })
})
</script>
```

**自定义列**

```vue
<template>
  <j-q-table
    :columns="columns"
    :rows="rows"
  >
    <!-- 自定义状态列 -->
    <template #body-cell-status="props">
      <q-td :props="props">
        <q-badge 
          :color="props.row.status === 'active' ? 'green' : 'grey'"
          :label="props.row.status"
        />
      </q-td>
    </template>
    
    <!-- 自定义操作列 -->
    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn 
          flat 
          dense 
          icon="edit" 
          @click="handleEdit(props.row)"
        />
        <q-btn 
          flat 
          dense 
          icon="delete" 
          @click="handleDelete(props.row)"
        />
      </q-td>
    </template>
  </j-q-table>
</template>
```

**带选择功能**

```vue
<template>
  <div>
    <j-q-table
      v-model:selected="selected"
      :columns="columns"
      :rows="rows"
      selection="multiple"
    />
    
    <div v-if="selected.length" class="q-mt-md">
      已选择 {{ selected.length }} 项
      <q-btn @click="handleBatchDelete">批量删除</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const selected = ref([])

const handleBatchDelete = () => {
  console.log('删除选中项:', selected.value)
}
</script>
```

**Props**

| 属性                     | 类型      | 默认值  | 说明               |
| ------------------------ | --------- | ------- | ------------------ |
| `columns`                | `Array`   | `[]`    | 列配置             |
| `rows`                   | `Array`   | `[]`    | 行数据             |
| `rowKey`                 | `String`  | `'id'`  | 行唯一键           |
| `loading`                | `Boolean` | `false` | 加载状态           |
| `selected`               | `Array`   | -       | 选中行（v-model）  |
| `dense`                  | `Boolean` | `false` | 紧凑模式           |
| `flat`                   | `Boolean` | `true`  | 扁平样式           |
| `hidePagination`         | `Boolean` | `false` | 隐藏分页           |
| `autoScrollOnChangePage` | `Boolean` | `true`  | 翻页自动滚动到顶部 |

**Methods (通过 ref 调用)**

| 方法                 | 参数              | 说明         |
| -------------------- | ----------------- | ------------ |
| `setTotal`           | `(total: number)` | 设置总条数   |
| `setNum`             | `(num: number)`   | 设置当前页码 |
| `setSize`            | `(size: number)`  | 设置每页条数 |
| `getNum`             | -                 | 获取当前页码 |
| `getPaginationParam` | -                 | 获取分页参数 |
| `scrollTop`          | -                 | 滚动到顶部   |

**Events**

- `paginationChange` - 分页变化
- `update:selected` - 选中项变化

**Slots**

- `top` - 表格顶部内容
- `header` - 自定义表头
- `body` - 自定义表体
- `header-cell-[name]` - 自定义列表头
- `body-cell-[name]` - 自定义列内容
- `append` - 表格底部追加内容

---

#### JCTree - 树形控件

树形数据展示和选择组件。

**基础用法**

```vue
<template>
  <j-c-tree
    v-model="selected"
    :options="treeData"
    option-label="label"
    option-value="id"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCTree } from 'rtcpt'

const selected = ref([])
const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      { id: '1-1', label: '二级节点1-1' },
      { 
        id: '1-2', 
        label: '二级节点1-2',
        children: [
          { id: '1-2-1', label: '三级节点1-2-1' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级节点2'
  }
])
</script>
```

**单选模式**

```vue
<template>
  <j-c-tree
    v-model="selected"
    :options="treeData"
    tick-strategy="strict"
  />
</template>
```

**Props**

| 属性           | 类型      | 默认值     | 说明                                  |
| -------------- | --------- | ---------- | ------------------------------------- |
| `modelValue`   | `Array`   | -          | 选中的节点值                          |
| `options`      | `Array`   | `[]`       | 树形数据                              |
| `optionLabel`  | `String`  | `'label'`  | 标签字段                              |
| `optionValue`  | `String`  | `'value'`  | 值字段                                |
| `tickStrategy` | `String`  | `'strict'` | 勾选策略（strict/leaf/leaf-filtered） |
| `multiple`     | `Boolean` | `false`    | 多选模式                              |
| `readonly`     | `Boolean` | `false`    | 只读                                  |
| `disable`      | `Boolean` | `false`    | 禁用                                  |

---

#### JCTreeSelect - 树形选择器

下拉形式的树形选择组件。

**基础用法**

```vue
<template>
  <j-c-tree-select
    v-model="selectedValue"
    :options="treeOptions"
    label="选择部门"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCTreeSelect } from 'rtcpt'

const selectedValue = ref(null)
const treeOptions = ref([
  {
    value: 'tech',
    label: '技术部',
    children: [
      { value: 'frontend', label: '前端组' },
      { value: 'backend', label: '后端组' }
    ]
  },
  {
    value: 'market',
    label: '市场部'
  }
])
</script>
```

---

### 图表组件

所有图表组件都基于 Chart.js 构建，提供一致的 API 设计。

#### JChLine - 折线图

**基础用法**

```vue
<template>
  <j-ch-line
    :labels="labels"
    :datasets="datasets"
    :height="400"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JChLine } from 'rtcpt'

const labels = ref(['1月', '2月', '3月', '4月', '5月', '6月'])
const datasets = ref([
  {
    label: '销售额',
    data: [65, 59, 80, 81, 56, 55],
    borderColor: '#1976D2',
    backgroundColor: 'rgba(25, 118, 210, 0.1)'
  },
  {
    label: '利润',
    data: [28, 48, 40, 19, 86, 27],
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)'
  }
])
</script>
```

**Props**

| 属性       | 类型     | 默认值 | 说明     |
| ---------- | -------- | ------ | -------- |
| `labels`   | `Array`  | `[]`   | X轴标签  |
| `datasets` | `Array`  | -      | 数据集   |
| `height`   | `Number` | `300`  | 图表高度 |

---

#### JChBar - 柱状图

**基础用法**

```vue
<template>
  <j-ch-bar
    :labels="labels"
    :datasets="datasets"
  />
</template>

<script setup lang="ts">
const labels = ref(['产品A', '产品B', '产品C', '产品D'])
const datasets = ref([
  {
    label: '2024年',
    data: [12, 19, 3, 5],
    backgroundColor: '#1976D2'
  },
  {
    label: '2025年',
    data: [15, 25, 8, 12],
    backgroundColor: '#4CAF50'
  }
])
</script>
```

---

#### JChPieDoughnut - 饼图/环形图

**饼图**

```vue
<template>
  <j-ch-pie-doughnut
    :labels="labels"
    :datasets="datasets"
    chart-type="pie"
  />
</template>

<script setup lang="ts">
const labels = ref(['直接访问', '搜索引擎', '外部链接', '广告'])
const datasets = ref([
  {
    data: [335, 310, 234, 135],
    backgroundColor: ['#1976D2', '#4CAF50', '#FFC107', '#F44336']
  }
])
</script>
```

**环形图**

```vue
<template>
  <j-ch-pie-doughnut
    :labels="labels"
    :datasets="datasets"
    chart-type="doughnut"
  />
</template>
```

---

#### JChRadar - 雷达图

```vue
<template>
  <j-ch-radar
    :labels="['性能', '安全', '可用性', '易用性', '扩展性']"
    :datasets="datasets"
  />
</template>

<script setup lang="ts">
const datasets = ref([
  {
    label: '产品A',
    data: [80, 90, 70, 85, 75],
    borderColor: '#1976D2',
    backgroundColor: 'rgba(25, 118, 210, 0.2)'
  },
  {
    label: '产品B',
    data: [70, 80, 85, 75, 90],
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)'
  }
])
</script>
```

---

### 工具组件

#### JQDialog - 对话框

强大的对话框组件，支持动态加载组件、侧边栏模式等。

**基础用法**

```vue
<template>
  <div>
    <q-btn @click="openDialog">打开对话框</q-btn>
    
    <j-q-dialog
      ref="dialogRef"
      title="用户信息"
      :max-width="600"
    >
      <div>对话框内容</div>
    </j-q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JQDialog } from 'rtcpt'

const dialogRef = ref()

const openDialog = () => {
  dialogRef.value.open()
}
</script>
```

**动态组件对话框**

```vue
<template>
  <div>
    <q-btn @click="openEditDialog">编辑用户</q-btn>
    
    <j-q-dialog
      ref="dialogRef"
      title="编辑用户"
      :component="EditUserForm"
      :component-bind="{ userId: currentUserId }"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditUserForm from './EditUserForm.vue'

const dialogRef = ref()
const currentUserId = ref(null)

const openEditDialog = (userId) => {
  currentUserId.value = userId
  dialogRef.value.open()
}

const handleConfirm = () => {
  console.log('确认操作')
  dialogRef.value.close()
}
</script>
```

**侧边栏模式**

```vue
<template>
  <j-q-dialog
    ref="dialogRef"
    title="详细信息"
    position="right"
  >
    <div>侧边栏内容</div>
  </j-q-dialog>
</template>
```

**使用 DialogProvider 服务**

```vue
<script setup lang="ts">
import { DialogProvider } from 'rtcpt'
import UserDetailComponent from './UserDetail.vue'

const showUserDetail = (userId) => {
  DialogProvider.create({
    title: '用户详情',
    component: UserDetailComponent,
    componentBind: { userId },
    maxWidth: 800
  })
}
</script>
```

**Props**

| 属性            | 类型               | 默认值       | 说明                                   |
| --------------- | ------------------ | ------------ | -------------------------------------- |
| `title`         | `String`           | -            | 标题                                   |
| `component`     | `Component`        | -            | 动态组件                               |
| `componentBind` | `Object`           | -            | 组件props                              |
| `componentOn`   | `Object`           | -            | 组件事件                               |
| `maxWidth`      | `String \| Number` | -            | 最大宽度                               |
| `minHeight`     | `String \| Number` | `320`        | 最小高度                               |
| `position`      | `String`           | `'standard'` | 位置（standard/right/left/top/bottom） |
| `showHeader`    | `Boolean`          | `true`       | 显示头部                               |
| `showFooter`    | `Boolean`          | `true`       | 显示底部按钮                           |
| `closeOnEsc`    | `Boolean`          | `true`       | ESC关闭                                |
| `closeOnMask`   | `Boolean`          | `true`       | 点击遮罩关闭                           |

**Methods**

| 方法                | 参数                 | 说明             |
| ------------------- | -------------------- | ---------------- |
| `open`              | -                    | 打开对话框       |
| `close`             | -                    | 关闭对话框       |
| `setLoading`        | `(loading: boolean)` | 设置加载状态     |
| `changeCancelText`  | `(text: string)`     | 修改取消按钮文本 |
| `changeConfirmText` | `(text: string)`     | 修改确认按钮文本 |

**Slots**

- `title` - 自定义标题
- `default` - 对话框内容

---

#### JQMessage - 消息提示

全局消息提示组件。

**基础用法**

```vue
<script setup lang="ts">
import { JQMessage } from 'rtcpt'

// 成功消息
JQMessage.show({
  type: 'success',
  content: '操作成功！'
})

// 错误消息
JQMessage.show({
  type: 'error',
  content: '操作失败，请重试'
})

// 警告消息
JQMessage.show({
  type: 'warn',
  content: '请注意数据安全'
})

// 自定义位置
JQMessage.show({
  type: 'success',
  content: '保存成功',
  position: 'bottom-right'
})

// 通知模式（带关闭按钮）
JQMessage.show({
  type: 'success',
  content: '这是一条重要通知',
  isNotify: true
})
</script>
```

**API**

```typescript
JQMessage.show({
  type: 'success' | 'error' | 'warn',
  content: string,
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  isNotify?: boolean  // 是否显示关闭按钮
})
```

---

#### JQConfirmDialog - 确认对话框

快速创建确认对话框。

**基础用法**

```vue
<script setup lang="ts">
import { JQConfirmDialog } from 'rtcpt'

const handleDelete = async (id) => {
  const confirmed = await JQConfirmDialog.show({
    title: '确认删除',
    message: '删除后数据将无法恢复，确定要继续吗？',
    confirmText: '删除',
    cancelText: '取消'
  })
  
  if (confirmed) {
    await deleteItem(id)
    JQMessage.show({
      type: 'success',
      content: '删除成功'
    })
  }
}
</script>
```

---

#### JCCopy - 复制按钮

一键复制文本到剪贴板。

**基础用法**

```vue
<template>
  <div>
    <span>{{ apiKey }}</span>
    <j-c-copy :text="apiKey" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCCopy } from 'rtcpt'

const apiKey = ref('sk-1234567890abcdef')
</script>
```

**自定义恢复延迟**

```vue
<template>
  <j-c-copy 
    :text="text" 
    :revert-delay="5000"
  />
</template>
```

**Props**

| 属性          | 类型                         | 默认值 | 说明                   |
| ------------- | ---------------------------- | ------ | ---------------------- |
| `text`        | `String \| Number \| Object` | -      | 要复制的文本           |
| `revertDelay` | `Number`                     | `2000` | 成功图标显示时间（ms） |

---

#### JCPermission - 权限控制

基于权限ID控制内容显示。

**基础用法**

```vue
<template>
  <div>
    <!-- 仅当用户有 'user-edit' 权限时显示 -->
    <j-c-permission permission-id="user-edit">
      <q-btn label="编辑" @click="handleEdit" />
    </j-c-permission>
    
    <!-- 仅当用户有 'user-delete' 权限时显示 -->
    <j-c-permission permission-id="user-delete">
      <q-btn label="删除" @click="handleDelete" />
    </j-c-permission>
  </div>
</template>

<script setup lang="ts">
import { JCPermission } from 'rtcpt'
</script>
```

**初始化权限**

在应用初始化时配置用户权限：

```typescript
// main.ts
import { rtcptInit } from 'rtcpt'
import { ref } from 'vue'

const userPermissions = ref([
  'user-view',
  'user-edit',
  'user-delete',
  'operation-all'
])

rtcptInit({
  app,
  pagePermissionIds: userPermissions
})
```

**Props**

| 属性           | 类型     | 默认值 | 说明   |
| -------------- | -------- | ------ | ------ |
| `permissionId` | `String` | -      | 权限ID |

---

#### JCEditableProxy - 可编辑代理

双击实现就地编辑功能。

**基础用法**

```vue
<template>
  <j-c-editable-proxy
    v-model="username"
    @save="handleSave"
  >
    <template #display="{ value }">
      <span>{{ value }}</span>
    </template>
    
    <template #edit="{ value, onChange }">
      <j-q-input 
        :model-value="value"
        @update:model-value="onChange"
        autofocus
      />
    </template>
  </j-c-editable-proxy>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { JCEditableProxy } from 'rtcpt'

const username = ref('张三')

const handleSave = async (newValue) => {
  await updateUsername(newValue)
  console.log('已保存:', newValue)
}
</script>
```

---

#### JQTooltip - 工具提示

智能定位的提示信息组件。

**基础用法**

```vue
<template>
  <j-q-tooltip content="这是提示信息">
    <q-btn label="悬停查看提示" />
  </j-q-tooltip>
</template>
```

**自定义样式**

```vue
<template>
  <j-q-tooltip 
    content="这是一段较长的提示信息，会自动换行显示"
    :max-width="200"
  >
    <q-icon name="help" />
  </j-q-tooltip>
</template>
```

**Props**

| 属性       | 类型     | 默认值 | 说明     |
| ---------- | -------- | ------ | -------- |
| `content`  | `String` | -      | 提示内容 |
| `maxWidth` | `Number` | -      | 最大宽度 |

---

## 🌍 国际化

rtcpt 内置中英文国际化支持。

### 使用内置国际化

```typescript
import { useI18n, setLocale, getLocale } from 'rtcpt'

// 在组件中使用
const { t } = useI18n()

// 切换语言
setLocale('zh-CN')  // 中文
setLocale('en-US')  // 英文

// 获取当前语言
const currentLocale = getLocale()

// 使用翻译
const message = t('messages.pleaseEnter')  // "请输入" 或 "Please enter"
```

### 支持的语言包

**中文（zh-CN）**

```typescript
{
  action: {
    confirm: '确认',
    cancel: '取消',
    query: '搜索',
    reset: '重置'
  },
  messages: {
    pleaseEnter: '请输入',
    pleaseSelect: '请选择',
    noData: '无数据',
    loading: '加载中...'
  }
}
```

**英文（en-US）**

```typescript
{
  action: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    query: 'Search',
    reset: 'Reset'
  },
  messages: {
    pleaseEnter: 'Please enter',
    pleaseSelect: 'Please select',
    noData: 'No data',
    loading: 'Loading...'
  }
}
```

### 扩展语言包

```typescript
import { setLocale } from 'rtcpt'

// 添加自定义翻译
const customMessages = {
  myApp: {
    welcome: '欢迎使用'
  }
}

// 使用时合并
setLocale('zh-CN', customMessages)
```

---

## 🎨 主题定制

### 自定义颜色

在初始化时配置自定义颜色：

```typescript
import { rtcptInit } from 'rtcpt'

rtcptInit({
  app,
  colors: {
    primary: '#1976D2',    // 主色
    secondary: '#26A69A',  // 辅助色
    accent: '#9C27B0',     // 强调色
    positive: '#21BA45',   // 成功
    negative: '#C10015',   // 错误
    info: '#31CCEC',       // 信息
    warning: '#F2C037',    // 警告
    dark: '#1D1D1D',       // 深色
    grey: '#666666'        // 灰色
  }
})
```

### 使用 CSS 变量

所有颜色都会设置为 CSS 变量，可在样式中使用：

```scss
.my-component {
  color: var(--j-color-primary);
  background: var(--j-color-grey);
  border-color: var(--j-color-secondary);
}
```

### 覆盖组件样式

```scss
// 覆盖输入框样式
.j-q-input {
  .q-field__control {
    border-radius: 8px;
  }
}

// 覆盖表格样式
.j-q-table {
  .q-table__top {
    padding: 16px;
    background: #f5f5f5;
  }
}
```

---

## 🔧 工具函数

rtcpt 提供了一组实用的工具函数。

### 导入工具函数

```typescript
import { jqTool } from 'rtcpt'
```

### 常用工具函数

#### transformTreeUseLabelAndValue

转换树形数据的字段名。

```typescript
const treeData = [
  {
    id: 1,
    name: '节点1',
    children: [
      { id: 2, name: '节点1-1' }
    ]
  }
]

const transformed = jqTool.transformTreeUseLabelAndValue(
  treeData,
  { labelKey: 'name', valueKey: 'id' }
)
// 结果:
// [
//   {
//     label: '节点1',
//     value: 1,
//     children: [
//       { label: '节点1-1', value: 2 }
//     ]
//   }
// ]
```

#### JQDownloadFile

下载文件。

```typescript
// 下载远程文件
jqTool.JQDownloadFile({
  url: 'https://example.com/file.pdf',
  filename: 'document.pdf'
})

// 下载 Blob 数据
const blob = new Blob([data], { type: 'application/json' })
jqTool.JQDownloadFile({
  blob,
  filename: 'data.json'
})
```

#### generateDownloadFileName

生成下载文件名（自动添加时间戳）。

```typescript
const filename = jqTool.generateDownloadFileName('报表', 'xlsx')
// 结果: '报表_20251204_143025.xlsx'
```

---

## 🛠️ 开发指南

### 本地开发

```bash
# 克隆仓库
git clone <repository-url>
cd rtcpt

# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建
npm run build
```

### 构建命令

```bash
# 生成颜色配置
npm run build:colors

# 生成自定义 SVG
npm run build:svg

# 完整构建
npm run build
```

### 发布新版本

```bash
# 补丁版本 (0.0.x)
npm run patch

# 次要版本 (0.x.0)
npm run minor

# 主要版本 (x.0.0)
npm run major
```

### 项目结构

```
rtcpt/
├── src/
│   ├── assets/           # 静态资源
│   │   └── svg/          # SVG 图标
│   ├── components/       # 组件
│   │   ├── j-c-*/        # 通用组件
│   │   ├── j-ch-*/       # 图表组件
│   │   └── j-q-*/        # Quasar 增强组件
│   ├── composables/      # 组合式函数
│   ├── config/           # 配置文件
│   ├── css/              # 样式
│   ├── i18n/             # 国际化
│   ├── utils/            # 工具函数
│   ├── index.ts          # 入口文件
│   └── style.js          # 样式入口
├── dist/                 # 构建输出
├── vite.config.js        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── package.json
```

---
