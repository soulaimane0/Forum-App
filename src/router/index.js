import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '@/pages/PageHome.vue';
import PageThreadShow from '@/pages/PageThreadShow.vue';

const routes = [
  {
    path: '/',
    component: PageHome,
    name: 'Home',
  },
  {
    path: '/thread/:id',
    component: PageThreadShow,
    name: 'thread',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
