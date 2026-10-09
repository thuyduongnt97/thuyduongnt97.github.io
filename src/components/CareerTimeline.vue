<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { careerMilestones } from '../data/timeline'
</script>

<template>
  <section id="timeline" class="timeline-section" aria-labelledby="timeline-title">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHead
        eyebrow="03 — Sự nghiệp"
        title="Lộ trình kinh nghiệm & Dấu mốc"
        title-id="timeline-title"
        sub="Chi tiết 7+ năm phát triển sản phẩm web thực chiến: từ nghiên cứu & chuyển giao công nghệ, AdTech, bản đồ GIS đến Senior Frontend Engineer và AI Agent workflow."
      />

      <div class="timeline-container relative pl-8 md:pl-12">
        <!-- Vertical Spine Line -->
        <div class="timeline-spine" aria-hidden="true" />

        <div class="timeline-list flex flex-col gap-6 sm:gap-7" role="list">
          <div
            v-for="(item, index) in careerMilestones"
            :key="item.id"
            v-reveal="index * 60"
            :id="item.isCurrent ? 'agent-milestone' : undefined"
            class="timeline-item group"
            :class="{ 'timeline-item--current': item.isCurrent }"
            role="listitem"
          >
            <!-- Timeline Node Indicator -->
            <div class="timeline-node-wrap" aria-hidden="true">
              <div
                class="timeline-node"
                :class="{ 'timeline-node--current': item.isCurrent }"
              >
                <BaseIcon :name="item.icon" class="timeline-node-icon" />
              </div>
            </div>

            <!-- Milestone Content Card -->
            <article
              v-spotlight
              class="card timeline-card card--spotlight-layer"
              :class="{ 'timeline-card--current': item.isCurrent }"
            >
              <div class="card-spotlight" aria-hidden="true" />

              <header class="timeline-card__header">
                <div class="timeline-card__badges">
                  <div class="period-pill font-mono">
                    <BaseIcon name="calendar" class="period-icon" />
                    <span>{{ item.period }}</span>
                  </div>
                  <span
                    v-if="item.badge"
                    class="badge-milestone"
                    :class="{ 'badge-milestone--current': item.isCurrent }"
                  >
                    <span v-if="item.isCurrent" class="pulse-dot animate-ping" />
                    {{ item.badge }}
                  </span>
                  <span v-if="item.location" class="location-text">
                    <BaseIcon name="pin" class="location-icon" />
                    {{ item.location }}
                  </span>
                </div>

                <div class="timeline-card__titles">
                  <h3 class="timeline-card__role font-display">{{ item.role }}</h3>
                  <div class="timeline-card__company-wrap">
                    <strong class="timeline-card__company">{{ item.company }}</strong>
                    <span v-if="item.department" class="timeline-card__dept">· {{ item.department }}</span>
                  </div>
                </div>
              </header>

              <p v-if="item.summary" class="timeline-card__summary">
                {{ item.summary }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  position: relative;
  padding-top: clamp(3rem, 6vw, 5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
  scroll-margin-top: 6rem;
}

.timeline-spine {
  position: absolute;
  top: 1.25rem;
  bottom: 2rem;
  left: 0.95rem;
  width: 2px;
  background: linear-gradient(to bottom, var(--interactive-accent), var(--interactive-border), var(--border));
  border-radius: 9999px;
}

@media (min-width: 768px) {
  .timeline-spine {
    left: 1.35rem;
  }
}

.timeline-item {
  position: relative;
}

.timeline-node-wrap {
  position: absolute;
  top: 1.25rem;
  left: -2rem;
  transform: translateX(-50%);
  z-index: 10;
}

@media (min-width: 768px) {
  .timeline-node-wrap {
    left: -3rem;
  }
}

.timeline-node {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  border: 2px solid var(--border-strong);
  background: var(--surface-solid);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

@media (min-width: 640px) {
  .timeline-node {
    width: 2rem;
    height: 2rem;
  }
}

.timeline-item:hover .timeline-node {
  transform: scale(1.1);
  border-color: var(--interactive-accent);
  color: var(--interactive-accent);
}

.timeline-node--current {
  background: var(--interactive-soft);
  border-color: var(--interactive-accent);
  color: var(--interactive-accent);
  box-shadow: 0 0 0 4px var(--interactive-soft);
}

.timeline-node-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Card */
.timeline-card {
  position: relative;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.timeline-card:hover {
  transform: translateY(-2px);
  border-color: var(--interactive-border);
  box-shadow: var(--shadow-lg);
}

.timeline-card--current {
  border-color: var(--interactive-border);
}

.timeline-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.85rem;
}

.timeline-card__badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.period-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 0.375rem;
  background: var(--bg-soft);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border);
}

.period-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.badge-milestone {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  background: var(--bg-soft);
  color: var(--text-faint);
  font-weight: 600;
}

.badge-milestone--current {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border: 1px solid var(--interactive-border);
  font-weight: 700;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #10b981;
}

.location-text {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-left: auto;
}

.location-icon {
  width: 0.85rem;
  height: 0.85rem;
}

.timeline-card__titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.timeline-card__role {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.timeline-card__company-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.875rem;
}

.timeline-card__company {
  color: var(--interactive-accent);
  font-weight: 600;
}

.timeline-card__dept {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.timeline-card__summary {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .timeline-card,
  .timeline-node {
    transition: none;
  }
}
</style>
