import { computed, ref } from 'vue'

/** @typedef {'vi' | 'en'} Locale */

const STORAGE_KEY = 'portfolio_locale'

function getInitialLocale() {
  if (typeof window === 'undefined') return 'vi'
  try {
    const saved = window.localStorage?.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'vi') return saved
  } catch {
    // Ignore storage errors
  }
  return 'vi'
}

const locale = ref(/** @type {Locale} */ (getInitialLocale()))

export function useLocale() {
  const isEn = computed(() => locale.value === 'en')

  /** @param {Locale} nextLocale */
  function setLocale(nextLocale) {
    if (nextLocale !== 'vi' && nextLocale !== 'en') return
    locale.value = nextLocale
    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem(STORAGE_KEY, nextLocale)
      } catch {
        // Ignore storage errors
      }
      if (document?.documentElement) {
        document.documentElement.lang = nextLocale
      }
    }
  }

  function toggleLocale() {
    setLocale(locale.value === 'vi' ? 'en' : 'vi')
  }

  /**
   * Trả về bản tiếng Anh nếu đang ở chế độ EN và có dữ liệu EN, ngược lại trả về bản gốc (VI).
   * @template T
   * @param {T} viVal
   * @param {T} [enVal]
   * @returns {T}
   */
  function pick(viVal, enVal) {
    return locale.value === 'en' && enVal !== undefined && enVal !== null && enVal !== '' ? enVal : viVal
  }

  return {
    locale,
    isEn,
    setLocale,
    toggleLocale,
    pick,
  }
}
