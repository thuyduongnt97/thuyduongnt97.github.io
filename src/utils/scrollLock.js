let activeLocks = 0

/**
 * Khóa scroll của trang nền (html & body) khi mở Modal/Popup.
 * Áp dụng cơ chế reference counter để xử lý an toàn khi có nhiều popup.
 */
export function lockScroll() {
  if (typeof document === 'undefined') return
  activeLocks++
  if (activeLocks === 1) {
    document.documentElement.classList.add('modal-open')
    document.body.classList.add('modal-open')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }
}

/**
 * Mở khóa scroll của trang nền khi đóng Modal/Popup.
 */
export function unlockScroll() {
  if (typeof document === 'undefined') return
  activeLocks = Math.max(0, activeLocks - 1)
  if (activeLocks === 0) {
    document.documentElement.classList.remove('modal-open')
    document.body.classList.remove('modal-open')
    if (typeof document.documentElement.style?.removeProperty === 'function') {
      document.documentElement.style.removeProperty('overflow')
    }
    if (typeof document.body.style?.removeProperty === 'function') {
      document.body.style.removeProperty('overflow')
    }
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
}

/**
 * Ép mở khóa scroll hoàn toàn (sử dụng khi khởi tạo app hoặc khẩn cấp).
 */
export function forceUnlockScroll() {
  if (typeof document === 'undefined') return
  activeLocks = 0
  document.documentElement.classList.remove('modal-open')
  document.body.classList.remove('modal-open')
  if (typeof document.documentElement.style?.removeProperty === 'function') {
    document.documentElement.style.removeProperty('overflow')
  }
  if (typeof document.body.style?.removeProperty === 'function') {
    document.body.style.removeProperty('overflow')
  }
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}
