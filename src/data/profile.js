// =====================================================
//  THÔNG TIN CÁ NHÂN — sửa tại đây, giao diện tự cập nhật
// =====================================================
import { recognition } from './recognition.js'

export const profile = {
  name: 'Thuỳ Dương',
  initial: 'D',
  title: 'Senior Frontend Developer / UI-UX Engineer',
  heroTitle: 'Senior Frontend Developer / UI-UX Engineer',
  availability: 'Available for new opportunities',
  roleSummary: 'Fullstack / Software Engineer',
  city: 'Hà Nội',
  country: 'Việt Nam',
  countryCode: 'VN',
  get location() {
    return `${this.city}, ${this.country}`
  },
  since: '2019',
  experienceYears: 7,
  websiteUrl: 'https://thuyduongnt97.github.io/',

  // Để trống ('') thì nút liên hệ tương ứng tự ẩn.
  email: 'duongthuynt97@gmail.com', // ví dụ: 'ban@gmail.com'
  linkedin: '', // ví dụ: 'https://www.linkedin.com/in/ten-ban'
  github: 'https://github.com/thuyduongnt97',

  // File nằm trong thư mục /public
  cvUrl: `${import.meta.env?.BASE_URL ?? '/'}Thuy-Duong-CV.pdf`,

  // Các chức danh chạy chữ ở hero
  get roles() {
    return [
      this.title,
      this.roleSummary,
      'Laravel · Vue.js · Svelte',
      'GIS & Map Visualization',
    ]
  },

  // Cho phép HTML đơn giản (<strong>) — nội dung do chính bạn kiểm soát.
  get lead() {
    return `<strong>${this.experienceYears} năm</strong> làm chủ sản phẩm web <strong>từ kiến trúc đến vận hành</strong>. Chuyên sâu <strong>Laravel, Vue.js &amp; Svelte</strong> — từ core quảng cáo, QR động và bản đồ GIS đến tái cấu trúc hệ thống nội bộ.`
  },

  // Sáu mảng công việc trong hồ sơ; hai bài giao thông có demo riêng cho PC/mobile.
  get stats() {
    return [
      { to: this.experienceYears, suffix: '', label: 'Năm kinh nghiệm' },
      { to: recognition.professional.years.length, suffix: '', label: 'Năm Nhân viên Xuất sắc' },
      { to: 6, suffix: '', label: 'Mảng sản phẩm phụ trách' },
      { to: 2, suffix: '', label: 'Demo interactive PC & Mobile' },
    ]
  },
  codeStack: {
    backend: ['Laravel', 'PHP'],
    frontend: ['Vue.js', 'Svelte'],
    data: ['MySQL', 'Redis'],
  },
  highlights: [
    { icon: 'zap', text: 'Svelte · Ads Core' },
    { icon: 'map', text: 'GIS & Map' },
    { icon: 'layers', text: 'Laravel + Vue' },
  ],
}

// Metadata được Vite chèn vào HTML ở cả dev và build, dùng chung dữ liệu với giao diện.
export const seo = {
  get title() {
    return `${profile.name} — ${profile.title} | Frontend & Interactive Web`
  },
  get description() {
    return `${profile.name} — ${profile.title}, ${profile.experienceYears} năm xây dựng sản phẩm web. Frontend Vue.js, Svelte, bản đồ SVG và landing page; nền tảng fullstack Laravel. ${recognition.professional.title} ${recognition.professional.years.join(', ')}.`
  },
  get socialTitle() {
    return `${profile.name} — ${profile.title}`
  },
  get socialDescription() {
    return `Frontend • Interactive Web • Vue.js • Svelte. ${profile.experienceYears} năm phát triển sản phẩm web; dự án, demo tương tác và landing page tiêu biểu.`
  },
  locale: 'vi_VN',
  knowsAbout: ['Vue.js', 'Svelte', 'JavaScript', 'TypeScript', 'SVG', 'GSAP', 'CSS Animation', 'GIS', 'Leaflet', 'Laravel', 'PHP', 'MySQL', 'Redis', 'Core Ads Template', 'Legacy Refactoring'],
}

export const navLinks = [
  { id: 'about', label: 'Giới thiệu' },
  { id: 'skills', label: 'Kỹ năng' },
  { id: 'experience', label: 'Dự án' },
  { id: 'timeline', label: 'Kinh nghiệm' },
  { id: 'contact', label: 'Liên hệ' },
]

export const marquee = [
  'Laravel', 'Vue.js', 'Svelte', 'TypeScript', 'MySQL', 'Redis',
  'Leaflet', 'GeoJSON', 'GSAP', 'Vite', 'Core Ads', 'System Rebuild',
]

export const about = {
  paragraphs: [
    `Mình là <strong>${profile.title}</strong> với <strong>${profile.experienceYears} năm kinh nghiệm thực chiến</strong>, phát triển sản phẩm bằng <strong>Laravel, Vue.js và Svelte</strong>.`,
    'Bắt đầu từ môi trường <strong>nghiên cứu và chuyển giao công nghệ tại đại học</strong>, mình xây dựng nền tảng kỹ thuật qua các hệ thống tuyển sinh, đào tạo và hoạt động mã nguồn mở.',
    'Trong công việc, mình làm chủ <strong>toàn bộ vòng đời sản phẩm</strong>: phân tích yêu cầu, thiết kế kiến trúc, xây dựng giao diện và API, vận hành, tối ưu và tái cấu trúc hệ thống. Các mảng chuyên sâu gồm <strong>core quảng cáo, QR động, GIS và Emagazine</strong>.',
  ],
  pills: [
    { icon: 'pin', text: profile.location },
    { icon: 'briefcase', text: `${profile.since} – Hiện tại` },
    { icon: 'code', text: profile.roleSummary },
  ],
  facts: [
    { icon: 'layers', title: 'Làm chủ bài toán đến cùng', text: 'Từ phân tích yêu cầu, kiến trúc và lập trình đến vận hành, bảo trì sản phẩm.' },
    { icon: 'zap', title: 'Hiệu năng từ kiến trúc', text: 'Core Ads bằng Svelte, tối ưu bundle và tài nguyên để giữ trải nghiệm hiển thị mượt.' },
    { icon: 'compass', title: 'Hiện đại hoá hệ thống', text: 'Rebuild và refactor công cụ nội bộ theo hướng component rõ ràng, dễ mở rộng và bảo trì.' },
  ],
}

export const education = {
  institution: 'Viện Đại học Mở Hà Nội',
  degree: 'Công nghệ Thông tin / Kỹ thuật Phần mềm',
  period: 'Tốt nghiệp 2019',
  text: 'Nền tảng học tập gắn với nghiên cứu và thực hành phát triển các hệ thống quản lý tuyển sinh, đào tạo.',
}

export const community = {
  title: 'Câu lạc bộ Mã nguồn mở',
  role: 'Thành viên · Open Source Club',
  period: '06/2017 – 04/2019',
  text: 'Trao đổi, chia sẻ kiến thức về mã nguồn mở, hệ điều hành Linux và thực hành các dự án phần mềm cộng đồng trong trường đại học.',
}

export const philosophy = {
  title: 'Cách mình làm việc',
  values: ['Chủ động làm chủ', 'Ưu tiên hiệu năng', 'Mã nguồn bền vững'],
  text: 'Theo sát sản phẩm từ yêu cầu đầu tiên đến vận hành thực tế. Lựa chọn công nghệ phù hợp với bài toán và coi trọng kiến trúc dễ bảo trì lâu dài.',
}
