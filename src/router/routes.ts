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
          affix: true,
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
          icon: 'ac_unit',
        },
        component: () => import(/* webpackChunkName: "columnLine" */ 'pages/charts/columnLine.vue'),
      },
      {
        path: 'funnel',
        name: 'Funnel',
        meta: {
          title: 'funnel',
          icon: 'account_balance_wallet',
        },
        component: () => import(/* webpackChunkName: "funnel" */ 'pages/charts/funnel.vue'),
      },
      {
        path: 'line',
        name: 'Line',
        meta: {
          title: 'line',
          icon: 'airline_seat_legroom_extra',
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
          icon: 'airline_seat_individual_suite',
        },
        component: () => import(/* webpackChunkName: "editer" */ 'pages/components/editer.vue'),
      },
      {
        path: 'md',
        name: 'Md',
        meta: {
          title: 'md',
          icon: 'android',
        },
        component: () => import(/* webpackChunkName: "md" */ 'pages/components/md.vue'),
      },
      {
        path: 'splitter',
        name: 'Splitter',
        meta: {
          title: 'splitter',
          icon: 'archive',
        },
        component: () => import(/* webpackChunkName: "splitter" */ 'pages/components/splitter.vue'),
      },
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: {
          title: 'jsonEditor',
          icon: 'av_timer',
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'pages/components/jsonEditor.vue'),
      },
      {
        path: 'tabs',
        name: 'Tabs',
        meta: {
          title: 'tabs',
          icon: 'attach_file',
        },
        component: () => import(/* webpackChunkName: "tabs" */ 'pages/components/tabs.vue'),
      },
      {
        path: 'sticky',
        name: 'Sticky',
        meta: {
          title: 'sticky',
          icon: 'assistant_photo',
        },
        component: () => import(/* webpackChunkName: "sticky" */ 'pages/components/sticky.vue'),
      },
      {
        path: 'dialog',
        name: 'Dialog',
        meta: {
          title: 'dialog',
          icon: 'developer_board',
        },
        component: () => import(/* webpackChunkName: "dialog" */ 'pages/components/dialog.vue'),
      },
      {
        path: 'carousel',
        name: 'Carousel',
        meta: {
          title: 'carousel',
          icon: 'burst_mode',
        },
        component: () => import(/* webpackChunkName: "carousel" */ 'pages/components/carousel.vue'),
      },
      {
        path: 'colorPicker',
        name: 'ColorPicker',
        meta: {
          title: 'colorPicker',
          icon: 'autorenew',
        },
        component: () => import(/* webpackChunkName: "colorPicker" */ 'pages/components/colorPicker.vue'),
      },
      {
        path: 'skeleton',
        name: 'Skeleton',
        meta: {
          title: 'skeleton',
          icon: 'assignment_returned',
        },
        component: () => import(/* webpackChunkName: "skeleton" */ 'pages/components/skeleton.vue'),
      },
      {
        path: 'spinners',
        name: 'Spinners',
        meta: {
          title: 'spinners',
          icon: 'blur_linear',
        },
        component: () => import(/* webpackChunkName: "spinners" */ 'pages/components/spinners.vue'),
      },
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: 'notice',
          icon: 'brightness_7',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/notice.vue'),
      },
      {
        path: 'transfer',
        name: 'Transfer',
        meta: {
          title: 'transfer',
          icon: 'bubble_chart',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/transfer.vue'),
      },
      {
        path: 'parallax',
        name: 'Parallax',
        meta: {
          title: 'parallax',
          icon: 'remove_red_eye',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/parallax.vue'),
      },
      {
        path: 'colors',
        name: 'Colors',
        meta: {
          title: 'Colors',
          icon: 'invert_colors',
        },
        component: () => import(/* webpackChunkName: "notice" */ 'pages/components/color.vue'),
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
          icon: 'face',
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
  {
    path: '/convert',
    component: Layout,
    meta: {
      title: 'convert',
    },
    children: [
      {
        path: 'index',
        name: 'Convert',
        meta: {
          title: 'convert',
          icon: 'code',
        },
        component: () => import(/* webpackChunkName: "convert" */ 'pages/convert/index.vue'),
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'accessibility',
        },
        component: () => import(/* webpackChunkName: "profile" */ 'pages/profile/index.vue'),
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
          icon: 'block',
          pagePermissionId: ['-1', '1'],
        },
        component: () => import(/* webpackChunkName: "authA" */ 'pages/auth/a.vue'),
      },
      {
        path: 'b',
        name: 'AuthB',
        meta: {
          title: 'authB',
          icon: 'assignment',
          pagePermissionId: ['-1', '2'],
        },
        component: () => import(/* webpackChunkName: "authB" */ 'pages/auth/b.vue'),
      },
    ],
  },
];
