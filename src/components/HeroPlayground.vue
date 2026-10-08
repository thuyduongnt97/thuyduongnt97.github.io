<script setup>
import { computed, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { useAccent } from '../composables/useAccent'

const { accents, currentAccent, setAccent } = useAccent()

// Component state explorer: 'default' | 'loading' | 'error' | 'empty'
const currentState = ref('default')
const showCode = ref(false)
const selectedCodeTab = ref('vue') // 'vue' | 'tailwind'
const isCopied = ref(false)

// Interactive mock state in Default view
const isSsrActive = ref(true)
const pingCount = ref(7)
const isDeploying = ref(false)
const isDeployed = ref(false)
const isRetrying = ref(false)

// Simulated Skeleton Loading Timer
const skeletonCountdown = ref(2)
let skeletonTimer = null
const showLoadedToast = ref(false)

function triggerSkeletonState() {
  showCode.value = false
  currentState.value = 'loading'
  if (skeletonTimer) clearInterval(skeletonTimer)
  skeletonCountdown.value = 2
  skeletonTimer = setInterval(() => {
    skeletonCountdown.value--
    if (skeletonCountdown.value <= 0) {
      clearInterval(skeletonTimer)
      skeletonTimer = null
      finishSkeletonLoad()
    }
  }, 1000)
}

function finishSkeletonLoad() {
  if (skeletonTimer) {
    clearInterval(skeletonTimer)
    skeletonTimer = null
  }
  currentState.value = 'default'
  showLoadedToast.value = true
  setTimeout(() => {
    showLoadedToast.value = false
  }, 2800)
}

function selectState(state) {
  if (skeletonTimer) {
    clearInterval(skeletonTimer)
    skeletonTimer = null
  }
  showCode.value = false
  currentState.value = state
}

function handlePing() {
  pingCount.value++
}

function handleDeploy() {
  if (isDeploying.value) return
  isDeploying.value = true
  isDeployed.value = false
  setTimeout(() => {
    isDeploying.value = false
    isDeployed.value = true
    setTimeout(() => {
      isDeployed.value = false
    }, 2500)
  }, 1000)
}

function handleRetry() {
  isRetrying.value = true
  setTimeout(() => {
    isRetrying.value = false
    currentState.value = 'default'
  }, 900)
}

const vueSnippet = computed(() => {
  return `<script setup lang="ts">
import { ref } from 'vue'
import { useDesignSystem } from '@/composables'

const { accent } = useDesignSystem()
const status = ref('${currentState.value}')
<\/script>

<template>
  <article class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
    <header class="flex items-center justify-between">
      <Avatar src="/avatar.jpg" status="online" ring="${currentAccent.value}" />
      <Badge variant="soft" color="${currentAccent.value}">99 Core Web Vitals</Badge>
    </header>
    <h3 class="mt-4 text-base font-bold text-slate-900">Thuỳ Dương</h3>
    <p class="text-xs text-slate-500">Senior Frontend / UI-UX Engineer</p>
    <div class="mt-5 flex gap-2">
      <Button variant="primary" @click="handleAction">Deploy</Button>
    </div>
  </article>
</template>`
})

const tailwindSnippet = computed(() => {
  return `// tailwind.config.js - Senior Design System Token Map
export default {
  theme: {
    extend: {
      colors: {
        accent: {
          50:  'var(--interactive-soft)',
          500: 'var(--interactive-accent)',
          DEFAULT: 'var(--accent)',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'multilayer': '0 1px 2px 0 rgb(15 23 42 / .05), 0 10px 15px -3px rgb(15 23 42 / .06)',
      },
    },
  },
}`
})

function copyCode() {
  const text = selectedCodeTab.value === 'vue' ? vueSnippet.value : tailwindSnippet.value
  navigator.clipboard?.writeText(text).then(() => {
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  })
}
</script>

<template>
  <div class="playground-window card" role="region" aria-label="Interactive UI Component Playground">
    <!-- Window Bar -->
    <header class="playground-bar">
      <div class="playground-dots" aria-hidden="true">
        <span class="dot dot--red" />
        <span class="dot dot--yellow" />
        <span class="dot dot--green" />
      </div>

      <div class="playground-meta">
        <span class="playground-tag">DesignSystem / UserCard.vue</span>
        <span class="playground-live-badge">
          <span class="pulse-dot" /> Live Sandbox
        </span>
      </div>

      <div class="playground-actions">
        <button
          type="button"
          class="playground-code-toggle"
          :class="{ 'is-active': showCode }"
          @click="showCode = !showCode"
          :aria-label="showCode ? 'Xem bản preview tương tác' : 'Xem code snippet'"
        >
          <BaseIcon :name="showCode ? 'play' : 'code'" />
          <span>{{ showCode ? 'Preview' : 'Code' }}</span>
        </button>
      </div>
    </header>

    <!-- Top Controls: Theme Swatches + State Tabs -->
    <div class="playground-controls">
      <!-- Accent Switcher -->
      <div class="control-group control-group--accents" role="radiogroup" aria-label="Live Accent Switcher">
        <span class="control-label">ACCENT:</span>
        <div class="swatches">
          <button
            v-for="acc in accents"
            :key="acc.id"
            type="button"
            class="swatch-btn"
            :class="{ 'is-selected': currentAccent === acc.id }"
            :style="{ '--swatch-color': acc.hex }"
            :aria-label="`Chuyển màu accent sang ${acc.label}`"
            :aria-checked="currentAccent === acc.id"
            role="radio"
            @click="setAccent(acc.id)"
          >
            <span class="swatch-circle" />
            <span v-if="currentAccent === acc.id" class="swatch-check">✓</span>
          </button>
        </div>
      </div>

      <!-- State Tabs -->
      <div class="control-group control-group--states" role="tablist" aria-label="Component State Explorer">
        <span class="control-label">STATE:</span>
        <div class="state-tabs">
          <button
            type="button"
            class="state-tab-btn"
            :class="{ 'is-active': currentState === 'default' && !showCode }"
            role="tab"
            :aria-selected="currentState === 'default' && !showCode"
            @click="selectState('default')"
          >
            Default
          </button>
          <button
            type="button"
            class="state-tab-btn"
            :class="{ 'is-active': currentState === 'loading' && !showCode }"
            role="tab"
            :aria-selected="currentState === 'loading' && !showCode"
            @click="triggerSkeletonState"
          >
            Loading (Skeleton)
          </button>
          <button
            type="button"
            class="state-tab-btn"
            :class="{ 'is-active': currentState === 'error' && !showCode }"
            role="tab"
            :aria-selected="currentState === 'error' && !showCode"
            @click="selectState('error')"
          >
            Error
          </button>
          <button
            type="button"
            class="state-tab-btn"
            :class="{ 'is-active': currentState === 'empty' && !showCode }"
            role="tab"
            :aria-selected="currentState === 'empty' && !showCode"
            @click="selectState('empty')"
          >
            Empty
          </button>
        </div>
      </div>
    </div>

    <!-- Playground Stage Area -->
    <div class="playground-stage">
      <!-- CODE SNIPPET VIEW -->
      <div v-if="showCode" class="code-viewer">
        <div class="code-viewer__header">
          <div class="code-viewer__tabs">
            <button
              type="button"
              class="code-tab"
              :class="{ 'is-active': selectedCodeTab === 'vue' }"
              @click="selectedCodeTab = 'vue'"
            >
              UserCard.vue
            </button>
            <button
              type="button"
              class="code-tab"
              :class="{ 'is-active': selectedCodeTab === 'tailwind' }"
              @click="selectedCodeTab = 'tailwind'"
            >
              tailwind.config.js
            </button>
          </div>
          <button type="button" class="copy-code-btn" @click="copyCode" :aria-label="isCopied ? 'Đã sao chép' : 'Sao chép mã'">
            <BaseIcon :name="isCopied ? 'check' : 'copy'" />
            <span>{{ isCopied ? 'Copied!' : 'Copy Code' }}</span>
          </button>
        </div>
        <pre class="code-viewer__content"><code>{{ selectedCodeTab === 'vue' ? vueSnippet : tailwindSnippet }}</code></pre>
      </div>

      <!-- PREVIEW: DEFAULT STATE -->
      <div v-else-if="currentState === 'default'" class="interactive-card">
        <div v-if="showLoadedToast" class="loaded-toast">
          <span class="loaded-toast-check">✓</span>
          <span>Dữ liệu đã nạp thành công từ API • CLS: 0 (Không giật layout)</span>
        </div>

        <div class="interactive-card__head">
          <div class="user-avatar-wrap">
            <div class="user-avatar">
              <span>TD</span>
            </div>
            <span class="user-status-dot" aria-hidden="true" />
          </div>
          <div class="user-info">
            <div class="user-name-row">
              <h4 class="user-name">Thuỳ Dương</h4>
              <span class="user-badge-level">Senior</span>
            </div>
            <p class="user-role">Senior Frontend / UI-UX Engineer</p>
          </div>
          <div class="perf-chip">
            <BaseIcon name="sparkle" />
            <span>99 Score</span>
          </div>
        </div>

        <div class="interactive-card__tags">
          <span class="tech-pill">Vue 3</span>
          <span class="tech-pill">Design System</span>
          <span class="tech-pill">State Mesh</span>
          <span class="tech-pill">Tailwind</span>
        </div>

        <div class="interactive-card__metrics">
          <div class="metric-box">
            <span class="metric-val">60 FPS</span>
            <span class="metric-sub">Frame Budget</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">100%</span>
            <span class="metric-sub">Suite Passed</span>
          </div>
          <div class="metric-box">
            <span class="metric-val">{{ pingCount }}</span>
            <span class="metric-sub">Active Pings</span>
          </div>
        </div>

        <div class="interactive-card__footer">
          <div class="toggle-control">
            <button
              type="button"
              class="switch-btn"
              :class="{ 'is-on': isSsrActive }"
              @click="isSsrActive = !isSsrActive"
              aria-label="Bật tắt chế độ SSR Hydration"
            >
              <span class="switch-handle" />
            </button>
            <span class="switch-label">SSR Hydrated</span>
          </div>

          <div class="action-buttons">
            <button type="button" class="btn-micro" @click="handlePing">
              + Ping State
            </button>
            <button
              type="button"
              class="btn-micro btn-micro--accent"
              :disabled="isDeploying"
              @click="handleDeploy"
            >
              <template v-if="isDeploying">
                <BaseIcon name="refresh" class="spinning" /> Deploying...
              </template>
              <template v-else-if="isDeployed">
                ✓ Deployed!
              </template>
              <template v-else>
                Deploy Build
              </template>
            </button>
          </div>
        </div>
      </div>

      <!-- PREVIEW: LOADING SKELETON STATE -->
      <div v-else-if="currentState === 'loading'" class="interactive-card skeleton-card">
        <!-- Banner giải thích trực quan về Skeleton Loading -->
        <div class="skeleton-banner">
          <div class="skeleton-banner__info">
            <span class="skeleton-live-pulse" />
            <div class="skeleton-banner__texts">
              <strong class="skeleton-banner__title">Mô phỏng Skeleton Loading (Màn hình chờ tải dữ liệu)</strong>
              <p class="skeleton-banner__sub">Khung xương chờ API nạp data (tránh giật layout). Tự động nạp sau <strong>{{ skeletonCountdown }}s</strong>...</p>
            </div>
          </div>
          <button type="button" class="btn-skeleton-skip" @click="finishSkeletonLoad">
            Nạp dữ liệu ngay ↵
          </button>
        </div>

        <div class="interactive-card__head">
          <div class="skeleton-avatar skeleton-shimmer" title="Khung sườn chờ: Avatar" />
          <div class="user-info skeleton-info">
            <div class="skeleton-line skeleton-line--title skeleton-shimmer" title="Khung sườn chờ: Tên" />
            <div class="skeleton-line skeleton-line--subtitle skeleton-shimmer" title="Khung sườn chờ: Chức danh" />
          </div>
          <div class="skeleton-badge skeleton-shimmer" title="Khung sườn chờ: Badge" />
        </div>

        <div class="interactive-card__tags">
          <div class="skeleton-pill skeleton-shimmer" />
          <div class="skeleton-pill skeleton-shimmer" />
          <div class="skeleton-pill skeleton-shimmer" />
        </div>

        <div class="interactive-card__metrics">
          <div class="metric-box skeleton-box skeleton-shimmer" />
          <div class="metric-box skeleton-box skeleton-shimmer" />
          <div class="metric-box skeleton-box skeleton-shimmer" />
        </div>

        <div class="interactive-card__footer">
          <div class="skeleton-line skeleton-line--sm skeleton-shimmer" />
          <div class="skeleton-btn skeleton-shimmer" />
        </div>
      </div>

      <!-- PREVIEW: ERROR STATE -->
      <div v-else-if="currentState === 'error'" class="interactive-card error-card">
        <div class="error-icon-box">
          <BaseIcon name="alert" />
        </div>
        <h4 class="error-title">NetworkException: 504 Timeout</h4>
        <p class="error-desc">State hydration fallback triggered. Offline cache rendered seamlessly without UI disruption.</p>
        <button type="button" class="btn-retry" :disabled="isRetrying" @click="handleRetry">
          <BaseIcon name="refresh" :class="{ spinning: isRetrying }" />
          <span>{{ isRetrying ? 'Re-hydrating...' : 'Retry Connection' }}</span>
        </button>
      </div>

      <!-- PREVIEW: EMPTY STATE -->
      <div v-else-if="currentState === 'empty'" class="interactive-card empty-card">
        <div class="empty-icon-box">
          <BaseIcon name="inbox" />
        </div>
        <h4 class="empty-title">Zero Regressions Detected</h4>
        <p class="empty-desc">All components strictly adhere to Design System contracts with full type safety.</p>
        <button type="button" class="btn-reset" @click="currentState = 'default'">
          <span>Reset Playground</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-window {
  display: flex;
  flex-direction: column;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgb(15 23 42 / 0.04), 0 16px 24px -4px rgb(15 23 42 / 0.08), 0 0 0 1px rgb(226 232 240 / 0.6);
  overflow: hidden;
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
}

[data-theme="dark"] .playground-window {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 16px 24px -4px rgb(0 0 0 / 0.4);
}

.playground-window:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: 0 10px 20px -3px rgb(15 23 42 / 0.08), 0 24px 32px -4px rgb(15 23 42 / 0.1);
}

