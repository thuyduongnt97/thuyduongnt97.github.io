<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  skill: { type: Object, required: true },
})
</script>

<template>
  <article v-reveal v-spotlight class="card skill">
    <div class="skill__head">
      <div class="skill__icon"><BaseIcon :name="skill.icon" /></div>
      <div>
        <h3>{{ skill.title }}</h3>
        <div class="skill__sub">{{ skill.sub }}</div>
      </div>
    </div>
    <p class="skill__description">{{ skill.description }}</p>
    <div class="chips">
      <span v-for="chip in skill.chips" :key="chip" class="chip">{{ chip }}</span>
    </div>
  </article>
</template>
