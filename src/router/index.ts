import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Download from '../views/Download.vue'
import Settings from '../views/Settings.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/download', name: 'download', component: Download },
  { path: '/settings', name: 'settings', component: Settings },
  // 移除了 /about 路由
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router