import { createApp } from 'vue'
import WinUIOnWeb from 'winuionweb'
import 'winuionweb/style.css'
import App from './App.vue'
import router from './router'
import './styles/theme.css'
import { initSettings } from './store/settings'

// 挂载前初始化主题与语言
initSettings()

createApp(App)
  .use(router)
  .use(WinUIOnWeb, { locale: 'zh-CN' })
  .mount('#app')