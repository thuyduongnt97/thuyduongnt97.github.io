<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  skill: { type: Object, required: true },
})
</script>

<template>
  <article
    v-reveal
    v-spotlight
    class="card card--spotlight-layer bento-card"
    :aria-label="skill.title"
  >
    <div class="card-spotlight" aria-hidden="true" />
    <header class="bento-card__head">
      <div class="bento-card__icon" aria-hidden="true">
        <BaseIcon :name="skill.icon || 'code'" />
      </div>
      <div class="bento-card__titles">
        <h3 class="bento-card__title">{{ skill.title }}</h3>
        <p v-if="skill.subtitle" class="bento-card__subtitle">{{ skill.subtitle }}</p>
      </div>
    </header>

    <div v-if="skill.type === 'highlights' || skill.highlights" class="bento-card__body">
      <ul class="bento-highlights" role="list" :aria-label="skill.title">
        <li v-for="(item, idx) in skill.highlights" :key="idx" class="bento-highlight-item">
          <span class="bento-highlight-bullet" aria-hidden="true">
            <BaseIcon name="check" />
          </span>
          <div class="bento-highlight-content">
            <strong class="bento-highlight-title">{{ item.title }}</strong>
            <p v-if="item.desc" class="bento-highlight-desc">{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="bento-card__body">
      <ul class="bento-pills" role="list" :aria-label="skill.title">
        <li
          v-for="chip in skill.chips"
          :key="chip"
          class="bento-pill"
        >
          {{ chip }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.bento-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface-solid);
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
}

.bento-card.reveal.is-visible {
  transition: opacity .35s var(--ease), transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
}

.bento-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: var(--shadow-hover);
}

[data-theme="dark"] .bento-card:hover {
  border-color: var(--border-strong);
}

.bento-card__head {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.bento-card__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #eef2ff;
  color: #4f46e5;
  border: 1px solid #e0e7ff;
}

.bento-card__icon .icon {
  width: 1.25rem;
  height: 1.25rem;
}

[data-theme="dark"] .bento-card__icon {
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border-color: rgba(99, 102, 241, 0.25);
}

.bento-card__titles {
  min-width: 0;
}

.bento-card__title {
  color: #0f172a;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.015em;
  overflow-wrap: anywhere;
}

[data-theme="dark"] .bento-card__title {
  color: var(--text);
}

.bento-card__subtitle {
  margin-top: 0.2rem;
  color: #64748b;
  font-size: 0.8125rem;
  line-height: 1.45;
}

[data-theme="dark"] .bento-card__subtitle {
  color: var(--text-muted);
}

.bento-card__body {
  flex: 1 1 auto;
  min-width: 0;
}

/* Bento Badges / Pills: bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold inline-block m-1 */
.bento-pills {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: -0.25rem;
}

.bento-pill {
  display: inline-flex;
  align-items: center;
  margin: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  background: #eef2ff;
  color: #4338ca;
  border: 1px solid #e0e7ff;
  overflow-wrap: anywhere;
  transition: transform 150ms ease, background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.bento-pill:hover {
  transform: translateY(-1px);
  background: #e0e7ff;
  color: #3730a3;
  border-color: #c7d2fe;
}

[data-theme="dark"] .bento-pill {
  background: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  border-color: rgba(99, 102, 241, 0.24);
}

[data-theme="dark"] .bento-pill:hover {
  background: rgba(99, 102, 241, 0.22);
  color: #c7d2fe;
}

/* Card Thế mạnh thực chiến: Bullet Points */
.bento-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.bento-highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.bento-highlight-bullet {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #eef2ff;
  color: #4338ca;
  border: 1px solid #e0e7ff;
  margin-top: 0.15rem;
}

.bento-highlight-bullet .icon {
  width: 0.75rem;
  height: 0.75rem;
}

[data-theme="dark"] .bento-highlight-bullet {
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border-color: rgba(99, 102, 241, 0.25);
}

.bento-highlight-content {
  min-width: 0;
}

.bento-highlight-title {
  display: block;
  color: #0f172a;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
}

[data-theme="dark"] .bento-highlight-title {
  color: var(--text);
}

.bento-highlight-desc {
  margin-top: 0.15rem;
  color: #64748b;
  font-size: 0.8125rem;
  line-height: 1.5;
}

[data-theme="dark"] .bento-highlight-desc {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .bento-card {
    padding: 1.25rem;
    border-radius: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-card, .bento-pill {
    transition: none;
  }
}
</style>
