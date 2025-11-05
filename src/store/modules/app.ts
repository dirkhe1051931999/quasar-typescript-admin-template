import { loadCityJson, loadProvinceJson } from 'src/api/map';
import settings from 'src/setting.json';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '../index';

@Module({ dynamic: true, namespaced: true, store, name: 'App' })
class App extends VuexModule {
  public language = settings.language;
  public toolTipClass = '';
  public sidebarStatus = false;

  @Mutation
  public SET_TOOL_TIP_CLASS(className: string) {
    this.toolTipClass = className;
  }

  @Mutation
  public SET_LANGUAGE(status: any) {
    this.language = status;
  }

  @Mutation
  public SET_SIDEBAR_STATUS(status: any) {
    this.sidebarStatus = status;
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