import { RouteRecordRaw } from 'vue-router';
import Layout from 'src/layouts/index.vue';
import { shallowRef } from 'vue';
import setting from 'src/setting.json';
import { PermissionModule } from 'src/store/modules/permission';
import { JQMessage } from 'qcpt';
import { UserModule } from 'src/store/modules/user';

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      如果设置为“ noredirect”，则在单击面包屑时将不会触发任何重定向操作
  meta: {
    pagePermissionId              页面权限的id, -1就是管理员才有的权限  只有一级的写父级，有多级都要写，不填的就是不限制权限
    title: 'title'               子菜单和面包屑中显示的名称（推荐设置）
    icon: 'icon-name'             侧栏中显示的图标
    hidden: true                 if true, 此路由不会显示在侧边栏中（默认为false）
  }
*/
function redirect(to: any): any {
  const routes = PermissionModule.routes;
  const item: any = routes.find((item: any) => item.meta && item.path && item.component && item.name !== 'Login');
  if (!item || (item && item.children && !item.children.length)) {
    JQMessage.show({
      type: 'error',
      content: `当前账号：${UserModule.username} 权限异常`,
    });
    UserModule.ResetToken();
    return '/login';
  } else {
    return `${item.path}${item.children && item.children[0].path ? `/${item.children[0].path}` : ''}`;
  }
}

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ 'src/pages/login/index.vue'),
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
    path: '/dashboard',
    component: shallowRef(Layout),
    name: 'Dashboard0',
    meta: {
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ 'src/pages/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'developer',
        },
      },
    ],
  },
  {
    path: '/account',
    component: shallowRef(Layout),
    name: 'Account0',
    meta: {
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: '',
        name: 'Account',
        meta: {
          title: 'account',
          icon: 'developer',
        },
        component: () => import(/* webpackChunkName: "account" */ 'pages/account/index.vue'),
      },
    ],
  },
  {
    path: '/charts',
    component: shallowRef(Layout),
    name: 'Charts',
    redirect: redirect,
    meta: {
      title: 'charts',
      icon: 'developer',
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: 'relationship',
        name: 'Relationship',
        meta: {
          title: 'relationship',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "relationship" */ 'src/pages/charts/relationship.vue'),
      },
      {
        path: 'map',
        name: 'Map',
        meta: {
          title: 'map',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "map" */ 'src/pages/charts/map.vue'),
      },
      {
        path: 'province',
        name: 'Province',
        meta: {
          title: 'province',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "province" */ 'src/pages/charts/province.vue'),
      },
      {
        path: 'city',
        name: 'City',
        meta: {
          title: 'city',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "city" */ 'src/pages/charts/city.vue'),
      },
    ],
  },
  {
    path: '/components',
    component: shallowRef(Layout),
    name: 'Components',
    redirect: redirect,
    meta: {
      title: 'components',
      icon: 'developer',
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: {
          title: 'jsonEditor',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'src/pages/components/jsonEditor.vue'),
      },
      {
        path: 'jsonView',
        name: 'jsonView',
        meta: {
          title: 'jsonView',
          icon: 'developer',
          pagePermissionId: ['view-all'],
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'src/pages/components/jsonView.vue'),
      },
    ],
  },
  {
    path: '/copy',
    component: shallowRef(Layout),
    name: 'Copy0',
    meta: { pagePermissionId: ['view-all'] },
    children: [
      {
        path: '',
        name: 'Copy',
        meta: {
          title: 'copy',
          icon: 'developer',
        },
        component: () => import(/* webpackChunkName: "copy" */ 'pages/copy/index.vue'),
      },
    ],
  },
  {
    path: '/i18n',
    component: shallowRef(Layout),
    name: 'I18n0',
    meta: { pagePermissionId: ['view-all'] },
    children: [
      {
        path: '',
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'developer',
        },
        component: () => import(/* webpackChunkName: "i18n" */ 'pages/i18n/index.vue'),
      },
    ],
  },
  {
    path: '/icon',
    component: shallowRef(Layout),
    name: 'Icon0',
    meta: { pagePermissionId: ['view-all'] },
    children: [
      {
        path: '',
        name: 'Icon',
        meta: {
          title: 'icon',
          icon: 'developer',
        },
        component: () => import(/* webpackChunkName: "icon" */ 'pages/icon/index.vue'),
      },
    ],
  },
  {
    path: '/table',
    component: shallowRef(Layout),
    name: 'Table0',
    meta: {
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: '',
        name: 'Table',
        meta: {
          title: 'table',
          icon: 'developer',
        },
        component: () => import(/* webpackChunkName: "table" */ 'pages/table/index.vue'),
      },
    ],
  },
  {
    path: '/menu',
    component: shallowRef(Layout),
    redirect: redirect,
    name: 'Menu',
    meta: {
      title: 'nested',
      icon: 'developer',
      pagePermissionId: ['view-all'],
    },
    children: [
      {
        path: 'menu1',
        component: () => import('src/pages/menu/menu1/index.vue'),
        redirect: redirect,
        name: 'Menu1',
        meta: {
          title: 'nested1',
          pagePermissionId: ['view-all'],
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('src/pages/menu/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: {
              title: 'nested1_1',
              pagePermissionId: ['view-all'],
            },
          },
          {
            path: 'menu1-2',
            component: () => import('src/pages/menu/menu1/menu1-2/index.vue'),
            redirect: redirect,
            name: 'Menu1-2',
            meta: {
              title: 'nested1_2',
              pagePermissionId: ['view-all'],
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('src/pages/menu/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'nested1_2_1',
                  pagePermissionId: ['menu-menu1-2-1'],
                },
              },
              {
                path: 'menu1-2-2',
                component: () => import('src/pages/menu/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'nested1_2_2',
                  pagePermissionId: ['menu-menu1-2-2'],
                },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('src/pages/menu/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: {
              title: 'nested1_3',
              pagePermissionId: ['view-all'],
            },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('src/pages/menu/menu2/index.vue'),
        name: 'Menu2',
        meta: {
          title: 'nested2',
          pagePermissionId: ['view-all'],
        },
      },
    ],
  },
  {
    path: '/link',
    component: shallowRef(Layout),
    name: 'Link0',
    children: [
      {
        path: setting.policy,
        component: () => {},
        name: 'Link',
        meta: {
          title: 'link',
          icon: 'developer',
        },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: redirect,
  },
];
