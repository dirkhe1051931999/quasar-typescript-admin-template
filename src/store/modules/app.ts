import { i18n } from './../../boot/i18n';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize, getLanguage } from '@/utils/cookies';
import store from '@/store/index';
import Vue from 'vue';
import { loadCityJson, loadProvinceJson } from 'src/api/map';
export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  language: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop;
  public refreshPage = true;
  public language = getLanguage() || 'en';
  @Mutation
  public SET_LANGUAGE(status: any) {
    i18n.locale = status;
    this.language = status;
    setLanguage(this.language);
  }
  @Mutation
  public SET_REFRESH_PAGE(status: any) {
    this.refreshPage = status;
  }
  @Action({ rawError: true })
  public refreshCurPage() {
    this.SET_REFRESH_PAGE(false);
    Vue.nextTick(() => {
      this.SET_REFRESH_PAGE(true);
    });
  }
  @Action({ rawError: true })
  public async loadProvinceJson(data: any) {
    const result = await loadProvinceJson(data);
    return Promise.resolve(result);
  }
  @Action({ rawError: true })
  public async loadCityJson(data: any) {
    const result = await loadCityJson(data);
    return Promise.resolve(result);
  }
}

export const AppModule = getModule(App);
