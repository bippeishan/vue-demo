import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'entryLayout',
    component: () => import(/* webpackChunkName: "entryLayout" */ '../views/entry-layout/index.vue'),
  },
  {
    path: '/mindmap',
    name: 'editMap',
    component: () => import(/* webpackChunkName: "editMap" */ '../views/edit-map/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
