<script setup>
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  pillar: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-category'])
const { pick } = useLocale()

function handleClick() {
  emit('select-category', props.pillar.filterCategory || props.pillar.id)
}
</script>

<template>
  <div
    v-spotlight
    role="button"
    tabindex="0"
    :aria-pressed="isSelected"
    :aria-label="`${pick(pillar.title, pillar.titleEn)} — ${pick('Lọc dự án theo nhóm kỹ năng này', 'Filter projects by this skill group')}`"
    aria-controls="deliverables"
    :data-category="pillar.filterCategory"
    class="spotlight-card card-hover-glow min-w-0 rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900/85 border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-sm"
    :class="[
      isSelected
        ? 'skill-selected border-amber-500 ring-2 ring-amber-500/30'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    ]"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Card Header -->
    <div class="flex flex-wrap items-start justify-between gap-2.5 mb-3 sm:flex-nowrap sm:gap-4">
      <div class="min-w-0">
        <span
          class="text-[12px] sm:text-[13px] font-mono font-bold uppercase block tracking-wider"
          :class="[
            pillar.accentColor === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
            pillar.accentColor === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
            pillar.accentColor === 'purple' ? 'text-purple-700 dark:text-purple-400' :
            'text-amber-700 dark:text-amber-500'
          ]"
        >
          {{ pick(pillar.categoryTitle, pillar.categoryTitleEn) }}
        </span>
        <h3 class="text-base sm:text-lg font-bold mt-0.5 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors leading-snug">
          {{ pick(pillar.title, pillar.titleEn) }}
        </h3>
      </div>
      <div class="text-right shrink-0">
        <span
          class="inline-block px-3 py-1 rounded-xl font-mono font-extrabold text-[14px] sm:text-[15px] border shadow-sm"
          :class="[
            pillar.accentColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40' :
            pillar.accentColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40' :
            pillar.accentColor === 'purple' ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40' :
            'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
          ]"
        >
          {{ pick(pillar.yearsBadge, pillar.yearsBadgeEn) }}
        </span>
        <div class="text-[12px] font-mono text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {{ pick(pillar.period, pillar.periodEn) }}
        </div>
      </div>
    </div>

    <!-- 3 Sub-metrics Grid -->
    <div
      class="grid grid-cols-3 gap-2 mb-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 font-mono"
    >
      <div v-for="metric in pillar.subMetrics" :key="metric.label" class="min-w-0">
        <div class="truncate text-slate-600 dark:text-slate-400 text-[11.5px] sm:text-[12.5px] font-medium" :title="pick(metric.label, metric.labelEn)">
          {{ pick(metric.label, metric.labelEn) }}
        </div>
        <div
          class="truncate font-bold text-[14.5px] sm:text-[16px] mt-0.5"
          :title="pick(metric.value, metric.valueEn)"
          :class="[
            pillar.accentColor === 'emerald' ? 'text-emerald-700 dark:text-emerald-400' :
            pillar.accentColor === 'cyan' ? 'text-cyan-700 dark:text-cyan-400' :
            pillar.accentColor === 'purple' ? 'text-purple-700 dark:text-purple-400' :
            'text-amber-700 dark:text-amber-500'
          ]"
        >
          {{ pick(metric.value, metric.valueEn) }}
        </div>
      </div>
    </div>

    <!-- Tech Chips -->
    <div
      class="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[12.5px] sm:text-[13px] font-mono text-slate-700 dark:text-slate-300 font-medium"
    >
      <span
        v-for="chip in pillar.chips"
        :key="chip"
        class="px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
      >
        {{ chip }}
      </span>
    </div>
  </div>
</template>
