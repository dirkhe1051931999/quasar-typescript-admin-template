import { i18n } from 'src/boot/i18n';
import settings from 'src/setting.json';
import { getLanguage, setLanguage } from 'src/utils/cookie';
import { getSidebarStatus, setSidebarStatus } from 'src/utils/localStorage';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '../index';

export enum DeviceType {
  Mobile,
  Desktop,
}
interface ISidebar {
  opened: boolean;
  withoutAnimation: boolean;
}
@Module({ dynamic: true, namespaced: true, store, name: 'App' })
class App extends VuexModule {
  public language = getLanguage() ?? settings.language;
  public sidebar: ISidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false,
  };
  public device: DeviceType = DeviceType.Desktop;
  @Mutation
  public SET_LANGUAGE(status: any) {
    this.language = status;
    setLanguage(status);
  }
  @Mutation
  public TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    if (this.sidebar.opened) {
      setSidebarStatus('opened');
    } else {
      setSidebarStatus('closed');
    }
  }
  @Mutation
  public CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus('closed');
  }
  @Mutation
  public TOGGLE_DEVICE(value: DeviceType) {
    this.device = value;
  }
}

export const AppModule = getModule(App);
