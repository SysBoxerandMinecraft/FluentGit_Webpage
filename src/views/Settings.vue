<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { theme, setTheme, locale, setLocale, t } from '../store/settings'
import type { Locale } from '../store/settings'

// 语言列表配置
const languages: { value: Locale; labelKey: 'langZhCN' | 'langZhTW' | 'langEnUS' }[] = [
  { value: 'zh-CN', labelKey: 'langZhCN' },
  { value: 'zh-TW', labelKey: 'langZhTW' },
  { value: 'en-US', labelKey: 'langEnUS' },
]

// 下拉菜单开关状态
const isLangComboOpen = ref(false)
const langComboRef = ref<HTMLElement | null>(null)

// 当前选中的语言名称
const currentLangLabel = computed(() => {
  const lang = languages.find(l => l.value === locale.value)
  return lang ? t(lang.labelKey) : ''
})

// 切换语言
function selectLanguage(lang: Locale) {
  setLocale(lang)
  isLangComboOpen.value = false
}

// 点击外部关闭下拉菜单
function handleClickOutside(event: MouseEvent) {
  if (langComboRef.value && !langComboRef.value.contains(event.target as Node)) {
    isLangComboOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <section class="settings">
    <h1 class="fg-page-title">{{ t('settingsTitle') }}</h1>

    <div class="settings-group">
      <h2 class="settings-group-title">{{ t('appearance') }}</h2>
      
      <div class="fg-card settings-card">
        <!-- ToggleSwitch: 主题切换 -->
        <div class="settings-row">
          <div class="settings-text">
            <div class="settings-title">{{ t('themeDark') }}</div>
            <div class="settings-desc">{{ t('themeMode') }}</div>
          </div>
          <!-- 手绘 WinUI 风格 ToggleSwitch -->
          <button 
            class="toggle-switch" 
            :class="{ active: theme === 'dark' }"
            @click="setTheme(theme === 'dark' ? 'light' : 'dark')"
          >
            <div class="toggle-knob"></div>
          </button>
        </div>

        <div class="settings-divider"></div>

        <!-- ComboBox: 语言切换 -->
        <div class="settings-row">
          <div class="settings-text">
            <div class="settings-title">{{ t('language') }}</div>
            <div class="settings-desc">{{ t('languageSelect') }}</div>
          </div>
          
          <!-- 手绘 WinUI 风格 ComboBox -->
          <div class="combo-box-wrapper" ref="langComboRef">
            <button class="combo-box" @click="isLangComboOpen = !isLangComboOpen">
              <span>{{ currentLangLabel }}</span>
              <span class="glyph combo-chevron" :class="{ open: isLangComboOpen }">&#xE70D;</span>
            </button>
            
            <!-- 下拉菜单 -->
            <transition name="combo-fade">
              <div v-if="isLangComboOpen" class="combo-dropdown">
                <button 
                  v-for="lang in languages" 
                  :key="lang.value"
                  class="combo-item"
                  :class="{ selected: locale === lang.value }"
                  @click="selectLanguage(lang.value)"
                >
                  <span class="combo-item-text">{{ t(lang.labelKey) }}</span>
                  <span v-if="locale === lang.value" class="glyph combo-check">&#xE73E;</span>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.settings {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-group-title {
  margin: 0 0 12px 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--win-text-primary);
}

.settings-card {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  gap: 16px;
}

.settings-divider {
  height: 1px;
  background: var(--win-divider-stroke);
  margin: 0 24px;
}

.settings-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.settings-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--win-text-primary);
}

.settings-desc {
  font-size: 12px;
  color: var(--win-text-secondary);
}

/* ============ ToggleSwitch 自绘 ============ */
.toggle-switch {
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid var(--win-text-secondary);
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  flex-shrink: 0;
}

.toggle-switch:hover {
  border-color: var(--win-text-primary);
}

.toggle-switch.active {
  background: var(--win-accent-default);
  border-color: var(--win-accent-default);
}

.toggle-switch.active:hover {
  background: var(--win-accent-hover, #1a6fc4);
  border-color: var(--win-accent-hover, #1a6fc4);
}

.toggle-knob {
  position: absolute;
  top: 50%;
  left: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--win-text-secondary);
  transform: translateY(-50%);
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.toggle-switch:hover .toggle-knob {
  background: var(--win-text-primary);
}

.toggle-switch.active .toggle-knob {
  left: 22px;
  background: var(--win-accent-text, #fff);
  width: 14px;
  height: 14px;
}

.toggle-switch.active:hover .toggle-knob {
  background: var(--win-accent-text, #fff);
}

/* ============ ComboBox 自绘 ============ */
.combo-box-wrapper {
  position: relative;
  width: 200px;
  flex-shrink: 0;
}

.combo-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid var(--win-control-stroke);
  background: var(--win-control-fill);
  color: var(--win-text-primary);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: all 0.1s ease;
}

.combo-box:hover {
  background: var(--win-control-fill-hover);
}

.combo-chevron {
  font-size: 10px;
  transition: transform 0.2s ease;
  pointer-events: none;
}

.combo-chevron.open {
  transform: rotate(180deg);
}

.combo-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid var(--win-control-stroke);
  background: var(--win-layer-background);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.combo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--win-text-primary);
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s ease;
}

.combo-item:hover {
  background: var(--win-subtle-fill-secondary);
}

.combo-item.selected {
  background: var(--win-subtle-fill-secondary);
}

.combo-check {
  font-size: 12px;
  color: var(--win-accent-default);
}

/* 动画 */
.combo-fade-enter-active,
.combo-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.combo-fade-enter-from,
.combo-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>