<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import ProjectMockupPreview from './ProjectMockupPreview.vue'
import { experiences } from '../data/experiences'
import { useProjectLightbox } from '../composables/useProjectLightbox'
import { useLocale } from '../composables/useLocale'
import { getAchievementSegments, getProjectLinks, resolveProjectUrl } from '../utils/portfolio'
import { forceUnlockScroll } from '../utils/scrollLock.js'

const { activeProject, openLightbox, closeLightbox } = useProjectLightbox()
const { pick } = useLocale()
const dialog = ref(null)
const closeButton = ref(null)
const selectedScreenshot = ref(null)
let previousFocus = null

const allProjectsById = new Map(
  experiences.flatMap(exp => exp.projects).map(proj => [proj.id, proj])
)
const coreCaseOrder = ['qr', 'experiments', 'government-map']
const currentCoreIndex = computed(() =>
  activeProject.value ? coreCaseOrder.indexOf(activeProject.value.id) : -1
)

function navigateCoreCase(offset) {
  if (currentCoreIndex.value === -1) return
  const nextIndex = (currentCoreIndex.value + offset + coreCaseOrder.length) % coreCaseOrder.length
  const nextProject = allProjectsById.get(coreCaseOrder[nextIndex])
  if (nextProject) openLightbox(nextProject)
}

const projectLinks = computed(() => {
  if (!activeProject.value) return []
  return getProjectLinks(activeProject.value)
})

const detailedDemos = computed(() => {
  if (!activeProject.value?.links) return []
  return activeProject.value.links.filter(l => l.desktopUrl || l.mobileUrl)
})

const achievements = computed(() => {
  const list = pick(activeProject.value?.achievements, activeProject.value?.achievementsEn)
  if (!list) return []
  return list.map(getAchievementSegments)
})

const caseActions = computed(() => {
  const cs = activeProject.value?.caseStudy
  if (!cs) return []
  return pick(cs.actions, cs.actionsEn) ?? []
})

function handleKeyDown(event) {
  if (!activeProject.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closeLightbox()
    return
  }
  if (currentCoreIndex.value !== -1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    const tag = document.activeElement?.tagName
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      event.preventDefault()
      navigateCoreCase(event.key === 'ArrowRight' ? 1 : -1)
      return
    }
  }
  if (event.key === 'Tab') {
    const controls = [
      ...(dialog.value?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]') ?? []),
    ].filter(element => element.getClientRects().length)
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
}

