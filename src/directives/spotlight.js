/**
 * v-spotlight — đèn pha theo con trỏ trên card (chỉ thiết bị có chuột).
 * CSS dùng biến --mx / --my (xem .card::before).
 */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

function onMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export const spotlight = {
  mounted(el) {
    if (finePointer) el.addEventListener('pointermove', onMove)
  },
  unmounted(el) {
    el.removeEventListener('pointermove', onMove)
  },
}
