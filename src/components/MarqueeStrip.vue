<script setup>
import { marquee } from '../data/profile'

// Lặp 2 lần để vòng chạy ngang liền mạch (CSS dịch -50%).
const items = [...marquee, ...marquee]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span v-for="(name, i) in items" :key="i" class="marquee__item">{{ name }}</span>
    </div>
  </div>
</template>
