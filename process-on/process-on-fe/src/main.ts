import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// eslint-disable-next-line newline-per-chained-call
createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
