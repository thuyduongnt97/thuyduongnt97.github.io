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

    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <SectionHead
        eyebrow="02 — Dự án &amp; Case Studies"
        title="Visual Case Studies &amp; Dự án thực tế"
        title-id="experience-title"
        sub="Tổng hợp các dự án kỹ thuật tiêu biểu theo dạng Case Study: Thách thức kiến trúc, giải pháp Frontend và tác động định lượng thực tế."
      />

      <!-- INTERACTIVE TAG FILTER BAR -->
      <div class="filter-wrapper sticky top-16 z-30 mb-8 py-2">
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
            <span class="filter-count font-mono">({{ tabCounts[tab.id] }})</span>
          </button>
        </div>
      </div>

      <!-- Scroll Anchor for Filter changes & Quick Navigation -->
      <div id="projects-grid-start" class="projects-scroll-anchor" aria-hidden="true" />

      <!-- 1. TIER 1: FEATURED VISUAL CASE STUDIES (SPLIT LAYOUT) -->
      <div class="case-studies-section" role="region" aria-label="Danh sách Dự án Tiêu biểu">
        <div class="section-subhead">
          <div class="section-subhead__info">
            <h3 class="section-subhead__title font-display">
              Dự án Tiêu Biểu (Featured Projects)
              <span class="count-tag font-mono">{{ tier1FeaturedProjects.length }} dự án</span>
            </h3>
            <p class="section-subhead__desc">
              Phân tích sâu bài toán kỹ thuật, kiến trúc giải pháp và số liệu kiểm chứng thực tế.
            </p>
          </div>
        </div>

        <!-- Stagger / Animated Case Studies Grid -->
        <TransitionGroup name="stagger-list" tag="div" class="case-studies-grid grid gap-7 sm:gap-8">
          <ProjectCard
            v-for="(project, index) in tier1FeaturedProjects"
            :key="project.id"
            :project="project"
            :index="index"
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

      <!-- 2. TIER 2: OTHER PROJECTS / ARCHIVE (BENTO COMPACT GRID) -->
      <div
        v-if="tier2OtherProjects.length > 0"
        class="archive-section"
        role="region"
        aria-label="Dự án khác và hệ thống bổ trợ"
      >
        <div id="archive-section-head" class="archive-header">
          <div class="archive-header__info">
            <h4 class="archive-header__title font-display">
              <BaseIcon name="layers" class="archive-icon" />
              Dự án Khác &amp; Hệ thống Bổ trợ (Archive &amp; Ecosystem)
              <span class="count-tag font-mono">{{ tier2OtherProjects.length }} dự án</span>
            </h4>
            <p class="archive-header__desc">
              Các sản phẩm bổ trợ, công cụ nội bộ và module tính năng trong hệ sinh thái.
            </p>
          </div>
        </div>

        <!-- Compact Bento Grid with Stagger Animation -->
        <TransitionGroup name="stagger-compact" tag="div" class="archive-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
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
                class="arrow-chevron"
                :class="{ 'rotate-180': isArchiveExpanded }"
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
  padding-top: clamp(3rem, 6vw, 5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.experience-anchor,
.projects-scroll-anchor {
  display: block;
  height: 0;
  scroll-margin-top: 6rem;
}

/* Filter bar */
.filter-wrapper {
  pointer-events: none;
}

.filter-bar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.45rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface-solid) 85%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-bar::-webkit-scrollbar {
  display: none;
}

.filter-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid transparent;
  background: transparent;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  transition: all 180ms ease;
}

.filter-tab-btn:hover {
  color: var(--text);
  background: var(--bg-soft);
}

.filter-tab-btn.is-active {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
  box-shadow: var(--shadow-sm);
}

.filter-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.filter-count {
  font-size: 0.72rem;
  opacity: 0.75;
}

/* Subhead */
.case-studies-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-subhead {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-subhead__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text);
}

.count-tag {
  display: inline-block;
  padding: 0.15rem 0.65rem;
  border-radius: 9999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
}

.section-subhead__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Empty filter state */
.empty-filter-box {
  padding: 3rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  background: var(--surface-solid);
  border: 1px dashed var(--border);
  color: var(--text-muted);
}

.empty-icon {
  width: 2rem;
  height: 2rem;
  color: var(--text-faint);
}

/* Archive */
.archive-section {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
}

.archive-header {
  margin-bottom: 1.5rem;
  scroll-margin-top: 8rem;
}

.archive-header__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 700;
  color: var(--text);
}

.archive-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--interactive-accent);
}

.archive-header__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.archive-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.btn-load-more:hover {
  border-color: var(--interactive-accent);
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  transform: translateY(-1px);
}

.btn-load-more__icon-box {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-chevron {
  width: 0.875rem;
  height: 0.875rem;
  transition: transform 300ms ease;
}

.arrow-chevron.rotate-180 {
  transform: rotate(180deg);
}

/* Vue TransitionGroup animations */
.stagger-list-move,
.stagger-list-enter-active,
.stagger-list-leave-active,
.stagger-compact-move,
.stagger-compact-enter-active,
.stagger-compact-leave-active {
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-list-enter-from,
.stagger-compact-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.stagger-list-leave-to,
.stagger-compact-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
