<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()

const tabs = [
  {
    id: 'fullstack',
    label: 'Shortlink Data & Admin',
    fileName: 'shortlink-data-contract.ts',
    badge: 'Redirect 25–60ms',
  },
  {
    id: 'webgis',
    label: 'WebGIS / 60FPS',
    fileName: 'webgis-clustering-demo.vue',
    badge: '-91% GeoJSON · 60FPS',
  },
]

const activeTab = ref('fullstack')
const tabButtons = ref([])
const currentTab = computed(() => tabs.find(t => t.id === activeTab.value) || tabs[0])

const specs = [
  { label: '• Backend & Data Layer:', value: 'Laravel • MySQL • Redis', color: 'amber' },
  { label: '• Self-Service A/B Platform:', value: 'Vue 3 • 40 Sites • 309 Boxes', color: 'emerald' },
  { label: '• WebGIS & Spatial Data:', value: 'QGIS (-91%) • Leaflet 60FPS', color: 'cyan' },
  { label: '• AI Workflow:', value: 'Codex • Antigravity • Gemini', color: 'purple' },
]

// --- TAB 1: Luồng Dữ liệu & Quản trị Shortlink (đúng phạm vi phụ trách) ---
const steps = computed(() => [
  {
    label: 'Vue Admin & VirusTotal',
    detail: pick('Tạo link/QR & quét URL độc hại trước khi bật', 'Create link/QR & scan URL before activation'),
    icon: '🛡',
  },
  {
    label: 'MySQL ⇄ Redis Key Sync',
    detail: pick('Lưu lớp ánh xạ DB & đồng bộ key-value Redis', 'Store indirection layer & sync Redis keys'),
    icon: '⚡',
  },
  {
    label: 'Redirect Service (25–60ms)',
    detail: pick('Đội hạ tầng đọc trực tiếp từ key Redis', 'Infra team reads directly from Redis keys'),
    icon: '↗',
  },
  {
    label: 'Log REST API → Analytics UI',
    detail: pick('Vẽ biểu đồ lưu lượng, Top referrers & locations', 'Charts for traffic, top referrers & locations'),
    icon: '📊',
  },
])

const activeStep = ref(-1)
const isRunning = ref(false)
let flowTimer = null

function stopFlow() {
  clearInterval(flowTimer)
  flowTimer = null
  isRunning.value = false
}

function replayFlow() {
  stopFlow()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    activeStep.value = steps.value.length - 1
    return
  }
  activeStep.value = 0
  isRunning.value = true
  flowTimer = setInterval(() => {
    if (activeStep.value < steps.value.length - 1) {
      activeStep.value += 1
    } else {
      stopFlow()
    }
  }, 650)
}

// --- TAB 2: WebGIS Interactive Canvas Logic ---
const gisCanvasRef = ref(null)
let gisCtx = null
let gisAnimId = null
let gisResizeObserver = null
let gisNodes = []
let canvasW = 0
let canvasH = 0
const pointer = { x: -1000, y: -1000, active: false }
const CLUSTER_RADIUS = 55
const clusterCount = ref(0)

function resizeGisCanvas() {
  const canvas = gisCanvasRef.value
  if (!canvas || !gisCtx) return
  const parent = canvas.parentElement
  if (!parent) return
  const rect = parent.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return
  canvasW = rect.width
  canvasH = rect.height
  const scale = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(canvasW * scale)
  canvas.height = Math.round(canvasH * scale)
  gisCtx.setTransform(scale, 0, 0, scale, 0, 0)
}

function initGisNodes() {
  gisNodes = Array.from({ length: 45 }, () => ({
    x: Math.random() * (canvasW || 380),
    y: Math.random() * (canvasH || 240),
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 2 + 1.6,
  }))
}

