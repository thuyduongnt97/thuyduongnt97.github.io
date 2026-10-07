<script setup>
import IconSprite from './components/IconSprite.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackgroundFx from './components/BackgroundFx.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import ShowcaseSection from './components/ShowcaseSection.vue'
import AboutSection from './components/AboutSection.vue'
import RecognitionSection from './components/RecognitionSection.vue'
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
    <MarqueeStrip />
    <AboutSection />
    <RecognitionSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <EducationSection />
    <ContactSection />
    <ShowcaseSection />
  </main>

  <AppFooter />
</template>
