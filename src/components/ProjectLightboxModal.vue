<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import ProjectMockupPreview from './ProjectMockupPreview.vue'
import { useProjectLightbox } from '../composables/useProjectLightbox'
import { getAchievementSegments, getProjectLinks, resolveProjectUrl } from '../utils/portfolio'

const { activeProject, closeLightbox } = useProjectLightbox()

const projectLinks = computed(() => {
  if (!activeProject.value) return []
  return getProjectLinks(activeProject.value)
})

const detailedDemos = computed(() => {
  if (!activeProject.value?.links) return []
  return activeProject.value.links.filter((l) => l.desktopUrl || l.mobileUrl)
})

const achievements = computed(() => {
  if (!activeProject.value?.achievements) return []
  return activeProject.value.achievements.map(getAchievementSegments)
})

function handleKeyDown(event) {
  if (event.key === 'Escape' && activeProject.value) {
    closeLightbox()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

// Ensure scroll lock is safely synced if component re-renders or unmounts
watch(activeProject, (newVal) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
})
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
    >
      <div class="lightbox-dialog" @click.stop>
        <!-- Modal Top Bar: Header + Sub-headline + Tech Stack Badges -->
        <header class="lightbox-header">
          <div class="lightbox-header__info">
            <div class="lightbox-header__top-row">
              <span class="live-dot" aria-hidden="true" />
              <h3 :id="`lightbox-title-${activeProject.id}`" class="lightbox-title">
                {{ activeProject.name }}
              </h3>
              <span v-if="activeProject.domain" class="lightbox-domain">
                {{ activeProject.domain }}
              </span>
              <span v-if="activeProject.period" class="lightbox-period">
                {{ activeProject.period }}
              </span>
            </div>

            <!-- Sub-headline immediately under project title -->
            <p v-if="activeProject.description" class="lightbox-subheadline">
              {{ activeProject.description }}
            </p>

            <!-- Tech Stack Badges directly beneath Sub-headline -->
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
            <span class="lightbox-shortcut-hint" aria-hidden="true">ESC</span>
            <button
              type="button"
              class="lightbox-close-btn"
              aria-label="Đóng cửa sổ phóng to (Escape)"
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
          <!-- 1. Mockup Stage (Compact Visual Preview) -->
          <section class="lightbox-stage" aria-label="Khung mô phỏng giao diện">
            <div class="stage-container">
              <img
                v-if="activeProject.imageUrl"
                :src="activeProject.imageUrl"
                :alt="`Ảnh chụp màn hình chi tiết cho ${activeProject.name}`"
                class="lightbox-image"
              />
              <ProjectMockupPreview
                v-else
                :project="activeProject"
                lightbox
              />
            </div>
          </section>

          <!-- 2. Engineering Studio -->
          <div class="lightbox-details">
            <!-- Key Metrics Section: 4 cards reduced by 30% with subtle slate-50 background & fine border -->
            <div v-if="activeProject.caseStudy?.metrics?.length" class="metrics-row">
              <div
                v-for="metric in activeProject.caseStudy.metrics"
                :key="metric.label"
                class="metric-box-compact"
              >
                <span class="metric-val-compact">{{ metric.value }}</span>
                <span class="metric-lbl-compact">{{ metric.label }}</span>
              </div>
            </div>

            <!-- 3 Cột (Bài toán & Giải pháp): Challenge, Solution, Impact (Thin subtle border, refined icons) -->
            <div v-if="activeProject.caseStudy" class="pillars-3cols">
              <!-- Cột 1: Thách thức kỹ thuật -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">⚡</span>
                  <strong>Thách thức kỹ thuật</strong>
                </div>
                <p class="pillar-col__text">
                  {{ activeProject.caseStudy.challenge }}
                </p>
              </div>

              <!-- Cột 2: Giải pháp Frontend -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">⚙</span>
                  <strong>Giải pháp Frontend</strong>
                </div>
                <p class="pillar-col__text">
                  {{ activeProject.caseStudy.solution }}
                </p>
              </div>

              <!-- Cột 3: Tác động & Kết quả -->
              <div class="pillar-col">
                <div class="pillar-col__head">
                  <span class="pillar-col__icon">✓</span>
                  <strong>Tác động &amp; Kết quả</strong>
                </div>
                <p class="pillar-col__text">
                  {{ activeProject.caseStudy.impact }}
                </p>
              </div>
            </div>

            <!-- Fallback Achievements for non-caseStudy projects -->
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

            <!-- Direct Actions / Demo Buttons if available -->
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
                    <span>🖥 {{ demo.label }} (Bản PC)</span>
                    <BaseIcon name="external" class="mini-ext" />
                  </a>
                  <a
                    v-if="demo.mobileUrl"
                    :href="resolveProjectUrl(demo.mobileUrl)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-demo-compact"
                  >
                    <span>📱 {{ demo.label }} (Bản Mobile)</span>
                    <BaseIcon name="external" class="mini-ext" />
                  </a>
                </template>
              </template>
              <ProductLinks v-else :links="projectLinks" compact />
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
  padding: clamp(0.75rem, 2vw, 1.5rem);
  background: rgba(10, 15, 29, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

[data-theme="light"] .lightbox-backdrop {
  background: rgba(15, 23, 42, 0.6);
}

.lightbox-dialog {
  position: relative;
  width: 100%;
  max-width: 980px;
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
  box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.8);
}

/* =====================================================================
   HEADER BAR
   ===================================================================== */
.lightbox-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.85rem 1.25rem 0.75rem;
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
  font-size: 1.12rem;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.015em;
  line-height: 1.25;
}

