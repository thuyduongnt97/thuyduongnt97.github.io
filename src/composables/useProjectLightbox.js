import { ref } from 'vue'

const activeProject = ref(null)

export function useProjectLightbox() {
  const openLightbox = (project) => {
    activeProject.value = project
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    activeProject.value = null
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  return {
    activeProject,
    openLightbox,
    closeLightbox,
  }
}
