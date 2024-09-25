/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */
export const loginRoutes = [
  {
    path: '/sso-login',
    name: 'SsoLogin',
    component: () => import('@/views/login/sso-login/index.vue'),
    meta: {
      title: 'sso登录',
      icon: 'sso-login',
      hidden: true,
      type: 1,
      href: 0,
    },
  },
]

export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@/views/login/redirect/index.vue'),
    meta: {
      title: '重定向',
      icon: 'redirect',
      hidden: true,
      type: 1,
      href: 0,
    },
  },
  {
    path: '/sso',
    name: 'Sso',
    component: () => import('@/views/login/sso/index.vue'),
    meta: {
      title: 'sso',
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Layout',
    meta: {
      title: '',
      hidden: false,
      type: 0,
      href: 0,
    },
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
      icon: 'home',
      hidden: false,
      type: 1,
      href: 0,
    },
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: 'Screen',
      icon: 'screen',
      hidden: false,
      type: 1,
      href: 0,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      type: 1,
      href: 0,
    },
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Any',
  //   redirect: '/404',
  //   meta: {
  //     title: '任意路由',
  //     hidden: true,
  //   },
  // },
]
