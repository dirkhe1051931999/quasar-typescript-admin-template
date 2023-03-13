import axios from 'src/boot/axios';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken, setUsername, removeUsername, getUsername, setPagePermissionID, getPagePermissionID, removePagePermissionID, removeDynamicRoutes } from 'src/utils/cookie';
import { resetRouter } from 'src/router';
import store from 'src/store';
import { getUserInfo, login } from 'src/api/user';
import { uid } from 'quasar';
import { TagsViewModule } from './tags';
import { sleep } from 'src/utils/tools';
import setting from 'src/setting.json';
import { getUserinfo, removeUserinfo, setUserinfo } from 'src/utils/localStorage';
import { PermissionModule } from './permission';

export interface IUserState {}

@Module({ dynamic: true, store, name: 'User', namespaced: true })
class User extends VuexModule implements IUserState {
  public token = getToken() || '';
  public username = getUsername() ? getUsername().split(',')[0] : '';
  public userInfo = getUserinfo() ? JSON.parse(getUserinfo()!) : {};
  public introduction = '';
  public pagePermissionId: any[] = getPagePermissionID() ? getPagePermissionID() : [];

  @Mutation
  public SET_PAGE_PERMISION_ID(arr: any) {
    this.pagePermissionId = arr;
  }
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }
  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction;
  }
  @Mutation
  private SET_USERINFO(userinfo: any) {
    this.userInfo = userinfo;
  }
  // 登录
  @Action({ rawError: true })
  public async Login(data: any) {
    const { username, password } = data;
    // await login({ username, password });
    await sleep(1000);
    const token = uid();
    const pagePermissionId = setting.pagePermissionId;
    const userinfo = {
      token,
      username,
      pagePermissionId,
    };
    setToken(token);
    setUsername(username);
    setUserinfo(JSON.stringify(userinfo));
    setPagePermissionID(pagePermissionId);
    this.SET_TOKEN(token);
    this.SET_USERNAME(username);
    this.SET_USERINFO(JSON.stringify(userinfo));
    this.SET_PAGE_PERMISION_ID(pagePermissionId);
    return Promise.resolve();
  }
  // 获取用户信息
  @Action({ rawError: true })
  public async getUserInfo() {
    await sleep(300);
    this.SET_INTRODUCTION('introduction');
    return Promise.resolve();
  }
  // 退出
  @Action({ rawError: true })
  public async LogOut() {
    await sleep(1000);
    this.ResetToken();
    return Promise.resolve();
  }
  // 重置cookie
  @Action({ rawError: true })
  public ResetToken() {
    removeUsername();
    removeToken();
    resetRouter();
    removeUserinfo();
    TagsViewModule.delAllViews();
    this.SET_USERNAME('');
    this.SET_USERINFO({});
    this.SET_TOKEN('');
    this.SET_PAGE_PERMISION_ID([]);
    this.SET_INTRODUCTION('');
    PermissionModule.REMOVE_ROUTES([]);
  }
}

export const UserModule = getModule(User);
