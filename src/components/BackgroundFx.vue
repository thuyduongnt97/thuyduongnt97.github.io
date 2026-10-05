<script setup>
import { computed } from 'vue'
import { useScroll } from '../composables/useScroll'

const { scrollY } = useScroll()
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Parallax nhẹ: mỗi orb trôi lên với tốc độ khác nhau khi cuộn.
const offset = (i) =>
  computed(() => (reduceMotion ? '0 0' : `0 ${scrollY.value * (0.06 + i * 0.03) * -1}px`))
const o1 = offset(0)
const o2 = offset(1)
const o3 = offset(2)
</script>

<template>
  <div class="bg-fx" aria-hidden="true">
    <span class="orb orb--1" :style="{ translate: o1 }" />
    <span class="orb orb--2" :style="{ translate: o2 }" />
    <span class="orb orb--3" :style="{ translate: o3 }" />
  </div>
</template>
