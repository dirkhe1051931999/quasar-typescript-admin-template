import router from 'src/router/index';
import { UserModule } from 'src/store/modules/user';
import { PermissionModule } from 'src/store/modules/permission';
import { getToken, getUsername } from 'src/utils/cookie';
import setting from 'src/setting.json';
import { LoadingBar } from 'quasar';
import { AppModule } from 'src/store/modules/app';
import i18n from 'src/i18n';
import store from 'src/store';
import { getUserinfo } from 'src/utils/localStorage';
const whiteList = ['/login', '/login2'];
const getPageTitle = (to: any) => {
  if (whiteList.indexOf(to.path) !== -1) {
    return `${setting.title}`;
  }
  if (!to.matched[1]) {
    return `${setting.title}`;
  }
  if (to.matched[0].name === to.matched[1].name) {
    return `${setting.title} ${
      (i18n as any)[AppModule.language]['routes'][to.meta.title]
    }`;
  } else {
    return `${setting.title} ${
      (i18n as any)[AppModule.language]['routes'][to.meta.title]
    }`;
  }
};

router.beforeEach(async (to, _from, next) => {
  // 判断该用户是否登录
  if (getToken() && getUserinfo() && getUsername()) {
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果已经登录，并且没有带query token 参数，并准备进入 Login 页面，则重定向到主页
      if (to.query.token && to.query.creationId) {
        next();
      } else {
        next({ path: '/dashboard' });
      }
      LoadingBar.stop();
    } else {
      // 检查用户是否已获得其权限角色
      if (!UserModule.introduction) {
        try {
          await UserModule.getUserInfo();
          // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
          PermissionModule.GenerateRoutes();
          // 将'有访问权限的动态路由' 添加到 Router 中
          for (let route of PermissionModule.dynamicRoutes) {
            router.addRoute(route);
          }
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
  document.title = getPageTitle(to);
});
store.watch(
  // 第一个参数是箭头函数，用来选择你要监听的数据
  (state: any, getters) => state.App.language,
  // 第二参数也是箭头函数，是数据改变后的回调监听
  (newVal: string, oldVal: string) => {
    if (router.currentRoute.value)
      document.title = getPageTitle(router.currentRoute.value);
  }
);
