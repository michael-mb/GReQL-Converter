// Template JS
import './assets/js/jquery-3.6.0.min'
import './assets/js/bootstrap.bundle.min.js'
import './assets/js/feather.min.js'
import './assets/plugins/slimscroll/jquery.slimscroll.min.js'
import './assets/js/script.js'

// Template CSS
import './assets/main.css'
import './assets/css/bootstrap.min.css'
import './assets/plugins/fontawesome/css/fontawesome.min.css'
import './assets/css/feather.css'
import './assets/plugins/fontawesome/css/all.min.css'
import './assets/css/style.css'


import {createApp, defineAsyncComponent} from 'vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(defineAsyncComponent(() => import('./App.vue')))
app.use(createPinia())
app.use(router)
app.mount("#app")