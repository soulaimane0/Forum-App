import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '@/data.json';
import Home from '@/pages/Home.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    path: '/threads',
    redirect: '/',
  },
  {
    path: '/',
    component: Home,
    name: 'home',
  },
  {
    path: '/thread/:id',
    component: ThreadShow,
    name: 'thread',
    beforeEnter(to, from, next) {
      //chack is the thread id exists
      const thread = sourceData.threads.find((thread) => thread.id === to.params.id);
      if (thread) return next();
      else {
        next({
          name: 'notFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'notFound',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
