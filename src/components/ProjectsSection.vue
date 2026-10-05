<script setup>
import SectionHead from './SectionHead.vue'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../data/projects'
</script>

<template>
  <section id="projects" aria-labelledby="proj-title">
    <div class="container">
      <SectionHead
        eyebrow="05 — Dự án tiêu biểu"
        title="Giải pháp kỹ thuật đã triển khai thực tế"
        title-id="proj-title"
      />
      <div class="projects">
        <ProjectCard v-for="p in projects" :key="p.num" :project="p" />
      </div>
    </div>
  </section>
</template>
