/*
 * @Date: 2024-01-06 12:37:45
 * @LastEditTime: 2024-01-09 10:11:18
 * @FilePath: \src\router\index.ts
 */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主屏',
    component: () => import('*/index/index.vue'),
  },
  {
    path: '/3D',
    name: '污染溯源',
    component: () => import('*/traceability/index.vue'),
  },
  {
    path: '/waterEnv',
    name: '水环境状况',
    component: () => import('*/waterEnvStatus/index.vue'),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
