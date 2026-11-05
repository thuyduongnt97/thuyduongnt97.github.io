/**
 * v-reveal — hiện dần phần tử khi cuộn tới, hỗ trợ nhiều kiểu animation.
 *
 * Cú pháp:
 *   <div v-reveal>                     → fade-up mặc định
 *   <div v-reveal="100">               → fade-up với delay 100ms
 *   <div v-reveal="'left'">            → slide-in từ trái
 *   <div v-reveal="'right'">           → slide-in từ phải
 *   <div v-reveal="'scale'">           → fade-scale từ nhỏ
 *   <div v-reveal="'up'">              → fade-up (explicit)
 *   <div v-reveal="{ type: 'left', delay: 200 }">  → object config
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let observer

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )
  }
  return observer
}

function parseBinding(value) {
  if (value == null) return { type: 'up', delay: 0 }
  if (typeof value === 'number') return { type: 'up', delay: value }
  if (typeof value === 'string') return { type: value, delay: 0 }
  if (typeof value === 'object') return { type: value.type || 'up', delay: value.delay || 0 }
  return { type: 'up', delay: 0 }
}

export const reveal = {
  beforeMount(el, { value }) {
    const { type, delay } = parseBinding(value)
    el.classList.add('reveal', `reveal--${type}`)
    if (delay) el.style.setProperty('--d', `${delay}ms`)
  },
  mounted(el) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
