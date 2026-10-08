<script setup>
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import ProjectMockupPreview from './ProjectMockupPreview.vue'
import { getAchievementSegments, getProjectDeliveryLabel, getProjectLinks } from '../utils/portfolio'

const props = defineProps({
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})

const deliveryLabel = computed(() => getProjectDeliveryLabel(props.project))
const links = computed(() => getProjectLinks(props.project))
const achievements = computed(() => (props.project.achievements ?? []).map(getAchievementSegments))
const hasCaseStudy = computed(() => Boolean(props.project.caseStudy))
</script>

<template>
  <!-- CASE STUDY FEATURED LAYOUT -->
  <article
    v-if="!compact"
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card case-study-card card--spotlight-layer"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="card-spotlight" aria-hidden="true" />

    <div class="case-study-grid">
      <!-- 1. VISUAL PREVIEW COLUMN -->
      <div class="case-study__visual">
        <ProjectMockupPreview :project="project" />
      </div>

      <!-- 2. CONTENT & TECHNICAL DEEP-DIVE COLUMN -->
      <div class="case-study__content">
        <!-- Top Meta Row -->
        <header class="case-study__meta-bar">
          <div class="case-study__badges">
            <span class="featured-project-badge">
              ⭐ Featured Project
            </span>
            <span v-if="project.domain" class="domain-badge">
              <BaseIcon name="layers" class="badge-icon" />
              {{ project.domain }}
            </span>
          </div>

          <div class="case-study__time-role">
            <span v-if="project.period" class="time-pill">
              <BaseIcon name="calendar" class="badge-icon" />
              {{ project.period }}
            </span>
            <span v-else-if="project.delivery === 'before-ai'" class="time-pill">
              {{ deliveryLabel }}
            </span>
          </div>
        </header>

        <!-- Project Title & Subtitle -->
        <div class="case-study__heading">
          <h4 :id="`project-title-${project.id}`" class="case-study__title">
            {{ project.name }}
          </h4>
          <p v-if="project.role" class="case-study__role">
            {{ project.role }}
          </p>
        </div>

        <p v-if="project.description" class="case-study__desc">
          {{ project.description }}
        </p>

        <!-- CASE STUDY: CHALLENGE & SOLUTION + DEDICATED KPI CALLOUT -->
        <div v-if="project.caseStudy" class="case-study__body-wrap">
          <!-- 1. Context: Challenge & Solution -->
          <div class="case-study__flow">
            <div class="flow-item flow-item--challenge">
              <div class="flow-item__head">
                <span class="flow-icon flow-icon--amber">⚡</span>
                <strong>Thách thức kỹ thuật (Challenge):</strong>
              </div>
              <p class="flow-item__body">
                {{ project.caseStudy.challenge }}
              </p>
            </div>

            <div class="flow-item flow-item--solution">
              <div class="flow-item__head">
                <span class="flow-icon flow-icon--indigo">⚙</span>
                <strong>Giải pháp Frontend (Solution):</strong>
              </div>
              <p class="flow-item__body">
                {{ project.caseStudy.solution }}
              </p>
            </div>
          </div>

          <!-- 2. Dedicated KPI Callout: Outcome & Key Impact -->
          <div class="kpi-callout">
            <div class="kpi-callout__head">
              <div class="kpi-callout__badge">
                <span class="pulse-indicator" />
                <svg class="kpi-head-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <strong>Kết quả &amp; Thước đo (Key Impact)</strong>
              </div>
            </div>

            <p v-if="project.caseStudy.impact" class="kpi-callout__summary">
              {{ project.caseStudy.impact }}
            </p>

            <!-- Metrics Grid 2 Columns -->
            <div v-if="project.caseStudy.metrics?.length" class="kpi-grid">
              <div
                v-for="metric in project.caseStudy.metrics"
                :key="metric.label"
                class="kpi-pill"
              >
                <div class="kpi-pill__icon-box">
                  <svg class="kpi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div class="kpi-pill__info">
                  <span class="kpi-pill__val">{{ metric.value }}</span>
                  <span class="kpi-pill__lbl">{{ metric.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback Achievements List if no structured case study -->
        <div v-else-if="achievements.length" class="case-study__achievements">
          <ul class="achievement-list" role="list">
            <li v-for="(achievement, index) in achievements" :key="index">
              <span class="check-icon">✓</span>
              <span>
                <template v-for="(segment, segIdx) in achievement" :key="segIdx">
                  <strong v-if="segment.isMetric">{{ segment.text }}</strong>
                  <template v-else>{{ segment.text }}</template>
                </template>
              </span>
            </li>
          </ul>
        </div>

        <!-- Tech Stack Pills & Action Links -->
        <footer class="case-study__footer">
          <ul v-if="project.techStack?.length" class="tech-pills" role="list" aria-label="Công nghệ sử dụng">
            <li v-for="tech in project.techStack" :key="tech" class="tech-pill-item">
              {{ tech }}
            </li>
          </ul>

          <div v-if="links.length" class="case-study__actions">
            <ProductLinks :links="links" compact />
          </div>
        </footer>
      </div>
    </div>
  </article>

  <!-- SECONDARY / COMPACT SUPPORTING PROJECT LAYOUT -->
  <article
    v-else
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card compact-project-card card--spotlight-layer"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="card-spotlight" aria-hidden="true" />

    <!-- Mockup thumbnail nhỏ -->
    <div class="compact-card__thumb">
      <ProjectMockupPreview :project="project" mini />
    </div>

    <div class="compact-card__body">
      <header class="compact-card__header">
        <div class="compact-card__meta">
          <span v-if="project.domain" class="compact-domain">{{ project.domain }}</span>
          <span v-else-if="project.status" class="compact-status">{{ project.status }}</span>
          <span v-if="project.period" class="compact-period">{{ project.period }}</span>
        </div>
        <h4 :id="`project-title-${project.id}`" class="compact-card__title">
          {{ project.name }}
        </h4>
        <p v-if="project.role" class="compact-card__role">{{ project.role }}</p>
      </header>

      <p v-if="project.description" class="compact-card__desc">
        {{ project.description }}
      </p>

      <footer class="compact-card__footer">
        <ul v-if="project.techStack?.length" class="tech-pills tech-pills--mini" role="list" aria-label="3 công nghệ chính">
          <li v-for="tech in project.techStack.slice(0, 3)" :key="tech" class="tech-pill-item">
            {{ tech }}
          </li>
        </ul>
        <ProductLinks v-if="links.length" :links="links" compact class="compact-card__links" />
        <span v-else class="compact-card__doc-badge">
          <BaseIcon name="layers" class="mini-icon" /> Chi tiết kỹ thuật
        </span>
      </footer>
    </div>
  </article>
</template>

<style scoped>
/* =====================================================================
   CASE STUDY FEATURED CARD STYLES
   ===================================================================== */
.case-study-card {
  --case-accent: var(--accent);
  --case-accent-soft: var(--interactive-soft);
  position: relative;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  box-shadow: var(--shadow-sm);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
              border-color 300ms ease,
              box-shadow 300ms ease;
  scroll-margin-top: calc(var(--nav-h) + 80px);
  overflow: hidden;
}

[data-theme="light"] .case-study-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px 0 rgb(15 23 42 / 0.05), 0 1px 2px -1px rgb(15 23 42 / 0.05);
}

.case-study-card:hover {
  transform: translateY(-4px);
  border-color: var(--interactive-border);
  box-shadow: var(--interactive-elevation);
}

.case-study-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.25fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
  align-items: start;
}

