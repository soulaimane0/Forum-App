import { createRouter, createWebHistory } from 'vue-router';
import { findById } from '@/helpers';
import sourceData from '@/data.json';
import Home from '@/pages/Home.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import Forum from '@/pages/Forum.vue';
import Category from '@/pages/Category.vue';
import Profile from '@/pages/Profile.vue';
import ThreadCreate from '@/pages/ThreadCreate.vue';
import ThreadUpdate from '@/pages/ThreadUpdate.vue';
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
      const category = findById(sourceData.categories, to.params.id);
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
      const forum = findById(sourceData.forums, to.params.id);
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
      const thread = findById(sourceData.threads, to.params.id);
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
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: '/profile/:id/edit',
    name: 'profileEdit',
    component: Profile,
    props: { edit: true },
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'thread-create',
    component: ThreadCreate,
    props: true,
  },
  {
    path: '/thread/:id/update',
    name: 'thread-update',
    component: ThreadUpdate,
    props: true,
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
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  },
});

export default router;
