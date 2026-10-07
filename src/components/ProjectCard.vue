<script setup>
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import { computed } from 'vue'
import { getProjectDeliveryLabel, getProjectLinks } from '../utils/portfolio'

const props = defineProps({
  project: { type: Object, required: true },
})

const deliveryLabel = computed(() => getProjectDeliveryLabel(props.project))
const links = computed(() => getProjectLinks(props.project))
</script>

<template>
  <article
    :id="`project-${project.id}`"
    v-reveal
    v-spotlight
    class="card project-card"
    :class="{ 'project-card--public': links.length }"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div v-if="project.period || project.status" class="project-card__top">
      <span v-if="project.period" class="project-card__period">{{ project.period }}</span>
      <span v-if="project.status" class="project-card__status">{{ project.status }}</span>
    </div>
    <div v-if="deliveryLabel" class="project-card__delivery" :class="{ 'project-card__delivery--original': project.delivery === 'before-ai' }">
      <span>{{ deliveryLabel }}</span>
    </div>
    <h4 :id="`project-title-${project.id}`"><BaseIcon v-if="project.icon" :name="project.icon" /><span>{{ project.name }}</span></h4>
    <p v-if="project.role" class="project-card__role">{{ project.role }}</p>
    <p v-if="project.description" class="project-card__description">{{ project.description }}</p>
    <div v-if="project.achievements?.length" class="project-card__achievements">
      <p class="project-card__label">Điểm nổi bật</p>
      <ul class="project-card__features" role="list">
        <li v-for="achievement in project.achievements" :key="achievement">{{ achievement }}</li>
      </ul>
    </div>
    <details v-if="project.details?.length" class="project-card__details">
      <summary>Luồng sử dụng &amp; triển khai</summary>
      <ul role="list">
        <li v-for="detail in project.details" :key="detail">{{ detail }}</li>
      </ul>
    </details>
    <div v-if="project.techStack?.length" class="project-card__tech" role="group" aria-label="Công nghệ">
      <span v-for="tech in project.techStack" :key="tech">{{ tech }}</span>
    </div>
    <ProductLinks v-if="links.length" :links="links" class="project-card__products" />
  </article>
</template>

<style scoped>
.project-card { min-width: 0; padding: 1.5rem; overflow-wrap: anywhere; scroll-margin-top: calc(var(--nav-h) + 20px); }
.project-card--public { border-color: var(--border-strong); }
.project-card__top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .35rem .75rem; margin-bottom: .75rem; line-height: 1.6; }
.project-card__status { color: var(--text-muted); font-size: .78rem; }
.project-card--public .project-card__status { color: var(--accent); }
.project-card__delivery { display: flex; flex-wrap: wrap; align-items: center; gap: .4rem .75rem; margin-bottom: .9rem; color: var(--text-muted); font-size: .78rem; line-height: 1.6; }
.project-card__delivery > span:first-child { padding: .2rem .55rem; border: 1px solid var(--border); border-radius: 6px; background: var(--bg-soft); }
.project-card__delivery--original > span:first-child { color: var(--accent); border-color: var(--border-strong); font-weight: 600; }
.project-card__period { color: var(--text-muted); font-family: var(--font-mono); font-size: .78rem; }
.project-card h4 { display: flex; align-items: flex-start; gap: .6rem; color: var(--text); font-family: var(--font-display); font-size: 1.2rem; font-weight: 600; line-height: 1.45; letter-spacing: -.015em; }
.project-card h4 > span { min-width: 0; }
.project-card h4 .icon { width: 1.15rem; height: 1.15rem; margin-top: .25rem; color: var(--accent); }
.project-card__role { margin-top: .4rem; color: var(--text-muted); font-size: .86rem; line-height: 1.65; }
.project-card__description { margin: 1rem 0; color: var(--text-muted); font-size: .94rem; line-height: 1.75; }
.project-card__achievements { margin-bottom: 1rem; }
.project-card__label { margin-bottom: .45rem; color: var(--text-muted); font-size: .8rem; font-weight: 600; line-height: 1.6; }
.project-card__features { display: grid; gap: .4rem; color: var(--text-muted); font-size: .94rem; line-height: 1.75; }
.project-card__features li { position: relative; padding-left: 1rem; }
.project-card__features li::before { content: ''; position: absolute; top: .75em; left: 0; width: 4px; height: 4px; border-radius: 50%; background: var(--text-faint); }
.project-card__details { margin-bottom: 1rem; color: var(--text-muted); font-size: .94rem; line-height: 1.75; }
.project-card__details summary { cursor: pointer; color: var(--accent); font-size: .86rem; font-weight: 500; }
.project-card__details ul { display: grid; gap: .45rem; padding-top: .75rem; }
.project-card__details li { padding-left: .85rem; border-left: 1px solid var(--border-strong); }
.project-card__tech { display: flex; flex-wrap: wrap; gap: .45rem; }
.project-card__tech span { min-width: 0; max-width: 100%; padding: .22rem .6rem; border: 1px solid var(--border); border-radius: 6px; background: var(--bg-soft); color: var(--text-muted); font-size: .78rem; line-height: 1.65; transition: color 180ms, border-color 180ms, background 180ms; }
.project-card__tech span:hover { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 25%, var(--border)); background: color-mix(in srgb, var(--accent) 6%, var(--bg-soft)); }
.project-card__products { min-width: 0; margin-top: 1.15rem; }
@media (max-width: 560px) {
  .project-card { padding: 1.1rem; }
  .project-card h4 { font-size: 1.13rem; }
}
@media (prefers-reduced-motion: reduce) { .project-card__tech span { transition: none; } }
</style>