/* Window Bar */
.playground-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-soft);
}

.playground-dots {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  flex-shrink: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot--red { background: #ef4444; }
.dot--yellow { background: #f59e0b; }
.dot--green { background: #10b981; }

.playground-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.playground-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playground-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  font-size: 0.68rem;
  font-weight: 600;
  white-space: nowrap;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-ring 2s infinite ease-out;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.playground-code-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-solid);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 150ms ease;
}

.playground-code-toggle:hover,
.playground-code-toggle.is-active {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
}

.playground-code-toggle .icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* Controls Bar */
.playground-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface-solid);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-faint);
  letter-spacing: 0.05em;
}

.swatches {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.swatch-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  padding: 0;
  border: 2px solid transparent;
  transition: transform 150ms ease, border-color 150ms ease;
}

.swatch-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--swatch-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.swatch-btn:hover {
  transform: scale(1.15);
}

.swatch-btn.is-selected {
  border-color: var(--swatch-color);
}

.swatch-check {
  position: absolute;
  font-size: 0.65rem;
  color: #fff;
  font-weight: 800;
}

.state-tabs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  background: var(--bg-soft);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.state-tab-btn {
  padding: 0.22rem 0.55rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 120ms ease;
}

.state-tab-btn:hover {
  color: var(--text);
}

