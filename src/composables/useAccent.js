import { ref } from 'vue'

export const accents = [
  { id: 'indigo', label: 'Indigo', hex: '#4f46e5', bg: '#eef2ff' },
  { id: 'emerald', label: 'Emerald', hex: '#059669', bg: '#ecfdf5' },
  { id: 'rose', label: 'Rose', hex: '#e11d48', bg: '#fff1f2' },
  { id: 'amber', label: 'Amber', hex: '#d97706', bg: '#fffbeb' },
]

function getInitialAccent() {
  if (typeof window === 'undefined') return 'indigo'
  try {
    const saved = localStorage.getItem('accent')
    if (saved && accents.some((a) => a.id === saved)) return saved
  } catch {}
  return 'indigo'
}

const currentAccent = ref(getInitialAccent())

function applyAccent(accentId) {
  if (!accents.some((a) => a.id === accentId)) accentId = 'indigo'
  currentAccent.value = accentId
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-accent', accentId)
    try {
      localStorage.setItem('accent', accentId)
    } catch {}
  }
}

if (typeof document !== 'undefined') {
  applyAccent(currentAccent.value)
}

export function useAccent() {
  return {
    accents,
    currentAccent,
    setAccent: applyAccent,
  }
}
