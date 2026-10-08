import { ref } from 'vue'

const isOpen = ref(false)
const activeFilter = ref(null)
const toastMessage = ref('')
let toastTimer = null

export function useCommandPalette() {
  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }
  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const setActiveFilter = (filterId) => {
    activeFilter.value = filterId
  }

  const showToast = (msg, duration = 2500) => {
    toastMessage.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage.value = ''
    }, duration)
  }

  return {
    isOpen,
    open,
    close,
    toggle,
    activeFilter,
    setActiveFilter,
    toastMessage,
    showToast,
  }
}