.state-tab-btn.is-active {
  background: var(--surface-solid);
  color: var(--interactive-accent);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

/* Stage Canvas */
.playground-stage {
  padding: 1.25rem;
  background: color-mix(in srgb, var(--bg-soft) 40%, transparent);
  min-height: 260px;
  display: flex;
  align-items: stretch;
}

/* Interactive Card Inside Stage */
.interactive-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: 16px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.interactive-card__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  border: 1px solid var(--interactive-border);
}

.user-status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid var(--surface-solid);
}

.user-info {
  flex: 1 1 auto;
  min-width: 0;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.user-name {
  color: #0f172a;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.3;
}

[data-theme="dark"] .user-name {
  color: var(--text);
}

.user-badge-level {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.user-role {
  color: #64748b;
  font-size: 0.78rem;
  margin-top: 0.15rem;
}

[data-theme="dark"] .user-role {
  color: var(--text-muted);
}

.perf-chip {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
  font-size: 0.7rem;
  font-weight: 600;
  flex-shrink: 0;
}

.perf-chip .icon {
  width: 0.8rem;
  height: 0.8rem;
}

[data-theme="dark"] .perf-chip {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.interactive-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.9rem;
}

.tech-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.interactive-card__metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 0.9rem;
}

.metric-box {
  display: flex;
  flex-direction: column;
  padding: 0.55rem;
  border-radius: 10px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  text-align: center;
}

.metric-val {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}

.metric-sub {
  font-size: 0.65rem;
  color: var(--text-faint);
  margin-top: 0.1rem;
}

.interactive-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
}

