import { boot } from 'quasar/wrappers';
import 'src/router/permission';
import { Platform } from 'quasar';
import setting from 'src/setting.json';
import { myIcons } from 'src/utils/custom-svg';

const NODE_ENV = process.env.NODE_ENV;
const development = NODE_ENV === 'development';
const iconBasePath = development ? 'img:/icons/' : `img:${setting.publicPath}icons/`;

export default boot(({ app }: { app: any }) => {
  // We globally register our directive with Vue;
  // Rememeber that all directives in Vue will start with 'v-'
  // but that should not be part of your directive name
  // https://vuejs.org/v2/guide/custom-directive.html
  // 'my-directive' will be used as 'v-my-directive'
  const $q = app.config.globalProperties.$q;
  $q.iconMapFn = (iconName: string) => {
    const iconFile = myIcons[iconName];
    if (iconFile !== void 0) {
      return {
        icon: iconBasePath + iconFile,
      };
    }
    return void 0;
  };
  document.querySelector('body')?.classList.add(Platform.is.platform);
});