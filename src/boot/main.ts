import * as directives from 'src/directives/index';
import { boot } from 'quasar/wrappers';
import { type Directive } from 'vue';
import ElementPlus from 'element-plus';
import 'src/router/permission';
import 'element-plus/dist/index.css';
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import globalMessage from 'src/utils/notify';
import globalConfirm from 'src/utils/dialogConfirm';
import 'src/utils/types';
import { defaultFill } from 'src/utils/tools';
import { date } from 'quasar';
import { Platform } from 'quasar';
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
  app.config.globalProperties.$globalMessage = globalMessage;
  app.config.globalProperties.$globalConfirm = globalConfirm;
  app.config.globalProperties.defaultFill = defaultFill;
  app.config.globalProperties.parseTime = (
    time: number | string | null | undefined
  ) => {
    if (!time || !/^\d+$/g.test(time.toString()) || String(time).length < 10)
      return '--';
    let timeStamp = '';
    if (String(time).length === 10) timeStamp = time += '000';
    const formattedString = date.formatDate(
      timeStamp,
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    );
    return formattedString;
  };
  document.querySelector('body')?.classList.add(Platform.is.platform);
});
