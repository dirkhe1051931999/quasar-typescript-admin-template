/* eslint-disable */

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'js-cookie';
declare module 'path-to-regexp';
declare module 'vue3-count-to';
declare module 'marked';
declare module 'sass.js';
declare module 'vue3-photo-preview';
declare module 'prismjs';
declare module 'less';
declare module 'uuid';
declare module 'sha256';
declare module 'jsencrypt';
declare module 'vue-shepherd';