function drawGisFrame() {
  if (!gisCtx || !canvasW || !canvasH) return
  gisCtx.clearRect(0, 0, canvasW, canvasH)

  gisCtx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light'
    ? 'rgba(203, 213, 225, 0.5)'
    : 'rgba(30, 41, 59, 0.45)'
  gisCtx.lineWidth = 0.5
  for (let x = 0; x < canvasW; x += 28) {
    gisCtx.beginPath()
    gisCtx.moveTo(x, 0)
    gisCtx.lineTo(x, canvasH)
    gisCtx.stroke()
  }
  for (let y = 0; y < canvasH; y += 28) {
    gisCtx.beginPath()
    gisCtx.moveTo(0, y)
    gisCtx.lineTo(canvasW, y)
    gisCtx.stroke()
  }

  let currentCluster = 0
  for (let i = 0; i < gisNodes.length; i++) {
    const node = gisNodes[i]
    node.x += node.vx
    node.y += node.vy

    if (node.x < 0 || node.x > canvasW) node.vx *= -1
    if (node.y < 0 || node.y > canvasH) node.vy *= -1

    let inCluster = false
    if (pointer.active) {
      const dx = node.x - pointer.x
      const dy = node.y - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist < CLUSTER_RADIUS) {
        inCluster = true
        currentCluster++
      }
    }

    for (let j = i + 1; j < gisNodes.length; j++) {
      const other = gisNodes[j]
      const dist = Math.hypot(node.x - other.x, node.y - other.y)
      if (dist < 48) {
        gisCtx.beginPath()
        gisCtx.strokeStyle = `rgba(6, 182, 212, ${0.28 * (1 - dist / 48)})`
        gisCtx.lineWidth = 0.75
        gisCtx.moveTo(node.x, node.y)
        gisCtx.lineTo(other.x, other.y)
        gisCtx.stroke()
      }
    }

    gisCtx.beginPath()
    gisCtx.arc(node.x, node.y, inCluster ? node.r + 2 : node.r, 0, Math.PI * 2)
    gisCtx.fillStyle = inCluster ? '#fbbf24' : '#06b6d4'
    gisCtx.shadowColor = inCluster ? '#fbbf24' : '#06b6d4'
    gisCtx.shadowBlur = inCluster ? 10 : 5
    gisCtx.fill()
    gisCtx.shadowBlur = 0
  }

  clusterCount.value = currentCluster

  if (pointer.active) {
    gisCtx.beginPath()
    gisCtx.arc(pointer.x, pointer.y, CLUSTER_RADIUS, 0, Math.PI * 2)
    gisCtx.strokeStyle = 'rgba(245, 158, 11, 0.65)'
    gisCtx.lineWidth = 1.4
    gisCtx.setLineDash([4, 4])
    gisCtx.stroke()
    gisCtx.setLineDash([])

    gisCtx.beginPath()
    gisCtx.arc(pointer.x, pointer.y, 3.5, 0, Math.PI * 2)
    gisCtx.fillStyle = '#fbbf24'
    gisCtx.fill()
  }

  gisAnimId = requestAnimationFrame(drawGisFrame)
}

function handlePointerMove(e) {
  const canvas = gisCanvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  pointer.x = e.clientX - rect.left
  pointer.y = e.clientY - rect.top
  pointer.active = true
}

function handlePointerLeave() {
  pointer.active = false
  pointer.x = -1000
  pointer.y = -1000
}

function selectTab(tabId) {
  stopFlow()
  activeTab.value = tabId
  if (tabId === 'webgis') {
    nextTick(() => {
      resizeGisCanvas()
      if (gisNodes.length === 0 || canvasW === 0) {
        initGisNodes()
      }
      if (!gisAnimId) {
        gisAnimId = requestAnimationFrame(drawGisFrame)
      }
    })
  }
}

async function handleTabKey(event, index) {
  let target
  if (event.key === 'ArrowRight') target = (index + 1) % tabs.length
  if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length
  if (event.key === 'Home') target = 0
  if (event.key === 'End') target = tabs.length - 1
  if (target === undefined) return
  event.preventDefault()
  selectTab(tabs[target].id)
  await nextTick()
  tabButtons.value[target]?.focus()
}

