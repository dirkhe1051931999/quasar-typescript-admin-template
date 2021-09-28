import '@/utils/permission';
// 指令过滤器
import * as directives from '@/directives/';
import * as filters from '@/filters';
import Vue, { DirectiveOptions } from 'vue';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 注册全局指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

// 注册全局过滤器功能
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
