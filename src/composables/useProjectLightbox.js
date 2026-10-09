import { ref } from 'vue'
import { lockScroll, unlockScroll } from '../utils/scrollLock.js'

const activeProject = ref(null)

export function useProjectLightbox() {
  const openLightbox = (project) => {
    activeProject.value = project
    lockScroll()
  }

  const closeLightbox = () => {
    if (activeProject.value) {
      activeProject.value = null
      unlockScroll()
    }
  }

  return {
    activeProject,
    openLightbox,
    closeLightbox,
  }
}
