import { RouteRecordRaw } from 'vue-router';
import Layout from 'src/layouts/index.vue';
import { markRaw, shallowRef } from 'vue';
import setting from 'src/setting.json';

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      如果设置为“ noredirect”，则在单击面包屑时将不会触发任何重定向操作
  meta: {
    pagePermissionId              页面权限的id, -1就是管理员才有的权限
    title: 'title'               子菜单和面包屑中显示的名称（推荐设置）
    icon: 'icon-name'             侧栏中显示的图标
    hidden: true                 if true, 此路由不会显示在侧边栏中（默认为false）
    breadcrumb: false            if false, 该项目将隐藏在面包屑中（默认为true）
    affix: true                  if true, 标签将粘贴在标签视图中
  }
*/
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ 'src/pages/login/index.vue'),
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
      pagePermissionId: ['-1', '1'],
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ 'src/pages/dashboard/index.vue'
          ),
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
      pagePermissionId: ['-1', '1'],
    },
    children: [
      {
        path: '',
        name: 'Account',
        meta: {
          title: 'account',
          icon: 'people',
        },
        component: () =>
          import(/* webpackChunkName: "account" */ 'pages/account/index.vue'),
      },
    ],
  },
  {
    path: '/charts',
    component: shallowRef(Layout),
    name: 'Charts',
    redirect: '/charts/relationship',
    meta: {
      title: 'charts',
      icon: 'bar_chart',
      pagePermissionId: ['-1', '1'],
    },
    children: [
      {
        path: 'relationship',
        name: 'Relationship',
        meta: {
          title: 'relationship',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "line" */ 'src/pages/charts/relationship.vue'
          ),
      },
      {
        path: 'map',
        name: 'Map',
        meta: {
          title: 'map',
          icon: 'label',
        },
        component: () =>
          import(/* webpackChunkName: "map" */ 'src/pages/charts/map.vue'),
      },
      {
        path: 'province',
        name: 'Province',
        meta: {
          title: 'province',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "province" */ 'src/pages/charts/province.vue'
          ),
      },
      {
        path: 'city',
        name: 'City',
        meta: {
          title: 'city',
          icon: 'label',
        },
        component: () =>
          import(/* webpackChunkName: "city" */ 'src/pages/charts/city.vue'),
      },
    ],
  },
  {
    path: '/components',
    component: shallowRef(Layout),
    name: 'Components',
    redirect: '/components/editer',
    meta: {
      title: 'components',
      icon: 'extension',
      pagePermissionId: ['-1', '1'],
    },
    children: [
      {
        path: 'editer',
        name: 'Editer',
        meta: {
          title: 'editer',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "editer" */ 'src/pages/components/editer.vue'
          ),
      },
      {
        path: 'md',
        name: 'Md',
        meta: {
          title: 'md',
          icon: 'label',
        },
        component: () =>
          import(/* webpackChunkName: "md" */ 'src/pages/components/md.vue'),
      },
      {
        path: 'splitter',
        name: 'Splitter',
        meta: {
          title: 'splitter',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "splitter" */ 'src/pages/components/splitter.vue'
          ),
      },
      {
        path: 'jsonEditor',
        name: 'JsonEditor',
        meta: {
          title: 'jsonEditor',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "jsonEditor" */ 'src/pages/components/jsonEditor.vue'
          ),
      },
      {
        path: 'tabs',
        name: 'Tabs',
        meta: {
          title: 'tabs',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "tabs" */ 'src/pages/components/tabs.vue'
          ),
      },
      {
        path: 'sticky',
        name: 'Sticky',
        meta: {
          title: 'sticky',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "sticky" */ 'src/pages/components/sticky.vue'
          ),
      },
      {
        path: 'dialog',
        name: 'Dialog',
        meta: {
          title: 'dialog',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "dialog" */ 'src/pages/components/dialog.vue'
          ),
      },
      {
        path: 'carousel',
        name: 'Carousel',
        meta: {
          title: 'carousel',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "carousel" */ 'src/pages/components/carousel.vue'
          ),
      },
      {
        path: 'colorPicker',
        name: 'ColorPicker',
        meta: {
          title: 'colorPicker',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "colorPicker" */ 'src/pages/components/colorPicker.vue'
          ),
      },
      {
        path: 'skeleton',
        name: 'Skeleton',
        meta: {
          title: 'skeleton',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "skeleton" */ 'src/pages/components/skeleton.vue'
          ),
      },
      {
        path: 'spinners',
        name: 'Spinners',
        meta: {
          title: 'spinners',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "spinners" */ 'src/pages/components/spinners.vue'
          ),
      },
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: 'notice',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "notice" */ 'src/pages/components/notice.vue'
          ),
      },
      {
        path: 'transfer',
        name: 'Transfer',
        meta: {
          title: 'transfer',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "notice" */ 'src/pages/components/transfer.vue'
          ),
      },
      {
        path: 'parallax',
        name: 'Parallax',
        meta: {
          title: 'parallax',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "notice" */ 'src/pages/components/parallax.vue'
          ),
      },
      {
        path: 'colors',
        name: 'Colors',
        meta: {
          title: 'colors',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "notice" */ 'src/pages/components/color.vue'
          ),
      },
    ],
  },
  {
    path: '/copy',
    component: shallowRef(Layout),
    name: 'Copy0',
    meta: { pagePermissionId: ['-1', '1'] },
    redirect: '/copy',
    children: [
      {
        path: '',
        name: 'Copy',
        meta: {
          title: 'copy',
          icon: 'content_cut',
        },
        component: () =>
          import(/* webpackChunkName: "copy" */ 'pages/copy/index.vue'),
      },
    ],
  },
  {
    path: '/i18n',
    component: shallowRef(Layout),
    name: 'I18n0',
    meta: { pagePermissionId: ['-1', '1'] },
    children: [
      {
        path: '',
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'g_translate',
        },
        component: () =>
          import(/* webpackChunkName: "i18n" */ 'pages/i18n/index.vue'),
      },
    ],
  },
  {
    path: '/icon',
    component: shallowRef(Layout),
    name: 'Icon0',
    meta: { pagePermissionId: ['-1', '1'] },
    children: [
      {
        path: '',
        name: 'Icon',
        meta: {
          title: 'icon',
          icon: 'face',
        },
        component: () =>
          import(/* webpackChunkName: "icon" */ 'pages/icon/index.vue'),
      },
    ],
  },
  {
    path: '/convert',
    component: shallowRef(Layout),
    name: 'Convert0',
    meta: {
      pagePermissionId: ['-1', '1'],
    },
    children: [
      {
        path: '',
        name: 'Convert',
        meta: {
          title: 'convert',
          icon: 'code',
        },
        component: () =>
          import(/* webpackChunkName: "convert" */ 'pages/convert/index.vue'),
      },
    ],
  },
  {
    path: '/table',
    component: shallowRef(Layout),
    name: 'Table',
    redirect: '/table/index',
    meta: {
      pagePermissionId: ['-1', '1'],
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
        },
        component: () =>
          import(/* webpackChunkName: "table-index" */ 'pages/table/index.vue'),
      },
      {
        path: 'standard',
        name: 'table-standard',
        meta: {
          title: 'table-standard',
          icon: 'label',
        },
        component: () =>
          import(
            /* webpackChunkName: "table-standard" */ 'pages/table/standard.vue'
          ),
      },
      {
        path: 'beta',
        name: 'table-beta',
        meta: {
          title: 'table-beta',
          icon: 'label',
        },
        component: () =>
          import(/* webpackChunkName: "table-beta" */ 'pages/table/beta.vue'),
      },
    ],
  },
  {
    path: '/menu',
    component: shallowRef(Layout),
    redirect: '/menu/menu1',
    name: 'Menu',
    meta: {
      title: 'nested',
      icon: 'menu',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('src/pages/menu/menu1/index.vue'),
        redirect: '/menu/menu1/menu1-1',
        name: 'Menu1',
        meta: {
          title: 'nested1',
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('src/pages/menu/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: {
              title: 'nested1_1',
            },
          },
          {
            path: 'menu1-2',
            component: () => import('src/pages/menu/menu1/menu1-2/index.vue'),
            redirect: '/menu/menu1/menu1-2/menu1-2-1',
            name: 'Menu1-2',
            meta: {
              title: 'nested1_2',
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('src/pages/menu/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'nested1_2_1',
                },
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('src/pages/menu/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'nested1_2_2',
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
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'catchAll',
    redirect: '/dashboard',
  },
];
