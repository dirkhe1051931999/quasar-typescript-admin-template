import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/layouts/index.vue';
/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      
  meta: {
    pagePermissionId              页面权限的id, -1就是管理员才有的权限
    modify                        是否可编辑
    title: 'title'               子菜单和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'             侧栏中显示的图标
    hidden: true                 if true, 此路由不会显示在侧边栏中（默认为false）
                                 if false, 当子路径少于或等于一个时，隐藏根菜单
    breadcrumb: false            if false, 该项目将隐藏在面包屑中（默认为true）
    root: true                  if true,是否是根节点，默认固定根节点
  }
*/

export const constantRoutes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/dashboard',
    meta: { hidden: true },
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ 'pages/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: {},
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'home',
          pagePermissionId: ['-1', '1'],
        },
        component: () => import(/* webpackChunkName: "dashboard" */ 'pages/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Account',
        meta: {
          title: 'account',
          icon: 'people',
        },
        component: () => import(/* webpackChunkName: "account" */ 'pages/account/index.vue'),
      },
    ],
  },
  {
    path: '/charts',
    component: Layout,
    meta: {
      title: 'charts',
      icon: 'bar_chart',
    },
    children: [
      {
        path: 'columnLine',
        name: 'ColumnLine',
        meta: {
          title: 'columnLine',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "columnLine" */ 'pages/charts/columnLine.vue'),
      },
      {
        path: 'funnel',
        name: 'Funnel',
        meta: {
          title: 'funnel',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "funnel" */ 'pages/charts/funnel.vue'),
      },
      {
        path: 'line',
        name: 'Line',
        meta: {
          title: 'line',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "line" */ 'pages/charts/line.vue'),
      },
    ],
  },
  {
    path: '/components',
    component: Layout,
    meta: { title: 'components', icon: 'extension' },
    children: [
      {
        path: 'editer',
        name: 'Editer',
        meta: {
          title: 'editer',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "editer" */ 'pages/components/editer.vue'),
      },
      {
        path: 'md',
        name: 'Md',
        meta: {
          title: 'md',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "md" */ 'pages/components/md.vue'),
      },
      {
        path: 'splitter',
        name: 'Splitter',
        meta: {
          title: 'splitter',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "splitter" */ 'pages/components/splitter.vue'),
      },
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: {
          title: 'jsonEditor',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'pages/components/jsonEditor.vue'),
      },
      {
        path: 'tabs',
        name: 'Tabs',
        meta: {
          title: 'tabs',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "tabs" */ 'pages/components/tabs.vue'),
      },
      {
        path: 'sticky',
        name: 'Sticky',
        meta: {
          title: 'sticky',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "sticky" */ 'pages/components/sticky.vue'),
      },
      {
        path: 'carousel',
        name: 'Carousel',
        meta: {
          title: 'carousel',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "carousel" */ 'pages/components/carousel.vue'),
      },
      {
        path: 'colorPicker',
        name: 'ColorPicker',
        meta: {
          title: 'colorPicker',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "colorPicker" */ 'pages/components/colorPicker.vue'),
      },
      {
        path: 'skeleton',
        name: 'Skeleton',
        meta: {
          title: 'skeleton',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "skeleton" */ 'pages/components/skeleton.vue'),
      },
      {
        path: 'spinners',
        name: 'Spinners',
        meta: {
          title: 'spinners',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "spinners" */ 'pages/components/spinners.vue'),
      },
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: 'notice',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/notice.vue'),
      },
      {
        path: 'transfer',
        name: 'Transfer',
        meta: {
          title: 'transfer',
          icon: 'view_list',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/transfer.vue'),
      },
    ],
  },
  {
    path: '/copy',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Copy',
        meta: {
          title: 'copy',
          icon: 'content_cut',
        },
        component: () => import(/* webpackChunkName: "copy" */ 'pages/copy/index.vue'),
      },
    ],
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'g_translate',
        },
        component: () => import(/* webpackChunkName: "i18n" */ 'pages/i18n/index.vue'),
      },
    ],
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Icon',
        meta: {
          title: 'icon',
          icon: 'insert_emoticon',
        },
        component: () => import(/* webpackChunkName: "icon" */ 'pages/icon/index.vue'),
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    meta: {
      title: 'table',
      icon: 'table_chart',
    },
    children: [
      {
        path: 'index',
        name: 'Table',
        meta: {
          title: 'table',
          icon: 'table_chart',
        },
        component: () => import(/* webpackChunkName: "tableA" */ 'pages/table/index.vue'),
      },
    ],
  },
];
/**
 * 有权限限制
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/auth',
    component: Layout,
    meta: {
      title: 'auth',
      icon: 'remove_from_queue',
      pagePermissionId: ['-1', '1', '2'],
      opened: false,
    },
    children: [
      {
        path: 'a',
        name: 'AuthA',
        meta: {
          title: 'authA',
          icon: 'view_list',
          pagePermissionId: ['-1', '1'],
        },
        component: () => import(/* webpackChunkName: "authA" */ 'pages/auth/a.vue'),
      },
      {
        path: 'b',
        name: 'AuthB',
        meta: {
          title: 'authB',
          icon: 'view_list',
          pagePermissionId: ['-1', '2'],
        },
        component: () => import(/* webpackChunkName: "authB" */ 'pages/auth/b.vue'),
      },
    ],
  },
];
