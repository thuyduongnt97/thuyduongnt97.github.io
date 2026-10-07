<script setup>
import BaseIcon from './BaseIcon.vue'
import { resolveProjectUrl } from '../utils/portfolio'

defineProps({
  links: { type: Array, required: true },
  compact: { type: Boolean, default: false },
})

const productCta = (link) => ({ demo: 'Mở demo', site: 'Xem website', github: 'Xem mã nguồn' })[link.kind]
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
        <div class="product-link__info">
          <strong>{{ link.label }}</strong>
          <span v-if="!compact" class="product-link__category">
            {{ link.category || (link.kind === 'demo' ? 'Interactive' : link.kind === 'github' ? 'Mã nguồn' : 'Website') }}
            <template v-if="link.desktopUrl && link.mobileUrl"> · PC &amp; Mobile</template>
          </span>
        </div>
        <span class="product-link__cta">{{ productCta(link) }} <BaseIcon name="external" /></span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.product-links { display: grid; gap: .65rem; }
.product-link { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: .85rem; padding: 1rem 1.05rem; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-soft); transition: border-color 180ms, background 180ms, box-shadow 200ms; }
.product-link:hover, .product-link:focus-visible { border-color: color-mix(in srgb, var(--accent) 30%, var(--border-strong)); background: var(--surface-hover); box-shadow: var(--shadow-sm); }
.product-link__info { min-width: 0; }
.product-link__info strong { display: block; font-size: .94rem; font-weight: 600; line-height: 1.5; overflow-wrap: anywhere; }
.product-link__category { display: block; margin-top: .2rem; color: var(--text-muted); font-size: .8rem; line-height: 1.6; }
.product-link__cta { display: inline-flex; align-items: center; gap: .4rem; color: var(--accent); font-size: .85rem; font-weight: 600; line-height: 1.6; white-space: nowrap; }
.product-link__cta .icon { width: 1rem; height: 1rem; }
.product-links--compact .product-link { padding: .7rem .85rem; }
.product-links--compact .product-link__info strong { font-size: .87rem; }
@media (max-width: 480px) {
  .product-link { grid-template-columns: 1fr; gap: .55rem; padding: .85rem; }
  .product-link__cta { justify-self: end; }
}
@media (prefers-reduced-motion: reduce) { .product-link { transition: none; } }
</style>
