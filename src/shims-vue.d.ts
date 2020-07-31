// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module 'js-cookie';
declare module 'vue-count-to';
declare module '@antv/g2plot';
declare module 'marked';
declare module 'vue-json-editor'
