import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/Home/Index.vue'), //在vite.config.ts中配置@views别名
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: () => import('../views/Login/Index.vue'),
    meta: {
      title: '登录'
    }
  }
];

export default routes;
