<script setup>
import SectionHead from './SectionHead.vue'
import SkillCard from './SkillCard.vue'
import { skills } from '../data/skills'

const frontendSkills = skills.filter((skill) => skill.featured)
const supportingSkills = skills.filter((skill) => !skill.featured)
</script>

<template>
  <section id="skills" aria-labelledby="skills-title">
    <div class="container">
      <SectionHead
        eyebrow="01 — Kỹ năng"
        title="Tập trung vào frontend"
        title-id="skills-title"
        sub="Frontend, chuyển động và trực quan dữ liệu — cùng nền tảng backend, dữ liệu và công cụ triển khai."
      />
      <div class="frontend-skills">
        <SkillCard v-for="skill in frontendSkills" :key="skill.title" :skill="skill" />
      </div>
      <details class="supporting-skills" open>
        <summary>Nền tảng fullstack <span>Laravel · MySQL · Redis · Git · Vite</span></summary>
        <div class="supporting-skills__grid">
          <div v-for="skill in supportingSkills" :key="skill.title">
            <h3>{{ skill.title }}</h3>
            <p>{{ skill.chips.join(' · ') }}</p>
          </div>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.frontend-skills { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.supporting-skills { margin-top: 1.4rem; padding: 1.4rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-soft); }
.supporting-skills summary { cursor: pointer; color: var(--text); font-size: 1rem; font-weight: 600; line-height: 1.65; overflow-wrap: anywhere; }
.supporting-skills summary span { margin-left: .75rem; color: var(--text-muted); font-size: .86rem; font-weight: 400; }
.supporting-skills__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; padding-top: 1.25rem; }
.supporting-skills__grid > div { min-width: 0; }
.supporting-skills__grid h3 { color: var(--text); font-size: .94rem; font-weight: 600; line-height: 1.5; margin-bottom: .45rem; }
.supporting-skills__grid p { color: var(--text-muted); font-size: .94rem; line-height: 1.7; overflow-wrap: anywhere; }
@media (max-width: 900px) {
  .frontend-skills, .supporting-skills__grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .frontend-skills { gap: 1rem; }
  .supporting-skills { padding: 1.1rem; }
  .supporting-skills summary span { display: block; margin: .35rem 0 0; }
}
</style>
