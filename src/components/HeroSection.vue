<script setup>
import HeroShowcaseCard from './HeroShowcaseCard.vue'
import { profile } from '../data/profile'
import { useLocale } from '../composables/useLocale'

const { pick } = useLocale()
</script>

<template>
  <section id="hero" class="hero-section scroll-mt-16" aria-labelledby="hero-heading">
    <span id="home" class="absolute top-0 scroll-mt-20" aria-hidden="true" />

    <!-- Dark gradient backdrop with depth -->
    <div class="hero-backdrop" aria-hidden="true" />

    <!-- Decorative SVG circuit lines — desktop only -->
    <svg
      class="hero-circuit hidden lg:block"
      aria-hidden="true"
      viewBox="0 0 1400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Horizontal data lanes -->
      <line x1="0" y1="120" x2="340" y2="120" stroke="url(#circuit-grad)" stroke-width="1" stroke-dasharray="6 8" class="circuit-line" opacity="0.2" />
      <line x1="1060" y1="180" x2="1400" y2="180" stroke="url(#circuit-grad)" stroke-width="1" stroke-dasharray="6 8" class="circuit-line" opacity="0.15" />
      <line x1="0" y1="440" x2="280" y2="440" stroke="url(#circuit-grad-alt)" stroke-width="1" stroke-dasharray="4 10" class="circuit-line-slow" opacity="0.12" />
      <!-- Vertical feeds -->
      <line x1="340" y1="120" x2="340" y2="300" stroke="url(#circuit-grad)" stroke-width="1" stroke-dasharray="4 6" class="circuit-line" opacity="0.18" />
      <line x1="1060" y1="180" x2="1060" y2="400" stroke="url(#circuit-grad-alt)" stroke-width="1" stroke-dasharray="4 6" class="circuit-line-slow" opacity="0.12" />
      <!-- Junction dots -->
      <circle cx="340" cy="120" r="3" fill="#fbbf24" opacity="0.35" />
      <circle cx="1060" cy="180" r="3" fill="#22d3ee" opacity="0.3" />
      <circle cx="340" cy="300" r="2.5" fill="#fbbf24" opacity="0.25" />
      <circle cx="1060" cy="400" r="2.5" fill="#22d3ee" opacity="0.2" />
      <circle cx="280" cy="440" r="2" fill="#10b981" opacity="0.2" />
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0" />
          <stop offset="50%" stop-color="#fbbf24" stop-opacity="1" />
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient id="circuit-grad-alt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0" />
          <stop offset="50%" stop-color="#10b981" stop-opacity="1" />
          <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="hero-shell relative z-10">
      <div class="hero-grid">
        <!-- Left 60%: Intro content & 4 stat boxes -->
        <div class="hero-copy min-w-0 hero-animate">
          <div class="hero-badges">
            <span class="hero-status inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 font-mono text-emerald-800 dark:text-emerald-300">
              <span class="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              {{ pick(profile.heroBadge, profile.heroBadgeEn) }}
            </span>
            <a
              href="#recognition"
              class="hero-award rounded-full border border-amber-500/40 bg-amber-500/15 font-semibold text-amber-900 transition-colors hover:bg-amber-500/25 dark:text-amber-300"
            >
              {{ pick(profile.heroRecognition, profile.heroRecognitionEn) }}
            </a>
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <h1
            id="hero-heading"
            class="hero-heading font-extrabold text-slate-900 dark:text-white"
            v-html="pick(profile.heroHeadlineHtml, profile.heroHeadlineHtmlEn)"
          />

          <p class="font-mono text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            Vue.js (2/3) · Laravel · Redis · MySQL · WebGIS (QGIS / Leaflet)
          </p>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <p
            class="hero-lead text-slate-700 dark:text-[#E2E8F0]"
            v-html="pick(profile.lead, profile.leadEn)"
          />

          <!-- 4 Stats: 2x2 mobile, 4-col desktop -->
          <dl class="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div
              v-for="(stat, i) in profile.stats"
              :key="stat.label"
              v-reveal="{ type: 'scale', delay: i * 80 }"
              class="stat-card min-w-0 rounded-xl border border-slate-200/90 bg-white/95 p-3 dark:border-slate-800 dark:bg-[rgba(15,23,42,0.85)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50"
              :style="{ '--stat-accent': stat.color === 'amber' ? '#fbbf24' : stat.color === 'emerald' ? '#10b981' : '#22d3ee' }"
            >
              <dt class="sr-only">{{ pick(stat.label, stat.labelEn) }}</dt>
              <dd
                class="font-mono text-2xl font-extrabold sm:text-[28px]"
                :class="
                  stat.color === 'amber'
                    ? 'text-amber-500 dark:text-amber-400'
                    : stat.color === 'emerald'
                      ? 'text-emerald-500 dark:text-emerald-400'
                      : 'text-cyan-600 dark:text-cyan-400'
                "
              >
                {{ pick(stat.value, stat.valueEn) }}
              </dd>
              <dd
                class="mt-1 text-[13px] sm:text-[13.5px] leading-snug font-medium text-slate-600 dark:text-slate-300"
                aria-hidden="true"
              >
                {{ pick(stat.label, stat.labelEn) }}
              </dd>
            </div>
          </dl>

          <!-- 2 CTA buttons -->
          <div class="hero-actions flex flex-wrap gap-3 pt-1">
            <a
              v-for="cta in profile.heroCtas"
              :key="cta.id"
              :href="cta.href"
              :download="cta.download || undefined"
              class="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-center text-[15px] sm:text-[16px] font-bold transition-all shadow-md"
              :class="
                cta.variant === 'primary'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30 hover:shadow-lg'
                  : 'border border-slate-300 bg-white/95 text-slate-800 hover:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-amber-400'
              "
            >
              {{ pick(cta.label, cta.labelEn) }}
            </a>
          </div>
        </div>

        <!-- Right 40%: Desktop only showcase card -->
        <div class="hero-showcase hidden lg:block min-w-0 float-gentle">
          <HeroShowcaseCard />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 1.25rem 0 2rem;
}

