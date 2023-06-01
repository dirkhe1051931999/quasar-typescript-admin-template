import * as directives from 'src/directives/index';
import { boot } from 'quasar/wrappers';
import { type Directive } from 'vue';
import ElementPlus from 'element-plus';
import 'src/router/permission';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import globalMessage from 'src/utils/notify';
import globalConfirm from 'src/utils/dialogConfirm';
import 'src/utils/types';
import VueSidePanel from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css';
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
  app.use(VueSidePanel);
  app.use(ElementPlus);
  app.config.globalProperties.$globalMessage = globalMessage;
  app.config.globalProperties.$window = window;
  app.config.globalProperties.$globalConfirm = globalConfirm;
  app.config.globalProperties.defaultFill = defaultFill;
  app.config.globalProperties.parseTime = (time: number | string | null | undefined) => {
    let timeStamp = '';
    if (!time || String(time).length < 10) return '--';
    if (!/^\d+$/g.test(time.toString())) {
      if (String(time).indexOf('T') !== -1 && !Number.isNaN(new Date(time).getTimezoneOffset())) {
        const formattedString = date.formatDate(+new Date(time), 'YYYY-MM-DD HH:mm:ss');
        return formattedString;
      } else {
        if (/\d/.test(String(time))) {
          return String(time);
        } else {
          return '--';
        }
      }
    } else {
      if (String(time).length === 10) timeStamp = time += '000';
      else timeStamp = String(time);
      const formattedString = date.formatDate(Number(timeStamp), 'YYYY-MM-DD HH:mm:ss');
      return formattedString;
    }
  };
  document.querySelector('body')?.classList.add(Platform.is.platform);
});