.toggle-control {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.switch-btn {
  width: 32px;
  height: 18px;
  border-radius: 999px;
  background: #cbd5e1;
  padding: 2px;
  transition: background-color 200ms ease;
  display: flex;
  align-items: center;
}

.switch-btn.is-on {
  background: var(--interactive-accent);
}

.switch-handle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 200ms ease;
}

.switch-btn.is-on .switch-handle {
  transform: translateX(14px);
}

.switch-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-micro {
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  transition: all 150ms ease;
}

.btn-micro:hover {
  background: var(--border);
}

.btn-micro--accent {
  background: var(--action);
  color: #fff;
  border-color: transparent;
}

.btn-micro--accent:hover {
  filter: brightness(0.92);
}

.spinning {
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loaded Toast Notification */
.loaded-toast {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.85rem;
  animation: toast-slide 200ms ease;
}

[data-theme="dark"] .loaded-toast {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.loaded-toast-check {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981;
  color: #fff;
  font-size: 0.65rem;
  flex-shrink: 0;
}

@keyframes toast-slide {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Skeleton Explainer Banner */
.skeleton-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  margin-bottom: 0.85rem;
}

[data-theme="dark"] .skeleton-banner {
  background: rgba(30, 41, 59, 0.6);
  border-color: var(--border);
}

.skeleton-banner__info {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.skeleton-live-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
  animation: pulse-blue 1.6s infinite;
}

@keyframes pulse-blue {
  0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 5px rgba(59, 130, 246, 0); }
  100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

.skeleton-banner__title {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
}

[data-theme="dark"] .skeleton-banner__title {
  color: var(--text);
}

.skeleton-banner__sub {
  font-size: 0.7rem;
  color: #64748b;
  line-height: 1.3;
  margin-top: 0.1rem;
}

.btn-skeleton-skip {
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 120ms ease;
  flex-shrink: 0;
}

.btn-skeleton-skip:hover {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
}

/* Skeleton Loading State */
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(226, 232, 240, 0.6) 25%,
    rgba(241, 245, 249, 0.9) 50%,
    rgba(226, 232, 240, 0.6) 75%
  );
  background-size: 200% 100%;
  animation: shimmer-anim 1.5s infinite;
}

