<script setup>
import { computed, ref, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { deliverablesSection } from '../data/experiences'
import { useDeliverables } from '../composables/useDeliverables'
import { useLocale } from '../composables/useLocale'

const props = defineProps({ activeCategory: { type: String, default: 'all' } })
const emit = defineEmits(['update:activeCategory'])
const { filters, mainGroups, supportingGroups, setFilter, visibleGroups } = useDeliverables(props, emit)
const { pick } = useLocale()
const filterStrip = ref(null)
const showMore = ref(false)

const coreGroupIds = new Set(['adtech-tools', 'template-widgets', 'spatial-maps'])
const coreGroups = computed(() =>
  mainGroups.value.filter(group => group.tier === 'core' || coreGroupIds.has(group.id))
)
const secondaryGroups = computed(() =>
  mainGroups.value.filter(group => group.tier !== 'core' && !coreGroupIds.has(group.id))
)

const isActive = item => props.activeCategory === item.id

watch(
  () => props.activeCategory,
  () => {
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    filterStrip.value?.querySelector('[aria-pressed="true"]')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  },
  { flush: 'post' }
)
</script>

<template>
  <section
    id="deliverables"
    class="py-14 scroll-mt-20"
    aria-labelledby="deliverables-heading"
  >
    <span id="experience" class="absolute top-0 scroll-mt-20" aria-hidden="true" />

    <!-- Section Header + Horizontal Filter Bar -->
    <div v-reveal class="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div class="min-w-0 max-w-3xl">
        <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
          {{ pick(deliverablesSection.eyebrow, deliverablesSection.eyebrowEn) }}
        </span>
        <h2
          id="deliverables-heading"
          class="mt-1 text-2xl font-extrabold sm:text-[32px] sm:leading-tight text-slate-900 dark:text-white"
        >
          {{ pick(deliverablesSection.title, deliverablesSection.titleEn) }}
        </h2>
        <p class="mt-2 text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          {{ pick(deliverablesSection.description, deliverablesSection.descriptionEn) }}
        </p>
      </div>

      <div v-if="activeCategory !== 'all'" class="shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 px-4 py-2 font-mono text-xs font-bold text-amber-700 transition hover:bg-amber-500/25 dark:text-amber-300 cursor-pointer"
          @click="setFilter('all')"
        >
          <span>✕ {{ pick('Đang lọc — Xem tất cả dự án', 'Filtered — Show all projects') }}</span>
        </button>
      </div>
    </div>

    <!-- Thanh lọc nhanh theo mảng (Pill Strip) -->
    <div
      ref="filterStrip"
      class="mb-8 -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      role="group"
      :aria-label="pick('Lọc danh mục dự án', 'Filter projects by category')"
    >
      <button
        v-for="filter in filters"
        :id="'filter-' + filter.id"
        :key="filter.id"
        type="button"
        :aria-pressed="Boolean(isActive(filter))"
        aria-controls="project-results"
        class="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        :class="
          isActive(filter)
            ? 'border-amber-500 bg-amber-500 font-bold text-slate-950 shadow-sm shadow-amber-500/20'
            : 'border-slate-200 bg-white text-slate-700 hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
        "
        @click="setFilter(filter.id)"
      >
        <span>{{ pick(filter.label, filter.labelEn) }}</span>
        <span
          class="rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold"
          :class="isActive(filter) ? 'bg-slate-950/15 text-slate-950' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
        >
          {{ filter.count }}
        </span>
      </button>
    </div>

    <div id="project-results" class="min-w-0 space-y-10">
      <p class="sr-only" role="status" aria-live="polite">
        {{ pick(`Đang hiển thị ${visibleGroups.length} nhóm dự án.`, `Showing ${visibleGroups.length} project groups.`) }}
      </p>

      <!-- Tầng 1: 03 Dự án Trọng điểm (Core Case Studies) -->
      <div v-if="coreGroups.length" class="space-y-5">
        <div class="flex items-center gap-3">
          <h3 class="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {{ pick(deliverablesSection.coreHeading, deliverablesSection.coreHeadingEn) }}
          </h3>
          <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div class="space-y-6">
          <ProjectCard
            v-for="group in coreGroups"
            :key="group.id"
            :group="group"
          />
        </div>
      </div>

      <!-- Tầng 2 & 3: Secondary + Supporting — collapsed by default to reduce scroll fatigue -->
      <div v-if="secondaryGroups.length || supportingGroups.length" class="space-y-5">
        <!-- Toggle button -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-mono text-xs sm:text-sm font-bold text-slate-700 transition-all hover:border-amber-500 hover:text-amber-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-amber-400 cursor-pointer"
            :aria-expanded="showMore"
            @click="showMore = !showMore"
          >
            <span>
              {{
                showMore
                  ? pick('Thu gọn dự án phụ', 'Hide secondary projects')
                  : pick(`Xem thêm ${secondaryGroups.length + supportingGroups.length} dự án khác`, `Show ${secondaryGroups.length + supportingGroups.length} more projects`)
              }}
            </span>
            <span class="text-[10px]" aria-hidden="true">{{ showMore ? '▲' : '▼' }}</span>
          </button>
          <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <template v-if="showMore">
          <!-- Tầng 2: Secondary Work — 2-col grid -->
          <div v-if="secondaryGroups.length" class="space-y-4">
            <h3 class="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              {{ pick(deliverablesSection.secondaryHeading, deliverablesSection.secondaryHeadingEn) }}
            </h3>
            <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <ProjectCard
                v-for="group in secondaryGroups"
                :key="group.id"
                :group="group"
              />
            </div>
          </div>

          <!-- Tầng 3: Supporting Work — 2-col compact -->
          <div v-if="supportingGroups.length" class="space-y-4">
            <h3 class="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ pick(deliverablesSection.supportingHeading, deliverablesSection.supportingHeadingEn) }}
            </h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ProjectCard
                v-for="group in supportingGroups"
                :key="group.id"
                :group="group"
                compact
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
