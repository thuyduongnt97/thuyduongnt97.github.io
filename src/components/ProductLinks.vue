<script setup>
import BaseIcon from './BaseIcon.vue'
import { resolveProjectUrl } from '../utils/portfolio'

const props = defineProps({
  links: { type: Array, required: true },
  compact: { type: Boolean, default: false },
})

const productCta = (link) => ({ demo: 'Mở demo', site: 'Xem website', github: 'Xem mã nguồn' })[link.kind]
const productLabel = (link) => ({
  'omo-gieo-trieu-mam-xanh': 'OMO',
  athena: 'Athena',
  'cao-toc-bac-nam': 'Cao tốc Bắc–Nam',
  'ham-giao-thong': 'Hầm đường bộ',
})[link.id] ?? link.label
const productText = (link) => {
  if (link.kind === 'github') return 'Mã nguồn'
  if (props.compact && props.links.length === 1 && link.kind === 'demo' && link.id.endsWith('-demo')) return 'Demo'
  return link.kind === 'demo' ? `Demo · ${productLabel(link)}` : `Xem ${productLabel(link)}`
}
</script>

<template>
  <ul class="product-links" :class="{ 'product-links--compact': compact }" role="list">
    <li v-for="link in links" :key="link.id">
      <a
        class="product-link"
        :href="resolveProjectUrl(link.url)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${productCta(link)}: ${link.label} (mở trong tab mới)`"
      >
        <span class="product-link__label">{{ productText(link) }}</span>
        <BaseIcon name="external" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.product-links { display: flex; flex-wrap: wrap; align-items: flex-start; gap: .5rem; width: fit-content; min-width: 0; max-width: 100%; }
.product-links > li { display: flex; min-width: 0; max-width: 100%; }
.product-link { display: inline-flex; align-items: center; gap: .4rem; min-width: 0; max-width: 100%; padding: .375rem .75rem; border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--accent); font-size: .8rem; font-weight: 500; line-height: 1.5; text-align: left; transition: color 200ms ease-out, border-color 200ms ease-out, background-color 200ms ease-out; }
.product-link:hover, .product-link:focus-visible { border-color: var(--border-strong); background: var(--surface-hover); }
.product-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.product-link__label { min-width: 0; overflow-wrap: anywhere; }
.product-link > .icon { flex-shrink: 0; width: .9rem; height: .9rem; transition: transform 200ms ease-out; }
.product-link:hover > .icon, .product-link:focus-visible > .icon, .project-card:hover .product-link > .icon, .project-card:focus-within .product-link > .icon { transform: translate(2px, -2px); }
.product-links--compact .product-link { padding: .25rem .625rem; border-radius: 8px; background: var(--bg-soft); color: var(--project-result, var(--text-muted)); font-size: .75rem; }
.product-links--compact .product-link:hover, .product-links--compact .product-link:focus-visible { border-color: var(--project-accent-hover-border, color-mix(in srgb, var(--accent) 30%, var(--border))); background: var(--project-accent-soft, color-mix(in srgb, var(--accent) 8%, var(--surface-solid))); color: var(--project-accent, var(--accent)); }
.product-links--compact .product-link:focus-visible { outline-color: var(--project-accent, var(--accent)); }
.product-links--compact .product-link > .icon { width: .75rem; height: .75rem; }
@media (hover: none), (pointer: coarse) { .product-link { min-height: 44px; } }
@media (prefers-reduced-motion: reduce) {
  .product-link, .product-link > .icon { transition: none; }
  .product-link:hover > .icon, .product-link:focus-visible > .icon, .project-card:hover .product-link > .icon, .project-card:focus-within .product-link > .icon { transform: none; }
}
</style>