[data-theme="dark"] .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(51, 65, 85, 0.6) 25%,
    rgba(71, 85, 105, 0.9) 50%,
    rgba(51, 65, 85, 0.6) 75%
  );
  background-size: 200% 100%;
}

@keyframes shimmer-anim {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
}

.skeleton-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
}

.skeleton-line--title { width: 110px; height: 14px; }
.skeleton-line--subtitle { width: 160px; height: 10px; }
.skeleton-line--sm { width: 80px; height: 10px; }

.skeleton-badge {
  width: 60px;
  height: 20px;
  border-radius: 999px;
  margin-left: auto;
}

.skeleton-pill {
  width: 64px;
  height: 22px;
  border-radius: 6px;
}

.skeleton-box {
  height: 48px;
  border-radius: 10px;
}

.skeleton-btn {
  width: 90px;
  height: 26px;
  border-radius: 8px;
}

/* Error State */
.error-card {
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.75rem 1rem;
}

.error-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fef2f2;
  color: #ef4444;
  margin-bottom: 0.65rem;
}

.error-icon-box .icon {
  width: 1.3rem;
  height: 1.3rem;
}

[data-theme="dark"] .error-icon-box {
  background: rgba(239, 68, 68, 0.15);
}

.error-title {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 700;
  color: #b91c1c;
}

[data-theme="dark"] .error-title {
  color: #f87171;
}

.error-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  max-width: 38ch;
  margin-top: 0.35rem;
  line-height: 1.5;
}

.btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  background: #ef4444;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  transition: background-color 150ms ease;
}

.btn-retry:hover {
  background: #dc2626;
}

.btn-retry .icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* Empty State */
.empty-card {
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.75rem 1rem;
}

.empty-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--bg-soft);
  color: var(--text-muted);
  margin-bottom: 0.65rem;
}

.empty-icon-box .icon {
  width: 1.3rem;
  height: 1.3rem;
}

.empty-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
}

.empty-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  max-width: 36ch;
  margin-top: 0.35rem;
  line-height: 1.5;
}

.btn-reset {
  margin-top: 1rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-solid);
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.btn-reset:hover {
  background: var(--bg-soft);
}

/* Code Viewer */
.code-viewer {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  background: #0f172a;
  color: #f1f5f9;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-viewer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.code-viewer__tabs {
  display: flex;
  gap: 0.25rem;
}

.code-tab {
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #94a3b8;
  transition: all 120ms ease;
}

.code-tab:hover {
  color: #f1f5f9;
}

.code-tab.is-active {
  background: rgba(255, 255, 255, 0.1);
  color: #38bdf8;
  font-weight: 600;
}

.copy-code-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 0.7rem;
  font-weight: 500;
  transition: all 120ms ease;
}

.copy-code-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.copy-code-btn .icon {
  width: 0.85rem;
  height: 0.85rem;
}

.code-viewer__content {
  padding: 0.85rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  line-height: 1.6;
  overflow-x: auto;
  color: #e2e8f0;
  max-height: 240px;
}

@media (max-width: 640px) {
  .playground-controls {
    flex-direction: column;
    align-items: flex-start;
  }
  .interactive-card__metrics {
    grid-template-columns: 1fr;
  }
  .interactive-card__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