function checkHashDeepLink() {
  if (typeof window === 'undefined') return
  const hash = window.location.hash
  if (hash.startsWith('#case-')) {
    const id = hash.slice('#case-'.length)
    const aliasMap = { ab: 'experiments', webgis: 'government-map', shortlink: 'qr' }
    const targetId = aliasMap[id] || id
    const found = allProjectsById.get(targetId)
    if (found) openLightbox(found)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('hashchange', checkHashDeepLink)
  if (!activeProject.value) {
    forceUnlockScroll()
    checkHashDeepLink()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('hashchange', checkHashDeepLink)
  forceUnlockScroll()
})

watch(
  activeProject,
  async (project, previousProject) => {
    selectedScreenshot.value =
      project?.screenshots?.find(screenshot => screenshot.src === project.imageUrl) ??
      (project?.imageUrl
        ? { src: project.imageUrl, alt: `Screenshot ${project.name}` }
        : project?.screenshots?.[0]) ??
      null
    if (project) {
      if (!previousProject) previousFocus = document.activeElement
      await nextTick()
      if (activeProject.value === project) closeButton.value?.focus()
    } else {
      previousFocus?.focus()
      previousFocus = null
    }
  },
  { flush: 'post' }
)
</script>

<template>
  <Transition name="lightbox-fade">
    <div
      v-if="activeProject"
      class="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`lightbox-title-${activeProject.id}`"
      @click="closeLightbox"
      @wheel.self.prevent
      @touchmove.self.prevent
    >
      <div ref="dialog" class="lightbox-dialog" @click.stop>
        <!-- Modal Top Bar -->
        <header class="lightbox-header">
          <div class="lightbox-header__info">
            <div class="lightbox-header__top-row">
              <span class="live-dot" aria-hidden="true" />
              <h3 :id="`lightbox-title-${activeProject.id}`" class="lightbox-title">
                {{ pick(activeProject.name, activeProject.nameEn) }}
              </h3>
              <span v-if="activeProject.domain" class="lightbox-domain">
                {{ activeProject.domain }}
              </span>
              <span v-if="activeProject.period" class="lightbox-period">
                {{ activeProject.period }}
              </span>
            </div>

            <p v-if="activeProject.role" class="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
              {{ pick(activeProject.role, activeProject.roleEn) }}
            </p>

            <p v-if="activeProject.description" class="lightbox-subheadline">
              {{ pick(activeProject.description, activeProject.descriptionEn) }}
            </p>

            <div v-if="activeProject.techStack?.length" class="lightbox-tech-pills">
              <span
                v-for="tech in activeProject.techStack"
                :key="tech"
                class="tech-pill-compact"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="lightbox-header__actions">
            <!-- Nút chuyển dự án trước / sau cho 3 Core Case Studies -->
            <div v-if="currentCoreIndex !== -1" class="hidden sm:flex items-center gap-1 mr-1">
              <button
                type="button"
                class="lightbox-nav-btn"
                :title="pick('Case Study trước (←)', 'Previous Case Study (←)')"
                @click="navigateCoreCase(-1)"
              >
                ←
              </button>
              <span class="font-mono text-[11px] font-bold text-slate-400 px-1">
                0{{ currentCoreIndex + 1 }}/0{{ coreCaseOrder.length }}
              </span>
              <button
                type="button"
                class="lightbox-nav-btn"
                :title="pick('Case Study tiếp theo (→)', 'Next Case Study (→)')"
                @click="navigateCoreCase(1)"
              >
                →
              </button>
            </div>

            <span class="lightbox-shortcut-hint hidden sm:inline-block" aria-hidden="true">ESC</span>
            <button
              ref="closeButton"
              type="button"
              class="lightbox-close-btn"
              :aria-label="pick('Đóng cửa sổ (Escape)', 'Close modal (Escape)')"
              @click="closeLightbox"
            >
              <svg
                class="close-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Modal Body Content -->
        <div class="lightbox-body">
          <!-- 1. Mockup / Screenshot Stage -->
          <section
            class="lightbox-stage"
            :aria-label="selectedScreenshot ? pick('Ảnh chụp sản phẩm thực tế', 'Production screenshot') : pick('Khung mô phỏng giao diện', 'Interactive architecture preview')"
          >
            <div class="stage-container">
              <img
                v-if="selectedScreenshot"
                :src="resolveProjectUrl(selectedScreenshot.src)"
                :alt="selectedScreenshot.alt"
                class="lightbox-image"
              />
              <ProjectMockupPreview
                v-else
                :project="activeProject"
                lightbox
              />
              <p v-if="selectedScreenshot" class="mt-2.5 text-center text-xs">
                <a
                  :href="resolveProjectUrl(selectedScreenshot.src)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-amber-700 underline underline-offset-2 dark:text-amber-400"
                >
                  {{ pick('Mở ảnh kích thước đầy đủ ↗', 'Open full-resolution image ↗') }}
                </a>
              </p>
              <div
                v-if="activeProject.screenshots?.length > 1"
                class="screenshot-options"
                role="group"
                :aria-label="pick('Chọn ảnh dự án', 'Select screenshot')"
              >
                <button
                  v-for="screenshot in activeProject.screenshots"
                  :key="screenshot.src"
                  type="button"
                  :aria-pressed="selectedScreenshot?.src === screenshot.src"
                  @click="selectedScreenshot = screenshot"
                >
                  {{ screenshot.label }}
                </button>
              </div>
            </div>
          </section>

          <!-- 2. STAR Case Study Details -->
          <div class="lightbox-details">
            <!-- Key Metrics Row (4 cards) -->
            <div v-if="activeProject.caseStudy?.metrics?.length" class="metrics-row">
              <div
                v-for="metric in activeProject.caseStudy.metrics"
                :key="metric.label"
                class="metric-box-compact"
              >
                <span class="metric-val-compact">{{ pick(metric.value, metric.valueEn) }}</span>
                <span class="metric-lbl-compact">{{ pick(metric.label, metric.labelEn) }}</span>
              </div>
            </div>

            <!-- 3 Cột STAR: Challenge (S+T) -> Approach (Action bullets) -> Impact (Result) -->
            <div v-if="activeProject.caseStudy" class="pillars-3cols">
              <!-- Cột 1: Challenge (Situation + Task) -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">⚡</span>
                  <strong>{{ pick('Bài toán & Nhiệm vụ (Challenge)', 'Challenge (Situation & Task)') }}</strong>
                </div>
                <p class="pillar-col__text">
                  {{ pick(activeProject.caseStudy.challenge, activeProject.caseStudy.challengeEn) }}
                </p>
              </div>

              <!-- Cột 2: Approach (Action Bullets) -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">⚙</span>
                  <strong>{{ pick('Giải pháp & Hành động (Approach)', 'Approach & Technical Actions') }}</strong>
                </div>
                <ul v-if="caseActions.length" class="pillar-col__list">
                  <li v-for="(act, idx) in caseActions" :key="idx">
                    {{ act }}
                  </li>
                </ul>
                <p v-else class="pillar-col__text">
                  {{ pick(activeProject.caseStudy.solution, activeProject.caseStudy.solutionEn) }}
                </p>
              </div>

              <!-- Cột 3: Impact (Result + Scope Note) -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">✓</span>
                  <strong>{{ pick('Tác động & Kết quả (Impact)', 'Impact & Quantified Results') }}</strong>
                </div>
                <p class="pillar-col__text">
                  {{ pick(activeProject.caseStudy.impact, activeProject.caseStudy.impactEn) }}
                </p>

                <!-- Hộp phân định ranh giới phụ trách (Scope Note) -->
                <div v-if="activeProject.caseStudy.scopeNote" class="scope-note-box">
                  <div class="scope-note-item">
                    <strong class="text-emerald-600 dark:text-emerald-400">
                      {{ pick('• Phần mình phụ trách:', '• My ownership:') }}
                    </strong>
                    <span>{{ pick(activeProject.caseStudy.scopeNote.mine, activeProject.caseStudy.scopeNote.mineEn) }}</span>
                  </div>
                  <div class="scope-note-item mt-1.5">
                    <strong class="text-slate-500 dark:text-slate-400">
                      {{ pick('• Phần đội hạ tầng:', '• Partner team scope:') }}
                    </strong>
                    <span>{{ pick(activeProject.caseStudy.scopeNote.others, activeProject.caseStudy.scopeNote.othersEn) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Khung trích dẫn Tư duy giải quyết vấn đề (Problem-Solving Insight) -->
            <blockquote
              v-if="activeProject.caseStudy?.insight"
              class="insight-banner"
            >
              <div class="insight-banner__label">
                🧠 {{ pick('Tư duy giải quyết vấn đề (Problem-Solving Insight)', 'Problem-Solving Insight') }}
              </div>
              <p class="insight-banner__quote">
                “{{ pick(activeProject.caseStudy.insight, activeProject.caseStudy.insightEn) }}”
              </p>
            </blockquote>

            <!-- Fallback Achievements cho các dự án không có caseStudy -->
            <div v-else-if="achievements.length" class="achievements-compact">
              <ul class="achievements-checklist" role="list">
                <li v-for="(achievement, index) in achievements" :key="index">
                  <span class="check-badge">✓</span>
                  <div class="achievement-text">
                    <template v-for="(segment, segIdx) in achievement" :key="segIdx">
                      <strong v-if="segment.isMetric" class="metric-text">{{ segment.text }}</strong>
                      <template v-else>{{ segment.text }}</template>
                    </template>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Direct Actions / Demo Buttons + Mobile Prev/Next -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div v-if="detailedDemos.length > 0 || projectLinks.length > 0" class="actions-compact-row">
                <template v-if="detailedDemos.length > 0">
                  <template v-for="demo in detailedDemos" :key="demo.id">
                    <a
                      v-if="demo.desktopUrl"
                      :href="resolveProjectUrl(demo.desktopUrl)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-demo-compact"
                    >
                      <span>🖥 {{ pick(demo.label, demo.labelEn) }} (PC)</span>
                      <BaseIcon name="external" class="mini-ext" />
                    </a>
                    <a
                      v-if="demo.mobileUrl"
                      :href="resolveProjectUrl(demo.mobileUrl)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-demo-compact"
                    >
                      <span>📱 {{ pick(demo.label, demo.labelEn) }} (Mobile)</span>
                      <BaseIcon name="external" class="mini-ext" />
                    </a>
                  </template>
                </template>
                <ProductLinks v-else :links="projectLinks" compact />
              </div>

              <div v-if="currentCoreIndex !== -1" class="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  class="btn-demo-compact cursor-pointer"
                  @click="navigateCoreCase(-1)"
                >
                  ← {{ pick('Dự án trước', 'Prev Case') }}
                </button>
                <button
                  type="button"
                  class="btn-demo-compact cursor-pointer"
                  @click="navigateCoreCase(1)"
                >
                  {{ pick('Dự án tiếp', 'Next Case') }} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.5rem, 2vw, 1.25rem);
  background: rgba(10, 15, 29, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

[data-theme="light"] .lightbox-backdrop {
  background: rgba(15, 23, 42, 0.6);
}

.lightbox-dialog {
  position: relative;
  width: 100%;
  max-width: 1080px;
  background: var(--surface-solid);
  border: 1px solid var(--border-strong, rgba(226, 232, 240, 0.3));
  border-radius: 18px;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 94vh;
}

[data-theme="light"] .lightbox-dialog {
  background: #ffffff;
  border-color: #cbd5e1;
}

.lightbox-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.9rem 1.25rem 0.8rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface-solid);
  gap: 1rem;
  flex-shrink: 0;
}

[data-theme="light"] .lightbox-header {
  background: #ffffff;
}

.lightbox-header__info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  flex: 1 1 auto;
}

