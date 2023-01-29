import { createApp } from 'vue';
import PageA from './pageA.vue';
import router from './router/index.js';
import store from './store/index.ts';

const app = createApp(PageA);
app.use(router);
app.use(store);
app.mount('#app');
