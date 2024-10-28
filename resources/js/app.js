import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import router from "./router";
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import store from "./store/index"


const app = createApp(App);
const vuetify = createVuetify();

app.use(router).use(vuetify).use(store).mount("#app");