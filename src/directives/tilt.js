/**
 * v-tilt — nghiêng 3D phần tử `.window` bên trong theo vị trí chuột.
 * Đặt trên phần tử bao ngoài (wrapper).
 */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const tilt = {
  mounted(el) {
    if (!finePointer || reduceMotion) return
    const target = el.querySelector('.window')
    if (!target) return

    el._tiltMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      target.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`
    }
    el._tiltLeave = () => { target.style.transform = '' }
    el.addEventListener('pointermove', el._tiltMove)
    el.addEventListener('pointerleave', el._tiltLeave)
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._tiltMove)
    el.removeEventListener('pointerleave', el._tiltLeave)
  },
}
