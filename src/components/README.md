# 组件使用说明

> 命名约定来源见 `src/components/必读`：`j` = JavaScript、`q` = Quasar、`c` = Custom、`ch` = Chart。

## 示例入口

- `/components/guide` → `src/pages/components/componentGuide.vue`：集中演示 `j-c-editable-proxy`、`j-c-duo-list-editor`、`j-c-fallback`、`j-c-format-lookup`、`j-c-tree`。
- `/table` → `src/pages/table/index.vue`：表格检索流程示例，涵盖 `j-q-*` 系列组件在业务中的协同。
- `/table` 子弹窗 → `src/pages/table/components/*.vue`：延伸演示 `j-c-tabs`、`j-c-title-line`、`j-q-detail-list`、`j-ch-*` 等组件。

## 组件速览

### J-C 系列（自定义容器/业务组件）

| 组件                  | 功能简介                                                   | 示例/引用                                    |
| --------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| `j-c-duo-list-editor` | 基于 slot 的多项配置编辑器，支持增删/自定义行布局          | `/components/guide`                          |
| `j-c-editable-proxy`  | 带权限校验的弹出式编辑器，支持校验与保存回调               | `/components/guide`                          |
| `j-c-fallback`        | 统一处理空值展示，可配置默认文案或移除 DOM                 | `/components/guide`                          |
| `j-c-format-lookup`   | 根据枚举列表将 value 映射为 label，可自定义展示 slot       | `/components/guide`                          |
| `j-c-list-editor`     | 简化版列表编辑器，常用于表单内批量项维护                   | `pages/table/components/add-update.vue`      |
| `j-c-permission`      | 权限指令包装器，可根据 `code` 决定是否渲染内容或移除 DOM   | `pages/table/index.vue`                      |
| `j-c-svg`             | 自定义 SVG 图标渲染，配合 `generate-svg-component.js` 使用 | `layouts/components/sidebar/SidebarItem.vue` |
| `j-c-tabs`            | 自定义样式的标签页容器                                     | `pages/table/components/detail.vue`          |
| `j-c-title-line`      | 模块标题行封装，附带操作插槽                               | `pages/table/components/detail-base.vue`     |
| `j-c-tree`            | 基于 `q-tree` 的多选树封装，内置 tooltip 与严格模式处理    | `/components/guide`                          |
| `j-c-tree-select`     | 结合输入框的树形选择器                                     | `pages/table/index.vue`                      |

### J-Q 系列（Quasar 二次封装）

| 组件                             | 功能简介                                            | 示例/引用                                   |
| -------------------------------- | --------------------------------------------------- | ------------------------------------------- |
| `j-q-autocomplete`               | 带历史记录的输入自动补全                            | `pages/table/index.vue`                     |
| `j-q-confirm`                    | 二次封装的确认弹层，slot 包裹操作按钮               | `pages/table/index.vue`                     |
| `j-q-confirm-dialog`             | 全局确认弹框工具（`globalConfirm`）                 | `pages/table/components/add-update.vue`     |
| `j-q-date` / `j-q-date/datetime` | 日期/日期时间选择，封装常用校验与快捷选项           | `pages/table/index.vue`                     |
| `j-q-detail-list`                | 详情区块展示组件                                    | `pages/table/components/detail-base.vue`    |
| `j-q-dialog`                     | 抽屉/弹窗管理器，暴露 `DialogProvider` 便于统一注册 | `pages/table/index.vue`                     |
| `j-q-file`                       | 文件上传封装，内置上传校验与消息 提示               | `pages/table/components/add-update.vue`     |
| `j-q-form-label`                 | 表单 label 对齐组件                                 | `pages/table/components/add-update.vue`     |
| `j-q-input`                      | 基础输入封装，统一样式与校验写法                    | `pages/table/index.vue`                     |
| `j-q-message`                    | 全局消息管理（`globalMessage`）                     | `router/routes.ts`、`pages/login/index.vue` |
| `j-q-option-group`               | radio/checkbox 组封装                               | `pages/table/components/add-update.vue`     |
| `j-q-search-form`                | 表格检索区容器，内置查询/重置按钮区 slot            | `pages/table/index.vue`                     |
| `j-q-select`                     | 下拉选择封装，支持远程过滤                          | `pages/table/index.vue`                     |
| `j-q-table`                      | 带分页、勾选、slot 扩展的表格容器                   | `pages/table/index.vue`                     |
| `j-q-tooltip`                    | tooltip 语法糖，默认样式统一                        | `pages/table/index.vue`                     |

### J-CH 系列（图表组件）

| 组件                | 功能简介   | 示例/引用                                 |
| ------------------- | ---------- | ----------------------------------------- |
| `j-ch-bar`          | 柱状图封装 | `pages/table/components/detail-chart.vue` |
| `j-ch-bar-line`     | 柱线混合图 | `pages/table/components/detail-chart.vue` |
| `j-ch-bubble`       | 气泡图     | `pages/table/components/detail-chart.vue` |
| `j-ch-line`         | 折线图     | `pages/table/components/detail-chart.vue` |
| `j-ch-pie-doughnut` | 饼/环图    | `pages/table/components/detail-chart.vue` |
| `j-ch-radar`        | 雷达图     | `pages/table/components/detail-chart.vue` |

## 开发建议

- 保持组件命名与 `README` 表格一致，方便检索与统一引用。
- 表格/弹窗等复合页面建议仿照 `/table` 页面的组织方式：查询区（`j-q-search-form`）+ 列表区（`j-q-table`）+ 弹窗/对话框（`j-q-dialog`、`j-q-confirm`）。
- 若新增组件示例，请同步更新 `/components/guide` 或在下方补充新的示例入口，保持文档与代码一致。

