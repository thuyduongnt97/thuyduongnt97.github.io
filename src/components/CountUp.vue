<script setup>
import { ref, watch } from 'vue'
import { useInView } from '../composables/useInView'

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: '' },
})

const el = ref(null)
const value = ref(0)
const inView = useInView(el, { threshold: 0.6 })
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const easeOut = (t) => 1 - Math.pow(1 - t, 4)

watch(inView, (visible) => {
  if (!visible) return
  if (reduceMotion) {
    value.value = props.to
    return
  }
  const duration = 1600
  const start = performance.now()
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    value.value = Math.round(props.to * easeOut(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
})
</script>

<template>
  <span ref="el">{{ value }}{{ suffix }}</span>
</template>
