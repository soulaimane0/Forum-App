import { createRouter, createWebHistory } from 'vue-router';
import { db } from '@/helpers/firestore.js';
import { doc, getDoc } from 'firebase/firestore';
import Home from '@/pages/Home.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import Forum from '@/pages/Forum.vue';
import Category from '@/pages/Category.vue';
import Profile from '@/pages/Profile.vue';
import ThreadCreate from '@/pages/ThreadCreate.vue';
import ThreadUpdate from '@/pages/ThreadUpdate.vue';
import NotFound from '@/pages/NotFound.vue';
import useUnsubscribeStore from '@/stores/UnsubscribeStore';
import useAuthStore from '@/stores/AuthenticatedStore';
import Register from '@/pages/Register.vue';
import Signin from '@/pages/Signin.vue';

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
    async beforeEnter(to, from, next) {
      //chack if the category id exists
      const categoryDoc = doc(db, 'categories', to.params.id);
      const category = await getDoc(categoryDoc);
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
    async beforeEnter(to, from, next) {
      //chack if the forum id exists
      const forumDoc = doc(db, 'forums', to.params.id);
      const forum = await getDoc(forumDoc);
      if (forum.data()) return next();
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
    async beforeEnter(to, from, next) {
      //chack if the thread id exists
      const threadDoc = doc(db, 'threads', to.params.id);
      const thread = await getDoc(threadDoc);
      if (thread.data()) return next();
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
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
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
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  await authStore.initAuthentication();
  await useUnsubscribeStore().unsubscribeAllSnapshots();

  if (to.meta.requiresAuth && !authStore.authId) {
    return { name: 'home' };
  }
});

export default router;
