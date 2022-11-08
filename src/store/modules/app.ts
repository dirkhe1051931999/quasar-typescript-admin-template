import { i18n } from 'src/boot/i18n';
import settings from 'src/setting.json';
import { getLanguage, setLanguage } from 'src/utils/cookie';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '../index';

@Module({ dynamic: true, namespaced: true, store, name: 'App' })
class App extends VuexModule {
  public language = getLanguage() ?? settings.language;
  @Mutation
  public SET_LANGUAGE(status: any) {
    this.language = status;
    setLanguage(status);
  }
}

export const AppModule = getModule(App);
