import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

//Bootstrap links
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapPlugin from '@/plugins/bootstrap.js';

import '@/sass/main.scss';

const forumApp = createApp(App);

forumApp.use(BootstrapPlugin);
forumApp.use(router);
forumApp.mount('#app');
