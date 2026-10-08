<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProjectCard from './ProjectCard.vue'
import SectionHead from './SectionHead.vue'
import { experiences } from '../data/experiences'
import { useCommandPalette } from '../composables/useCommandPalette'

const { activeFilter } = useCommandPalette()

watch(activeFilter, (newFilter) => {
  if (newFilter) {
    currentFilter.value = newFilter
    nextTick(() => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
})

// Career Milestones
const careerMilestones = experiences.map((exp) => ({
  id: exp.id,
  company: exp.company,
  role: exp.role,
  period: exp.period,
  summary: exp.summary,
  kind: exp.kind,
  agentMilestone: exp.agentMilestone,
}))

// Flat project collection with company attribution
const allProjects = computed(() => {
  return experiences.flatMap((exp) =>
    exp.projects.map((proj) => ({
      ...proj,
      company: exp.company,
      companyId: exp.companyId,
      experiencePeriod: exp.period,
      experienceId: exp.id,
    }))
  )
})

// Filter Tabs Definition
const filterTabs = [
  { id: 'all', label: 'Tất cả', icon: 'layers' },
  { id: 'vue', label: 'Vue / Nuxt', icon: 'code' },
  { id: 'react', label: 'React / Next.js', icon: 'code' },
  { id: 'design-system', label: 'Design System & UI', icon: 'sparkle' },
  { id: 'perf', label: 'Performance Optimization', icon: 'zap' },
]

const currentFilter = ref('all')

function matchesFilter(project, filterId) {
  if (filterId === 'all') return true
  const tags = project.categoryTags || []
  const tech = (project.techStack || []).map((t) => t.toLowerCase())

  if (filterId === 'vue') {
    return tags.includes('vue') || tech.some((t) => t.includes('vue') || t.includes('nuxt'))
  }
  if (filterId === 'react') {
    return (
      tags.includes('react') ||
      tech.some((t) => t.includes('react') || t.includes('next') || t.includes('component'))
    )
  }
  if (filterId === 'design-system') {
    return (
      tags.includes('design-system') ||
      tech.some((t) => t.includes('design') || t.includes('svg') || t.includes('gsap') || t.includes('animation') || t.includes('css'))
    )
  }
  if (filterId === 'perf') {
    return (
      tags.includes('perf') ||
      tech.some((t) => t.includes('perf') || t.includes('leaflet') || t.includes('gis') || t.includes('optimization') || t.includes('cache') || t.includes('redis'))
    )
  }
  return true
}

const filteredProjects = computed(() => {
  return allProjects.value.filter((p) => matchesFilter(p, currentFilter.value))
})

// Priority Flagship IDs for Tier 1: Top 3-4 flagship projects
const FLAGSHIP_IDS = ['landing-pages', 'experiments', 'government-map', 'maps']

// Tier 1: "Dự án tiêu biểu" (Featured Projects) - strictly 3-4 top projects in Split layout
const tier1FeaturedProjects = computed(() => {
  const flagships = filteredProjects.value.filter((p) => FLAGSHIP_IDS.includes(p.id))
  if (flagships.length >= 3) {
    return flagships.slice(0, 4)
  }
  // If fewer than 3 flagships match the current filter, top up with other matching projects
  const others = filteredProjects.value.filter((p) => !FLAGSHIP_IDS.includes(p.id))
  const combined = [...flagships, ...others]
  return combined.slice(0, Math.min(combined.length, 4))
})

// Tier 2: "Dự án khác / Hệ thống bổ trợ" (Other Projects / Archive)
const tier2OtherProjects = computed(() => {
  const featuredIds = new Set(tier1FeaturedProjects.value.map((p) => p.id))
  return filteredProjects.value.filter((p) => !featuredIds.has(p.id))
})

// Archive expansion & load more state
const isArchiveExpanded = ref(false)
const INITIAL_ARCHIVE_COUNT = 6

const visibleArchiveProjects = computed(() => {
  if (isArchiveExpanded.value) {
    return tier2OtherProjects.value
  }
  return tier2OtherProjects.value.slice(0, INITIAL_ARCHIVE_COUNT)
})

const remainingArchiveCount = computed(() => {
  return Math.max(0, tier2OtherProjects.value.length - INITIAL_ARCHIVE_COUNT)
})

function toggleArchive() {
  isArchiveExpanded.value = !isArchiveExpanded.value
  if (!isArchiveExpanded.value) {
    nextTick(() => {
      document.getElementById('archive-section-head')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }
}

const tabCounts = computed(() => {
  const counts = {}
  for (const tab of filterTabs) {
    counts[tab.id] = allProjects.value.filter((p) => matchesFilter(p, tab.id)).length
  }
  return counts
})

function setFilter(filterId) {
  currentFilter.value = filterId
  isArchiveExpanded.value = false
  nextTick(() => {
    const anchor = document.getElementById('projects-grid-start') || document.getElementById('experience')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

// Deep linking to projects
const revealLinkedProject = async () => {
  const requestedHash = window.location.hash
  if (!requestedHash) return
  let targetId
  try {
    targetId = decodeURIComponent(requestedHash.slice(1))
  } catch {
    return
  }
  if (!targetId.startsWith('project-') && targetId !== 'experience' && targetId !== 'projects' && targetId !== 'showcase' && targetId !== 'agent-milestone') return

  if (targetId.startsWith('project-')) {
    const rawProjectId = targetId.replace('project-', '')
    const isInTier2 = tier2OtherProjects.value.some((p) => p.id === rawProjectId)
    if (isInTier2) {
      isArchiveExpanded.value = true
    }
  }

  await nextTick()
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  revealLinkedProject()
  window.addEventListener('hashchange', revealLinkedProject)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', revealLinkedProject)
})
</script>

<template>
  <section id="experience" aria-labelledby="experience-title" class="experience-section">
    <span id="projects" class="experience-anchor" aria-hidden="true" />
    <span id="showcase" class="experience-anchor" aria-hidden="true" />

    <div class="container">
      <!-- Section Header -->
      <SectionHead
        eyebrow="02 — Kinh nghiệm & dự án"
        title="Visual Case Studies & Dự án"
        title-id="experience-title"
        sub="Tổng hợp các dự án kỹ thuật tiêu biểu theo dạng Case Study: Thách thức kiến trúc, giải pháp Frontend và tác động định lượng thực tế."
      />

      <!-- Career Journey Roadmap / Milestones Overview -->
      <div class="career-roadmap card" role="region" aria-label="Lộ trình sự nghiệp và mốc phát triển">
        <div class="career-roadmap__head">
          <span class="roadmap-badge">
            <BaseIcon name="briefcase" /> Lộ trình sự nghiệp
          </span>
          <span class="roadmap-sub">VCcorp (2019 — Nay) &amp; Đại học Mở Hà Nội (2016 — 2019)</span>
        </div>

        <div class="career-timeline-track">
          <!-- Item 1: VCcorp Current -->
          <div class="timeline-stop timeline-stop--active">
            <div class="stop-dot is-pulsing" />
            <div class="stop-content">
              <div class="stop-period">08/2025 — Hiện tại</div>
              <strong class="stop-title">VCcorp · Senior Frontend / UI-UX Engineer</strong>
              <div id="agent-milestone" class="stop-milestone">
                <BaseIcon name="sparkle" class="sparkle-icon" />
                <span>Trở lại công việc &amp; Bắt đầu sử dụng AI Agent tự động hóa workflow</span>
              </div>
            </div>
          </div>

          <!-- Item 2: VCcorp Pre-agents -->
          <div class="timeline-stop">
            <div class="stop-dot" />
            <div class="stop-content">
              <div class="stop-period">2019 — Trước 08/2025</div>
              <strong class="stop-title">VCcorp · Frontend Developer &amp; AdTech Specialist</strong>
              <p class="stop-desc">Xây dựng &amp; vận hành AdServing, A/B Testing, Interactive GIS Maps &amp; Emagazine.</p>
            </div>
          </div>

          <!-- Item 3: Research & Transfer -->
          <div class="timeline-stop">
            <div class="stop-dot" />
            <div class="stop-content">
              <div class="stop-period">2016 — 2019</div>
              <strong class="stop-title">Viện Đại học Mở Hà Nội · R&amp;D Tuyển sinh &amp; Đào tạo</strong>
              <p class="stop-desc">Nghiên cứu &amp; phát triển phần mềm quản lý đào tạo phi chính quy.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE TAG FILTER BAR -->
      <div class="filter-wrapper">
        <div class="filter-bar" role="tablist" aria-label="Bộ lọc công nghệ dự án">
          <button
            v-for="tab in filterTabs"
            :key="tab.id"
            type="button"
            class="filter-tab-btn"
            :class="{ 'is-active': currentFilter === tab.id }"
            role="tab"
            :aria-selected="currentFilter === tab.id"
            @click="setFilter(tab.id)"
          >
            <BaseIcon :name="tab.icon" class="filter-icon" />
            <span class="filter-label">{{ tab.label }}</span>
            <span class="filter-count">({{ tabCounts[tab.id] }})</span>
          </button>
        </div>
      </div>

      <!-- Scroll Anchor for Filter changes & Quick Navigation -->
      <div id="projects-grid-start" class="projects-scroll-anchor" aria-hidden="true" />

      <!-- 1. TIER 1: FEATURED VISUAL CASE STUDIES (SPLIT LAYOUT) -->
      <div class="case-studies-section" role="region" aria-label="Danh sách Dự án Tiêu biểu">
        <div class="section-subhead">
          <div class="section-subhead__info">
            <h3 class="section-subhead__title">
              Dự án Tiêu Biểu (Featured Projects)
              <span class="count-tag">{{ tier1FeaturedProjects.length }} dự án</span>
            </h3>
            <p class="section-subhead__desc">
              Phân tích sâu bài toán kỹ thuật, kiến trúc giải pháp và số liệu kiểm chứng thực tế.
            </p>
          </div>
        </div>

        <!-- Stagger / Animated Case Studies Grid -->
        <TransitionGroup name="stagger-list" tag="div" class="case-studies-grid">
          <ProjectCard
            v-for="project in tier1FeaturedProjects"
            :key="project.id"
            :project="project"
          />
        </TransitionGroup>

        <div v-if="tier1FeaturedProjects.length === 0" class="empty-filter-box card">
          <BaseIcon name="search" class="empty-icon" />
          <p>Không có dự án tiêu biểu nào phù hợp với bộ lọc "{{ filterTabs.find(t => t.id === currentFilter)?.label }}".</p>
          <button type="button" class="btn btn--secondary btn--sm" @click="setFilter('all')">
            Xem tất cả dự án
          </button>
        </div>
      </div>

      <!-- 2. TIER 2: OTHER PROJECTS / ARCHIVE (BENTO COMPACT GRID 2-3 COLUMNS) -->
      <div
        v-if="tier2OtherProjects.length > 0"
        class="archive-section"
        role="region"
        aria-label="Dự án khác và hệ thống bổ trợ"
      >
        <div id="archive-section-head" class="archive-header">
          <div class="archive-header__info">
            <h4 class="archive-header__title">
              <BaseIcon name="layers" class="archive-icon" />
              Dự án Khác &amp; Hệ thống Bổ trợ (Archive &amp; Ecosystem)
              <span class="count-tag">{{ tier2OtherProjects.length }} dự án</span>
            </h4>
            <p class="archive-header__desc">
              Các sản phẩm bổ trợ, công cụ nội bộ và module tính năng trong hệ sinh thái.
            </p>
          </div>
        </div>

        <!-- Compact Bento Grid with Stagger Animation -->
        <TransitionGroup name="stagger-compact" tag="div" class="archive-grid">
          <ProjectCard
            v-for="project in visibleArchiveProjects"
            :key="project.id"
            :project="project"
            compact
          />
        </TransitionGroup>

        <!-- Load More / Collapse Button -->
        <div v-if="tier2OtherProjects.length > INITIAL_ARCHIVE_COUNT" class="archive-actions">
          <button
            type="button"
            class="btn-load-more"
            :class="{ 'is-expanded': isArchiveExpanded }"
            @click="toggleArchive"
            :aria-expanded="isArchiveExpanded"
          >
            <span class="btn-load-more__text">
              <template v-if="!isArchiveExpanded">
                Xem thêm {{ remainingArchiveCount }} dự án khác
              </template>
              <template v-else>
                Thu gọn bớt dự án
              </template>
            </span>
            <span class="btn-load-more__icon-box">
              <svg
                class="arrow-icon"
                :class="{ 'is-rotated': isArchiveExpanded }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  padding: clamp(3rem, 6vw, 6rem) 0;
}

.experience-anchor {
  display: block;
  height: 0;
  scroll-margin-top: calc(var(--nav-h) + 20px);
}

/* =====================================================================
   CAREER ROADMAP BANNER
   ===================================================================== */
.career-roadmap {
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: clamp(1.25rem, 2vw, 1.75rem);
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-sm);
}

[data-theme="light"] .career-roadmap {
  background: #ffffff;
  border-color: #e2e8f0;
}

.career-roadmap__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}

.roadmap-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--interactive-accent);
}

.roadmap-sub {
  font-size: 0.78rem;
  color: var(--text-faint);
  font-family: var(--font-mono);
}

.career-timeline-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 840px) {
  .career-timeline-track {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.timeline-stop {
  position: relative;
  display: flex;
  gap: 0.85rem;
}

.stop-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #94a3b8;
  margin-top: 0.3rem;
  flex-shrink: 0;
}

.timeline-stop--active .stop-dot {
  background: var(--interactive-accent);
  box-shadow: 0 0 0 4px var(--interactive-soft);
}

.is-pulsing {
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
}

.stop-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.stop-period {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-faint);
  font-weight: 600;
}