.lightbox-header__top-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  flex-shrink: 0;
}

.lightbox-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.015em;
  line-height: 1.25;
}

.lightbox-domain {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.12rem 0.5rem;
  border-radius: 4px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.lightbox-period {
  font-size: 0.72rem;
  color: var(--text-faint);
  font-family: var(--font-mono);
}

.lightbox-subheadline {
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted);
  margin: 0;
  font-weight: 500;
}

[data-theme="light"] .lightbox-subheadline {
  color: #334155;
}

.lightbox-tech-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
}

.tech-pill-compact {
  padding: 0.14rem 0.55rem;
  border-radius: 9999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-faint);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  font-weight: 600;
}

[data-theme="light"] .tech-pill-compact {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

.lightbox-header__actions {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}

.lightbox-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
}

.lightbox-nav-btn:hover {
  border-color: #f59e0b;
  color: #fbbf24;
}

.lightbox-shortcut-hint {
  padding: 0.2rem 0.45rem;
  border-radius: 5px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-faint);
  font-size: 0.68rem;
  font-weight: 600;
  font-family: var(--font-mono);
}

.lightbox-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface-solid);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 180ms ease;
}

.lightbox-close-btn:hover {
  background: var(--bg-soft);
  color: var(--text);
  border-color: #f59e0b;
}

