/**
 * v-reveal — hiện dần phần tử khi cuộn tới.
 * Dùng: <div v-reveal> hoặc <div v-reveal="80"> (80 = độ trễ ms).
 * Lưu ý: không dùng trên phần tử có :class động (Vue sẽ ghi đè class `reveal`).
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
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
  }
  return observer
}

export const reveal = {
  // beforeMount chạy SAU khi attribute/class tĩnh được gán nên không bị ghi đè
  beforeMount(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--d', `${value}ms`)
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
