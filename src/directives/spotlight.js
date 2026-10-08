/**
 * v-spotlight — quầng sáng theo chuột, cập nhật tối đa một lần mỗi frame.
 * CSS dùng --mx / --my để dịch chuyển một radial gradient cố định.
 */
const states = new Map()
const listenerOptions = { passive: true }
let pointerQuery
let motionQuery

function stopFrame(state) {
  if (state.frame) window.cancelAnimationFrame(state.frame)
  state.frame = 0
  state.active = false
  state.el.removeAttribute('data-spotlight-active')
}

function queuePosition(state, event) {
  if (!state.enabled || event.pointerType === 'touch') return
  state.point = { x: event.clientX, y: event.clientY }
  if (state.frame) return

  state.frame = window.requestAnimationFrame(() => {
    state.frame = 0
    if (!state.enabled || !state.el.isConnected) return
    const rect = state.el.getBoundingClientRect()
    const x = Math.max(0, Math.min(rect.width, state.point.x - rect.left))
    const y = Math.max(0, Math.min(rect.height, state.point.y - rect.top))
    state.el.style.setProperty('--mx', x + 'px')
    state.el.style.setProperty('--my', y + 'px')
    if (!state.active) {
      state.active = true
      state.el.setAttribute('data-spotlight-active', '')
    }
  })
}

function setEnabled(state, enabled) {
  if (state.enabled === enabled) return
  state.enabled = enabled
  const method = enabled ? 'addEventListener' : 'removeEventListener'
  state.el[method]('pointerenter', state.move, listenerOptions)
  state.el[method]('pointermove', state.move, listenerOptions)
  state.el[method]('pointerleave', state.leave, listenerOptions)
  state.el[method]('pointercancel', state.leave, listenerOptions)

  if (enabled) state.el.setAttribute('data-spotlight', '')
  else {
    stopFrame(state)
    state.el.removeAttribute('data-spotlight')
    state.el.style.removeProperty('--mx')
    state.el.style.removeProperty('--my')
  }
}

function syncEligibility() {
  const enabled = pointerQuery.matches && !motionQuery.matches
  states.forEach((state) => setEnabled(state, enabled))
}

function startMediaListeners() {
  pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  pointerQuery.addEventListener('change', syncEligibility)
  motionQuery.addEventListener('change', syncEligibility)
}

export const spotlight = {
  mounted(el) {
    const state = { el, enabled: false, active: false, frame: 0, point: null }
    state.move = (event) => queuePosition(state, event)
    state.leave = () => stopFrame(state)
    states.set(el, state)
    if (states.size === 1) startMediaListeners()
    setEnabled(state, pointerQuery.matches && !motionQuery.matches)
  },
  unmounted(el) {
    const state = states.get(el)
    if (!state) return
    setEnabled(state, false)
    states.delete(el)
    if (!states.size) {
      pointerQuery.removeEventListener('change', syncEligibility)
      motionQuery.removeEventListener('change', syncEligibility)
      pointerQuery = motionQuery = null
    }
  },
}
