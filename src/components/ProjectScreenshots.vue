<script setup>
import { computed } from 'vue'
import { useProjectLightbox } from '../composables/useProjectLightbox.js'
import { resolveProjectUrl } from '../utils/portfolio.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({ projects: { type: Array, required: true } })
const { openLightbox } = useProjectLightbox()
const { pick } = useLocale()
const screenshots = computed(() =>
  props.projects.flatMap(project =>
    (project.screenshots ?? []).map(screenshot => ({ ...screenshot, project }))
  )
)

function showScreenshot(screenshot) {
  openLightbox({ ...screenshot.project, imageUrl: screenshot.src })
}
</script>

<template>
  <div v-if="screenshots.length" class="space-y-2">
    <p class="font-mono text-[13px] font-semibold text-slate-500 dark:text-slate-400">
      {{ pick('Ảnh chụp sản phẩm thực tế', 'Production Screenshots') }}
    </p>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        v-for="screenshot in screenshots"
        :key="`${screenshot.project.id}-${screenshot.src}`"
        type="button"
        class="group/screenshot min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left transition hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 dark:border-slate-700 dark:bg-slate-950"
        :aria-label="`${pick('Phóng to ảnh', 'Enlarge screenshot')}: ${screenshot.label}`"
        @click="showScreenshot(screenshot)"
      >
        <img
          :src="resolveProjectUrl(screenshot.src)"
          :alt="screenshot.alt"
          loading="lazy"
          decoding="async"
          width="1920"
          height="1080"
          class="aspect-video w-full object-contain"
        />
        <span class="flex items-center justify-between gap-2 border-t border-slate-200 bg-white px-3.5 py-2.5 text-[14px] dark:border-slate-700 dark:bg-slate-900">
          <span class="font-semibold text-slate-800 dark:text-slate-100">{{ screenshot.label }}</span>
          <span class="shrink-0 font-semibold text-amber-700 group-hover/screenshot:underline dark:text-amber-400" aria-hidden="true">
            {{ pick('Phóng to ↗', 'Enlarge ↗') }}
          </span>
        </span>
      </button>
    </div>
  </div>
</template>
