<script setup>
import { computed } from 'vue'

// Sinh các ô "QR" giả lập theo seed cố định → kết quả ổn định mỗi lần render.
const N = 11
const S = 14
const OX = 30
const OY = 30

const cells = computed(() => {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const inFinder = (x, y) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4)
  const out = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (inFinder(x, y) || rnd() < 0.5) continue
      out.push({ x: OX + x * S, y: OY + y * S })
    }
  }
  return out
})
</script>

<template>
  <svg class="art" viewBox="0 0 214 214" fill="none">
    <defs>
      <linearGradient id="gq" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8b5cf6" />
        <stop offset="1" stop-color="#22d3ee" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="206" height="206" rx="28" fill="#fff" stroke="url(#gq)" stroke-width="3" />
    <g fill="url(#gq)">
      <rect v-for="(c, i) in cells" :key="i" :x="c.x" :y="c.y" :width="S - 2" :height="S - 2" rx="3" />
      <rect x="30" y="30" width="42" height="42" rx="9" />
      <rect x="142" y="30" width="42" height="42" rx="9" />
      <rect x="30" y="142" width="42" height="42" rx="9" />
    </g>
    <g fill="#fff">
      <rect x="38" y="38" width="26" height="26" rx="5" />
      <rect x="150" y="38" width="26" height="26" rx="5" />
      <rect x="38" y="150" width="26" height="26" rx="5" />
    </g>
    <g fill="url(#gq)">
      <rect x="45" y="45" width="12" height="12" rx="3" />
      <rect x="157" y="45" width="12" height="12" rx="3" />
      <rect x="45" y="157" width="12" height="12" rx="3" />
    </g>
    <circle cx="107" cy="107" r="22" fill="#fff" />
    <circle cx="107" cy="107" r="17" fill="url(#gq)" />
    <path d="M100 107h14m-5-5 5 5-5 5" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
