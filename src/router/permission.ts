import router from 'src/router/index';
import { UserModule } from 'src/store/modules/user';
import { PermissionModule } from 'src/store/modules/permission';
import { getToken } from 'src/utils/cookie';
import setting from 'src/setting.json';
import { LoadingBar } from 'quasar';
const whiteList = ['/login'];
const getPageTitle = (key: string) => {
  const hasKey = false;
  if (hasKey) {
    const pageName = 'i18n.t(routes.${key})';
    return '123';
  }
  return `${setting.title}`;
};

router.beforeEach(async (to, _from, next) => {
  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === '/login') {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: '/' });
      LoadingBar.stop();
    } else {
      // 检查用户是否已获得其权限角色
      if (UserModule.roles.length === 0) {
        try {
          // 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']
          await UserModule.getUserInfo();
          // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
          PermissionModule.GenerateRoutes();
          // 将'有访问权限的动态路由' 添加到 Router 中
          PermissionModule.dynamicRoutes.forEach((route) => {
            router.addRoute(route);
          });
          // 确保添加路由已完成
          // 设置 replace: true, 因此导航将不会留下历史记录
          next({ ...to, replace: true });
        } catch (err: any) {
          // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
          UserModule.ResetToken();
          // ElMessage.error(err.message || '路由守卫过程发生错误');
          next(`/login?redirect=${to.path}`);
          LoadingBar.stop();
        }
      } else {
        next();
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next(`/login?redirect=${to.path}`);
      LoadingBar.stop();
    }
  }
});

router.afterEach((to: any): void => {
  LoadingBar.stop();
  document.title = getPageTitle(to.meta.title);
});
