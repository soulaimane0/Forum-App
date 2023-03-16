import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';

//Bootstrap links
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapPlugin from '@/plugins/bootstrap.js';

import '@/sass/main.scss';

const forumApp = createApp(App);
const pinia = createPinia();

forumApp.use(router);
forumApp.use(pinia);
forumApp.use(BootstrapPlugin);
forumApp.mount('#app');