.close-icon {
  width: 16px;
  height: 16px;
}

.lightbox-body {
  overflow-y: auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.lightbox-stage {
  padding: 0.65rem 1.25rem 0.5rem;
  background: var(--bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.stage-container {
  width: 100%;
  max-width: 980px;
}

.lightbox-image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 44vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.screenshot-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0 0.25rem;
}

.screenshot-options button {
  min-height: 34px;
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-solid);
  color: var(--text-muted);
  font-size: 0.75rem;
  cursor: pointer;
}

.screenshot-options button[aria-pressed="true"] {
  border-color: #d97706;
  color: var(--text);
  font-weight: 700;
}

.lightbox-details {
  padding: 0.9rem 1.25rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: var(--surface-solid);
}

[data-theme="light"] .lightbox-details {
  background: #ffffff;
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.6rem;
}

.metric-box-compact {
  padding: 0.55rem 0.8rem;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

[data-theme="dark"] .metric-box-compact {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(51, 65, 85, 0.65);
}

.metric-val-compact {
  font-size: 1.1rem;
  font-weight: 800;
  color: #f59e0b;
  font-family: var(--font-mono);
  line-height: 1.2;
}

[data-theme="light"] .metric-val-compact {
  color: #b45309;
}

.metric-lbl-compact {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-faint);
  letter-spacing: 0.02em;
}

.pillars-3cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.pillar-col {
  padding: 0.8rem 0.95rem;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

[data-theme="light"] .pillar-col {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.pillar-col__head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text);
}

.pillar-col__icon {
  font-size: 0.88rem;
}

.pillar-col__text {
  font-size: 0.84rem;
  line-height: 1.58;
  color: var(--text-muted);
  margin: 0;
}

[data-theme="light"] .pillar-col__text {
  color: #334155;
}

.pillar-col__list {
  margin: 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.82rem;
  line-height: 1.52;
  color: var(--text-muted);
}

[data-theme="light"] .pillar-col__list {
  color: #334155;
}

.scope-note-box {
  margin-top: 0.35rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px dashed rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.35);
  font-size: 0.76rem;
  line-height: 1.45;
  color: var(--text-muted);
}

[data-theme="light"] .scope-note-box {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #475569;
}

.scope-note-item strong {
  display: block;
  margin-bottom: 0.1rem;
}

.insight-banner {
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
  background: rgba(245, 158, 11, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

[data-theme="light"] .insight-banner {
  background: #fffbeb;
}

.insight-banner__label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fbbf24;
}

[data-theme="light"] .insight-banner__label {
  color: #b45309;
}

.insight-banner__quote {
  margin: 0;
  font-size: 0.88rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.55;
  color: var(--text);
}

.achievements-compact {
  padding: 0.4rem 0;
}

.achievements-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.achievements-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.84rem;
  color: var(--text);
  line-height: 1.5;
}

.check-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-weight: 700;
  font-size: 0.68rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.metric-text {
  font-weight: 700;
  color: var(--interactive-accent);
}

.actions-compact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.btn-demo-compact {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 180ms ease;
}

[data-theme="light"] .btn-demo-compact {
  background: #ffffff;
  border-color: #cbd5e1;
}

.btn-demo-compact:hover {
  border-color: #f59e0b;
  color: #fbbf24;
}

.mini-ext {
  width: 0.75rem;
  height: 0.75rem;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 220ms ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .lightbox-backdrop {
    padding: 0;
    align-items: flex-end;
  }
  .lightbox-dialog {
    max-height: 96vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .metrics-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pillars-3cols {
    grid-template-columns: 1fr;
  }
}
</style>
