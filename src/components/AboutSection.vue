<script setup>
import BaseIcon from './BaseIcon.vue'
import { about } from '../data/profile'
import { recognition } from '../data/recognition'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()

// Structured HR data — for recruiters to scan quickly without opening PDF
const hrFacts = [
  {
    icon: 'briefcase',
    label: 'Công ty',
    labelEn: 'Company',
    value: 'Công ty Cổ phần VCCorp',
    valueEn: 'VCCorp Joint Stock Company',
    sub: '2019 – Hiện tại (6+ năm)',
    subEn: '2019 – Present (6+ years)',
  },
  {
    icon: 'cap',
    label: 'Học vấn',
    labelEn: 'Education',
    value: 'Kỹ sư Phần mềm — ĐH Mở Hà Nội',
    valueEn: 'B.Eng. Software Engineering — Hanoi Open University',
    sub: '2015 – 2019',
    subEn: '2015 – 2019',
  },
  {
    icon: 'award',
    label: 'Giải thưởng',
    labelEn: 'Awards',
    value: '3× Nhân viên Xuất sắc (2022, 2023, 2025)',
    valueEn: '3× Outstanding Employee (2022, 2023, 2025)',
    sub: 'Giải Ba Nghiên cứu Khoa học (05/2019)',
    subEn: '3rd Prize — Scientific Research (05/2019)',
  },
]
</script>

<template>
  <section
    id="about"
    class="py-14 scroll-mt-20"
    aria-labelledby="about-heading"
  >
    <div class="mb-8">
      <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
        {{ pick(about.eyebrow, about.eyebrowEn) }}
      </span>
      <h2
        id="about-heading"
        class="mt-1 text-2xl font-extrabold sm:text-[32px] sm:leading-tight text-slate-900 dark:text-white"
      >
        {{ pick(about.title, about.titleEn) }}
      </h2>
    </div>

    <div class="space-y-5">
      <!-- Top row: Bio + HR Facts side by side on desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <!-- Bio paragraphs (3 cols) -->
        <div
          v-reveal="'left'"
          class="lg:col-span-3 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900/85 glass-card"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p
            v-for="(para, index) in pick(about.paragraphs, about.paragraphsEn)"
            :key="index"
            class="text-[15.5px] sm:text-[16px] leading-[1.7] text-slate-700 dark:text-slate-200"
            v-html="para"
          />

          <!-- Info pills -->
          <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span
              v-for="pill in about.pills"
              :key="pill.text"
              class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <BaseIcon :name="pill.icon" class="size-3.5 text-amber-500" />
              {{ pick(pill.text, pill.textEn) }}
            </span>
          </div>
        </div>

        <!-- HR Quick Facts (2 cols) — for recruiter scanning -->
        <div
          v-reveal="'right'"
          class="lg:col-span-2 space-y-3"
        >
          <div
            v-for="fact in hrFacts"
            :key="fact.label"
            class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/85 glass-card"
          >
            <div class="flex items-start gap-3">
              <div class="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 grid place-items-center">
                <BaseIcon :name="fact.icon" class="size-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div class="min-w-0">
                <div class="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ pick(fact.label, fact.labelEn) }}
                </div>
                <div class="mt-0.5 text-[14px] sm:text-[15px] font-bold text-slate-900 dark:text-white leading-snug">
                  {{ pick(fact.value, fact.valueEn) }}
                </div>
                <div class="mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {{ pick(fact.sub, fact.subEn) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recognition badges row -->
      <div v-reveal="{ type: 'up', delay: 150 }" class="flex flex-wrap gap-3">
        <div
          class="recognition-badge inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5"
        >
          <span class="text-lg" aria-hidden="true">🏆</span>
          <span class="text-sm font-bold text-amber-700 dark:text-amber-400">
            {{ pick(recognition.professional.title, recognition.professional.titleEn) }}
          </span>
        </div>
        <div
          class="recognition-badge inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5"
        >
          <span class="text-lg" aria-hidden="true">🎓</span>
          <span class="text-sm font-bold text-cyan-700 dark:text-cyan-400">
            {{ pick(recognition.research.title, recognition.research.titleEn) }}
          </span>
        </div>
        <div
          class="recognition-badge inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5"
        >
          <span class="text-lg" aria-hidden="true">⚡</span>
          <span class="text-sm font-bold text-emerald-700 dark:text-emerald-400">
            {{ pick(recognition.aiWorkflow.title, recognition.aiWorkflow.titleEn) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
