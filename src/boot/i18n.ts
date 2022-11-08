import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import { AppModule } from 'src/store/modules/app';
export const i18n = createI18n({
  locale: AppModule.language,
  legacy: false,
  messages,
});
/* eslint-enable @typescript-eslint/no-empty-interface */
export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});
