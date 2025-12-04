import { boot } from 'quasar/wrappers';
import 'src/router/permission';
import 'rtcpt/style.css';
import 'rtcpt/index.css';
import { Platform } from 'quasar';
import { rtcptInit } from 'rtcpt';
import router from 'src/router/index';
import store from 'src/store/index';
import { i18n } from 'src/boot/i18n';

export default boot(({ app }: { app: any }) => {
  rtcptInit({
    app,
    router,
    store,
    i18n,
    pagePermissionIds: ['operation-all', 'user-edit', 'user-delete'],
  });
  document.querySelector('body')?.classList.add(Platform.is.platform);
});