onMounted(() => {
  if (gisCanvasRef.value) {
    gisCtx = gisCanvasRef.value.getContext('2d')
    resizeGisCanvas()
    initGisNodes()
    if ('ResizeObserver' in window) {
      gisResizeObserver = new ResizeObserver(() => {
        resizeGisCanvas()
      })
      if (gisCanvasRef.value.parentElement) {
        gisResizeObserver.observe(gisCanvasRef.value.parentElement)
      }
    }
  }
})

onBeforeUnmount(() => {
  stopFlow()
  if (gisAnimId) cancelAnimationFrame(gisAnimId)
  if (gisResizeObserver) gisResizeObserver.disconnect()
})
</script>

<template>
  <div class="hero-showcase-card" :aria-label="pick('Khung kỹ thuật tương tác Fullstack & WebGIS', 'Interactive Fullstack & WebGIS Architecture Showcase')">
    <div class="card-chrome">
      <div class="window-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span class="card-filename" :title="currentTab.fileName">{{ currentTab.fileName }}</span>
      <span
        class="card-mode-badge"
        :class="activeTab === 'fullstack' ? 'card-mode-badge--amber' : 'card-mode-badge--cyan'"
      >
        {{ currentTab.badge }}
      </span>
    </div>

    <div class="card-tabs" role="tablist" :aria-label="pick('Chọn mô phỏng kỹ thuật', 'Select technical simulation')">
      <button
        v-for="(tab, index) in tabs"
        :id="'showcase-tab-' + tab.id"
        :key="tab.id"
        :ref="el => tabButtons[index] = el"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="'showcase-panel-' + tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        :class="[
          activeTab === tab.id
            ? (tab.id === 'fullstack' ? 'tab-btn--active-amber' : 'tab-btn--active-cyan')
            : ''
        ]"
        @click="selectTab(tab.id)"
        @keydown="handleTabKey($event, index)"
      >
        <span class="tab-dot" aria-hidden="true" />
        {{ tab.label }}
      </button>
    </div>

    <!-- TAB 1: Luồng Dữ liệu & Quản trị Shortlink -->
    <div
      v-show="activeTab === 'fullstack'"
      id="showcase-panel-fullstack"
      class="card-panel panel-architecture"
      role="tabpanel"
      aria-labelledby="showcase-tab-fullstack"
      tabindex="0"
    >
      <div class="arch-header">
        <span class="arch-caption">{{ pick('LUỒNG DỮ LIỆU & QUẢN TRỊ SHORTLINK', 'SHORTLINK DATA CONTRACT & ADMIN') }}</span>
        <button
          type="button"
          class="replay-btn"
          :disabled="isRunning"
          @click="replayFlow"
        >
          <span aria-hidden="true">↻</span>
          {{ isRunning ? pick('Đang chạy', 'Running') : pick('Chạy luồng', 'Simulate') }}
        </button>
      </div>

      <ol class="flow-track" :aria-label="pick('Sơ đồ luồng dữ liệu và quản trị Shortlink', 'Shortlink data model and admin flow')">
        <li
          v-for="(step, index) in steps"
          :key="step.label"
          class="flow-step"
          :class="{
            'flow-step--active': activeStep === index,
            'flow-step--visited': activeStep > index
          }"
        >
          <div class="flow-node">
            <span class="flow-icon">{{ step.icon }}</span>
            <div class="flow-meta">
              <strong class="flow-name">{{ step.label }}</strong>
              <span class="flow-detail">{{ step.detail }}</span>
            </div>
            <span class="flow-number">0{{ index + 1 }}</span>
          </div>
          <span v-if="index < steps.length - 1" class="flow-connector" aria-hidden="true">↓</span>
        </li>
      </ol>

      <div class="arch-metrics-bar">
        <span class="pill-metric pill-metric--amber">⚡ {{ pick('Đỉnh ~240K clicks/ngày', 'Peak ~240K clicks/day') }}</span>
        <span class="pill-metric pill-metric--cyan">🛡 2M+ Clicks · VirusTotal</span>
      </div>
    </div>

    <!-- TAB 2: WebGIS / 60FPS -->
    <div
      v-show="activeTab === 'webgis'"
      id="showcase-panel-webgis"
      class="card-panel panel-webgis"
      role="tabpanel"
      aria-labelledby="showcase-tab-webgis"
      tabindex="0"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
    >
      <canvas
        ref="gisCanvasRef"
        class="webgis-canvas"
        role="img"
        :aria-label="pick('Bản đồ số tương tác gom cụm 45 điểm tọa độ với hiệu ứng 60FPS', 'Interactive WebGIS clustering 45 spatial nodes at 60FPS')"
      />

      <div class="canvas-tags-overlay pointer-events-none">
        <span class="canvas-tag canvas-tag--cyan">QGIS Simplification (-91%)</span>
        <span class="canvas-tag canvas-tag--amber">Leaflet Canvas + Cluster</span>
      </div>

      <div class="canvas-status-bar pointer-events-none">
        <span class="status-hint">
          <template v-if="pointer.active && clusterCount > 0">
            <strong class="text-amber-400">🎯 {{ clusterCount }} {{ pick('điểm trong cụm', 'nodes clustered') }}</strong>
          </template>
          <template v-else>
            {{ pick('Rê chuột kiểm tra gom cụm', 'Hover to test marker clustering') }}
          </template>
        </span>
        <span class="status-fps">
          <span class="fps-pulse" />
          ● 60 FPS
        </span>
      </div>
    </div>

    <div class="card-specs-bar" :aria-label="pick('Thông số kỹ thuật tóm tắt', 'Technical stack summary')">
      <div v-for="spec in specs" :key="spec.label" class="spec-row">
        <span class="spec-label">{{ spec.label }}</span>
        <strong
          class="spec-value"
          :class="{
            'text-amber-400': spec.color === 'amber',
            'text-emerald-400': spec.color === 'emerald',
            'text-cyan-400': spec.color === 'cyan',
            'text-purple-400': spec.color === 'purple'
          }"
        >
          {{ spec.value }}
        </strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-showcase-card {
  max-width: 460px;
  width: 100%;
  margin-left: auto;
  border-radius: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 16px 48px -12px rgba(0, 0, 0, 0.75), 0 0 32px -16px rgba(6, 182, 212, 0.25);
  height: auto;
  min-height: fit-content;
  overflow: hidden;
  font-family: 'JetBrains Mono', monospace;
  transition: border-color 200ms;
}

