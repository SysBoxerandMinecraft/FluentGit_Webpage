<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from './store/settings'

const route = useRoute()
const router = useRouter()
const isPaneOpen = ref(true)

// 已移除 about 菜单项
const menuItems = computed(() => [
  { key: 'home', label: t('home'), glyph: '\uE80F', path: '/' },
  { key: 'download', label: t('download'), glyph: '\uE896', path: '/download' },
])

function isActive(item: { path: string }): boolean {
  return route.path === item.path
}

function handleSelect(item: { path: string }): void {
  router.push(item.path)
  if (window.innerWidth <= 760) isPaneOpen.value = false
}

function handleResize(): void {
  isPaneOpen.value = window.innerWidth > 760
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="app-shell">
    <div class="app-body">
      <!-- 导航栏 -->
      <nav class="navview" :class="{ collapsed: !isPaneOpen }">
        <button class="hamburger glyph" :title="t('toggleNav')" @click="isPaneOpen = !isPaneOpen">
          &#xE700;
        </button>
        
        <div class="nav-items">
          <a
            v-for="item in menuItems"
            :key="item.key"
            class="nav-item"
            :class="{ active: isActive(item) }"
            @click="handleSelect(item)"
          >
            <span class="nav-glyph glyph">{{ item.glyph }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </a>
        </div>

        <!-- 底部：设置 -->
        <div class="nav-footer">
          <a class="nav-item" :class="{ active: route.path === '/settings' }" @click="router.push('/settings')">
            <span class="nav-glyph glyph">&#xE713;</span>
            <span class="nav-label">{{ t('settings') }}</span>
          </a>
        </div>
      </nav>

      <!-- 内容区 -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 样式保持完全不变 */
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background:
    radial-gradient(circle at 15% 0%, rgba(0, 95, 184, 0.08), transparent 45%),
    radial-gradient(circle at 90% 100%, rgba(0, 95, 184, 0.08), transparent 50%),
    var(--win-solid-background, #f3f3f3);
  color: var(--win-text-primary, #000);
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.navview {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  transition: width 0.2s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;
}

.navview.collapsed { width: 48px; }

.hamburger {
  width: 40px;
  height: 40px;
  margin: 0 4px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--win-text-primary, #000);
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger:hover { background: var(--win-subtle-fill-secondary, rgba(0, 0, 0, 0.04)); }

.nav-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 4px;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-footer {
  padding: 8px 4px 0;
  margin-top: auto;
  border-top: 1px solid var(--win-divider-stroke, rgba(0, 0, 0, 0.08));
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  color: var(--win-text-primary, #000);
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: background 0.1s ease;
  margin-bottom: 2px;
}

.nav-item:hover { background: var(--win-subtle-fill-secondary, rgba(0, 0, 0, 0.04)); }
.nav-item.active { background: var(--win-subtle-fill-secondary, rgba(0, 0, 0, 0.04)); }

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  border-radius: 1.5px;
  background: var(--win-accent-default, #005fb8);
}

.nav-glyph { 
  font-size: 16px; 
  width: 20px; 
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0; 
}

.navview.collapsed .nav-label { opacity: 0; pointer-events: none; display: none; }
.nav-label { transition: opacity 0.15s ease; }

.content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 32px 40px 48px;
}

@media (max-width: 760px) {
  .content { padding: 20px 16px 32px; }
}
</style>