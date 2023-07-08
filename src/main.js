import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import useAuthStore from '@/stores/AuthenticatedStore';
import { auth } from '@/helpers/firestore.js';
import { onAuthStateChanged } from 'firebase/auth';

// Bootstrap links
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapPlugin from '@/plugins/bootstrap.js';

// Sass file
import '@/sass/main.scss';

// Font Awesome Plugin
import FontAwesome from '@/plugins/FontAwesome';

const forumApp = createApp(App);
const pinia = createPinia();

forumApp.use(router);
forumApp.use(pinia);
forumApp.use(BootstrapPlugin);
forumApp.use(FontAwesome);
forumApp.mount('#app');
