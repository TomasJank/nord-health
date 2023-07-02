import { createPinia } from 'pinia';
import '@/scss/main.scss';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from './App.vue';
import '@nordhealth/css';
import '@nordhealth/components';
import router from './router';
import initializeFirebase from '@/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.css';

initializeFirebase();
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount('#app');
