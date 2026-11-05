<script setup>
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()
const copied = ref(false)

function copyEmail() {
  navigator.clipboard?.writeText(profile.email).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2200)
  }).catch(() => {
    window.location.href = `mailto:${profile.email}`
  })
}
</script>

<template>
  <section id="contact" class="py-12 sm:py-16 scroll-mt-24 border-t border-slate-200 dark:border-slate-800/80" aria-labelledby="contact-title">
    <div v-reveal class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/5 via-white to-cyan-500/5 dark:from-amber-500/10 dark:via-slate-900/90 dark:to-cyan-500/10 p-6 sm:p-10 lg:p-12 shadow-sm">
      <div class="max-w-3xl">
        <span class="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          {{ pick('06 — Liên hệ & Hợp tác', '06 — Contact & Collaboration') }}
        </span>
        <h2 id="contact-title" class="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {{ pick('Cùng xây dựng sản phẩm web hiệu năng cao', 'Let’s build high-performance web products together') }}
        </h2>
        <p class="mt-3 text-[15.5px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {{ pick(
            'Sẵn sàng trao đổi về cơ hội hợp tác phát triển Frontend (Vue.js), hệ thống Fullstack (Laravel/Redis), Dashboard dữ liệu phức tạp hoặc giải pháp bản đồ số WebGIS.',
            'Open to discussing Frontend (Vue.js), Fullstack systems (Laravel/Redis), complex analytics dashboards, or interactive WebGIS engineering opportunities.'
          ) }}
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <a
            v-if="profile.email"
            :href="`mailto:${profile.email}`"
            class="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-5 py-3 shadow-md shadow-amber-500/15 transition-all"
          >
            <BaseIcon name="mail" />
            <span>{{ pick('Gửi Email trực tiếp', 'Send an Email') }}</span>
          </a>

          <button
            v-if="profile.email"
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-amber-500 dark:hover:border-amber-500 text-slate-800 dark:text-slate-200 font-mono text-xs sm:text-sm font-semibold px-4 py-3 transition-all cursor-pointer"
            @click="copyEmail"
          >
            <BaseIcon name="copy" />
            <span>{{ copied ? pick('✓ Đã sao chép Email', '✓ Email Copied!') : profile.email }}</span>
          </button>

          <a
            :href="profile.cvUrl"
            :download="profile.cvFileName"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900 hover:border-amber-500 text-slate-800 dark:text-slate-200 font-semibold text-sm px-5 py-3 transition-all"
          >
            <BaseIcon name="download" />
            <span>{{ pick('Tải CV (PDF)', 'Download CV (PDF)') }}</span>
          </a>

          <a
            v-if="profile.github"
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900 hover:border-amber-500 text-slate-800 dark:text-slate-200 font-semibold text-sm px-4 py-3 transition-all"
          >
            <BaseIcon name="github" />
            <span>GitHub ↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