/* Light theme: softer shadow, visible border */
[data-theme="light"] .hero-showcase-card {
  border-color: rgba(30, 41, 59, 0.2);
  box-shadow: 0 16px 48px -12px rgba(15, 23, 42, 0.25), 0 4px 16px -4px rgba(15, 23, 42, 0.1);
}

.hero-showcase-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
}

.card-chrome {
  display: flex;
  height: 38px;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #0b1120;
  border-top-left-radius: 1.15rem;
  border-top-right-radius: 1.15rem;
}

.window-dots {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.window-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f43f5e;
}

.window-dots span:nth-child(2) { background: #f59e0b; }
.window-dots span:nth-child(3) { background: #10b981; }

.card-filename {
  flex: 1;
  font-size: 0.8125rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-mode-badge {
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
  padding: 2px 8px;
  letter-spacing: 0.01em;
}

.card-mode-badge--cyan {
  border: 1px solid rgba(6, 182, 212, 0.35);
  background: rgba(6, 182, 212, 0.15);
  color: #38bdf8;
}

.card-mode-badge--amber {
  border: 1px solid rgba(245, 158, 11, 0.35);
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.card-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #080d1a;
}

.card-tabs button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-bottom: 2px solid transparent;
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 180ms ease;
}

.card-tabs button:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.03);
}

.tab-btn--active-amber {
  border-bottom-color: #f59e0b !important;
  background: rgba(245, 158, 11, 0.08) !important;
  color: #fbbf24 !important;
}

.tab-btn--active-cyan {
  border-bottom-color: #06b6d4 !important;
  background: rgba(6, 182, 212, 0.08) !important;
  color: #38bdf8 !important;
}

