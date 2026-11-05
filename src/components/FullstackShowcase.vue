<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import HeroPlayground from './HeroPlayground.vue'
import { profile } from '../data/profile'

const tabs = [
  { id: 'architecture', label: 'Fullstack / High-Load', fileName: 'fullstack-highload-architecture.ts' },
  { id: 'webgis', label: 'WebGIS / 60FPS', fileName: 'webgis-clustering-demo.vue' },
]
const steps = [
  { label: 'Vue Admin & VirusTotal', detail: 'Tạo Shortlink/QR + Quét độc hại URL', icon: '↗' },
  { label: 'MySQL ⇄ Redis Key Sync', detail: 'Đồng bộ key sang Redis (~240K clicks/ngày)', icon: '⚡' },
  { label: 'Redirect Service (25–60ms)', detail: 'Đọc trực tiếp từ Redis, không query MySQL', icon: '⇢' },
  { label: 'Log REST API → Analytics UI', detail: 'Tổng hợp Location/Device/OS/Browser', icon: '⌘' },
]
const activeTab = ref('architecture')
const activeStep = ref(-1)
const isRunning = ref(false)
const tabButtons = ref([])
const currentTab = computed(() => tabs.find(tab => tab.id === activeTab.value))
const flowStatus = computed(() => isRunning.value
  ? 'Đang mô phỏng: ' + steps[activeStep.value].label
  : activeStep.value === steps.length - 1 ? 'Đã mô phỏng xong luồng xử lý.' : 'Mô phỏng luồng xử lý Shortlink.')
let flowTimer = null

function stopFlow() {
  clearInterval(flowTimer)
  flowTimer = null
  isRunning.value = false
}

function replayFlow() {
  stopFlow()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    activeStep.value = steps.length - 1
    return
  }
  activeStep.value = 0
  isRunning.value = true
  flowTimer = setInterval(() => {
    if (activeStep.value < steps.length - 1) activeStep.value += 1
    else stopFlow()
  }, 650)
}

