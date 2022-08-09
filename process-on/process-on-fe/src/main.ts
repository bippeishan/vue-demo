import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// eslint-disable-next-line newline-per-chained-call
const app = createApp(App).use(store).use(router).use(ElementPlus);

// eslint-disable-next-line max-len
Object.keys(ElementPlusIconsVue).map((key) => (app as any).component(key, (ElementPlusIconsVue as any)[key]));

app.mount('#app');
