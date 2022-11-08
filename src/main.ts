import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/iconfont/iconfont.css'

import App from './App.vue'
import router from './router'
import '@/config/urlPrefix'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
