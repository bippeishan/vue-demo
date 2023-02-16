import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "entryLayout" */ '../views/entry-layout/entry-index.vue'),
    children: [
      {
        path: '/file-system',
        component: () => import(/* webpackChunkName: "filesEntryLayout" */ '../views/files-entry-layout/entry-index.vue'),
        children: [
          {
            path: 'files',
            component: () => import(/* webpackChunkName: "fileList" */ '../views/file-list/list-index.vue'),
          },
        ],
      },
      {
        path: '/upro',
        component: () => import(/* webpackChunkName: "uproEntryLayout" */ '../views/upro/entry-layout/entry-index.vue'),
        children: [
          {
            path: 'projects',
            component: () => import(/* webpackChunkName: "uproProjects" */ '../views/upro/project-list/project-list.vue'),
          },
          {
            path: 'users',
            component: () => import(/* webpackChunkName: "uproUsers" */ '../views/upro/user-list/user-list.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/file-system/mindmap/:id',
    name: 'mindmap',
    component: () => import(/* webpackChunkName: "mindmap" */ '../views/mind-map/mind-map.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