@media (max-width: 960px) {
  .case-study-grid {
    grid-template-columns: 1fr;
  }
}

.case-study__visual {
  position: sticky;
  top: calc(var(--nav-h) + 80px);
  width: 100%;
}

.case-study__content {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  min-width: 0;
}

/* Meta Bar */
.case-study__meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.case-study__badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.domain-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.domain-badge .badge-icon {
  width: 0.8rem;
  height: 0.8rem;
}

.featured-project-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  color: #92400e;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 3px 0 rgb(245 158 11 / 0.15);
}

[data-theme="dark"] .featured-project-badge {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
  color: #fcd34d;
}

.case-study__time-role {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-faint);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.time-pill .badge-icon {
  width: 0.75rem;
  height: 0.75rem;
}

/* Heading */
.case-study__heading {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.case-study__title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
  letter-spacing: -0.015em;
  transition: color 200ms ease;
}

.case-study-card:hover .case-study__title {
  color: var(--case-accent);
}

.case-study__role {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--interactive-accent);
}

.case-study__desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
}

/* CASE STUDY FLOW: CHALLENGE & SOLUTION */
.case-study__body-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 0.4rem;
}

.case-study__flow {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.flow-item {
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.flow-item--challenge {
  border-left: 3.5px solid #f59e0b;
}

[data-theme="light"] .flow-item--challenge {
  background: rgba(254, 243, 199, 0.3);
  border-color: rgba(245, 158, 11, 0.22);
  border-left-color: #d97706;
}

[data-theme="dark"] .flow-item--challenge {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.25);
  border-left-color: #f59e0b;
}

.flow-item--solution {
  border-left: 3.5px solid #6366f1;
}

[data-theme="light"] .flow-item--solution {
  background: rgba(238, 242, 255, 0.4);
  border-color: rgba(99, 102, 241, 0.22);
  border-left-color: #4f46e5;
}

[data-theme="dark"] .flow-item--solution {
  background: rgba(99, 102, 241, 0.08);
  border-color: rgba(99, 102, 241, 0.25);
  border-left-color: #6366f1;
}

.flow-item__head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text);
}

