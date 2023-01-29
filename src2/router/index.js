import { createRouter, createWebHashHistory } from 'vue-router';
function redirect(to) {
  location.replace(
    process.env.NODE_ENV === 'production'
      ? '/v3-admin/index.html#/dashboard'
      : 'index.html#/dashboard'
  );
}

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: redirect,
  },
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
