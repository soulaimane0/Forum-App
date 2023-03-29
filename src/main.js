import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './config/firebase.js';
('@/config/firebase.js');
import { createPinia } from 'pinia';

//Bootstrap links
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapPlugin from '@/plugins/bootstrap.js';

import '@/sass/main.scss';

const app = initializeApp(firebaseConfig);

const forumApp = createApp(App);
const pinia = createPinia();

forumApp.use(router);
forumApp.use(pinia);
forumApp.use(BootstrapPlugin);
forumApp.mount('#app');
