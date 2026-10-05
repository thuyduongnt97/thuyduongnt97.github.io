<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  titleId: { type: String, required: true },
  sub: { type: String, default: '' },
})
</script>

<template>
  <div v-reveal class="section-head">
    <span class="eyebrow">{{ eyebrow }}</span>
    <h2 :id="titleId" class="section-title">{{ title }}</h2>
    <p v-if="sub" class="section-sub">{{ sub }}</p>
  </div>
</template>
