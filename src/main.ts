/* llamo a las dependencias que se usaran */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CoreuiVue from '@coreui/vue';
import router from "@/router";
import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons'
/* llamo al componente de vue principal */
import App from './App.vue'
/* los estilos de para la pagina */
import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/main.css'
/* inicializo el vue app y el api de pinia para los store */
const pinia = createPinia();
const app = createApp(App);
/* asigno los plugins */
app.use(CoreuiVue);
app.use(pinia);
app.use(router);
app.provide('icons', icons)
app.component('CIcon', CIcon)
/* monto el proyecto */
app.mount('#app');