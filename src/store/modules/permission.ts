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

const hasPermission = (permissionId: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.permissionId) {
    return permissionId.some((id) => {
      if (route.meta?.permissionId !== undefined) {
        return (route.meta.permissionId as string[]).includes(id);
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
  permissionId: string[]
) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(permissionId, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, permissionId);
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
  public routes: RouteRecordRaw[] = [];
  public dynamicRoutes: RouteRecordRaw[] = [];
  @Mutation
  private SET_ROUTES(routes: RouteRecordRaw[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }
  @Action({ rawError: true })
  public GenerateRoutes() {
    let accessedRoutes = [];
    let pagePermissionId = UserModule.pagePermissionId;
    if (UserModule.roles.includes('admin')) {
      pagePermissionId.push('-1');
    } else {
      pagePermissionId.push('1');
    }
    accessedRoutes = filterAsyncRoutes(asyncRoutes, pagePermissionId);
    this.SET_ROUTES(accessedRoutes);
    return Promise.resolve();
  }
}

export const PermissionModule = getModule(Permission);
