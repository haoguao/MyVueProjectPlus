import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'          // 导入路由模块
import ElementPlus from 'element-plus' // 导入 Element Plus 核心
import 'element-plus/dist/index.css'   // 导入 Element Plus 全局样式
import '@/assets/styles/global.css'    // 导入全局样式

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
