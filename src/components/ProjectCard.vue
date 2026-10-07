<script setup>
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import { computed } from 'vue'
import { getProjectDelivery } from '../data/career'

const props = defineProps({
  project: { type: Object, required: true },
})

const delivery = computed(() => getProjectDelivery(props.project.id))
</script>

<template>
  <article
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card project-card"
    :class="{ 'project-card--public': project.products.length }"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="project-card__top">
      <span class="project-card__number">{{ project.num }}</span>
      <span class="project-card__status">{{ project.status }}</span>
    </div>
    <div v-if="delivery" class="project-card__delivery" :class="{ 'project-card__delivery--original': delivery.phase === 'before-ai' }">
      <span>{{ delivery.label }}</span>
      <span v-if="delivery.period" class="project-card__period">{{ delivery.period }}</span>
    </div>
    <h3 :id="`project-title-${project.id}`"><BaseIcon :name="project.icon" /> {{ project.title }}</h3>
    <p class="project-card__role">{{ project.role }}</p>
    <ul class="project-card__features">
      <li v-for="point in project.points" :key="point">{{ point }}</li>
    </ul>
    <details v-if="project.details?.length" class="project-card__details">
      <summary>Luồng sử dụng &amp; triển khai</summary>
      <ul>
        <li v-for="detail in project.details" :key="detail">{{ detail }}</li>
      </ul>
    </details>
    <div v-if="project.tech.length" class="project-card__tech" role="group" aria-label="Công nghệ">
      <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
    </div>
    <ProductLinks v-if="project.products.length" :products="project.products" class="project-card__products" />
  </article>
</template>

<style scoped>
.project-card { min-width: 0; padding: 1.1rem; scroll-margin-top: calc(var(--nav-h) + 20px); }
.project-card--public { border-color: var(--border-strong); }
.project-card__top { display: flex; align-items: center; justify-content: space-between; gap: .6rem; margin-bottom: .55rem; }
.project-card__number { color: var(--text-faint); font-family: var(--font-mono); font-size: .72rem; }
.project-card__status { color: var(--text-muted); font-size: .7rem; }
.project-card--public .project-card__status { color: var(--cyan); }
.project-card__delivery { display: flex; flex-wrap: wrap; align-items: center; gap: .3rem .65rem; margin-bottom: .7rem; color: var(--text-muted); font-size: .7rem; }
.project-card__delivery > span:first-child { padding: .15rem .45rem; border: 1px solid var(--border); border-radius: 6px; }
.project-card__delivery--original > span:first-child { color: var(--cyan); background: var(--gradient-soft); border-color: var(--border-strong); font-weight: 600; }
.project-card__period { font-family: var(--font-mono); }
.project-card h3 { display: flex; align-items: center; gap: .5rem; font-family: var(--font-display); font-size: 1.15rem; font-weight: 600; line-height: 1.35; letter-spacing: -.015em; }
.project-card h3 .icon { width: 1.05rem; height: 1.05rem; color: var(--cyan); }
.project-card__role { margin-top: .3rem; color: var(--text-muted); font-size: .75rem; line-height: 1.5; }
.project-card__features { display: grid; gap: .35rem; margin: .8rem 0; color: var(--text-muted); font-size: .86rem; line-height: 1.6; }
.project-card__features li { position: relative; padding-left: .75rem; }
.project-card__features li::before { content: ''; position: absolute; top: .65em; left: 0; width: 4px; height: 4px; border-radius: 50%; background: var(--text-faint); }
.project-card__details { margin-bottom: .8rem; color: var(--text-muted); font-size: .8rem; }
.project-card__details summary { cursor: pointer; color: var(--cyan); font-weight: 500; }
.project-card__details ul { display: grid; gap: .4rem; padding-top: .6rem; }
.project-card__details li { padding-left: .7rem; border-left: 1px solid var(--border-strong); }
.project-card__tech { display: flex; flex-wrap: wrap; gap: .3rem; }
.project-card__tech span { padding: .15rem .45rem; border: 1px solid var(--border); border-radius: 6px; color: var(--text-muted); font-size: .68rem; line-height: 1.6; }
.project-card__products { margin-top: .85rem; }
@media (max-width: 560px) {
  .project-card { padding: 1rem; }
  .project-card h3 { font-size: 1.08rem; }
}
</style>
