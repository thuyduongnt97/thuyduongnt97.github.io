<script setup>
import { useScroll } from '../composables/useScroll'

const { progress } = useScroll()
</script>

<template>
  <div class="scroll-progress" aria-hidden="true" :style="{ transform: `scaleX(${progress})` }" />
</template>