.stop-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
}

.stop-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.stop-milestone {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.35rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.4;
}

.sparkle-icon {
  width: 0.85rem;
  height: 0.85rem;
  flex-shrink: 0;
}

/* =====================================================================
   INTERACTIVE TAG FILTER BAR
   ===================================================================== */
.filter-wrapper {
  position: sticky;
  top: calc(var(--nav-h) + 10px);
  z-index: 45;
  margin-bottom: 2.5rem;
  padding: 0.35rem 0;
  pointer-events: none;
}

.filter-bar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.55rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  transition: box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease;
}

.filter-bar::-webkit-scrollbar {
  display: none;
}

[data-theme="dark"] .filter-bar {
  background: rgba(15, 23, 42, 0.85);
  border-color: rgba(51, 65, 85, 0.7);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.2);
}

.filter-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 180ms ease;
  user-select: none;
}

.filter-tab-btn:hover {
  background: var(--bg-soft);
  color: var(--text);
}

.filter-tab-btn.is-active {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
  font-weight: 700;
  box-shadow: 0 1px 2px 0 rgb(15 23 42 / 0.05);
}

.filter-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.filter-count {
  font-size: 0.75rem;
  opacity: 0.75;
  font-family: var(--font-mono);
}

/* =====================================================================
   SECTION SUBHEAD
   ===================================================================== */
