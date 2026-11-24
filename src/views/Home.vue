<script setup lang="ts">
import { t } from '../store/settings'

const logoUrl = import.meta.env.BASE_URL + 'assets/logo.svg'

// 统一管理链接常量
const DOWNLOAD_URL = 'https://github.com/SysBoxerandMinecraft/FluentGitDesktop-Dev/releases/download/v0.0.1-alpha/FluentGit_0.0.1.0_x64.zip'
const SOURCE_URL = 'https://github.com/SysBoxerandMinecraft/FluentGitDesktop-Dev'

const features = [
  { titleKey: 'feature1Title', descKey: 'feature1Desc', glyph: '\uE790' },
  { titleKey: 'feature2Title', descKey: 'feature2Desc', glyph: '\uE8C1' },
  { titleKey: 'feature3Title', descKey: 'feature3Desc', glyph: '\uE8A5' },
] as const
</script>

<template>
  <section class="home">
    <div class="hero">
      <img :src="logoUrl" class="hero-logo" alt="FluentGit" />
      <h1 class="hero-title">FluentGit</h1>
      <p class="hero-subtitle">{{ t('heroSubtitle') }}</p>
      
      <div class="hero-actions">
        <!-- 全部使用超链接按钮，style 传入全局尺寸 -->
        <a :href="DOWNLOAD_URL" class="fg-hyperlink hero-link">
          {{ t('downloadNow') }}
        </a>
        <a :href="SOURCE_URL" target="_blank" rel="noopener" class="fg-hyperlink hero-link">
          {{ t('viewSource') }}
        </a>
      </div>
    </div>

    <div class="features-grid">
      <div v-for="feature in features" :key="feature.titleKey" class="fg-card feature-card">
        <span class="glyph feature-glyph">{{ feature.glyph }}</span>
        <h3 class="feature-title">{{ t(feature.titleKey) }}</h3>
        <p class="feature-desc">{{ t(feature.descKey) }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home { max-width: 1100px; margin: 0 auto; }

.hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px 16px 24px; }
.hero-logo { width: 96px; height: 96px; margin-bottom: 20px; filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)); }
.hero-title { margin: 0 0 8px; font-family: 'Segoe UI Variable Display', 'Segoe UI', system-ui, sans-serif; font-size: 48px; font-weight: 700; letter-spacing: -0.02em; color: var(--win-text-primary, #000); }
.hero-subtitle { margin: 0 0 28px; font-size: 20px; color: var(--win-text-secondary, #555); line-height: 1.4; }

/* 调整链接组间距 */
.hero-actions { 
  display: flex; 
  gap: 24px; 
  flex-wrap: wrap; 
  justify-content: center; 
  align-items: center; 
}

/* 统一大尺寸超链接 */
.hero-link {
  font-size: 16px;
  padding: 8px 20px;
}

.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }
@media (max-width: 1000px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .features-grid { grid-template-columns: 1fr; } .hero-title { font-size: 36px; } .hero-subtitle { font-size: 16px; } }

.feature-card { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
.feature-card:hover { background: var(--win-card-background-hover, rgba(255, 255, 255, 0.95)); }
.feature-glyph { font-size: 24px; color: var(--win-accent-default, #005fb8); margin-bottom: 4px; }
.feature-title { margin: 0; font-size: 18px; font-weight: 600; color: var(--win-text-primary, #000); }
.feature-desc { margin: 0; font-size: 14px; line-height: 1.5; color: var(--win-text-secondary, #555); }
</style>