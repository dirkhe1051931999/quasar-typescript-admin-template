import axios from 'src/boot/axios';
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from 'vuex-module-decorators';
import {
  getToken,
  setToken,
  removeToken,
  setUsername,
  removeUsername,
  getUsername,
} from 'src/utils/cookie';
import { resetRouter } from 'src/router';
import store from 'src/store';
import { getUserInfo, login } from 'src/api/user';
import { uid } from 'quasar';
import { TagsViewModule } from './tags';

export interface IUserState {
  token: string;
  roles: string[];
  username: string;
  introduction: string;
  pagePermissionId: any[];
  userInfo: any;
}

@Module({ dynamic: true, store, name: 'User', namespaced: true })
class User extends VuexModule implements IUserState {
  public token = getToken() ?? '';
  public username = getUsername() ?? '';
  public introduction = '';
  public pagePermissionId: string[] = [];
  public userInfo = {};
  public roles: string[] = [];

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
  private SET_ROLES(value: string[]) {
    this.roles = value;
  }
  // 登录
  @Action({ rawError: true })
  public async Login(data: any) {
    const { username, password } = data;
    // await login({ username, password });
    await setTimeout(() => 0, 1000);
    setToken(uid());
    setUsername(username);
    this.SET_TOKEN(uid());
    this.SET_USERNAME(username);
  }
  // 获取用户信息
  @Action({ rawError: true })
  public async getUserInfo() {
    // const result = await getUserInfo({ username: this.username });
    await setTimeout(() => 0, 1000);
    this.SET_INTRODUCTION('introduction');
    if (this.username === 'admin') {
      this.SET_PAGE_PERMISION_ID(['-11']);
      this.SET_ROLES(['admin']);
    } else {
      this.SET_PAGE_PERMISION_ID(['11']);
      this.SET_ROLES(['editor']);
    }
  }
  // 退出
  @Action({ rawError: true })
  public async LogOut() {
    await setTimeout(() => 0, 1000);
    this.ResetToken();
  }
  // 重置cookie
  @Action({ rawError: true })
  public ResetToken() {
    removeUsername();
    removeToken();
    resetRouter();
    TagsViewModule.delAllViews();
    this.SET_TOKEN('');
    this.SET_PAGE_PERMISION_ID([]);
    this.SET_INTRODUCTION('');
    this.SET_USERNAME('');
    this.SET_ROLES([]);
  }
}

export const UserModule = getModule(User);
