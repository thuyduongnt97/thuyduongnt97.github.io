import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Trả về `true` khi phần tử (ref) đi vào viewport. */
export function useInView(elRef, { threshold = 0.3, once = true } = {}) {
  const inView = ref(false)
  let observer

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true
        if (once) observer.disconnect()
      } else if (!once) {
        inView.value = false
      }
    }, { threshold })
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())
  return inView
}