function selectTab(tabId) {
  stopFlow()
  activeTab.value = tabId
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

onBeforeUnmount(stopFlow)
</script>

<template>
  <div class="fullstack-showcase" aria-label="Fullstack Interactive Showcase">
    <div class="showcase-chrome">
      <div class="showcase-window-dots" aria-hidden="true"><span /><span /><span /></div>
      <span class="showcase-file" :title="currentTab.fileName">{{ currentTab.fileName }}</span>
      <span v-if="activeTab === 'webgis'" class="showcase-mode">Interactive 60FPS</span>
      <span v-else class="showcase-mode showcase-mode--amber">Architecture</span>
    </div>

    <div class="showcase-tabs" role="tablist" aria-label="Chọn mô phỏng kỹ thuật">
      <button
        v-for="(tab, index) in tabs"
        :id="'showcase-tab-' + tab.id"
        :key="tab.id"
        :ref="element => tabButtons[index] = element"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="'showcase-panel-' + tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        @click="selectTab(tab.id)"
        @keydown="handleTabKey($event, index)"
      >
        <span class="showcase-tab-dot" aria-hidden="true" />{{ tab.label }}
      </button>
    </div>

    <div
      id="showcase-panel-architecture"
      v-show="activeTab === 'architecture'"
      class="showcase-panel architecture-panel"
      role="tabpanel"
      aria-labelledby="showcase-tab-architecture"
      tabindex="0"
    >
      <div class="architecture-caption">
        <span>MÔ PHỎNG KIẾN TRÚC</span>
        <button type="button" :disabled="isRunning" @click="replayFlow"><span aria-hidden="true">↻</span> {{ isRunning ? 'Đang chạy' : 'Chạy luồng' }}</button>
      </div>
      <ol class="architecture-flow" aria-label="Luồng chuyển hướng và phân tích dữ liệu">
        <li v-for="(step, index) in steps" :key="step.label" :class="{ 'flow-step--active': activeStep === index, 'flow-step--visited': activeStep > index }">
          <div class="flow-node">
            <span class="flow-node-icon" aria-hidden="true">{{ step.icon }}</span>
            <span class="flow-node-copy"><strong>{{ step.label }}</strong><span>{{ step.detail }}</span></span>
            <span class="flow-node-number" aria-hidden="true">0{{ index + 1 }}</span>
          </div>
          <span v-if="index < steps.length - 1" class="flow-connector" aria-hidden="true">↓</span>
        </li>
      </ol>
      <p class="architecture-proof"><span class="proof-dot" aria-hidden="true" /><strong>2M+ Total Clicks</strong><span class="proof-divider" aria-hidden="true">|</span><span>High-Speed Redirect</span></p>
      <p class="sr-only" role="status" aria-live="polite">{{ flowStatus }}</p>
    </div>

    <div
      v-show="activeTab === 'webgis'"
      id="showcase-panel-webgis"
      class="showcase-panel"
      role="tabpanel"
      aria-labelledby="showcase-tab-webgis"
      tabindex="0"
    >
      <HeroPlayground v-if="activeTab === 'webgis'" compact />
    </div>

    <div class="showcase-specs" aria-label="Nền tảng kỹ thuật">
      <div v-for="spec in profile.playground.specs" :key="spec.label" class="showcase-spec">
        <span>{{ spec.label }}</span>
        <strong :class="'showcase-spec--' + spec.color">{{ spec.value }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullstack-showcase {
  overflow: hidden;
  min-width: 0;
  border: 1px solid #263247;
  border-radius: 18px;
  background: #090e1a;
  box-shadow: 0 22px 70px -28px #020617, 0 0 45px -24px #06b6d4;
  color: #cbd5e1;
  font-family: 'JetBrains Mono', monospace;
}
.showcase-chrome { display: flex; height: 40px; align-items: center; gap: 8px; padding: 0 13px; border-bottom: 1px solid #1e293b; background: #101727; }
.showcase-window-dots { display: flex; flex: none; gap: 4px; }
.showcase-window-dots span { width: 7px; height: 7px; border-radius: 50%; background: #f43f5e; }
.showcase-window-dots span:nth-child(2) { background: #f59e0b; }
.showcase-window-dots span:nth-child(3) { background: #10b981; }
.showcase-file { min-width: 0; overflow: hidden; flex: 1; text-overflow: ellipsis; white-space: nowrap; font-size: 9px; color: #94a3b8; }
.showcase-mode { flex: none; border: 1px solid #06b6d433; border-radius: 5px; padding: 3px 5px; color: #67e8f9; font-size: 8px; }
.showcase-mode--amber { border-color: #f59e0b33; color: #fbbf24; }
.showcase-tabs { display: grid; grid-template-columns: 1.1fr 1fr; height: 43px; border-bottom: 1px solid #1e293b; background: #0b1120; }
.showcase-tabs button { display: flex; align-items: center; justify-content: center; gap: 7px; border-bottom: 2px solid transparent; color: #94a3b8; font-size: 10px; transition: color 180ms, background 180ms; }
.showcase-tabs button:hover { color: #e2e8f0; background: #ffffff05; }
.showcase-tabs button[aria-selected="true"] { border-bottom-color: #f59e0b; background: #f59e0b0a; color: #fbbf24; }
.showcase-tabs button[aria-selected="true"]:last-child { border-bottom-color: #22d3ee; background: #06b6d40a; color: #67e8f9; }
.showcase-tab-dot { width: 5px; height: 5px; flex: none; border-radius: 50%; background: currentColor; }
.showcase-panel { height: 260px; }
.architecture-panel { display: flex; flex-direction: column; justify-content: space-between; padding: 10px 16px 12px; background: radial-gradient(ellipse at 90% 10%, #06b6d40b, transparent 60%), #070c16; }
.architecture-caption { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: #64748b; font-size: 8px; letter-spacing: .07em; }
.architecture-caption button { display: inline-flex; min-height: 25px; align-items: center; gap: 5px; border: 1px solid #334155; border-radius: 5px; padding: 2px 7px; color: #cbd5e1; font-size: 9px; letter-spacing: 0; }
.architecture-caption button:hover { border-color: #f59e0b; color: #fbbf24; }
.architecture-caption button:disabled { opacity: .6; cursor: default; }
.architecture-flow { width: min(100%, 355px); margin: 0 auto; padding: 0; list-style: none; }
.flow-node { display: flex; min-height: 35px; align-items: center; gap: 9px; border: 1px solid #243146; border-radius: 8px; padding: 4px 9px; background: #111a2b; transition: border-color 180ms, background 180ms, box-shadow 180ms; }
.flow-node-icon { display: grid; width: 24px; height: 24px; flex: none; place-items: center; border: 1px solid #334155; border-radius: 6px; background: #0a1120; color: #67e8f9; font-size: 14px; }
.flow-node-copy { display: flex; min-width: 0; flex: 1; flex-direction: column; gap: 1px; }
.flow-node-copy strong { color: #e2e8f0; font-size: 10px; font-weight: 600; line-height: 1.35; }
.flow-node-copy > span { color: #94a3b8; font-size: 8px; line-height: 1.4; }
.flow-node-number { color: #475569; font-size: 9px; }
.architecture-flow li:nth-child(2) .flow-node-icon { color: #fbbf24; }
.flow-connector { display: block; height: 10px; color: #53647d; font-size: 12px; line-height: 9px; text-align: center; }
.flow-step--active .flow-node { border-color: #f59e0b99; background: #f59e0b10; box-shadow: 0 0 14px #f59e0b0d; }
.flow-step--active .flow-node-icon { border-color: #f59e0b66; color: #fbbf24; }
.flow-step--active .flow-connector { color: #fbbf24; }
.flow-step--visited .flow-node { border-color: #06b6d455; }
.architecture-proof { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px; margin: 0; border-top: 1px solid #1e293b; padding-top: 8px; color: #94a3b8; font-size: 8px; }
.architecture-proof strong { color: #fbbf24; font-weight: 600; }
.proof-dot { width: 5px; height: 5px; border-radius: 50%; background: #34d399; }
.proof-divider { color: #475569; }
.showcase-specs { display: flex; min-height: 84px; flex-direction: column; justify-content: center; gap: 6px; border-top: 1px solid #1e293b; padding: 12px 14px; background: #0b1120; }
.showcase-spec { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2px 8px; font-size: 9px; line-height: 1.5; }
.showcase-spec > span { color: #94a3b8; }
.showcase-spec strong { font-weight: 500; }
.showcase-spec--amber { color: #fbbf24; }
.showcase-spec--emerald { color: #6ee7b7; }
.showcase-spec--cyan { color: #67e8f9; }
button:focus-visible, .showcase-panel:focus-visible { outline: 2px solid #fbbf24; outline-offset: -3px; }
@media (min-width: 640px) {
  .showcase-chrome { gap: 10px; padding-inline: 15px; }
  .showcase-file { font-size: 10px; }
  .showcase-mode { font-size: 9px; }
  .showcase-tabs button { font-size: 11px; }
  .flow-node-copy strong { font-size: 11px; }
  .flow-node-copy > span { font-size: 9px; }
  .architecture-proof { font-size: 9px; }
  .showcase-spec { font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .showcase-tabs button, .flow-node { transition: none; }
}
</style>
