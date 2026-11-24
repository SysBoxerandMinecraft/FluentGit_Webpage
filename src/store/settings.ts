import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'
export type Locale = 'zh-CN' | 'en-US' | 'zh-TW'

// 语言包（已移除 documentation）
const messages = {
  'zh-CN': {
    home: '主页',
    download: '下载',
    about: '关于',
    settings: '设置',
    toggleNav: '切换导航栏',
    heroSubtitle: '轻量、优雅、原生的 Windows Git 客户端',
    downloadNow: '立即下载',
    viewSource: '查看源码',
    feature1Title: '极致的现代 UI',
    feature1Desc: '全局 Mica 背景、统一的 Fluent 卡片式布局。',
    feature2Title: '多语言热切换',
    feature2Desc: '内置简中、繁中、英文，无需重启即可切换语言。',
    feature3Title: '精准文件管理',
    feature3Desc: '支持单文件级别的暂存与撤销更改。',
    downloadTitle: '下载 FluentGit',
    currentVersion: '当前版本',
    alphaNotice: 'v0.0.1 Alpha — 早期测试版本，功能和稳定性仍在完善中。',
    latestVersion: '最新版本',
    releaseDate: '发布日期',
    sha256: 'SHA256 校验码',
    downloadZip: '下载 ZIP 压缩包',
    downloadSha: '复制 SHA256 校验码',
    installGuide: '安装教程',
    installStep1: '1. 解压安装包',
    installStep1Desc: '将下载的 ZIP 文件解压，里面包含两个文件：FluentGit.cer 和 FluentGit_0.0.1.0_x64.msix。',
    installStep2: '2. 信任本地测试证书',
    installStep2Desc: '双击 FluentGit.cer 导入「受信任的根证书颁发机构」，或者以管理员身份在 PowerShell 中执行以下命令（证书指纹：2D97-AD94）：',
    installStep3: '3. 安装 MSIX',
    installStep3Desc: '双击解压出来的 FluentGit_0.0.1.0_x64.msix 文件，或在 PowerShell 中执行：',
    installStep4: '4. 环境变量（可选）',
    installStep4Desc: '如果你需要在终端直接使用 FluentGit，请将解压目录（例如 H:\\）添加到系统的 PATH 环境变量中。',
    aboutVersion: '版本',
    aboutTech: '技术栈',
    aboutDesign: '设计规范',
    aboutSource: '源码',
    settingsTitle: '设置',
    appearance: '外观',
    themeMode: '主题模式',
    themeLight: '浅色',
    themeDark: '深色',
    language: '语言',
    languageSelect: '界面语言',
    langZhCN: '简体中文',
    langZhTW: '繁体中文',
    langEnUS: 'English',
  },
  'en-US': {
    home: 'Home',
    download: 'Download',
    about: 'About',
    settings: 'Settings',
    toggleNav: 'Toggle navigation',
    heroSubtitle: 'Lightweight, elegant, native Windows Git client',
    downloadNow: 'Download Now',
    viewSource: 'View Source',
    feature1Title: 'Modern UI',
    feature1Desc: 'Global Mica background, unified Fluent card layout.',
    feature2Title: 'Hot-swap Languages',
    feature2Desc: 'Built-in Simplified Chinese, Traditional Chinese, English. No restart required.',
    feature3Title: 'Precise File Management',
    feature3Desc: 'Supports file-level staging and undo changes.',
    downloadTitle: 'Download FluentGit',
    currentVersion: 'Current Version',
    alphaNotice: 'v0.0.1 Alpha — Early testing version, features and stability are still being improved.',
    latestVersion: 'Latest Version',
    releaseDate: 'Release Date',
    sha256: 'SHA256 Checksum',
    downloadZip: 'Download ZIP Archive',
    downloadSha: 'Copy SHA256 Checksum',
    installGuide: 'Installation Guide',
    installStep1: '1. Extract ZIP Archive',
    installStep1Desc: 'Extract the downloaded ZIP file. It contains two files: FluentGit.cer and FluentGit_0.0.1.0_x64.msix.',
    installStep2: '2. Trust Local Test Certificate',
    installStep2Desc: 'Double-click FluentGit.cer to import it into "Trusted Root Certification Authorities", or run PowerShell as Admin (Thumbprint: 2D97-AD94):',
    installStep3: '3. Install MSIX',
    installStep3Desc: 'Double-click the extracted FluentGit_0.0.1.0_x64.msix file, or run in PowerShell:',
    installStep4: '4. Environment PATH (Optional)',
    installStep4Desc: 'If you need to use FluentGit from the terminal, add the extracted directory (e.g., H:\\) to your system PATH environment variable.',
    aboutVersion: 'Version',
    aboutTech: 'Tech Stack',
    aboutDesign: 'Design Spec',
    aboutSource: 'Source Code',
    settingsTitle: 'Settings',
    appearance: 'Appearance',
    themeMode: 'Theme Mode',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Language',
    languageSelect: 'Display Language',
    langZhCN: '简体中文',
    langZhTW: '繁體中文',
    langEnUS: 'English',
  },
  'zh-TW': {
    home: '首頁',
    download: '下載',
    about: '關於',
    settings: '設定',
    toggleNav: '切換導覽列',
    heroSubtitle: '輕量、優雅、原生的 Windows Git 客戶端',
    downloadNow: '立即下載',
    viewSource: '檢視原始碼',
    feature1Title: '極致的現代 UI',
    feature1Desc: '全域 Mica 背景、統一的 Fluent 卡片式版面。',
    feature2Title: '多語言熱切換',
    feature2Desc: '內建簡中、繁中、英文，無需重新啟動即可切換語言。',
    feature3Title: '精準檔案管理',
    feature3Desc: '支援單一檔案層級的暫存與復原變更。',
    downloadTitle: '下載 FluentGit',
    currentVersion: '目前版本',
    alphaNotice: 'v0.0.1 Alpha — 早期測試版本，功能與穩定性仍在完善中。',
    latestVersion: '最新版本',
    releaseDate: '發佈日期',
    sha256: 'SHA256 校驗碼',
    downloadZip: '下載 ZIP 壓縮包',
    downloadSha: '複製 SHA256 校驗碼',
    installGuide: '安裝教學',
    installStep1: '1. 解壓縮安裝包',
    installStep1Desc: '將下載的 ZIP 檔案解壓縮，裡面包含兩個檔案：FluentGit.cer 和 FluentGit_0.0.1.0_x64.msix。',
    installStep2: '2. 信任本機測試憑證',
    installStep2Desc: '按兩下 FluentGit.cer 匯入「受信任的根憑證授權單位」，或以系統管理員身分在 PowerShell 中執行以下命令（憑證指紋：2D97-AD94）：',
    installStep3: '3. 安裝 MSIX',
    installStep3Desc: '按兩下解壓縮出來的 FluentGit_0.0.1.0_x64.msix 檔案，或在 PowerShell 中執行：',
    installStep4: '4. 環境變數（選用）',
    installStep4Desc: '如果你需要在終端機直接使用 FluentGit，請將解壓縮目錄（例如 H:\\）加入系統的 PATH 環境變數中。',
    aboutVersion: '版本',
    aboutTech: '技術堆疊',
    aboutDesign: '設計規範',
    aboutSource: '原始碼',
    settingsTitle: '設定',
    appearance: '外觀',
    themeMode: '主題模式',
    themeLight: '淺色',
    themeDark: '深色',
    language: '語言',
    languageSelect: '介面語言',
    langZhCN: '简体中文',
    langZhTW: '繁體中文',
    langEnUS: 'English',
  }
}

