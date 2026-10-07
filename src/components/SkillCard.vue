<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  skill: { type: Object, required: true },
})
</script>

<template>
  <article v-reveal v-spotlight class="card skill">
    <div class="skill__head">
      <div class="skill__icon"><BaseIcon :name="skill.icon" /></div>
      <div>
        <h3>{{ skill.title }}</h3>
      </div>
    </div>
    <p class="skill__description">{{ skill.description }}</p>
    <div class="chips">
      <span v-for="chip in skill.chips" :key="chip" class="chip">{{ chip }}</span>
    </div>
  </article>
</template>

<style scoped>
.skill { min-width: 0; padding: 1.4rem; overflow-wrap: anywhere; }
.skill__head { display: flex; align-items: center; gap: .85rem; margin-bottom: 1rem; }
.skill .skill__icon { width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 10px; color: var(--accent); background: var(--bg-soft); box-shadow: none; }
.skill__icon .icon { width: 1.15rem; height: 1.15rem; }
.skill h3 { color: var(--text); font-size: 1.06rem; font-weight: 600; line-height: 1.5; }
.skill__description { color: var(--text-muted); font-size: .94rem; line-height: 1.7; margin-bottom: 1.1rem; }
.chips { gap: .45rem; }
.chip { min-width: 0; max-width: 100%; padding: .3rem .6rem; border: 1px solid var(--border); border-radius: 7px; background: var(--bg-soft); color: var(--text-muted); font-size: .77rem; line-height: 1.65; transition: color 180ms, border-color 180ms, background 180ms; }
.chip:hover { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 25%, var(--border)); background: color-mix(in srgb, var(--accent) 6%, var(--bg-soft)); transform: none; }
@media (max-width: 560px) { .skill { padding: 1.1rem; } }
@media (prefers-reduced-motion: reduce) { .chip { transition: none; } }
</style>
