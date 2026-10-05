import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Hiệu ứng gõ chữ lần lượt qua danh sách `roles`. */
export function useTyped(roles) {
  const text = ref(roles[0])
  let timer

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let r = 0
    let i = 0
    let deleting = false

    const tick = () => {
      const word = roles[r]
      text.value = word.slice(0, i)
      let wait = deleting ? 28 : 65
      if (!deleting && i === word.length) {
        deleting = true
        wait = 1800
      } else if (deleting && i === 0) {
        deleting = false
        r = (r + 1) % roles.length
        wait = 350
      }
      i += deleting ? -1 : 1
      timer = setTimeout(tick, wait)
    }
    tick()
  })

  onBeforeUnmount(() => clearTimeout(timer))
  return text
}
