import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import globalComponent from '@/components/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from '@/router'
import pinia from '@/store'
import '@/permission'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import i18n from '@/i18n/index'

const app = createApp(App)

app.use(globalComponent)
app.use(router)
app.use(i18n)
app.use(pinia)
app.use(ElementPlus, { locale: zhCn, size: 'small', zIndex: 3000 })

app.mount('#app')