export const theme = ref<ThemeMode>('light')
export const locale = ref<Locale>('zh-CN')

export function initSettings() {
  const storedTheme = localStorage.getItem('fluentgit-theme') as ThemeMode
  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme.value = storedTheme
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  applyTheme()

  const storedLocale = localStorage.getItem('fluentgit-locale') as Locale
  if (storedLocale && messages[storedLocale]) {
    locale.value = storedLocale
  } else {
    const navLang = navigator.language.toLowerCase()
    if (navLang.includes('tw') || navLang.includes('hk')) {
      locale.value = 'zh-TW'
    } else if (navLang.includes('us') || navLang.includes('gb')) {
      locale.value = 'en-US'
    } else {
      locale.value = 'zh-CN'
    }
  }
}

export function setTheme(next: ThemeMode) {
  theme.value = next
  localStorage.setItem('fluentgit-theme', next)
  applyTheme()
}

function applyTheme() {
  const el = document.documentElement
  el.classList.remove('theme-light', 'theme-dark')
  el.classList.add(`theme-${theme.value}`)
}

export function setLocale(next: Locale) {
  locale.value = next
  localStorage.setItem('fluentgit-locale', next)
}

export function t(key: keyof typeof messages['zh-CN']): string {
  return messages[locale.value][key] || messages['zh-CN'][key] || key
}