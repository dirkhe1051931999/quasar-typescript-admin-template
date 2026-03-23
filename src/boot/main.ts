import { boot } from 'quasar/wrappers';
import 'src/router/permission';
import 'qcpt/qcpt.css';
import 'qcpt/qcpt-styles.css';
import { Platform } from 'quasar';
import { qcptInit } from 'qcpt';
import router from 'src/router/index';
import store from 'src/store/index';
import { i18n } from 'src/boot/i18n';
import { pagePermissionIds } from 'src/boot/pagePermission';

export default boot(({ app }: { app: any }) => {
  qcptInit({
    app,
    router,
    store,
    i18n,
    pagePermissionIds,
    defaultLanguage: 'en-US',
    colors: {
      primary: '#0B5CFF',
      negative: '#E93030',
    },
  });
  document.querySelector('body')?.classList.add(Platform.is.platform);
});
