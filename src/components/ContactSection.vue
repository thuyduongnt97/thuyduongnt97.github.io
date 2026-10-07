<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div class="container">
      <div v-reveal class="cta">
        <span class="eyebrow">05 — Liên hệ</span>
        <h2 id="contact-title">Cùng phát triển <span class="gradient-text">sản phẩm web</span></h2>
        <p>Kết nối với mình về frontend, landing page, trải nghiệm tương tác hoặc phát triển sản phẩm fullstack.</p>
        <div class="cta__row">
          <a v-if="profile.email" class="btn btn--primary" :href="`mailto:${profile.email}`">
            <BaseIcon name="mail" /> Gửi email
          </a>
          <a v-if="profile.github" class="btn btn--ghost" :href="profile.github" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="github" /> GitHub
          </a>
          <a v-if="profile.linkedin" class="btn btn--ghost" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="linkedin" /> LinkedIn
          </a>
          <a class="btn btn--ghost" :href="profile.cvUrl" download>
            <BaseIcon name="download" /> Tải CV (PDF)
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
