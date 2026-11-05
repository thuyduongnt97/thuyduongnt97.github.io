<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { createNodes, stepNodes, drawNetwork, NODE_COUNT } from '../utils/particleNetwork'

const canvas = ref(null)
let ctx = null
let nodes = []
let rafId = 0
let resizeObserver = null
let visible = true
let isDark = true

const mouse = { x: -9999, y: -9999, active: false }

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const reduceMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

function detectTheme() {
  if (typeof document === 'undefined') return true
  const theme = document.documentElement.getAttribute('data-theme')
  return theme !== 'light'
}

function rebuildNodes() {
  const el = canvas.value
  if (!el) return
  isDark = detectTheme()
  nodes = createNodes(
    isMobile ? NODE_COUNT.mobile : NODE_COUNT.desktop,
    el.clientWidth,
    el.clientHeight,
    isDark,
  )
}

function resize() {
  const el = canvas.value
  if (!el) return
  const rect = el.parentElement.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = rect.width * dpr
  el.height = rect.height * dpr
  el.style.width = `${rect.width}px`
  el.style.height = `${rect.height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  rebuildNodes()
}

function loop() {
  if (!visible || !ctx || !canvas.value) { rafId = requestAnimationFrame(loop); return }
  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight
  ctx.clearRect(0, 0, w, h)
  stepNodes(nodes, w, h, mouse)
  drawNetwork(ctx, nodes, mouse, isDark)
  rafId = requestAnimationFrame(loop)
}

function onPointerMove(e) {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.active = true
}

function onPointerLeave() {
  mouse.active = false
}

// Watch for theme changes via MutationObserver on <html data-theme>
let themeObserver = null

onMounted(() => {
  if (reduceMotion) return

  const el = canvas.value
  if (!el) return
  ctx = el.getContext('2d')

  resize()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el.parentElement)

  // Visibility
  const visObserver = new IntersectionObserver(
    ([entry]) => { visible = entry.isIntersecting },
    { threshold: 0 },
  )
  visObserver.observe(el)

  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden
  })

  // Theme change detection
  themeObserver = new MutationObserver(() => {
    const newDark = detectTheme()
    if (newDark !== isDark) {
      rebuildNodes()
    }
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  })

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)

  rafId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <!-- PARTICLE NETWORK + AMBIENT GLOW — full-viewport background -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
    <!-- Canvas network -->
    <canvas
      ref="canvas"
      class="absolute inset-0 w-full h-full"
    />

    <!-- Ambient color glow layers -->
    <div
      class="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-amber-500/8 dark:bg-amber-500/4 rounded-full blur-[140px]"
    />
    <div
      class="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-cyan-500/8 dark:bg-cyan-500/4 rounded-full blur-[140px]"
    />
    <div
      class="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-emerald-500/6 dark:bg-emerald-500/3 rounded-full blur-[160px]"
    />
  </div>
</template>
