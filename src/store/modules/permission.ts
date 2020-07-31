import { UserModule } from '@/store/modules/user';
import settings from '@/settings.json';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { RouteConfig } from 'vue-router';
import { asyncRoutes, constantRoutes } from '@/router/routes';
import store from '@/store';
const hasPermission = (pagePermissionId: string[], asyncRoute: RouteConfig) => {
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
export const filterAsyncRoutes = (asyncRoutes: RouteConfig[], pagePermissionId: string[]) => {
  const res: RouteConfig[] = [];
  asyncRoutes.forEach((route) => {
    const asyncRoute = { ...route };
    if (hasPermission(pagePermissionId, asyncRoute)) {
      if (asyncRoute.children) {
        asyncRoute.children = filterAsyncRoutes(asyncRoute.children, pagePermissionId);
      }
      res.push(asyncRoute);
    }
  });
  return res;
};
export const filterAsyncRoutesEdit = (accessedRoutes: RouteConfig[], pageEditPermission: any, pagePermissionId: any) => {
  const res: RouteConfig[] = [];
  accessedRoutes.forEach((route) => {
    const r = { ...route };
    if (r.meta && r.meta.pagePermissionId && !pagePermissionId.includes('-1')) {
      if (r.children && r.children.length) {
        r.children = filterAsyncRoutesEdit(r.children, pageEditPermission, pagePermissionId);
      }
      const item = pageEditPermission.find((item: any) => {
        return r.meta.pagePermissionId.includes(String(item.permissionId));
      });
      if (r.meta && item) r.meta.modify = item.modify;
    } else {
      if (r.children && r.children.length) {
        r.children = filterAsyncRoutesEdit(r.children, pageEditPermission, pagePermissionId);
      }
      if (r.meta) r.meta.modify = true;
    }
    res.push(r);
  });
  return res;
};
export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }

  @Action({ rawError: true })
  public GenerateRoutes(data: any) {
    let { pagePermissionId, pageEditPermission } = data;
    if (settings.adminName.includes(UserModule.username)) {
      pagePermissionId.push('-1');
    }
    let accessedRoutes = [];
    accessedRoutes = filterAsyncRoutes(asyncRoutes, pagePermissionId);
    accessedRoutes = filterAsyncRoutesEdit(accessedRoutes, pageEditPermission, pagePermissionId);
    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
