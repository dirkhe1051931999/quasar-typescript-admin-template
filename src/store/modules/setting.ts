import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '../index';
import setting from 'src/setting.json';
@Module({ dynamic: true, namespaced: true, store, name: 'Setting' })
class Setting extends VuexModule {
  public fixedHeader: boolean = setting.layoutSetting.fixedHeader;
  public showSettings: boolean = setting.layoutSetting.showSettings;
  public showTagsView: boolean = setting.layoutSetting.showTagsView;
  public showSidebarLogo: boolean = setting.layoutSetting.showSidebarLogo;
  public showNotify: boolean = setting.layoutSetting.showNotify;
  public showThemeSwitch: boolean = setting.layoutSetting.showThemeSwitch;
  public showScreenfull: boolean = setting.layoutSetting.showScreenfull;
}
export const SettingModule = getModule(Setting);
