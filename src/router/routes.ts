import { RouteRecordRaw } from 'vue-router';
import Layout from 'src/layouts/index.vue';
import { markRaw, shallowRef } from 'vue';
import setting from 'src/setting.json';
import { PermissionModule } from 'src/store/modules/permission';
import globalMessage from 'src/utils/notify';
import { UserModule } from 'src/store/modules/user';
import { sleep } from 'src/utils/tools';
/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      如果设置为“ noredirect”，则在单击面包屑时将不会触发任何重定向操作
  meta: {
    pagePermissionId              页面权限的id, -1就是管理员才有的权限  只有一级的写父级，有多级都要写，不填的就是不限制权限
    title: 'title'               子菜单和面包屑中显示的名称（推荐设置）
    icon: 'icon-name'             侧栏中显示的图标
    hidden: true                 if true, 此路由不会显示在侧边栏中（默认为false）
    breadcrumb: false            if false, 该项目将隐藏在面包屑中（默认为true）
    affix: true                  if true, 标签将粘贴在标签视图中
  }
*/
function redirect(to: any): any {
  const routes = PermissionModule.routes;
  const item: any = routes.find((item: any) => item.meta && item.path && item.component && item.name !== 'Login');
  if (!item || (item && !item.children.length)) {
    globalMessage.show({
      type: 'error',
      content: `当前账号：${UserModule.username} 权限异常`,
    });
    UserModule.ResetToken();
    return '/login';
  } else {
    return `${item.path}${item.children[0].path ? `/${item.children[0].path}` : ''}`;
  }
}
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ 'src/pages/login/index2.vue'),
    meta: { hidden: true },
  },
  {
    path: '/login2',
    name: 'Login2',
    component: () => import(/* webpackChunkName: "login2" */ 'src/pages/login/index2.vue'),
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
      pagePermissionId: ['dashboard'],
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ 'src/pages/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/account',
    component: shallowRef(Layout),
    name: 'Account0',
    meta: {
      pagePermissionId: ['account'],
    },
    children: [
      {
        path: '',
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
    component: shallowRef(Layout),
    name: 'Charts',
    redirect: redirect,
    meta: {
      title: 'charts',
      icon: 'bar_chart',
      pagePermissionId: ['charts', 'charts-world', 'charts-relationship', 'charts-map', 'charts-province', 'charts-city'],
    },
    children: [
      {
        path: 'world',
        name: 'World',
        meta: {
          title: 'world',
          icon: 'label',
          pagePermissionId: ['charts-world'],
        },
        component: () => import(/* webpackChunkName: "world" */ 'src/pages/charts/world.vue'),
      },
      {
        path: 'relationship',
        name: 'Relationship',
        meta: {
          title: 'relationship',
          icon: 'label',
          pagePermissionId: ['charts-relationship'],
        },
        component: () => import(/* webpackChunkName: "relationship" */ 'src/pages/charts/relationship.vue'),
      },
      {
        path: 'map',
        name: 'Map',
        meta: {
          title: 'map',
          icon: 'label',
          pagePermissionId: ['charts-map'],
        },
        component: () => import(/* webpackChunkName: "map" */ 'src/pages/charts/map.vue'),
      },
      {
        path: 'province',
        name: 'Province',
        meta: {
          title: 'province',
          icon: 'label',
          pagePermissionId: ['charts-province'],
        },
        component: () => import(/* webpackChunkName: "province" */ 'src/pages/charts/province.vue'),
      },
      {
        path: 'city',
        name: 'City',
        meta: {
          title: 'city',
          icon: 'label',
          pagePermissionId: ['charts-city'],
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
      icon: 'extension',
      pagePermissionId: [
        'components',
        'components-editer',
        'components-md',
        'components-splitter',
        'components-jsonEditor',
        'components-jsonView',
        'components-tabs',
        'components-colors',
        'components-sticky',
        'components-dialog',
        'components-carousel',
        'components-skeleton',
        'components-spinners',
        'components-colorPicker',
        'components-notice',
        'components-transfer',
        'components-parallax',
        'components-colors',
        'components-terminal',
      ],
    },
    children: [
      {
        path: 'editer',
        name: 'Editer',
        meta: {
          title: 'editer',
          icon: 'label',
          pagePermissionId: ['components-editer'],
        },
        component: () => import(/* webpackChunkName: "editer" */ 'src/pages/components/editer.vue'),
      },
      {
        path: 'md',
        name: 'Md',
        meta: {
          title: 'md',
          icon: 'label',
          pagePermissionId: ['components-md'],
        },
        component: () => import(/* webpackChunkName: "md" */ 'src/pages/components/md.vue'),
      },
      {
        path: 'splitter',
        name: 'Splitter',
        meta: {
          title: 'splitter',
          icon: 'label',
          pagePermissionId: ['components-splitter'],
        },
        component: () => import(/* webpackChunkName: "splitter" */ 'src/pages/components/splitter.vue'),
      },
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: {
          title: 'jsonEditor',
          icon: 'label',
          pagePermissionId: ['components-jsonEditor'],
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'src/pages/components/jsonEditor.vue'),
      },
      {
        path: 'jsonView',
        name: 'jsonView',
        meta: {
          title: 'jsonView',
          icon: 'label',
          pagePermissionId: ['components-jsonView'],
        },
        component: () => import(/* webpackChunkName: "jsonEditor" */ 'src/pages/components/jsonView.vue'),
      },
      {
        path: 'tabs',
        name: 'Tabs',
        meta: {
          title: 'tabs',
          icon: 'label',
          pagePermissionId: ['components-tabs'],
        },
        component: () => import(/* webpackChunkName: "tabs" */ 'src/pages/components/tabs.vue'),
      },
      {
        path: 'sticky',
        name: 'Sticky',
        meta: {
          title: 'sticky',
          icon: 'label',
          pagePermissionId: ['components-sticky'],
        },
        component: () => import(/* webpackChunkName: "sticky" */ 'src/pages/components/sticky.vue'),
      },
      {
        path: 'dialog',
        name: 'Dialog',
        meta: {
          title: 'dialog',
          icon: 'label',
          pagePermissionId: ['components-dialog'],
        },
        component: () => import(/* webpackChunkName: "dialog" */ 'src/pages/components/dialog.vue'),
      },
      {
        path: 'carousel',
        name: 'Carousel',
        meta: {
          title: 'carousel',
          icon: 'label',
          pagePermissionId: ['components-carousel'],
        },
        component: () => import(/* webpackChunkName: "carousel" */ 'src/pages/components/carousel.vue'),
      },
      {
        path: 'colorPicker',
        name: 'ColorPicker',
        meta: {
          title: 'colorPicker',
          icon: 'label',
          pagePermissionId: ['components-colorPicker'],
        },
        component: () => import(/* webpackChunkName: "colorPicker" */ 'src/pages/components/colorPicker.vue'),
      },
      {
        path: 'skeleton',
        name: 'Skeleton',
        meta: {
          title: 'skeleton',
          icon: 'label',
          pagePermissionId: ['components-skeleton'],
        },
        component: () => import(/* webpackChunkName: "skeleton" */ 'src/pages/components/skeleton.vue'),
      },
      {
        path: 'spinners',
        name: 'Spinners',
        meta: {
          title: 'spinners',
          icon: 'label',
          pagePermissionId: ['components-spinners'],
        },
        component: () => import(/* webpackChunkName: "spinners" */ 'src/pages/components/spinners.vue'),
      },
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: 'notice',
          icon: 'label',
          pagePermissionId: ['components-notice'],
        },
        component: () => import(/* webpackChunkName: "notice" */ 'src/pages/components/notice.vue'),
      },
      {
        path: 'transfer',
        name: 'Transfer',
        meta: {
          title: 'transfer',
          icon: 'label',
          pagePermissionId: ['components-transfer'],
        },
        component: () => import(/* webpackChunkName: "transfer" */ 'src/pages/components/transfer.vue'),
      },
      {
        path: 'parallax',
        name: 'Parallax',
        meta: {
          title: 'parallax',
          icon: 'label',
          pagePermissionId: ['components-parallax'],
        },
        component: () => import(/* webpackChunkName: "parallax" */ 'src/pages/components/parallax.vue'),
      },
      {
        path: 'colors',
        name: 'Colors',
        meta: {
          title: 'colors',
          icon: 'label',
          pagePermissionId: ['components-colors'],
        },
        component: () => import(/* webpackChunkName: "colors" */ 'src/pages/components/color.vue'),
      },
      {
        path: 'terminal',
        name: 'Terminal',
        meta: {
          title: 'terminal',
          icon: 'label',
          pagePermissionId: ['components-terminal'],
        },
        component: () => import(/* webpackChunkName: "terminal" */ 'src/pages/components/terminal.vue'),
      },
    ],
  },
  {
    path: '/copy',
    component: shallowRef(Layout),
    name: 'Copy0',
    meta: { pagePermissionId: ['copy'] },
    children: [
      {
        path: '',
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
    component: shallowRef(Layout),
    name: 'I18n0',
    meta: { pagePermissionId: ['i18n'] },
    children: [
      {
        path: '',
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
    component: shallowRef(Layout),
    name: 'Icon0',
    meta: { pagePermissionId: ['icon'] },
    children: [
      {
        path: '',
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
    path: '/convert',
    component: shallowRef(Layout),
    name: 'Convert0',
    meta: {
      pagePermissionId: ['convert'],
    },
    children: [
      {
        path: '',
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
    path: '/table',
    component: shallowRef(Layout),
    name: 'Table',
    redirect: redirect,
    meta: {
      pagePermissionId: ['table', 'table-index', 'table-beta'],
      title: 'table',
      icon: 'table_chart',
    },
    children: [
      {
        path: 'index',
        name: 'table-index',
        meta: {
          title: 'table-index',
          icon: 'label',
          pagePermissionId: ['table-index'],
        },
        component: () => import(/* webpackChunkName: "table-index" */ 'pages/table/index.vue'),
      },
      {
        path: 'beta',
        name: 'table-beta',
        meta: {
          title: 'table-beta',
          icon: 'label',
          pagePermissionId: ['table-beta'],
        },
        component: () => import(/* webpackChunkName: "table-beta" */ 'pages/table/beta.vue'),
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
      icon: 'menu',
      pagePermissionId: ['menu', 'menu-menu1', 'menu-menu1-1', 'menu-menu1-2', 'menu-menu1-2-1', 'menu-menu1-2-2', 'menu-menu1-3', 'menu-menu2'],
    },
    children: [
      {
        path: 'menu1',
        component: () => import('src/pages/menu/menu1/index.vue'),
        redirect: redirect,
        name: 'Menu1',
        meta: {
          title: 'nested1',
          pagePermissionId: ['menu-menu1'],
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('src/pages/menu/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: {
              title: 'nested1_1',
              pagePermissionId: ['menu-menu1-1'],
            },
          },
          {
            path: 'menu1-2',
            component: () => import('src/pages/menu/menu1/menu1-2/index.vue'),
            redirect: redirect,
            name: 'Menu1-2',
            meta: {
              title: 'nested1_2',
              pagePermissionId: ['menu-menu1-2'],
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
              pagePermissionId: ['menu-menu1-3'],
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
          pagePermissionId: ['menu-menu2'],
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
          icon: 'link',
        },
      },
    ],
  },
  {
    path: '',
    component: shallowRef(Layout),
    name: 'largeDisplay0',
    children: [
      {
        path: process.env.NODE_ENV === 'production' ? `${location.origin}${setting.publicPath}index2.html#/large-display` : `${location.origin}/index2.html#/large-display`,
        component: () => {},
        name: 'largeDisplay',
        meta: {
          title: 'largeDisplay',
          icon: 'link',
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
