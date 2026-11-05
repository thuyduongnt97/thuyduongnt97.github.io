<script setup>
import { computed } from 'vue'
import { resolveProjectUrl } from '../utils/portfolio'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  links: { type: Array, required: true },
  compact: { type: Boolean, default: false },
  heading: { type: String, default: '' },
  showHeading: { type: Boolean, default: true },
})
const { pick } = useLocale()
const resolvedHeading = computed(
  () => props.heading || pick('📌 Một số sản phẩm minh họa tiêu biểu:', '📌 Selected Live Samples & Demos:')
)
const gridLayout = computed(() => props.links.length >= 2 || props.links.some(link => link.desktopUrl || link.mobileUrl))
const productCta = link =>
  ({
    demo: pick('Mở demo', 'Open demo'),
    site: pick('Xem website', 'Visit site'),
    github: pick('Xem mã nguồn', 'View source'),
  })[link.kind] ?? pick('Xem', 'Open')
</script>

<template>
  <div v-if="links.length" class="w-full min-w-0 space-y-2.5">
    <p v-if="showHeading && !compact" class="font-mono text-[13px] font-semibold text-slate-500 dark:text-slate-400">
      {{ resolvedHeading }}
    </p>
    <ul class="gap-2" :class="gridLayout ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-wrap'" role="list">
      <li v-for="link in links" :key="link.id" class="min-w-0 max-w-full w-full">
        <div
          v-if="link.desktopUrl || link.mobileUrl"
          class="flex h-full flex-col justify-between gap-2.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
        >
          <span class="min-w-0 text-[14px] font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {{ pick(link.label, link.labelEn) }}
          </span>
          <div class="flex flex-wrap items-center gap-1.5 font-mono text-[13px]">
            <a
              :href="resolveProjectUrl(link.url)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[34px] items-center justify-center rounded-lg bg-cyan-500 px-3 py-1 font-bold text-slate-950 transition hover:bg-cyan-400"
              :aria-label="`${productCta(link)} (Auto): ${pick(link.label, link.labelEn)}`"
            >Auto ↗</a>
            <a
              v-if="link.desktopUrl"
              :href="resolveProjectUrl(link.desktopUrl)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[34px] min-w-[36px] items-center justify-center rounded-lg border border-slate-300 px-2.5 py-1 font-semibold text-slate-800 transition hover:border-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400"
              :aria-label="`${productCta(link)} (PC): ${pick(link.label, link.labelEn)}`"
            >PC</a>
            <a
              v-if="link.mobileUrl"
              :href="resolveProjectUrl(link.mobileUrl)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-[34px] min-w-[36px] items-center justify-center rounded-lg border border-slate-300 px-2.5 py-1 font-semibold text-slate-800 transition hover:border-amber-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400"
              :aria-label="`${productCta(link)} (Mobile): ${pick(link.label, link.labelEn)}`"
            >MB</a>
          </div>
        </div>
        <a
          v-else
          :href="resolveProjectUrl(link.url)"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-full min-h-[42px] w-full max-w-full items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 font-mono text-[14px] font-semibold transition-colors"
          :class="[
            link.id === 'omo-gieo-trieu-mam-xanh'
              ? 'border-amber-500 bg-amber-500 font-bold text-slate-950 hover:bg-amber-600'
              : link.id === 'short-bizfly'
                ? 'border-purple-600 bg-purple-600 font-bold text-white hover:bg-purple-700'
                : 'border-slate-200 bg-white text-slate-800 hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200',
          ]"
          :aria-label="`${productCta(link)}: ${pick(link.label, link.labelEn)}`"
          :title="link.description"
        >
          <span class="min-w-0 break-words">{{ pick(link.label, link.labelEn) }}</span>
          <span class="shrink-0" aria-hidden="true">↗</span>
        </a>
      </li>
    </ul>
  </div>
</template>
