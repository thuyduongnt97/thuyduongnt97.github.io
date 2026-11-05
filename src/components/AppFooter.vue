<script setup>
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()
const year = new Date().getFullYear()
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
  <footer class="footer-section transition-colors">
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Gradient CTA Card -->
      <div class="cta-card relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
        <!-- Decorative wave overlay -->
        <svg class="cta-wave" aria-hidden="true" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 Q180,20 360,80 T720,80 T1080,80 T1440,80 L1440,200 L0,200 Z" fill="currentColor" />
        </svg>

        <div class="relative z-10">
          <h2 class="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-white tracking-tight leading-tight">
            {{ pick('Cùng xây dựng sản phẩm web hiệu năng cao', 'Let\u2019s build high-performance web products together') }}
          </h2>
          <p class="mt-2 text-sm sm:text-[15px] leading-relaxed text-white/75 max-w-2xl">
            {{ pick(
              'Sẵn sàng trao đổi về cơ hội hợp tác phát triển Frontend (Vue.js), hệ thống Fullstack (Laravel/Redis), Dashboard dữ liệu hoặc giải pháp bản đồ số WebGIS.',
              'Open to discussing Frontend (Vue.js), Fullstack systems (Laravel/Redis), analytics dashboards, or interactive WebGIS opportunities.'
            ) }}
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <a
              :href="`mailto:${profile.email}`"
              class="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-5 py-2.5 shadow-lg shadow-black/10 transition-all"
            >
              <BaseIcon name="mail" />
              <span>{{ pick('Gửi Email', 'Send Email') }}</span>
            </a>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-mono text-xs sm:text-sm font-semibold px-4 py-2.5 transition-all cursor-pointer"
              @click="copyEmail"
            >
              <BaseIcon name="copy" />
              <span>{{ copied ? pick('✓ Đã sao chép', '✓ Copied!') : profile.email }}</span>
            </button>
            <a
              :href="profile.cvUrl"
              :download="profile.cvFileName"
              class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-sm px-5 py-2.5 transition-all"
            >
              <BaseIcon name="download" />
              <span>{{ pick('Tải CV (PDF)', 'Download CV') }}</span>
            </a>
            <a
              v-if="profile.github"
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-sm px-4 py-2.5 transition-all"
            >
              <BaseIcon name="github" />
              <span>GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Compact footer info -->
      <div class="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
        <div class="min-w-0 break-words">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ pick(profile.name, profile.nameEn || profile.name) }} • {{ pick(profile.location, profile.locationEn) }}
          </p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
            © {{ year }} {{ pick(profile.name, profile.nameEn || profile.name) }} • {{ pick(profile.title, profile.titleEn || profile.title) }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  border-top: 1px solid var(--border);
  padding-top: 2.5rem;
  background: var(--bg);
}

.cta-card {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 25%, #0891b2 60%, #059669 100%);
  box-shadow:
    0 20px 50px -15px rgba(245, 158, 11, 0.25),
    0 8px 20px -8px rgba(6, 182, 212, 0.15);
}

.cta-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  color: rgba(255, 255, 255, 0.06);
  pointer-events: none;
}

@media (max-width: 767px) {
  .footer-section { padding-bottom: calc(4rem + env(safe-area-inset-bottom, 0px)); }
}
</style>
