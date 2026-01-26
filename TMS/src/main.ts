import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import http from './request/http';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$http = http;
app.mount('#app');
