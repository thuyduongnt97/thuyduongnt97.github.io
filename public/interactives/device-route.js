// Dùng chung cho trang mở demo và cả hai phiên bản PC / Mobile.
// Tham số view dùng khi chủ động kiểm tra một phiên bản cụ thể.
(() => {
  const script = document.currentScript
  if (!script) return

  const smallViewport = window.matchMedia('(max-width: 760px)')
  const touchPointer = window.matchMedia('(pointer: coarse)')
  let redirecting = false

  function routeToDevice() {
    if (redirecting) return
    const currentUrl = new URL(window.location.href)
    const requestedView = currentUrl.searchParams.get('view')
    const userAgent = navigator.userAgent || ''
    const mobileDevice = navigator.userAgentData?.mobile === true
      || /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent)
      || (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1)
      || (smallViewport.matches && touchPointer.matches)
    const view = requestedView === 'desktop' || requestedView === 'mobile'
      ? requestedView
      : mobileDevice ? 'mobile' : 'desktop'
    const entry = script.dataset[view]
    if (!entry) return

    const targetUrl = new URL(entry, currentUrl)
    targetUrl.search = currentUrl.search
    targetUrl.hash = currentUrl.hash
    if (targetUrl.href !== currentUrl.href) {
      redirecting = true
      window.location.replace(targetUrl.href)
    }
  }

  routeToDevice()
  smallViewport.addEventListener('change', routeToDevice)
  touchPointer.addEventListener('change', routeToDevice)
  window.addEventListener('resize', routeToDevice)
  window.addEventListener('pageshow', routeToDevice)
})()
