import * as directives from 'src/directives/index';
import { boot } from 'quasar/wrappers';
import { type Directive } from 'vue';
import ElementPlus from 'element-plus';
import 'src/router/permission';
import 'element-plus/dist/index.css';
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
// import { Loading } from 'quasar';

export default boot(({ app }) => {
  // We globally register our directive with Vue;
  // Rememeber that all directives in Vue will start with 'v-'
  // but that should not be part of your directive name
  // https://vuejs.org/v2/guide/custom-directive.html
  // 'my-directive' will be used as 'v-my-directive'
  Object.keys(directives).forEach((key) => {
    app.directive(key, (directives as { [key: string]: Directive })[key]);
  });
  app.use(vue3PhotoPreview);
  app.use(ElementPlus);
  // Loading.setDefaults({
  //   customClass: '15px',
  // });
});
