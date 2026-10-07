<script setup>
import BaseIcon from './BaseIcon.vue'
import ProductLinks from './ProductLinks.vue'
import SectionHead from './SectionHead.vue'
import { job, universityExperience } from '../data/experience'
import { agentMilestone, careerMilestones, careerOngoingWork, deliveryPhases } from '../data/career'

const orderedMilestones = careerMilestones.map((milestone, index) => ({
  ...milestone,
  order: milestone.order ?? index + 1,
}))
const phases = deliveryPhases.map((phase) => ({
  ...phase,
  milestones: orderedMilestones
    .filter((milestone) => milestone.phase === phase.id)
    .sort((a, b) => a.order - b.order),
}))
const agentMonth = agentMilestone.date
</script>

<template>
  <section id="experience" aria-labelledby="exp-title">
    <div class="container">
      <SectionHead
        eyebrow="02 — Kinh nghiệm"
        title="Dòng thời gian phát triển sản phẩm"
        title-id="exp-title"
      />

      <div class="experience-current" role="group" aria-labelledby="current-job-title">
        <div v-reveal class="experience-job">
          <div>
            <h3 id="current-job-title">{{ job.role }}</h3>
            <p>{{ job.scope }} · {{ job.stageLabel }}</p>
          </div>
          <div class="experience-job__meta">
            <span><BaseIcon name="calendar" /> {{ job.period }}</span>
            <span><BaseIcon name="pin" /> {{ job.location }}</span>
          </div>
        </div>

        <div class="career-phases">
          <div
            v-for="phase in phases"
            :key="phase.id"
            class="career-phase"
            :class="{ 'career-phase--agents': phase.id === 'with-agents' }"
            role="group"
            :aria-labelledby="`career-phase-${phase.id}`"
          >
            <div class="career-phase__head">
              <p v-if="phase.id !== 'with-agents'" class="career-phase__period">{{ phase.period }}</p>
              <h3 :id="`career-phase-${phase.id}`">{{ phase.title }}</h3>
              <div v-if="phase.id === 'with-agents'" id="agent-milestone" class="career-transition">
                <BaseIcon name="sparkle" />
                <p><time :datetime="agentMonth">{{ agentMilestone.period }}</time> · {{ agentMilestone.label }}</p>
              </div>
              <p v-else class="career-phase__description">{{ phase.description }}</p>
            </div>

            <ol class="career-timeline" role="list" :start="phase.milestones[0]?.order || 1" :aria-labelledby="`career-phase-${phase.id}`">
              <li
                v-for="(milestone, index) in phase.milestones"
                :key="milestone.id"
                v-reveal="index * 30"
                class="career-milestone"
              >
                <span class="career-milestone__number" aria-hidden="true">{{ String(milestone.order).padStart(2, '0') }}</span>
                <article :aria-labelledby="`career-${milestone.id}`">
                  <p v-if="milestone.period" class="career-milestone__period">{{ milestone.period }}</p>
                  <h4 :id="`career-${milestone.id}`">{{ milestone.title }}</h4>
                  <p class="career-milestone__description">{{ milestone.description }}</p>
                  <div v-if="milestone.projects?.length" class="career-milestone__projects" role="group" aria-label="Dự án liên quan">
                    <a v-for="project in milestone.projects" :key="project.id" :href="`#project-${project.id}`">
                      {{ project.label }} <BaseIcon name="arrow" />
                    </a>
                  </div>
                  <ProductLinks v-if="milestone.products?.length" :products="milestone.products" class="career-milestone__products" compact />
                </article>
              </li>
            </ol>
          </div>
        </div>

        <div v-if="careerOngoingWork.length" v-reveal class="card career-ongoing" role="group" aria-labelledby="career-ongoing-title">
          <h3 id="career-ongoing-title">Công việc xuyên suốt</h3>
          <div class="career-ongoing__rows">
            <article v-for="item in careerOngoingWork" :key="item.id" :aria-labelledby="`career-ongoing-${item.id}`">
              <h4 :id="`career-ongoing-${item.id}`">{{ item.title }}</h4>
              <p>{{ item.description }}</p>
              <div v-if="item.projects?.length" class="career-milestone__projects" role="group" aria-label="Dự án liên quan">
                <a v-for="project in item.projects" :key="project.id" :href="`#project-${project.id}`">
                  {{ project.label }} <BaseIcon name="arrow" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      <article v-reveal class="card experience-foundation" aria-labelledby="university-job-title">
        <div class="experience-foundation__head">
          <div>
            <span class="experience-foundation__label">{{ universityExperience.stageLabel }}</span>
            <h3 id="university-job-title">{{ universityExperience.organization }}</h3>
            <p class="experience-foundation__role">{{ universityExperience.role }}</p>
          </div>
          <span class="experience-foundation__period">{{ universityExperience.period }}</span>
        </div>
        <div class="experience-foundation__work">
          <p v-for="item in universityExperience.items" :key="item.title">
            <strong>{{ item.title }}:</strong> {{ item.description }}
          </p>
        </div>
        <div class="experience-earlier">
          <span class="experience-earlier__dates">
            <time :datetime="universityExperience.earlierSupport.start.date">{{ universityExperience.earlierSupport.start.label }}</time>
            <span> — </span>
            <time :datetime="universityExperience.earlierSupport.end.date">{{ universityExperience.earlierSupport.end.label }}</time>
          </span>
          <p><strong>{{ universityExperience.earlierSupport.title }}.</strong> {{ universityExperience.earlierSupport.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.experience-job { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.experience-job h3 { font-family: var(--font-display); font-size: 1.15rem; line-height: 1.35; letter-spacing: -.02em; }
.experience-job p { margin-top: .25rem; color: var(--text-muted); font-size: .84rem; }
.experience-job__meta { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: .4rem 1.1rem; color: var(--text-muted); font-size: .8rem; }
.experience-job__meta > span { display: inline-flex; align-items: center; gap: .35rem; }
.career-phases { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 1.75rem; padding-top: .7rem; }
.career-phase { min-width: 0; }
.career-phase__head { min-height: 112px; padding-bottom: .8rem; border-bottom: 1px solid var(--border); }
.career-phase__period { margin-bottom: .3rem; color: var(--text-faint); font-family: var(--font-mono); font-size: .7rem; line-height: 1.5; }
.career-phase__head h3 { font-family: var(--font-display); font-size: 1.13rem; line-height: 1.35; letter-spacing: -.02em; }
.career-phase__description { margin-top: .4rem; color: var(--text-muted); font-size: .8rem; line-height: 1.6; }
.career-transition { display: flex; align-items: flex-start; gap: .5rem; margin-top: .65rem; padding: .55rem .65rem; border: 1px solid var(--border-strong); border-radius: 9px; background: var(--gradient-soft); scroll-margin-top: 6rem; }
.career-transition > .icon { width: 1rem; height: 1rem; color: var(--cyan); margin-top: .1rem; }
.career-transition p { font-size: .75rem; line-height: 1.55; color: var(--text-muted); }
.career-transition time { color: var(--text); font-family: var(--font-mono); font-weight: 500; white-space: nowrap; }
.career-timeline { position: relative; list-style: none; padding-top: .35rem; }
.career-timeline::before { content: ''; position: absolute; left: .72rem; top: 1.2rem; bottom: 1.2rem; width: 1px; background: var(--border-strong); }
.career-milestone { position: relative; min-width: 0; padding: .85rem 0 .85rem 2.25rem; }
.career-milestone + .career-milestone { border-top: 1px solid var(--border); }
.career-milestone__number { position: absolute; left: 0; top: .85rem; z-index: 1; display: grid; place-items: center; width: 1.5rem; height: 1.5rem; border: 1px solid var(--border-strong); border-radius: 50%; background: var(--surface-solid); color: var(--text-muted); font-family: var(--font-mono); font-size: .62rem; line-height: 1; }
.career-phase--agents .career-milestone__number { color: var(--cyan); border-color: color-mix(in srgb, var(--cyan) 35%, var(--border)); }
.career-milestone__period { margin-bottom: .2rem; color: var(--cyan); font-family: var(--font-mono); font-size: .69rem; line-height: 1.5; }
.career-milestone h4 { font-family: var(--font-display); font-size: .95rem; font-weight: 600; line-height: 1.4; letter-spacing: -.01em; overflow-wrap: anywhere; }
.career-milestone__description { margin-top: .3rem; color: var(--text-muted); font-size: .82rem; line-height: 1.65; }
.career-milestone__projects { display: flex; flex-wrap: wrap; gap: .25rem .8rem; margin-top: .4rem; }
.career-milestone__projects a { display: inline-flex; align-items: center; gap: .3rem; color: var(--text-muted); font-size: .73rem; line-height: 1.5; font-weight: 500; padding-block: .2rem; transition: color .2s; }
.career-milestone__projects a:hover { color: var(--cyan); }
.career-milestone__projects .icon { width: .8rem; height: .8rem; }
.career-milestone__products { margin-top: .5rem; }
.career-ongoing { display: grid; grid-template-columns: 180px minmax(0, 1fr); align-items: start; gap: 1rem; margin-top: .85rem; padding: .9rem 1rem; }
.career-ongoing > h3 { color: var(--cyan); font-family: var(--font-mono); font-size: .73rem; font-weight: 500; line-height: 1.6; }
.career-ongoing__rows { min-width: 0; }
.career-ongoing__rows article + article { margin-top: .7rem; padding-top: .7rem; border-top: 1px solid var(--border); }
.career-ongoing__rows h4 { font-family: var(--font-display); font-size: .9rem; font-weight: 600; line-height: 1.45; overflow-wrap: anywhere; }
.career-ongoing__rows p { margin-top: .25rem; color: var(--text-muted); font-size: .81rem; line-height: 1.6; }
.experience-foundation__label { color: var(--cyan); font-family: var(--font-mono); font-size: .7rem; line-height: 1.5; }
.experience-foundation { margin-top: 1rem; padding: 1.2rem; }
.experience-foundation__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.experience-foundation h3 { margin-top: .3rem; font-family: var(--font-display); font-size: 1rem; line-height: 1.45; letter-spacing: -.01em; }
.experience-foundation__role { margin-top: .2rem; color: var(--text-muted); font-size: .8rem; }
.experience-foundation__period { flex-shrink: 0; color: var(--text-muted); font-family: var(--font-mono); font-size: .73rem; padding-top: .15rem; }
.experience-foundation__work { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem 1.5rem; margin-top: .8rem; }
.experience-foundation__work p, .experience-earlier p { color: var(--text-muted); font-size: .81rem; line-height: 1.6; }
.experience-foundation__work strong, .experience-earlier strong { color: var(--text); font-weight: 500; }
.experience-earlier { display: flex; gap: 1.2rem; border-top: 1px solid var(--border); margin-top: .9rem; padding-top: .8rem; }
.experience-earlier__dates { flex-shrink: 0; color: var(--text-faint); font-family: var(--font-mono); font-size: .7rem; padding-top: .1rem; }
@media (max-width: 900px) {
  .career-phases { grid-template-columns: 1fr; gap: 1.1rem; }
  .career-phase__head { min-height: 0; }
  .career-transition { max-width: 540px; }
}
@media (max-width: 760px) {
  .experience-job { align-items: flex-start; flex-direction: column; gap: .55rem; }
  .experience-job__meta { justify-content: flex-start; }
  .career-ongoing { grid-template-columns: 1fr; gap: .4rem; }
  .experience-foundation__work { grid-template-columns: 1fr; }
  .experience-foundation__head { flex-direction: column; gap: .45rem; }
  .experience-earlier { flex-direction: column; gap: .3rem; }
}
@media (max-width: 560px) {
  .career-milestone { padding-left: 2rem; }
  .career-milestone__description { font-size: .8rem; }
  .experience-foundation { padding: 1rem; }
}
</style>