.section-subhead {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.section-subhead__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text);
}

.count-tag {
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.section-subhead__desc {
  font-size: 0.82rem;
  color: var(--text-faint);
  margin-top: 0.25rem;
}

/* =====================================================================
   CASE STUDIES GRID & STAGGER ANIMATIONS
   ===================================================================== */
.case-studies-grid {
  display: grid;
  gap: 2.5rem;
}

.stagger-list-move,
.stagger-list-enter-active,
.stagger-list-leave-active {
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.stagger-list-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.empty-filter-box {
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-radius: 16px;
  background: var(--surface-solid);
  border: 1px dashed var(--border);
  color: var(--text-muted);
}

.empty-icon {
  width: 2rem;
  height: 2rem;
  color: var(--text-faint);
}

.projects-scroll-anchor {
  display: block;
  height: 0;
  scroll-margin-top: calc(var(--nav-h) + 70px);
}

/* =====================================================================
   TIER 2: ARCHIVE & SUPPORTING PROJECTS (COMPACT BENTO 2-3 COLS)
   ===================================================================== */
.archive-section {
  margin-top: 4.5rem;
  padding-top: 3.5rem;
  border-top: 1px solid var(--border);
}

.archive-header {
  margin-bottom: 1.75rem;
  scroll-margin-top: calc(var(--nav-h) + 80px);
}

.archive-header__title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.archive-icon {
  width: 1.15rem;
  height: 1.15rem;
  color: var(--interactive-accent);
}

.archive-header__desc {
  font-size: 0.82rem;
  color: var(--text-faint);
  margin-top: 0.25rem;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;
}

@media (max-width: 1024px) {
  .archive-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }
}

/* Compact Stagger Transitions */
.stagger-compact-move,
.stagger-compact-enter-active,
.stagger-compact-leave-active {
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-compact-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.stagger-compact-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

/* Load More / Expand Button */
.archive-actions {
  display: flex;
  justify-content: center;
  margin-top: 2.75rem;
}

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.85rem;
  border-radius: 9999px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

[data-theme="light"] .btn-load-more {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #1e293b;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.btn-load-more:hover {
  background: var(--bg-soft);
  border-color: var(--interactive-accent);
  color: var(--interactive-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.12);
}

.btn-load-more:active {
  transform: translateY(0);
}

.btn-load-more__text {
  letter-spacing: -0.01em;
}

.btn-load-more__icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.arrow-icon {
  width: 14px;
  height: 14px;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  animation: arrow-bounce 1.5s infinite ease-in-out;
}

.arrow-icon.is-rotated {
  animation: none;
  transform: rotate(180deg);
}

@keyframes arrow-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}
</style>
