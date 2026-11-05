<script setup>
import { onMounted } from 'vue'
import IconSprite from './components/IconSprite.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import BackgroundFx from './components/BackgroundFx.vue'
import AppNav from './components/AppNav.vue'
import CommandPalette from './components/CommandPalette.vue'
import ProjectLightboxModal from './components/ProjectLightboxModal.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import AppFooter from './components/AppFooter.vue'
import { forceUnlockScroll } from './utils/scrollLock.js'
import { useSkillCategory } from './composables/useSkillCategory.js'
import { useLocale } from './composables/useLocale.js'

// Khởi tạo 'all' để nhà tuyển dụng thấy ngay cả 3 Core Case Studies khi vào trang.
const { selectedSkillCategory, selectSkillCategory } = useSkillCategory('all')
const { pick } = useLocale()

onMounted(() => {
  forceUnlockScroll()
})
</script>

<template>
  <a class="skip-link" href="#main">{{ pick('Bỏ qua đến nội dung chính', 'Skip to main content') }}</a>
  <IconSprite />
  <ScrollProgress />
  <BackgroundFx />
  <AppNav />
  <CommandPalette />
  <ProjectLightboxModal />

  <main id="main" class="max-w-[1380px] mx-auto overflow-x-hidden px-4 sm:px-6 lg:overflow-visible">
    <!-- 1. Hero Section (5-Second Recruiter Scan) -->
    <HeroSection />

    <hr class="section-divider" aria-hidden="true" />

    <!-- 2. Skill Matrix — nhà tuyển dụng nhìn phát biết tech stack -->
    <SkillsSection
      :active-category="selectedSkillCategory"
      @select-category="selectSkillCategory"
    />

    <hr class="section-divider" aria-hidden="true" />

    <!-- 3. Flagship Case Studies & Deliverables -->
    <ExperienceSection
      :active-category="selectedSkillCategory"
      @update:active-category="selectSkillCategory"
    />

    <hr class="section-divider" aria-hidden="true" />

    <!-- 4. About & Engineering Mindset (compact bio + recognition badges) -->
    <AboutSection />
  </main>

  <!-- Footer with integrated Contact CTA -->
  <AppFooter />
</template>
