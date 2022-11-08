import { RouteRecordRaw } from 'vue-router';
import Layout from 'src/layouts/index.vue';
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    name: 'MainLayout1',
    meta: {
      title: '权限管理',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: '',
        component: () => import('src/pages/indexPage.vue'),
        name: 'indexPage',
        meta: { title: '权限管理', roles: ['admin', 'editor'] },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "errorNotFound" */ 'src/pages/errorNotFound.vue'
      ),
  },
];
/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [];
