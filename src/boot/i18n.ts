import { AppModule } from './../store/modules/app';
import { boot } from 'quasar/wrappers';
import messages from 'src/i18n';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
  i18n.locale = AppModule.language;
});
