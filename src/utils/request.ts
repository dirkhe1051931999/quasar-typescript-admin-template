import { AppModule } from './../store/modules/app';
import { msg } from './msg';
import { UserModule } from '@/store/modules/user';
import axios from 'axios';
import settings from '@/settings.json';
import qs from 'qs';
import { Md5 } from 'ts-md5';
import { Notify } from 'quasar';
const isPro = process.env.NODE_ENV === 'production';
const DEFAULT_ERRORMSG = settings.defaultErrorMsg;
axios.defaults.timeout = 25000;
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': 'XMLHttpRequest',
};
// Request interceptors
axios.interceptors.request.use(
  (config: any) => {
    if (UserModule.token) {
      config.headers['token'] = UserModule.token;
      config.headers['accessToken'] = UserModule.token;
      config.headers['signature'] = Md5.hashStr(settings.title + Math.random()).toString();
      config.data = config.data || {};
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data = qs.stringify(
        Object.assign(config.data, {
          meta: {
            signature: Md5.hashStr(settings.title + Math.random()).toString(),
            _: Date.now(),
          },
        }),
      );
    }
    return config;
  },
  (error) => {
    console.log(error);
    Notify.create({
      message: error,
      type: 'negative',
    });
    Promise.reject(error);
  },
);

// Response interceptors
axios.interceptors.response.use(
  (response) => {
    const { data, code } = response.data;
    if (!data || (data && !data.success)) {
      const msgText = msg[code] ? msg[code][AppModule.language === 'en' ? 1 : 0] : DEFAULT_ERRORMSG;
      Notify.create({
        message: msgText,
        type: 'negative',
      });
      UserModule.SET_LOGIN_LOADING(false);
      return Promise.reject('error');
    }
    return Promise.resolve(response.data);
  },
  (error: any) => {
    console.info(error);
    UserModule.SET_LOGIN_LOADING(false);
    if (error.config.url.includes('/login')) {
      Notify.create({
        message: DEFAULT_ERRORMSG,
        type: 'negative',
      });
    }
    return Promise.reject('error');
  },
);

export default axios;
