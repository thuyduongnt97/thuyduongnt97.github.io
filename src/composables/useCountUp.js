import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useCountUp — đếm số từ 0 đến target khi element hiện trên viewport.
 * @param {number} target - Số cần đếm đến
 * @param {object} opts
 * @param {number} opts.duration - Thời gian đếm (ms), default 1800
 * @param {string} opts.prefix - Tiền tố (vd: '-')
 * @param {string} opts.suffix - Hậu tố (vd: '%', 'M+')
 */
export function useCountUp(target, opts = {}) {
  const { duration = 1800, prefix = '', suffix = '' } = opts
  const display = ref(`${prefix}0${suffix}`)
  const elRef = ref(null)
  let observer = null
  let started = false

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  function animate() {
    if (started) return
    started = true
    const start = performance.now()
    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = Math.round(eased * target)
      display.value = `${prefix}${current}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!elRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = `${prefix}${target}${suffix}`
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(elRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { display, elRef }
}

