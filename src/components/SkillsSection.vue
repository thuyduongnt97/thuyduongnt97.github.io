<script setup>
import SectionHead from './SectionHead.vue'
import SkillCard from './SkillCard.vue'
import { skills } from '../data/skills'
</script>

<template>
  <section id="skills" aria-labelledby="skills-title">
    <div class="container">
      <SectionHead
        eyebrow="01 — Kỹ năng"
        title="Tập trung vào frontend"
        title-id="skills-title"
        sub="Mô hình năng lực chuyên sâu về xây dựng giao diện hiện đại, chuyển động tương tác và hệ sinh thái kỹ thuật liên quan."
      />
      <div class="skills-bento">
        <SkillCard
          v-for="skill in skills"
          :key="skill.id || skill.title"
          :skill="skill"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-bento {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 860px) {
  .skills-bento {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
}
</style>
