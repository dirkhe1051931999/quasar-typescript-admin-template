import { RouteRecordRaw } from 'vue-router';
import Layout from 'src/layouts/index.vue';
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ 'pages/login/index.vue'),
    meta: { hidden: true },
  },
];
/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ 'src/pages/dashboard/index.vue'
          ),
        name: 'indexPage',
        meta: {
          permissionId: ['-1', '1'],
          title: 'Unocss',
          icon: 'home',
        },
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index1',
    name: 'Table',
    meta: {
      title: 'Table',
      permissionId: ['-1', '1'],
      icon: 'home',
    },
    children: [
      {
        path: 'index1',
        component: () =>
          import(/* webpackChunkName: "table1" */ 'src/pages/table/index1.vue'),
        name: 'Table1',
        meta: {
          title: 'Table1',
          permissionId: ['-1'],
          icon: 'label',
        },
      },
      {
        path: 'index2',
        component: () =>
          import(/* webpackChunkName: "table2" */ 'src/pages/table/index2.vue'),
        name: 'Table2',
        meta: {
          permissionId: ['-1', '1'],
          title: 'Table2',
          icon: 'label',
        },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "errorNotFound" */ 'src/pages/notFound/index.vue'
      ),
  },
];
