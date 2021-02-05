/***
 * @Author:hejian
 * @Date:2020-07-03 16:31:11
 * @LastModifiedBy:hejian
 * @Last Modified time:2020-07-03 16:31:11
 */
import settings from '@/settings.json';
import { i18n } from '../boot/i18n';
import router, { resetRouter } from '@/router';
import { getToken, setToken } from './cookies';

import { PermissionModule } from '../store/modules/permission';
import { UserModule } from '@/store/modules/user';
import { LoadingBar } from 'quasar';
const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`routes.${key}`);
  if (hasKey) {
    const pageName = i18n.t(`routes.${key}`);
    return `${pageName} - ${settings.title}`;
  }
  return `${settings.title}`;
};
const whiteList = ['/login'];
router.beforeEach(async (to: any, _, next) => {
  // 解决登录后报Uncaught (in promise) undefined问题
  router.currentRoute.path === '/login' &&
    (await new Promise((resolve, reject) => {
      setTimeout(resolve, 188);
    }));
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      LoadingBar.stop();
    } else {
      if (!UserModule.introduction) {
        try {
          await UserModule.getUserInfo();
          const pagePermissionId = UserModule.pagePermissionId;
          const pageEditPermission = UserModule.pageEditPermission;
          // Generate accessible routes map based on role
          await PermissionModule.GenerateRoutes({ pagePermissionId, pageEditPermission });
          // Dynamically add accessible routes
          router.addRoutes(PermissionModule.dynamicRoutes);
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (err) {
          console.log(err)
          // Remove token and  to login page
          UserModule.ResetToken();
          next(`/login?redirect=${to.path}`);
          LoadingBar.stop();
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      LoadingBar.stop();
    }
  }
});
router.afterEach((to) => {
  // Finish progress bar
  LoadingBar.stop();
  // set page title
  document.title = getPageTitle(to.meta.title);
});
