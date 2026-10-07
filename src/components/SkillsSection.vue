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
        eyebrow="03 — Kỹ năng"
        title="Tập trung vào frontend"
        title-id="skills-title"
        sub="Framework, chuyển động và trực quan dữ liệu — những kỹ năng thể hiện qua các dự án ở trên."
      />
      <div class="frontend-skills">
        <SkillCard v-for="skill in frontendSkills" :key="skill.title" :skill="skill" />
      </div>
      <details class="supporting-skills">
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
.frontend-skills { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.supporting-skills { margin-top: 1rem; border-block: 1px solid var(--border); padding-block: .9rem; }
.supporting-skills summary { cursor: pointer; font-size: .88rem; font-weight: 600; }
.supporting-skills summary span { margin-left: .6rem; color: var(--text-muted); font-size: .8rem; font-weight: 400; }
.supporting-skills__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; padding-top: 1rem; }
.supporting-skills__grid h3 { font-size: .88rem; margin-bottom: .35rem; }
.supporting-skills__grid p { color: var(--text-muted); font-size: .82rem; overflow-wrap: anywhere; }
@media (max-width: 900px) {
  .frontend-skills, .supporting-skills__grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .supporting-skills summary span { display: block; margin: .35rem 0 0; }
}
</style>
