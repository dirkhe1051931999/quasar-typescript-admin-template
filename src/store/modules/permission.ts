import setting from 'src/setting.json';
import store from '../index';
import { type RouteRecordRaw } from 'vue-router';
import { constantRoutes, asyncRoutes } from 'src/router/routes';
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators';
import { UserModule } from './user';
import { getDynamicRoutes, setDynamicRoutes } from 'src/utils/cookie';

const hasPermission = (pagePermissionId: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.pagePermissionId) {
    return pagePermissionId.some((id) => {
      if (route.meta?.pagePermissionId !== undefined) {
        return (route.meta.pagePermissionId as string[]).includes(id);
      } else {
        return false;
      }
    });
  } else {
    return true;
  }
};

const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  pagePermissionId: string[]
) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(pagePermissionId, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, pagePermissionId);
      }
      res.push(r);
    }
  });
  return res;
};
export interface IPermissionState {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteRecordRaw[] = getDynamicRoutes()
    ? JSON.parse(getDynamicRoutes())
    : [];
  public dynamicRoutes: RouteRecordRaw[] = [];
  @Mutation
  private SET_ROUTES(routes: RouteRecordRaw[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
    setDynamicRoutes(JSON.stringify(routes));
  }
  @Mutation
  public REMOVE_ROUTES(routes: RouteRecordRaw[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }
  @Action({ rawError: true })
  public GenerateRoutes() {
    let accessedRoutes = [];
    let pagePermissionId = UserModule.pagePermissionId;
    accessedRoutes = filterAsyncRoutes(asyncRoutes, pagePermissionId);
    this.SET_ROUTES(accessedRoutes);
    return Promise.resolve();
  }
}

export const PermissionModule = getModule(Permission);
