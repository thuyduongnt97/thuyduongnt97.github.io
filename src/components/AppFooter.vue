<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span>© {{ year }} {{ profile.name }} · Built with Vue 3 &amp; Vite</span>
      <a class="to-top" href="#home">Về đầu trang <BaseIcon name="arrow" /></a>
    </div>
  </footer>
</template>
