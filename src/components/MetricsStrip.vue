<script setup>
import { profile } from '../data/profile'
</script>

<template>
  <section id="metrics" class="metrics-strip" aria-label="Kinh nghiệm và thành tựu qua số liệu">
    <div class="container">
      <dl class="metrics-strip__grid">
        <div v-for="metric in profile.stats" :key="metric.label" class="metrics-strip__item">
          <dt class="metrics-strip__label">{{ metric.label }}</dt>
          <dd class="metrics-strip__value">{{ metric.to }}{{ metric.suffix }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.metrics-strip { padding-block: 0; border-block: 1px solid var(--border); background: var(--surface-solid); }
.metrics-strip__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding-block: 1.25rem; }
.metrics-strip__item { display: flex; flex-direction: column; align-items: center; min-width: 0; padding: .25rem 1.25rem; text-align: center; }
.metrics-strip__item + .metrics-strip__item { border-left: 1px solid var(--border); }
.metrics-strip__value { order: -1; color: var(--text); font-family: var(--font-display); font-size: clamp(2.25rem, 3.5vw, 2.75rem); font-weight: 700; line-height: 1.15; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.metrics-strip__label { max-width: 24ch; margin-top: .4rem; color: var(--text-muted); font-size: .82rem; line-height: 1.6; overflow-wrap: anywhere; }
@media (max-width: 700px) {
  .metrics-strip__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); padding-block: .5rem; }
  .metrics-strip__item { padding: 1rem .75rem; }
  .metrics-strip__item:nth-child(odd) { border-left: 0; }
  .metrics-strip__item:nth-child(n + 3) { border-top: 1px solid var(--border); }
}
</style>
