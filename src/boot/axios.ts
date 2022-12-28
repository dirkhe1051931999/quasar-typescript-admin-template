import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Notify } from 'quasar';

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

axios.defaults.timeout = 25000;
// axios.defaults.headers = {
//   'Access-Control-Allow-Origin': '*',
//   'X-Requested-With': 'XMLHttpRequest',
// };
axios.defaults.baseURL = '';
// Request interceptors
axios.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    console.log(error);
    Notify.create({
      message: error,
      color: 'negative',
      multiLine: true,
      icon: 'mood_bad',
      actions: [
        {
          label: 'Close',
          color: 'white',
        },
      ],
    });
    Promise.reject(error);
  }
);

// Response interceptors
axios.interceptors.response.use(
  (response) => {
    const { data, code } = response.data;
    if (!data || (data && !data.success)) {
      Notify.create({
        message: 'msgText',
        color: 'negative',
        multiLine: true,
        icon: 'mood_bad',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
      });
      return Promise.reject('error');
    }
    return Promise.resolve(response.data);
  },
  (error: any) => {
    console.info(error);
    if (error.config.url.includes('/login')) {
      Notify.create({
        message: 'DEFAULT_ERRORMSG',
        color: 'negative',
        multiLine: true,
        icon: 'mood_bad',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
      });
    }
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
