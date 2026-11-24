<script setup lang="ts">
import { t } from '../store/settings'

const versionInfo = {
  version: 'v0.0.1 Alpha',
  releaseDate: '2026-11-08',
  sha256: '9E79984265C0A203C6B145E6F3923BEE868149D35E156765368D7EB8F58FE67F',
}

const DOWNLOAD_URL = 'https://github.com/SysBoxerandMinecraft/FluentGitDesktop-Dev/releases/download/v0.0.1-alpha/FluentGit_0.0.1.0_x64.zip'

function downloadSha(): void {
  navigator.clipboard.writeText(versionInfo.sha256).then(() => {
    alert('SHA256 校验码已复制到剪贴板！')
  }).catch(() => {
    alert('复制失败，请手动复制页面上的校验码。')
  })
}
</script>

<template>
  <section class="download">
    <h1 class="fg-page-title">{{ t('downloadTitle') }}</h1>

    <!-- 自绘 InfoBar -->
    <div class="fg-infobar">
      <span class="fg-infobar-icon">&#xE946;</span>
      <div class="fg-infobar-body">
        <div class="fg-infobar-title">{{ t('currentVersion') }}</div>
        <div class="fg-infobar-msg">{{ t('alphaNotice') }}</div>
      </div>
    </div>

    <!-- 版本信息卡片 -->
    <div class="fg-card version-card">
      <div class="version-grid">
        <div>
          <div class="version-label">{{ t('latestVersion') }}</div>
          <div class="version-number">{{ versionInfo.version }}</div>
        </div>
        <div>
          <div class="version-label">{{ t('releaseDate') }}</div>
          <div class="version-date">{{ versionInfo.releaseDate }}</div>
        </div>
        <div>
          <div class="version-label">{{ t('sha256') }}</div>
          <div class="sha-text">{{ versionInfo.sha256 }}</div>
        </div>
      </div>
    </div>

    <!-- 下载按钮组 -->
    <div class="download-actions">
      <a :href="DOWNLOAD_URL" class="fg-hyperlink" style="font-size: 16px; padding: 8px 16px;">
        {{ t('downloadZip') }}
      </a>
      <button class="fg-hyperlink" style="font-size: 16px; padding: 8px 16px;" @click="downloadSha">
        {{ t('downloadSha') }}
      </button>
    </div>

    <!-- 自绘 Expander（原生 details 标签实现） -->
    <details class="fg-card fg-expander">
      <summary>
        <span>{{ t('installGuide') }}</span>
        <span class="fg-expander-chevron">&#xE76C;</span>
      </summary>
      <div class="fg-expander-content">
        <h4>{{ t('installStep1') }}</h4>
        <p>{{ t('installStep1Desc') }}</p>

        <h4>{{ t('installStep2') }}</h4>
        <p>{{ t('installStep2Desc') }}</p>
        <p>
          <code>Import-Certificate -FilePath .\FluentGit.cer -CertStoreLocation Cert:\LocalMachine\Root</code>
        </p>

        <h4>{{ t('installStep3') }}</h4>
        <p>{{ t('installStep3Desc') }}</p>
        <p><code>Add-AppxPackage -Path .\FluentGit_0.0.1.0_x64.msix</code></p>

        <h4>{{ t('installStep4') }}</h4>
        <p>{{ t('installStep4Desc') }}</p>
      </div>
    </details>
  </section>
</template>

<style scoped>
.download { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
.version-card { padding: 24px; }
.version-grid { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 24px; align-items: start; }
@media (max-width: 700px) { .version-grid { grid-template-columns: 1fr; gap: 16px; } }
.version-label { font-size: 12px; color: var(--win-text-secondary, #555); margin-bottom: 4px; }
.version-number { font-size: 28px; font-weight: 700; color: var(--win-text-primary, #000); }
.version-date { font-size: 16px; color: var(--win-text-primary, #000); }
.sha-text { font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 12px; word-break: break-all; color: var(--win-text-secondary, #555); line-height: 1.5; }
.download-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }

/* 教程内部排版 */
.fg-expander-content h4 { margin: 12px 0 4px; font-size: 14px; font-weight: 600; color: var(--win-text-primary, #000); }
.fg-expander-content h4:first-child { margin-top: 0; }
.fg-expander-content p { margin: 0 0 4px; font-size: 13px; line-height: 1.6; color: var(--win-text-secondary, #555); }
.fg-expander-content code { font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 12px; padding: 2px 6px; border-radius: 4px; background: var(--win-subtle-fill-secondary, rgba(0, 0, 0, 0.04)); color: var(--win-text-primary, #000); word-break: break-all; }
</style>