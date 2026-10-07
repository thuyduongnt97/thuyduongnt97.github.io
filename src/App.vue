<script setup>
import IconSprite from './components/IconSprite.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackgroundFx from './components/BackgroundFx.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Bỏ qua đến nội dung chính</a>
  <IconSprite />
  <ScrollProgress />
  <BackgroundFx />
  <AppNav />

  <main id="main">
    <HeroSection />
    <ProjectsSection />
    <ExperienceSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </main>

  <AppFooter />
</template>
