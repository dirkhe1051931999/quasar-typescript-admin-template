# Vue3 Typescript Template With Quasar framework

---

> ## **ENGLISH SUMMARY: ARCHITECTURE AND TECH STACK**
>
> ### Architecture Design and Tech Stack Summary: Hybrid Class and Composition API Paradigm
>
> This project adopts a highly optimized hybrid programming paradigm, aiming to combine the structural benefits of Class syntax with the flexibility of the Composition API, ensuring maintainability
> and clarity in complex projects.
>
> ### I. Core Tech Stack and Paradigm
>
> | Module                | Key Tool                      | Architectural Role                                                                                     |
> | :-------------------- | :---------------------------- | :----------------------------------------------------------------------------------------------------- |
> | **Class Syntax Core** | `vue-facing-decorator`        | Used for implementing **business pages** and **Vuex modules**, providing an object-oriented structure. |
> | **State Management**  | `vuex-module-decorators`      | Implements type-safe Class-based Vuex modules.                                                         |
> | **Base Components**   | Standard Vue 3 `setup` Syntax | Used for building general, loosely coupled base components (e.g., pagination, form inputs).            |
> | **Build Environment** | Webpack 5                     | Responsible for handling the compilation and compatibility of Class structures and modern JavaScript.  |
>
> ### II. Design Advantages and Maintainability
>
> 1. **Structure over Flatness:** In complex business pages, Class syntax provides a more organized and intuitive alternative to the raw Composition API `setup` logic.
> 2. **Inheritance Model:** Component extension utilizes the clean **`extend` syntax** (instead of `mixin`), ensuring a clear inheritance chain and more reliable type inference.
> 3. **Modular Design:** Base component libraries (e.g., `Pagination`) are modularly encapsulated, achieving high reusability.
>
> ### III. Business Code Organization (Class Area Segmentation)
>
> The Class structure enforced on business code mandates clear functional segmentation, significantly enhancing code readability and maintenance efficiency:
>
> | Class Member Area             | Functional Description        | Purpose                                                                                |
> | :---------------------------- | :---------------------------- | :------------------------------------------------------------------------------------- |
> | `props`                       | External Interface Definition | Declares the component's external input data.                                          |
> | `get` / `set`                 | Computed Properties           | Manages derived state and two-way binding logic.                                       |
> | `watch`                       | Reactive Side Effects         | Centralizes logic for handling state change listeners.                                 |
> | `params`                      | Parameters & Configuration    | Unifies the declaration of all required request parameters or internal configurations. |
> | `event` (e.g., `handleClick`) | User Interaction Handling     | Clearly defines methods triggered by user actions.                                     |
> | `http` (Async/Await)          | Asynchronous Requests         | Centralizes and executes all HTTP data fetching logic, optimizing data flow tracing.   |

---

> ## **中文总结：架构设计与开发规范**
>
> ### 架构设计与开发规范总结：基于 Class 与 Composition API 的混合范式
>
> 该项目采用了一种高度优化的混合编程范式，旨在结合 Class 语法的结构优势和 Composition API 的灵活性，确保复杂项目的可维护性和清晰度。
>
> ### I. 核心技术栈与范式
>
> | 模块               | 关键工具                 | 架构角色                                                        |
> | :----------------- | :----------------------- | :-------------------------------------------------------------- |
> | **Class 语法核心** | `vue-facing-decorator`   | 负责**业务页面**和**Vuex 模块**的实现，提供面向对象的代码结构。 |
> | **状态管理**       | `vuex-module-decorators` | 实现类型安全的 Class-based Vuex 模块。                          |
> | **基础组件**       | 标准 Vue 3 `setup` 语法  | 用于构建通用、低耦合的组件库（如分页、表单输入）。              |
> | **构建环境**       | Webpack 5                | 负责处理所有 Class 结构和现代 JavaScript 的转译与兼容性。       |
>
> ### II. 设计优势与可维护性提升
>
> 1. **结构化优于扁平化：** 在复杂的业务页面中，Class 语法比 Composition API 的 `setup` 逻辑更直观、更具组织性。
> 2. **继承模型：** 组件扩展使用清晰的 **`extend` 语法**，避免了 `mixin` 带来的隐式依赖和属性冲突问题。
> 3. **模块化设计：** 基础组件库（例如 `Pagination`）采用模块化封装，实现高复用性。
>
> ### III. 业务代码组织规范 (Class 区域划分)
>
> 使用 Class 结构强制对业务逻辑进行清晰的分层，显著提升了代码的可读性和维护效率：
>
> | Class 成员区域                | 对应功能描述 | 作用                                               |
> | :---------------------------- | :----------- | :------------------------------------------------- |
> | `props`                       | 外部接口定义 | 声明组件的外部输入数据。                           |
> | `get` / `set`                 | 计算属性     | 负责派生状态和双向绑定逻辑。                       |
> | `watch`                       | 响应式副作用 | 集中处理状态变化时的监听逻辑。                     |
> | `params`                      | 参数与配置   | 统一声明组件所需的所有请求参数或内部配置。         |
> | `event` (e.g., `handleClick`) | 事件处理     | 明确定义由用户交互触发的方法。                     |
> | `http` (Async/Await)          | 异步请求     | 集中管理和执行所有 HTTP 数据请求，优化数据流追踪。 |

---

- Vue3 Class syntax online preview https://dirkhe1051931999.github.io/v3-admin

- Vue2 Class syntax preview https://dirkhe1051931999.github.io/quasar

> Login by typing in any username, code and password

## Preview

- Login

<img src="https://hub.oolaf.top/wbimg?url=https://tvax1.sinaimg.cn/large/006rTftcly1i72g14ejzbj31o013iq4h.jpg" >

- Dashboard

<img src="https://hub.oolaf.top/wbimg?url=https://tvax1.sinaimg.cn/large/006rTftcly1i72g14a05gj32t61eyqbk.jpg" >

- Table component

<img src="https://hub.oolaf.top/wbimg?url=https://tvax1.sinaimg.cn/large/006rTftcly1i72g140d5fj32t61eyaiv.jpg" >
<img src="https://hub.oolaf.top/wbimg?url=https://tvax3.sinaimg.cn/large/006rTftcly1i72g13te7sj32t61eygug.jpg" >
<img src="https://hub.oolaf.top/wbimg?url=https://tvax1.sinaimg.cn/large/006rTftcly1i72g13lzmbj32t61ey466.jpg" >

## Install the dependencies (only support yarn)

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### generate svg

```bash
npm run svg
# will generate svg map file -> src/utils/custom-svg.ts
```

### Build the app for production

```bash
npm run build
```

### Publish V3 Admin Webpack

GitHub Actions publishes the `v3-admin-webpack` branch to:

```text
https://dirkhe1051931999.github.io/v3-admin/
```

The workflow uses `RELEASE_TOKEN` from Actions secrets and variables to push the built files into the `v3-admin` directory of `dirkhe1051931999/dirkhe1051931999.github.io`.

The production public path is configured by `src/setting.json`:

```json
"publicPath": "/v3-admin/"
```

### Customize the configuration

See [Configuring quasar.config.js](https://quasar.dev/quasar-cli-webpack/quasar-config-file).
