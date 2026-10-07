<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  products: { type: Array, required: true },
  compact: { type: Boolean, default: false },
})

const productHref = (product) => product.entry
  ? `${import.meta.env.BASE_URL}interactives/${product.entry}`
  : product.url
const productCta = (product) => product.entry ? 'Mở demo' : 'Xem landing page'
</script>

<template>
  <ul class="product-links" :class="{ 'product-links--compact': compact }">
    <li v-for="product in products" :key="product.id">
      <a
        class="product-link"
        :href="productHref(product)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${productCta(product)}: ${product.title} (mở trong tab mới)`"
      >
        <div class="product-link__info">
          <strong>{{ product.title }}</strong>
          <span v-if="!compact" class="product-link__category">
            {{ product.category || (product.entry ? 'Interactive' : 'Landing page') }}
            <template v-if="product.desktopEntry && product.mobileEntry"> · PC &amp; Mobile</template>
          </span>
        </div>
        <span class="product-link__cta">{{ productCta(product) }} <BaseIcon name="external" /></span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.product-links { display: grid; gap: .5rem; }
.product-link { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: .7rem; padding: .75rem .85rem; border: 1px solid var(--border-strong); border-radius: 10px; background: var(--gradient-soft); transition: border-color .2s, background .2s; }
.product-link:hover { border-color: var(--cyan); background: color-mix(in srgb, var(--cyan) 9%, var(--surface-solid)); }
.product-link__info { min-width: 0; }
.product-link__info strong { display: block; font-size: .9rem; font-weight: 600; line-height: 1.4; overflow-wrap: anywhere; }
.product-link__category { display: block; margin-top: .15rem; color: var(--text-muted); font-size: .73rem; line-height: 1.45; }
.product-link__cta { display: inline-flex; align-items: center; gap: .35rem; color: var(--cyan); font-size: .78rem; font-weight: 600; white-space: nowrap; }
.product-link__cta .icon { width: 1rem; height: 1rem; }
.product-links--compact .product-link { padding: .5rem .7rem; background: var(--surface); }
.product-links--compact .product-link__info strong { font-size: .83rem; }
@media (max-width: 380px) {
  .product-link { grid-template-columns: 1fr; gap: .4rem; }
  .product-link__cta { justify-self: end; }
}
@media (prefers-reduced-motion: reduce) { .product-link { transition: none; } }
</style>
