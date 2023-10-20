import {createApp, defineAsyncComponent} from 'vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(defineAsyncComponent(() => import('./App.vue')))
app.use(createPinia())
app.use(router)
app.mount("#app")