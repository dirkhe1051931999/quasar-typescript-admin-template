import setting from 'src/setting.json';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { RouteRecordRaw } from 'vue-router';
import { asyncRoutes, constantRoutes } from 'src/router/routes';
import store from 'src/store';
const hasPermission = (pagePermissionId: string[], asyncRoute: any) => {
  if (asyncRoute.meta && asyncRoute.meta.pagePermissionId) {
    return pagePermissionId.includes('-1')
      ? true
      : pagePermissionId.some((id) => {
          return asyncRoute.meta.pagePermissionId.includes(String(id));
        });
  } else {
    return true;
  }
};
export const filterAsyncRoutes = (
  asyncRoutes: RouteRecordRaw[],
  pagePermissionId: string[]
) => {
  const res: RouteRecordRaw[] = [];
  asyncRoutes.forEach((route) => {
    const asyncRoute = { ...route };
    if (hasPermission(pagePermissionId, asyncRoute)) {
      if (asyncRoute.children) {
        asyncRoute.children = filterAsyncRoutes(
          asyncRoute.children,
          pagePermissionId
        );
      }
      res.push(asyncRoute);
    }
  });
  return res;
};
export const filterAsyncRoutesEdit = (
  accessedRoutes: RouteRecordRaw[],
  pageEditPermission: any,
  pagePermissionId: any
) => {
  const res: RouteRecordRaw[] = [];
  accessedRoutes.forEach((route) => {
    const r: any = { ...route };
    if (r.meta && r.meta.pagePermissionId && !pagePermissionId.includes('-1')) {
      if (r.children && r.children.length) {
        r.children = filterAsyncRoutesEdit(
          r.children,
          pageEditPermission,
          pagePermissionId
        );
      }
      const item = pageEditPermission.find((item: any) => {
        return r.meta.pagePermissionId.includes(String(item.permissionId));
      });
      if (r.meta && item) r.meta.modify = item.modify;
    } else {
      if (r.children && r.children.length) {
        r.children = filterAsyncRoutesEdit(
          r.children,
          pageEditPermission,
          pagePermissionId
        );
      }
      if (r.meta) r.meta.modify = true;
    }
    res.push(r);
  });
  return res;
};
export interface IPermissionState {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteRecordRaw[] = [];
  public dynamicRoutes: RouteRecordRaw[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteRecordRaw[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }

  @Action({ rawError: true })
  public GenerateRoutes(data: any) {
    const { pagePermissionId, pageEditPermission } = data;
    if (setting.adminName.includes('admin')) {
      pagePermissionId.push('-1');
    }
    let accessedRoutes = [];
    accessedRoutes = filterAsyncRoutes(asyncRoutes, pagePermissionId);
    accessedRoutes = filterAsyncRoutesEdit(
      accessedRoutes,
      pageEditPermission,
      pagePermissionId
    );
    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
