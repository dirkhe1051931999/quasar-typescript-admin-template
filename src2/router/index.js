import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/large-display',
    name: 'LargeDisplay',
    component: () => import('src2/pages/large-display.vue'),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
