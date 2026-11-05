<script setup>
import { careerTimeline, timelineSection } from '../data/timeline'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()

const nodeColors = { amber: 'bg-amber-500', emerald: 'bg-emerald-500', purple: 'bg-purple-500', slate: 'bg-slate-500', cyan: 'bg-cyan-500' }
const textColors = { amber: 'text-amber-700 dark:text-amber-400', emerald: 'text-emerald-700 dark:text-emerald-500', purple: 'text-purple-700 dark:text-purple-400', slate: 'text-slate-500 dark:text-slate-400', cyan: 'text-cyan-700 dark:text-cyan-400' }
const badgeColors = {
  emerald: 'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  amber: 'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400',
  cyan: 'border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-400',
  slate: 'border-transparent bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}
</script>

<template>
  <section id="timeline" class="py-12 sm:py-14 scroll-mt-20" aria-labelledby="timeline-heading">
    <div class="mb-10">
      <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">{{ pick(timelineSection.eyebrow, timelineSection.eyebrowEn) }}</span>
      <h2 id="timeline-heading" class="mt-1 text-2xl font-extrabold sm:text-[32px] sm:leading-tight text-slate-900 dark:text-white">{{ pick(timelineSection.title, timelineSection.titleEn) }}</h2>
    </div>
    <ol class="relative ml-3 space-y-10 border-l-2 border-slate-200 pl-6 sm:ml-6 sm:pl-8 dark:border-slate-800">
      <li v-for="(item, index) in careerTimeline" :key="item.id" v-reveal="index * 50" class="relative min-w-0">
        <span class="absolute -left-[33px] top-1 size-4 rounded-full ring-4 ring-slate-50 sm:-left-[41px] dark:ring-[#06090F]" :class="nodeColors[item.color]" aria-hidden="true" />
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-[13px] font-bold" :class="item.periodStyle === 'pill' ? 'rounded-lg bg-amber-500 px-3 py-1 text-slate-950 font-extrabold shadow-sm' : textColors[item.color]">{{ pick(item.period, item.periodEn) }}</span>
          <span v-if="item.tenure" class="text-[13px] font-semibold text-amber-700 dark:text-amber-400">{{ pick(item.tenure, item.tenureEn) }}</span>
          <span v-for="badge in item.badges" :key="badge.label" class="rounded-lg border px-2.5 py-0.5 font-mono text-[13px] font-medium" :class="badgeColors[badge.color]">{{ pick(badge.label, badge.labelEn) }}</span>
        </div>
        <h3 class="mt-2 text-xl sm:text-[22px] font-bold text-slate-900 dark:text-white">
          {{ pick(item.company, item.companyEn) }}
          <span class="mt-0.5 block text-lg font-semibold text-slate-700 sm:mt-0 sm:inline sm:text-[20px] dark:text-slate-200"><span class="hidden sm:inline" aria-hidden="true"> | </span>{{ pick(item.role, item.roleEn) }}</span>
        </h3>
        <ul v-if="item.bulletPoints?.length" class="mt-2.5 list-disc space-y-2 pl-4 text-[15px] leading-[1.65] text-slate-700 dark:text-[#CBD5E1]">
          <li v-for="(point, pointIndex) in pick(item.bulletPoints, item.bulletPointsEn)" :key="pointIndex" v-html="point" />
        </ul>
        <p v-else class="mt-1.5 text-[15px] leading-[1.65] text-slate-700 dark:text-[#CBD5E1]">{{ pick(item.summary, item.summaryEn) }}</p>
        <ol v-if="item.milestones.length" class="relative mt-6 space-y-7 border-l border-slate-200 pl-4 sm:pl-6 dark:border-slate-800" :aria-label="pick('Các cột mốc dự án tại ' + item.company, 'Project milestones at ' + (item.companyEn || item.company))">
          <li v-for="milestone in item.milestones" :key="milestone.id" class="relative min-w-0">
            <span class="absolute -left-[21px] top-1.5 size-2.5 rounded-full ring-4 ring-slate-50 sm:-left-[29px] dark:ring-[#06090F]" :class="nodeColors[milestone.color]" aria-hidden="true" />
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[13px] font-bold" :class="textColors[milestone.color]">{{ pick(milestone.period, milestone.periodEn) }}</span>
              <span v-for="badge in milestone.badges" :key="badge.label" class="rounded border px-2.5 py-0.5 text-[13px] font-medium" :class="badgeColors[badge.color]">{{ pick(badge.label, badge.labelEn) }}</span>
            </div>
            <h4 class="mt-1.5 text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-[#F8FAFC]">{{ pick(milestone.role, milestone.roleEn) }}</h4>
            <ul v-if="milestone.bulletPoints?.length" class="mt-2.5 list-disc space-y-2 pl-4 text-[15px] leading-[1.65] text-slate-700 dark:text-[#CBD5E1]">
              <li v-for="(point, pointIndex) in pick(milestone.bulletPoints, milestone.bulletPointsEn)" :key="pointIndex" v-html="point" />
            </ul>
            <p v-else class="mt-1.5 text-[15px] leading-[1.65] text-slate-700 dark:text-[#CBD5E1]">{{ pick(milestone.summary, milestone.summaryEn) }}</p>
          </li>
        </ol>
      </li>
    </ol>
  </section>
</template>
