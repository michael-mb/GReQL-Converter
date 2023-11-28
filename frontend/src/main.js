// Template JS
import '../public/assets/js/jquery-3.6.0.min'
import '../public/assets/js/bootstrap.bundle.min.js'
import '../public/assets/js/feather.min.js'
import '../public/assets/plugins/slimscroll/jquery.slimscroll.min.js'
import '../public/assets/js/script.js'


import {createApp, defineAsyncComponent} from 'vue'
import {createPinia} from 'pinia'
import router from './router'

const app = createApp(defineAsyncComponent(() => import('./App.vue')))
app.use(createPinia())
app.use(router)
app.mount("#app")