.lightbox-domain {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.lightbox-period {
  font-size: 0.7rem;
  color: var(--text-faint);
  font-family: var(--font-mono);
}

.lightbox-subheadline {
  font-size: 0.82rem;
  line-height: 1.4;
  color: var(--text-muted);
  margin: 0;
  font-weight: 500;
}

[data-theme="light"] .lightbox-subheadline {
  color: #334155;
}

/* Tech pills in header */
.lightbox-tech-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.1rem;
}

.tech-pill-compact {
  padding: 0.12rem 0.5rem;
  border-radius: 9999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-faint);
  font-size: 0.68rem;
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
  gap: 0.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
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
  user-select: none;
}

.lightbox-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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
  border-color: var(--border-strong, #94a3b8);
  transform: scale(1.05);
}

.close-icon {
  width: 16px;
  height: 16px;
}

/* =====================================================================
   BODY LAYOUT
   ===================================================================== */
.lightbox-body {
  overflow-y: auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

/* Stage Area (Compact Mockup) */
.lightbox-stage {
  padding: 0.6rem 1.25rem 0.4rem;
  background: var(--bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.stage-container {
  width: 100%;
  max-width: 940px;
}

.lightbox-image {
  max-width: 100%;
  max-height: 50vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Details Section */
.lightbox-details {
  padding: 0.75rem 1.25rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: var(--surface-solid);
}

[data-theme="light"] .lightbox-details {
  background: #ffffff;
}

/* =====================================================================
   KEY METRICS SECTION (REDUCED 30%, SUBTLE SLATE-50 / SOFT BORDER)
   ===================================================================== */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
}

.metric-box-compact {
  padding: 0.45rem 0.7rem;
  border-radius: 9px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  transition: border-color 180ms ease;
}

[data-theme="dark"] .metric-box-compact {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(51, 65, 85, 0.5);
}

.metric-box-compact:hover {
  border-color: #cbd5e1;
}

[data-theme="dark"] .metric-box-compact:hover {
  border-color: rgba(100, 116, 139, 0.6);
}

.metric-val-compact {
  font-size: 1.08rem;
  font-weight: 800;
  color: var(--text);
  font-family: var(--font-display, var(--font-sans));
  line-height: 1.2;
}

[data-theme="light"] .metric-val-compact {
  color: #0f172a;
}

.metric-lbl-compact {
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =====================================================================
   3-COLUMN SECTION (CHALLENGE / SOLUTION / IMPACT)
   ===================================================================== */
.pillars-3cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.pillar-col {
  padding: 0.6rem 0.8rem;
  border-radius: 9px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

[data-theme="light"] .pillar-col {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.pillar-col__head {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--text);
}

.pillar-col__icon {
  font-size: 0.78rem;
  opacity: 0.85;
}

.pillar-col__text {
  font-size: 0.76rem;
  line-height: 1.48;
  color: var(--text-muted);
  margin: 0;
}

[data-theme="light"] .pillar-col__text {
  color: #475569;
}

/* Fallback Achievements */
.achievements-compact {
  padding: 0.5rem 0;
}

.achievements-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.achievements-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--text);
  line-height: 1.4;
}

.check-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-weight: 700;
  font-size: 0.65rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.metric-text {
  font-weight: 700;
  color: var(--interactive-accent);
}

/* =====================================================================
   ACTIONS COMPACT ROW
   ===================================================================== */
.actions-compact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  padding-top: 0.15rem;
}

.btn-demo-compact {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 7px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.76rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 180ms ease;
}

[data-theme="light"] .btn-demo-compact {
  background: #ffffff;
  border-color: #cbd5e1;
}

.btn-demo-compact:hover {
  background: var(--interactive-soft);
  border-color: var(--interactive-accent);
  color: var(--interactive-accent);
}

.mini-ext {
  width: 0.72rem;
  height: 0.72rem;
}

/* =====================================================================
   TRANSITIONS & RESPONSIVE
   ===================================================================== */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 220ms ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-fade-enter-active .lightbox-dialog {
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease;
}

.lightbox-fade-leave-active .lightbox-dialog {
  transition: transform 180ms ease, opacity 180ms ease;
}

.lightbox-fade-enter-from .lightbox-dialog {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}

.lightbox-fade-leave-to .lightbox-dialog {
  opacity: 0;
  transform: scale(0.98) translateY(4px);
}

@media (max-width: 768px) {
  .lightbox-dialog {
    max-height: 96vh;
    border-radius: 14px;
  }
  .metrics-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .pillars-3cols {
    grid-template-columns: 1fr;
  }
}
</style>
