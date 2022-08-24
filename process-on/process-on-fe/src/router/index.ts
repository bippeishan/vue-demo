import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "entryLayout" */ '../views/entry-layout/entry-index.vue'),
    children: [
      {
        path: 'files',
        component: () => import(/* webpackChunkName: "fileList" */ '../views/file-list/list-index.vue'),
      },
    ],
  },
  {
    path: '/mindmap/:id',
    name: 'mindmap',
    component: () => import(/* webpackChunkName: "mindmap" */ '../views/mind-map/mind-map.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
