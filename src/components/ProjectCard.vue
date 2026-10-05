<script setup>
import BaseIcon from './BaseIcon.vue'
import QrArt from './art/QrArt.vue'
import AdsArt from './art/AdsArt.vue'
import MapArt from './art/MapArt.vue'
import RebuildArt from './art/RebuildArt.vue'

defineProps({
  project: { type: Object, required: true },
})

const arts = { qr: QrArt, ads: AdsArt, map: MapArt, rebuild: RebuildArt }
</script>

<template>
  <article v-reveal v-spotlight class="card project">
    <div class="project__media" aria-hidden="true">
      <component :is="arts[project.art]" />
    </div>
    <div class="project__body">
      <div class="project__num">PROJECT {{ project.num }}</div>
      <h3>{{ project.title }}</h3>
      <div class="project__role"><BaseIcon name="briefcase" /> {{ project.role }}</div>
      <ul class="points">
        <li v-for="point in project.points" :key="point">
          <BaseIcon name="check" /> {{ point }}
        </li>
      </ul>
      <div class="chips">
        <span v-for="t in project.tech" :key="t" class="chip">{{ t }}</span>
      </div>
    </div>
  </article>
</template>
