import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '../index';
@Module({ dynamic: true, namespaced: true, store, name: 'LargeDisplay' })
class LargeDisplay extends VuexModule {
  public fixedHeader: boolean = false;
}
export const LargeDisplayModule = getModule(LargeDisplay);
