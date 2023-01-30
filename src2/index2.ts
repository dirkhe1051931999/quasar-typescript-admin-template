import { createApp } from 'vue';
import Index2 from './index2.vue';
import router from './router/index';
import store from './store/index';

const app = createApp(Index2);
app.use(router);
app.use(store);
app.mount('#app');
