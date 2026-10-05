<script setup>
import SectionHead from './SectionHead.vue'
import SkillCard from './SkillCard.vue'
import { skills } from '../data/skills'
</script>

<template>
  <section id="skills" aria-labelledby="skills-title">
    <div class="container">
      <SectionHead
        eyebrow="03 — Kỹ năng"
        title="Bộ công cụ kỹ thuật cốt lõi"
        title-id="skills-title"
        sub="Từ giao diện tương tác đến hạ tầng triển khai — mọi lớp của một sản phẩm web."
      />
      <div class="skills__grid">
        <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
      </div>
    </div>
  </section>
</template>
