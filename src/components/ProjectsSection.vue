<script setup>
import SectionHead from './SectionHead.vue'
import BaseIcon from './BaseIcon.vue'
import ProjectCard from './ProjectCard.vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { projects } from '../data/projects'
import { agentMilestone } from '../data/career'

const featuredProjects = projects.filter((project) => project.featured)
const additionalProjects = projects.filter((project) => !project.featured)
const moreProjects = ref(null)

// Mở nhóm dự án phụ khi người xem đi tới một dự án từ dòng thời gian.
const revealLinkedProject = async () => {
  const targetId = window.location.hash.slice(1)
  if (!additionalProjects.some((project) => `project-${project.id}` === targetId)) return
  if (moreProjects.value) moreProjects.value.open = true
  await nextTick()
  document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
}
onMounted(() => {
  revealLinkedProject()
  window.addEventListener('hashchange', revealLinkedProject)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', revealLinkedProject))
</script>

<template>
  <section id="projects" aria-labelledby="proj-title">
    <span id="showcase" class="projects-anchor" aria-hidden="true"></span>
    <div class="container">
      <SectionHead
        eyebrow="01 — Dự án & demo"
        title="Dự án &amp; demo"
        title-id="proj-title"
        sub="Một số demo tương tác và landing page tiêu biểu mình đã thực hiện. Nội dung được chọn lọc để chia sẻ công khai, đồng thời tôn trọng bảo mật thông tin của công ty."
      />
      <a class="projects-era" href="#agent-milestone">
        <BaseIcon name="calendar" /> Bắt đầu sử dụng agent từ {{ agentMilestone.period }}
        <span>Xem dòng thời gian <BaseIcon name="arrow" /></span>
      </a>
      <div class="project-grid">
        <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
      </div>
      <details v-if="additionalProjects.length" ref="moreProjects" class="more-projects">
        <summary>Dự án &amp; tích hợp khác <span>{{ additionalProjects.length }} dự án</span></summary>
        <div class="project-grid">
          <ProjectCard v-for="project in additionalProjects" :key="project.id" :project="project" />
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.projects-anchor { display: block; height: 0; scroll-margin-top: calc(var(--nav-h) + 12px); }
.project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 1rem; }
.projects-era { display: flex; flex-wrap: wrap; align-items: center; gap: .45rem .6rem; width: fit-content; margin: -.2rem 0 1.15rem; color: var(--text-muted); font-size: .78rem; }
.projects-era > span { display: inline-flex; align-items: center; gap: .3rem; color: var(--cyan); }
.projects-era:hover { color: var(--text); }
.more-projects { margin-top: 1rem; padding-top: .8rem; border-top: 1px solid var(--border); }
.more-projects > summary { cursor: pointer; padding-block: .3rem; font-size: .88rem; font-weight: 600; }
.more-projects > summary span { margin-left: .5rem; color: var(--text-muted); font-size: .75rem; font-weight: 400; }
.more-projects > .project-grid { margin-top: .9rem; }
@media (max-width: 760px) { .project-grid { grid-template-columns: 1fr; } }
@media (max-width: 560px) {
  .project-grid { gap: .75rem; }
}
</style>