.flow-icon {
  font-size: 0.85rem;
}
.flow-icon--amber { color: #d97706; }
.flow-icon--indigo { color: #4f46e5; }

.flow-item__body {
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--text-muted);
  margin: 0;
}

/* =====================================================================
   DEDICATED KPI CALLOUT: KEY IMPACT & METRICS
   ===================================================================== */
.kpi-callout {
  padding: 1.1rem 1.25rem;
  border-radius: 14px;
  background: rgba(236, 253, 245, 0.65);
  border: 1px solid rgba(16, 185, 129, 0.28);
  box-shadow: 0 4px 15px -3px rgba(16, 185, 129, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

[data-theme="dark"] .kpi-callout {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.25);
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.3);
}

.kpi-callout__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi-callout__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: #047857;
  letter-spacing: -0.01em;
}

[data-theme="dark"] .kpi-callout__badge {
  color: #34d399;
}

.kpi-head-icon {
  width: 14px;
  height: 14px;
  color: #059669;
}

[data-theme="dark"] .kpi-head-icon {
  color: #34d399;
}

.kpi-callout__summary {
  font-size: 0.825rem;
  line-height: 1.6;
  color: var(--text);
  margin: 0;
  font-weight: 500;
}

[data-theme="light"] .kpi-callout__summary {
  color: #1e293b;
}

/* KPI Badges 2-Column Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
  margin-top: 0.25rem;
}

@media (max-width: 520px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}

.kpi-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.8rem;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba(16, 185, 129, 0.22);
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

[data-theme="dark"] .kpi-pill {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(16, 185, 129, 0.3);
}

.kpi-pill:hover {
  transform: translateY(-1.5px);
  border-color: #10b981;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.12);
}

.kpi-pill__icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
  flex-shrink: 0;
}

[data-theme="dark"] .kpi-pill__icon-box {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.kpi-icon {
  width: 12px;
  height: 12px;
}

.kpi-pill__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.kpi-pill__val {
  font-size: 0.95rem;
  font-weight: 800;
  color: #047857;
  line-height: 1.25;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}

[data-theme="dark"] .kpi-pill__val {
  color: #34d399;
}

.kpi-pill__lbl {
  font-size: 0.68rem;
  font-weight: 600;
  color: #64748b;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[data-theme="dark"] .kpi-pill__lbl {
  color: #94a3b8;
}

/* Achievements List fallback */
.achievement-list {
  display: grid;
  gap: 0.4rem;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.achievement-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.check-icon {
  flex-shrink: 0;
  color: var(--case-accent);
  font-weight: 800;
}

.achievement-list strong {
  color: var(--text);
  font-weight: 700;
}

/* Tech Stack & Footer */
.case-study__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill-item {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid var(--border);
  transition: all 150ms ease;
}

.tech-pill-item:hover {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
}

.case-study__actions {
  margin-left: auto;
}

/* =====================================================================
   COMPACT SUPPORTING PROJECT CARD STYLES
   ===================================================================== */
.compact-project-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 16px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
  scroll-margin-top: calc(var(--nav-h) + 80px);
  overflow: hidden;
}

[data-theme="light"] .compact-project-card {
  background: #ffffff;
  border-color: #e2e8f0;
}

.compact-project-card:hover {
  transform: translateY(-4px);
  border-color: var(--interactive-border);
  box-shadow: var(--interactive-elevation);
}

.compact-card__thumb {
  width: 100%;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.compact-card__body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 1.15rem;
}

.compact-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.compact-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
}

.compact-domain {
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  font-weight: 600;
}

.compact-status {
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--bg-soft);
  color: var(--text-faint);
}

.compact-period {
  font-family: var(--font-mono);
  color: var(--text-faint);
}

.compact-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.35;
  transition: color 200ms ease;
}

.compact-project-card:hover .compact-card__title {
  color: var(--accent);
}

.compact-card__role {
  font-size: 0.75rem;
  color: var(--text-faint);
  font-weight: 500;
}

.compact-card__desc {
  font-size: 0.78rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0.75rem 0;
}

.compact-card__achievements {
  margin-bottom: 0.85rem;
  padding: 0.5rem 0.65rem;
  border-radius: 8px;
  background: var(--bg-soft);
}

.achievement-list--mini {
  gap: 0.25rem;
  font-size: 0.72rem;
}

.compact-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.tech-pills--mini {
  gap: 0.3rem;
}

.tech-pills--mini .tech-pill-item {
  padding: 0.15rem 0.45rem;
  font-size: 0.65rem;
}

.compact-card__links {
  margin-top: 0.25rem;
}

.compact-card__doc-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--text-faint);
  font-family: var(--font-mono);
  margin-top: 0.25rem;
}

.compact-card__doc-badge .mini-icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
