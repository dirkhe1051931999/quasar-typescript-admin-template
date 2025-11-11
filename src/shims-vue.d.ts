/* eslint-disable */

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'vue3-count-to';
declare module 'marked';
declare module 'prismjs';
declare module 'less';
declare module 'json-bigint';
declare module 'json-editor-vue';
declare module 'jsvectormap';
declare module 'lodash';