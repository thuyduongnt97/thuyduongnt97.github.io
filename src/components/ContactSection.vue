<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div class="container">
      <div v-reveal class="cta">
        <span class="eyebrow">07 — Liên hệ</span>
        <h2 id="contact-title">Cùng xây dựng điều <span class="gradient-text">tuyệt vời</span> nhé?</h2>
        <p>Bạn cần phát triển sản phẩm với Laravel, Vue.js, Svelte hoặc hiện đại hoá một hệ thống đang vận hành? Hãy kết nối với mình.</p>
        <div class="cta__row">
          <a v-if="profile.email" class="btn btn--primary" :href="`mailto:${profile.email}`">
            <BaseIcon name="mail" /> Gửi email
          </a>
          <a class="btn btn--primary" :href="profile.github" target="_blank" rel="noopener noreferrer">
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
