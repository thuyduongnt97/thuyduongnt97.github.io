import { ref } from 'vue'

// State dùng chung toàn app (module-level) để mọi component đồng bộ.
const theme = ref(document.documentElement.getAttribute('data-theme') || 'dark')

function apply(next) {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'light' ? '#f9fafb' : '#15181e')
}

apply(theme.value)

export function useTheme() {
  const toggle = () => {
    const next = theme.value === 'light' ? 'dark' : 'light'
    apply(next)
    try { localStorage.setItem('theme', next) } catch { /* bỏ qua */ }
  }
  return { theme, toggle }
}
