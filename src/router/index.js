import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '@/data.json';
import Home from '@/pages/Home.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import Forum from '@/pages/Forum.vue';
import Category from '@/pages/Category.vue';
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
    path: '/category/:id',
    name: 'category',
    component: Category,
    beforeEnter(to, from, next) {
      const category = sourceData.categories.find((item) => item.id === to.params.id);
      if (category) return next();
      else {
        return next({
          name: 'notFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: '/forum/:id',
    name: 'forum',
    component: Forum,
    beforeEnter(to, from, next) {
      const forum = sourceData.forums.find((item) => item.id === to.params.id);
      if (forum) return next();
      else {
        return next({
          name: 'notFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
    },
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
    name: 'notFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