.hero-backdrop {
  position: absolute;
  inset: -1.5rem -2.5rem -2.5rem -2.5rem;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(34, 211, 238, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 15%, #0d1527 0%, #080d1a 65%, #050811 100%);
}

[data-theme="light"] .hero-backdrop {
  background:
    radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(34, 211, 238, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 15%, #f1f5f9 0%, #f8fafc 70%, #ffffff 100%);
}

/* SVG circuit decoration */
.hero-circuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.circuit-line {
  animation: dash-flow 3s linear infinite;
}

.circuit-line-slow {
  animation: dash-flow 5s linear infinite reverse;
}

@keyframes dash-flow {
  to { stroke-dashoffset: -28; }
}

.hero-shell {
  width: 100%;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.25rem;
}

.hero-status,
.hero-award {
  padding: 0.4rem 0.85rem;
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1.45;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 1.75rem;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
  max-width: 100%;
}

.hero-heading {
  font-size: clamp(1.85rem, 2.55vw, 2.45rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.025em;
  min-width: 0;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
}

.hero-heading :deep(span) {
  display: inline;
}

.hero-heading :deep(.gradient-amber) {
  background: linear-gradient(120deg, #fbbf24, #22d3ee, #10b981, #fbbf24);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 6s ease-in-out infinite;
}

.hero-lead {
  font-size: 1.03rem;
  line-height: 1.65;
  min-width: 0;
  max-width: 100%;
}

.hero-showcase {
  max-width: 460px;
  width: 100%;
  margin-left: auto;
}

/* Stat cards with hover glow */
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 50%, var(--stat-accent, #fbbf24), transparent 70%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.stat-card:hover::before {
  opacity: 0.06;
}

.stat-card:hover {
  box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--stat-accent, #fbbf24) 25%, transparent);
}

@media (min-width: 1024px) {
  .hero-section {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
    gap: 48px;
    align-items: center;
  }
}

@media (max-width: 420px) {
  .hero-actions > a {
    flex: 1 1 0;
    padding-inline: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .circuit-line,
  .circuit-line-slow {
    animation: none;
  }
}
</style>
