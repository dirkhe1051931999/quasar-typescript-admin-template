import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import globalMessage from 'src/utils/notify';
import setting from 'src/setting.json';
import { UserModule } from 'src/store/modules/user';
import router from 'src/router';
import { Loading } from 'quasar';
import { v4 as uuidv4 } from 'uuid';
import SHA256 from 'sha256';
import { AppModule } from 'src/store/modules/app';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const isPro = process.env.NODE_ENV === 'production';
axios.defaults.timeout = 1500 * 1000;
axios.defaults.baseURL = isPro ? setting.pro : setting.ip;
// Request interceptors
axios.interceptors.request.use(
  (config: any) => {
    config.data = config.data || {};
    config.params = config.params || {};
    // // 获取header头内容
    if (config.method === 'post' && config.data.getResHeader) {
      delete config.data.getResHeader;
      config.getResHeader = true;
    }
    if (config.method === 'get' && config.params.getResHeader) {
      delete config.params.getResHeader;
      config.getResHeader = true;
    }
    let Timestamp = new Date().getTime();
    //时间戳
    config.headers['accept-language'] =
      AppModule.language === 'en-US' ? 'en' : 'zh-cn';
    config.headers['Timestamp'] = Timestamp;
    if (UserModule.token) {
      let requetId = 'uuidv4()'; //uuid
      let sk = 'UserModule.otherLoginData.sk'; //获取SK
      let SKEnc = 'CryptoJS.MD5(Timestamp + sk)'; // SKEnc = MD5(Timestamp + SK)
      let SKEnc1 = 'CryptoJS.enc.Hex.stringify(SKEnc)';
      let body =
        config.method === 'get'
          ? ''
          : JSON.stringify(config.data) === '{}'
          ? '{}'
          : JSON.stringify(config.data);
      let data = UserModule.token + Timestamp + requetId + body;
      let sign = 'CryptoJS.HmacSHA256(data, SKEnc1)'; // Signature = HMAC-SHA256(Authorization + Timestamp + Request_Id + Request_Body, SKEnc).toLowerCase()
      let sign1 = 'CryptoJS.enc.Hex.stringify(sign)';
      config.headers['Authorization'] = UserModule.token;
      config.headers.Signature = sign1;
      config.headers['Request-ID'] = requetId;
      config.headers.Version = '1.0';
      config.headers['Sign-Method'] = 'HMAC-SHA256';
    }
    return config;
  },
  (error) => {
    console.log(error);
    globalMessage.show({ type: 'error', content: error });
    Promise.reject(error);
  }
);

// Response interceptors
axios.interceptors.response.use(
  (response) => {
    const errorFuc = (response: any) => {
      const { status, success, msg } = response.data;
      if (['88003', '88016'].includes(String(status))) {
        /* token无效 */
        UserModule.ResetToken();
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
        globalMessage.show({
          type: 'error',
          content: msg || setting.defaultErrorMsg,
        });
        Loading.hide();
        return Promise.reject(status);
      } else {
        /* 错误提示 */
        globalMessage.show({
          type: 'error',
          content: msg || setting.defaultErrorMsg,
        });
        Loading.hide();
        return Promise.reject('error');
      }
    };
    const successFuc = (response: any) => {
      Loading.hide();
      if (response.config.getResHeader) {
        if (response.data instanceof Blob) {
          // 如果是blob获取header头内容
          return Promise.resolve(
            Object.assign(
              { blob: response.data },
              {
                ...response.headers,
                'content-disposition': window.decodeURIComponent(
                  response.headers['content-disposition'] || ''
                ),
              }
            )
            // Object.assign({ blob: response.data }, response.headers)
          );
        } else {
          return Promise.resolve(
            Object.assign(response.data.data, response.headers)
          );
        }
      } else {
        return Promise.resolve(response.data.data || {});
      }
    };
    if (response.data instanceof Blob) {
      let responseBak = response;
      /* 如果是blob */
      return new Promise((resolve) => {
        var reader: any = new FileReader();
        reader.readAsBinaryString(response.data);
        reader.addEventListener('loadend', () => {
          if (
            reader.result.indexOf('status') !== -1 &&
            reader.result.indexOf('message') !== -1 &&
            reader.result.indexOf('pdf') === -1
          ) {
            response.data = JSON.parse(reader.result);
            resolve(errorFuc(response));
          } else {
            resolve(successFuc(responseBak));
          }
        });
      });
    } else {
      /* 不是blob */
      const { status, success } = response.data;
      if (!status || !success || !setting.succCode.includes(String(status))) {
        return errorFuc(response);
      } else {
        return successFuc(response);
      }
    }
  },
  (error: any) => {
    if (error.config && error.config.url.includes('/login')) {
      console.info(error);
      globalMessage.show({ type: 'error', content: setting.defaultErrorMsg });
    }
    Loading.hide();
    return Promise.reject('error');
  }
);

const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, axios as request };
