import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/FluentGit_Webpage/', // 仓库名，子路径部署必须设置
})