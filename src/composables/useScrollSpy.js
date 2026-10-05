import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Đánh dấu section đang xem; mặc định theo toàn bộ section trong main. */
export function useScrollSpy(ids) {
  const active = ref('')
  let observer

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id })
    }, { rootMargin: '-45% 0px -50% 0px' })
    const sectionIds = ids ?? Array.from(document.querySelectorAll('main section[id]'), (el) => el.id)
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())
  return active
}
