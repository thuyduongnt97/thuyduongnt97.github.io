<script setup>
import SectionHead from './SectionHead.vue'
import SkillCard from './SkillCard.vue'
import { skills } from '../data/skills'
</script>

<template>
  <section id="skills" aria-labelledby="skills-title" class="skills-section relative py-16 sm:py-20 scroll-mt-24">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHead
        eyebrow="01 — Kỹ năng"
        title="Tập trung vào frontend"
        title-id="skills-title"
        sub="Mô hình năng lực chuyên sâu về xây dựng giao diện hiện đại, chuyển động tương tác và hệ sinh thái kỹ thuật liên quan."
      />
      <div class="skills-bento grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <SkillCard
          v-for="skill in skills"
          :key="skill.id || skill.title"
          :skill="skill"
          :full-width="skill.type === 'highlights'"
          :class="[
            'h-full',
            skill.type === 'highlights' ? 'md:col-span-3' : ''
          ]"
        />
      </div>
    </div>
  </section>
</template>
