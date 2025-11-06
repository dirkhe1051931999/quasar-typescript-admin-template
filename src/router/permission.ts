import router from 'src/router/index';
import { UserModule } from 'src/store/modules/user';
import { PermissionModule } from 'src/store/modules/permission';
import { TagsViewModule } from 'src/store/modules/tags';
import { getToken, getUserinfo, getUsername } from 'src/utils/storage';
import setting from 'src/setting.json';
import { LoadingBar } from 'quasar';
import { AppModule } from 'src/store/modules/app';
import i18n from 'src/i18n';
import store from 'src/store';

const whiteList = ['/login'];
const getPageTitle = (to: any) => {
  if (whiteList.indexOf(to.path) !== -1) {
    return `${setting.title}`;
  }
  if (!to.matched[1]) {
    return `${setting.title}`;
  }
  if (to.matched[0].name === to.matched[1].name) {
    return `${setting.title} ${(i18n as any)[AppModule.language]['routes'][to.meta.title]}`;
  } else {
    return `${setting.title} ${(i18n as any)[AppModule.language]['routes'][to.meta.title]}`;
  }
};

router.beforeEach(async (to, _from, next) => {
  // 处理根路径重定向
  if (to.path === '/' || to.path === '') {
    if (getToken() && getUserinfo() && getUsername()) {
      // 如果已登录，重定向到第一个可访问的路由
      if (PermissionModule.dynamicRoutes && PermissionModule.dynamicRoutes.length > 0) {
        const firstRoute = PermissionModule.dynamicRoutes[0];
        let firstPath = firstRoute.path;
        // 如果有子路由且子路由的 path 不为空，拼接子路由路径
        if (firstRoute.children && firstRoute.children.length > 0 && firstRoute.children[0].path) {
          firstPath = firstRoute.path + (firstRoute.children[0].path === '' ? '' : `/${firstRoute.children[0].path}`);
        }
        next({ path: firstPath, replace: true });
        return;
      } else {
        // 如果动态路由还没有加载，先加载路由再重定向
        if (!UserModule.introduction) {
          try {
            await UserModule.getUserInfo();
            PermissionModule.GenerateRoutes();
            for (let route of PermissionModule.dynamicRoutes) {
              router.addRoute(route);
            }
            if (PermissionModule.dynamicRoutes.length > 0) {
              const firstRoute = PermissionModule.dynamicRoutes[0];
              let firstPath = firstRoute.path;
              if (firstRoute.children && firstRoute.children.length > 0 && firstRoute.children[0].path) {
                firstPath = firstRoute.path + (firstRoute.children[0].path === '' ? '' : `/${firstRoute.children[0].path}`);
              }
              next({ path: firstPath, replace: true });
              return;
            }
          } catch (err: any) {
            UserModule.ResetToken();
            next(`/login?redirect=${to.path}`);
            LoadingBar.stop();
            return;
          }
        } else {
          // 如果已经初始化过，但动态路由还没有，等待一下
          next({ path: '/dashboard', replace: true });
          return;
        }
      }
    } else {
      // 未登录，重定向到登录页
      next({ path: '/login', replace: true });
      return;
    }
  }

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

  // 添加 tags view
  if (to.name && to.meta && !to.meta.hidden) {
    TagsViewModule.addView(to);
  }
});
store.watch(
  // 第一个参数是箭头函数，用来选择你要监听的数据
  (state: any, getters) => state.App.language,
  // 第二参数也是箭头函数，是数据改变后的回调监听
  (newVal: string, oldVal: string) => {
    if (router.currentRoute.value) document.title = getPageTitle(router.currentRoute.value);
  }
);
