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
      </div>
    </div>
    <p class="skill__description">{{ skill.description }}</p>
    <div class="chips">
      <span v-for="chip in skill.chips" :key="chip" class="chip">{{ chip }}</span>
    </div>
  </article>
</template>

<style scoped>
.skill { padding: 1.15rem; }
.skill__head { gap: .7rem; margin-bottom: .75rem; }
.skill__icon { width: 36px; height: 36px; border-radius: 10px; }
.skill__icon .icon { width: 1.1rem; height: 1.1rem; }
.skill h3 { font-size: 1rem; line-height: 1.4; }
.skill__description { font-size: .86rem; line-height: 1.6; margin-bottom: .9rem; }
.chips { gap: .35rem; }
.chip { padding: .25rem .5rem; font-size: .7rem; border-radius: 7px; }
</style>
