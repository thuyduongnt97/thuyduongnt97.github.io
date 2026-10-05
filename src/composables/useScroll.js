import { onBeforeUnmount, onMounted, ref } from 'vue'

// Một listener scroll duy nhất dùng chung cho nhiều component.
const scrollY = ref(0)
const progress = ref(0)
let users = 0
let ticking = false

function update() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollY.value = y
  progress.value = max > 0 ? Math.min(y / max, 1) : 0
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

export function useScroll() {
  onMounted(() => {
    if (users++ === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }
    update()
  })
  onBeforeUnmount(() => {
    if (--users === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })
  return { scrollY, progress }
}