.tab-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.card-panel {
  position: relative;
  height: auto;
  min-height: fit-content;
  overflow: hidden;
}

.panel-architecture {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  padding: 12px 16px 18px;
  background: radial-gradient(ellipse at 85% 15%, rgba(245, 158, 11, 0.06), transparent 70%), #070c17;
  height: auto;
  min-height: fit-content;
  overflow: visible;
}

.arch-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #94a3b8;
  letter-spacing: 0.03em;
  margin-bottom: 2px;
}

.replay-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #334155;
  border-radius: 5px;
  padding: 2.5px 8.5px;
  background: rgba(15, 23, 42, 0.8);
  color: #cbd5e1;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 180ms ease;
}

.replay-btn:hover {
  border-color: #f59e0b;
  color: #fbbf24;
}

.replay-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.flow-track {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.flow-node {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 5.5px 10px;
  background: rgba(11, 18, 33, 0.95);
  transition: all 180ms ease;
}

.flow-icon {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #38bdf8;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.flow-step:nth-child(2) .flow-icon { color: #fbbf24; }
.flow-step:nth-child(3) .flow-icon { color: #c084fc; }
.flow-step:nth-child(4) .flow-icon { color: #34d399; }

.flow-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.flow-name {
  color: #f1f5f9;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.3;
}

.flow-detail {
  color: #94a3b8;
  font-size: 0.72rem;
  line-height: 1.3;
}

.flow-number {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 700;
}

.flow-connector {
  display: block;
  text-align: center;
  color: #475569;
  font-size: 0.75rem;
  line-height: 9px;
  height: 9px;
}

.flow-step--active .flow-node {
  border-color: rgba(245, 158, 11, 0.65);
  background: rgba(245, 158, 11, 0.14);
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.18);
}

.flow-step--active .flow-connector {
  color: #fbbf24;
}

.flow-step--visited .flow-node {
  border-color: rgba(6, 182, 212, 0.35);
}

.arch-metrics-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.pill-metric {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.pill-metric--amber {
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
}

.pill-metric--cyan {
  background: rgba(6, 182, 212, 0.16);
  border: 1px solid rgba(6, 182, 212, 0.35);
  color: #38bdf8;
}

.panel-webgis {
  height: 260px;
  background: #060b16;
  cursor: crosshair;
  position: relative;
  overflow: hidden;
}

.webgis-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.canvas-tags-overlay {
  position: absolute;
  top: 9px;
  left: 11px;
  display: flex;
  gap: 6px;
}

.canvas-tag {
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.canvas-tag--cyan {
  background: rgba(6, 182, 212, 0.16);
  border: 1px solid rgba(6, 182, 212, 0.35);
  color: #67e8f9;
}

.canvas-tag--amber {
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
}

.canvas-status-bar {
  position: absolute;
  bottom: 9px;
  left: 11px;
  right: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: rgba(9, 14, 26, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 10px;
  backdrop-filter: blur(4px);
}

.status-hint {
  font-size: 0.8125rem;
  color: #cbd5e1;
  font-weight: 500;
}

.status-fps {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #34d399;
}

.fps-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.card-specs-bar {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px 14px 12px;
  background: #0b1120;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom-left-radius: 1.15rem;
  border-bottom-right-radius: 1.15rem;
  overflow: hidden;
}

.spec-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 12px;
  line-height: 1.45;
  min-width: 0;
}

.spec-label {
  color: #94a3b8;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.spec-value {
  font-weight: 700;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

@media (max-width: 440px) {
  .spec-row {
    flex-wrap: wrap;
    gap: 2px 8px;
  }
}

/* ========== LIGHT THEME OVERRIDES ========== */
[data-theme="light"] .hero-showcase-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 8px 32px -8px rgba(15, 23, 42, 0.12), 0 2px 8px -2px rgba(15, 23, 42, 0.06);
}

[data-theme="light"] .hero-showcase-card:hover {
  border-color: #cbd5e1;
}

[data-theme="light"] .card-chrome {
  background: #f8fafc;
  border-bottom-color: #e2e8f0;
}

[data-theme="light"] .card-filename {
  color: #64748b;
}

[data-theme="light"] .card-mode-badge--amber {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
  color: #b45309;
}

[data-theme="light"] .card-mode-badge--cyan {
  background: rgba(6, 182, 212, 0.1);
  border-color: rgba(6, 182, 212, 0.3);
  color: #0e7490;
}

[data-theme="light"] .card-tabs {
  background: #f1f5f9;
  border-bottom-color: #e2e8f0;
}

[data-theme="light"] .card-tabs button {
  color: #64748b;
}

[data-theme="light"] .card-tabs button:hover {
  color: #0f172a;
  background: rgba(15, 23, 42, 0.04);
}

[data-theme="light"] .tab-btn--active-amber {
  background: rgba(245, 158, 11, 0.08) !important;
  color: #b45309 !important;
}

[data-theme="light"] .tab-btn--active-cyan {
  background: rgba(6, 182, 212, 0.08) !important;
  color: #0e7490 !important;
}

[data-theme="light"] .panel-architecture {
  background: radial-gradient(ellipse at 85% 15%, rgba(245, 158, 11, 0.04), transparent 70%), #ffffff;
}

[data-theme="light"] .arch-header {
  color: #64748b;
}

[data-theme="light"] .replay-btn {
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #475569;
}

[data-theme="light"] .replay-btn:hover {
  border-color: #d97706;
  color: #b45309;
}

[data-theme="light"] .flow-node {
  border-color: #e2e8f0;
  background: #ffffff;
}

[data-theme="light"] .flow-name {
  color: #0f172a;
}

[data-theme="light"] .flow-detail {
  color: #64748b;
}

[data-theme="light"] .flow-number {
  color: #94a3b8;
}

[data-theme="light"] .flow-connector {
  color: #cbd5e1;
}

[data-theme="light"] .flow-icon {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #0891b2;
}

[data-theme="light"] .flow-step:nth-child(2) .flow-icon { color: #d97706; }
[data-theme="light"] .flow-step:nth-child(3) .flow-icon { color: #9333ea; }
[data-theme="light"] .flow-step:nth-child(4) .flow-icon { color: #059669; }

[data-theme="light"] .flow-step--active .flow-node {
  border-color: rgba(245, 158, 11, 0.5);
  background: rgba(245, 158, 11, 0.06);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.1);
}

[data-theme="light"] .flow-step--active .flow-connector {
  color: #d97706;
}

[data-theme="light"] .flow-step--visited .flow-node {
  border-color: rgba(6, 182, 212, 0.3);
}

[data-theme="light"] .arch-metrics-bar {
  border-top-color: #e2e8f0;
}

[data-theme="light"] .pill-metric--amber {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.25);
  color: #b45309;
}

[data-theme="light"] .pill-metric--cyan {
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(6, 182, 212, 0.25);
  color: #0e7490;
}

[data-theme="light"] .panel-webgis {
  background: #f8fafc;
}

[data-theme="light"] .canvas-tag--cyan {
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(6, 182, 212, 0.25);
  color: #0e7490;
}

[data-theme="light"] .canvas-tag--amber {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.25);
  color: #b45309;
}

[data-theme="light"] .canvas-status-bar {
  background: rgba(255, 255, 255, 0.92);
  border-color: #e2e8f0;
}

[data-theme="light"] .status-hint {
  color: #475569;
}

[data-theme="light"] .card-specs-bar {
  background: #f8fafc;
  border-top-color: #e2e8f0;
}

[data-theme="light"] .spec-label {
  color: #64748b;
}

[data-theme="light"] .spec-value.text-amber-400 { color: #b45309 !important; }
[data-theme="light"] .spec-value.text-emerald-400 { color: #059669 !important; }
[data-theme="light"] .spec-value.text-cyan-400 { color: #0e7490 !important; }
[data-theme="light"] .spec-value.text-purple-400 { color: #7e22ce !important; }
</style>
