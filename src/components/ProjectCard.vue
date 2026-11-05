<script setup>
import { computed, ref } from 'vue'
import ProductLinks from './ProductLinks.vue'
import ProjectScreenshots from './ProjectScreenshots.vue'
import { useProjectLightbox } from '../composables/useProjectLightbox.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  group: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  collapsibleOnMobile: { type: Boolean, default: false },
})

const { openLightbox } = useProjectLightbox()
const { pick } = useLocale()
const showTechnicalNotes = ref(false)

const category = computed(() => props.group.filterCategory)
const badgeClass = computed(
  () =>
    ({
      webgis: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
      webapp: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      adtech: 'border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300',
      motion: 'border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    })[category.value]
)
const borderClass = computed(
  () =>
    ({
      webgis: 'border-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/10',
      webapp: 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10',
      adtech: 'border-purple-500 bg-purple-500/5 dark:bg-purple-500/10',
      motion: 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10',
    })[category.value]
)
const textClass = computed(
  () =>
    ({
      webgis: 'text-cyan-700 dark:text-cyan-400',
      webapp: 'text-emerald-700 dark:text-emerald-400',
      adtech: 'text-purple-700 dark:text-purple-400',
      motion: 'text-amber-700 dark:text-amber-400',
    })[category.value]
)

const domainLabel = computed(() =>
  [pick(props.group.domain, props.group.domainEn), pick(props.group.period, props.group.periodEn)]
    .filter(Boolean)
    .join(' • ')
)

const primaryCaseProject = computed(() => {
  if (!props.group.projects?.length) return null
  if (props.group.caseProjectId) {
    const found = props.group.projects.find(p => p.id === props.group.caseProjectId)
    if (found) return found
  }
  return props.group.projects.find(p => p.caseStudy) || props.group.projects[0]
})

function openCaseStudy() {
  if (primaryCaseProject.value) {
    openLightbox(primaryCaseProject.value)
  }
}
</script>

<template>
  <div v-reveal class="min-w-0 h-full">
    <article
      v-spotlight
      :data-cat="group.categories.join(' ')"
      :data-group="group.id"
      class="spotlight-card card-hover-glow flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white transition-colors dark:border-slate-800"
      :class="compact ? 'p-4 sm:p-5 dark:bg-slate-900/75 space-y-3.5' : 'space-y-4 p-5 sm:p-6 dark:bg-slate-900/85'"
      :aria-labelledby="`group-heading-${group.id}`"
    >
      <span
        v-for="project in group.projects"
        :id="`project-${project.id}`"
        :key="project.id"
        class="absolute top-0 scroll-mt-24"
        aria-hidden="true"
      />

      <div class="space-y-3.5">
        <!-- 1. Header: Domain/Period Badge + Role Badge -->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span
            class="font-mono text-xs sm:text-[13px]"
            :class="compact ? [textClass, 'font-semibold'] : ['rounded-lg border px-2.5 py-1 font-semibold', badgeClass]"
          >
            {{ domainLabel }}
          </span>
          <span
            v-if="group.roleBadge && !compact"
            class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 dark:border-slate-700/80 dark:bg-slate-950/90 dark:text-slate-300"
          >
            {{ pick(group.roleBadge, group.roleBadgeEn) }}
          </span>
        </div>

        <!-- 2. Project Title -->
        <component
          :is="compact ? 'h4' : 'h3'"
          :id="`group-heading-${group.id}`"
          class="font-extrabold text-slate-900 dark:text-white"
          :class="compact ? 'text-lg leading-snug' : 'text-xl sm:text-[22px] sm:leading-snug'"
        >
          {{ pick(group.title, group.titleEn) }}
        </component>

        <!-- 3. Big Numbers Strip (Chỉ hiện cho Core Projects có cardMetrics) -->
        <div
          v-if="group.cardMetrics?.length && !compact"
          class="grid grid-cols-3 gap-2 sm:gap-3"
        >
          <div
            v-for="metric in group.cardMetrics"
            :key="metric.label"
            class="rounded-xl border border-slate-200/90 bg-slate-50/90 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/90"
          >
            <div class="font-mono text-base sm:text-xl font-extrabold text-amber-600 dark:text-amber-400">
              {{ pick(metric.value, metric.valueEn) }}
            </div>
            <div class="mt-0.5 text-[11.5px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 leading-tight">
              {{ pick(metric.label, metric.labelEn) }}
            </div>
          </div>
        </div>

        <!-- 4. One-line Impact Callout (Quét mắt 5 giây) -->
        <div
          v-if="group.impact"
          class="rounded-xl border-l-4 px-4 py-3 text-[14.5px] sm:text-[15.5px] leading-relaxed text-slate-800 dark:text-slate-100"
          :class="borderClass"
        >
          <span class="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mr-1.5">
            ⚡ Impact:
          </span>
          <span>{{ pick(group.impact, group.impactEn) }}</span>
        </div>

        <!-- Fallback cho Supporting Cards không có impact riêng -->
        <div
          v-else-if="group.sections?.length"
          class="space-y-2 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-200"
        >
          <p v-for="(section, index) in group.sections" :key="index">
            <strong v-if="section.label" class="text-slate-900 dark:text-white font-bold">
              • {{ pick(section.label, section.labelEn) }}:
            </strong>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="pick(section.html, section.htmlEn)" />
          </p>
        </div>

        <!-- 5. Tech Stack Pills -->
        <div class="flex flex-wrap gap-1.5 pt-0.5">
          <span
            v-for="tech in group.techStack"
            :key="tech"
            class="rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-200"
          >
            {{ tech }}
          </span>
        </div>

        <!-- 6. Nút mở Case Study (Challenge -> Approach -> Impact) & Nút đóng/mở ghi chú kỹ thuật -->
        <div v-if="group.impact" class="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            v-if="primaryCaseProject"
            type="button"
            class="inline-flex min-h-10 items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-sm shadow-amber-500/20 transition hover:bg-amber-400 cursor-pointer"
            @click="openCaseStudy"
          >
            <span aria-hidden="true">🔍</span>
            <span>
              {{
                primaryCaseProject.caseStudy
                  ? pick('Xem Case Study (STAR & Kiến trúc)', 'View Case Study (STAR & Architecture)')
                  : pick('Xem chi tiết dự án', 'View Project Details')
              }}
            </span>
          </button>

          <button
            v-if="group.sections?.length"
            type="button"
            class="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs font-semibold text-slate-700 transition hover:border-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-amber-400 cursor-pointer"
            :aria-expanded="showTechnicalNotes"
            @click="showTechnicalNotes = !showTechnicalNotes"
          >
            <span>
              {{
                showTechnicalNotes
                  ? pick('Thu gọn chi tiết', 'Hide breakdown')
                  : pick('Hạng mục kỹ thuật', 'Technical breakdown')
              }}
            </span>
            <span class="text-[10px]" aria-hidden="true">{{ showTechnicalNotes ? '▲' : '▼' }}</span>
          </button>
        </div>

        <!-- Phần mở rộng tùy chọn: Chi tiết kỹ thuật & Luồng kiến trúc -->
        <div
          v-if="group.impact && showTechnicalNotes"
          class="space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 text-[14.5px] leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
        >
          <p v-for="(section, index) in group.sections" :key="index">
            <strong v-if="section.label" class="text-slate-900 dark:text-white font-bold">
              • {{ pick(section.label, section.labelEn) }}:
            </strong>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="pick(section.html, section.htmlEn)" />
          </p>
          <div
            v-if="group.architecture"
            class="rounded-lg border border-cyan-500/25 bg-cyan-500/5 p-3 font-mono text-xs text-slate-800 dark:bg-cyan-500/10 dark:text-slate-200"
          >
            <strong class="block text-cyan-700 dark:text-cyan-300 mb-1">
              {{ pick('Luồng dữ liệu & kiến trúc:', 'Architecture & Data Flow:') }}
            </strong>
            {{ pick(group.architecture, group.architectureEn) }}
          </div>
        </div>
      </div>

      <!-- 7. Screenshots & Live Product Links -->
      <div v-if="group.projects?.some(p => p.screenshots?.length) || group.links?.length" class="space-y-3 pt-3">
        <ProjectScreenshots :projects="group.projects" />
        <div
          v-if="group.links.length"
          class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950"
        >
          <ProductLinks :links="group.links" :compact="compact" />
        </div>
      </div>
    </article>
  </div>
</template>
