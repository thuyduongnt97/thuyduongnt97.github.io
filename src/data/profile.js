// =====================================================
//  THÔNG TIN CÁ NHÂN — NGUYỄN THỊ THÙY DƯƠNG
//  Hỗ trợ song ngữ VI / EN theo docs/portfolio_content.md
// =====================================================
import { recognition } from './recognition.js'

export const profile = {
  name: 'Nguyễn Thị Thùy Dương',
  shortName: 'Thùy Dương',
  initial: 'D',
  title: 'Fullstack Software Engineer',
  tagline: 'I turn messy, high-volume data into fast, reliable products people actually use.',
  taglineVi: 'Biến dữ liệu phức tạp, lưu lượng lớn thành sản phẩm nhanh, ổn định và thực sự hữu dụng.',
  get heroTitle() {
    return this.title
  },
  get availability() {
    return `Open for ${this.title} Opportunities`
  },
  get roleSummary() {
    return this.title
  },
  city: 'Hà Nội',
  cityEn: 'Hanoi',
  country: 'Việt Nam',
  countryEn: 'Vietnam',
  countryCode: 'VN',
  get location() {
    return `${this.city}, ${this.country}`
  },
  get locationEn() {
    return `${this.cityEn}, ${this.countryEn}`
  },
  // Chốt mốc từ 2019 (VCCorp); giai đoạn 2018–2019 tại ĐH Mở xếp vào Early Career / University Systems
  since: '2019',
  experienceYears: 6,
  experienceBadge: '6+ Năm',
  experienceBadgeEn: '6+ Years',
  websiteUrl: 'https://thuyduongnt97.github.io/',

  // Thông tin liên hệ công khai
  email: 'duongthuynt97@gmail.com',
  linkedin: '',
  github: 'https://github.com/thuyduongnt97',

  // CV PDF trong thư mục /public
  cvUrl: `${import.meta.env?.BASE_URL ?? '/'}cv-thuyduong.pdf`,
  cvFileName: 'NguyenThiThuyDuong_SoftwareEngineer.pdf',
  cvHtmlUrl: `${import.meta.env?.BASE_URL ?? '/'}cv-thuyduong.html`,

  // Tiêu đề chính dạng text và HTML gradient (chỉ 1 cụm gradient thanh lịch)
  heroHeadline:
    'Fullstack Software Engineer: xây dựng sản phẩm web chịu tải cao, dashboard dữ liệu và bản đồ số tương tác.',
  heroHeadlineEn:
    'Fullstack Software Engineer building high-traffic web products, data dashboards & interactive maps.',
  heroHeadlineHtml:
    'Xây dựng <span class="gradient-amber text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 font-extrabold">Sản phẩm Web tải cao, Dashboard Dữ liệu</span> &amp; Bản đồ số Tương tác.',
  heroHeadlineHtmlEn:
    'Building <span class="gradient-amber text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 font-extrabold">High-Traffic Web Products, Data Dashboards</span> &amp; Interactive Maps.',

  // Bio ngắn (~50 từ) chuẩn phạm vi công việc
  get lead() {
    return 'Software Engineer tại <strong class="text-slate-900 dark:text-white font-bold">VCCorp</strong> từ 2019, làm chủ sản phẩm end-to-end: từ thiết kế CSDL MySQL, API Laravel đến giao diện Vue.js. Mình xây dựng tầng dữ liệu và công cụ phía sau các sản phẩm lưu lượng lớn: <strong class="text-amber-700 dark:text-amber-400 font-bold">mô hình dữ liệu MySQL + Redis và web quản trị cho hệ thống Shortlink phục vụ hơn 2 triệu lượt click</strong>, <strong class="text-cyan-700 dark:text-cyan-400 font-bold">nền tảng gợi ý nội dung &amp; A/B testing tự phục vụ (40 sites, 309 boxes)</strong>, và <strong class="text-emerald-700 dark:text-emerald-400 font-bold">bản đồ WebGIS đạt 60 FPS trên di động</strong> cho 02 cổng thông tin Nhà nước.'
  },
  get leadEn() {
    return 'Software Engineer at <strong class="text-slate-900 dark:text-white font-bold">VCCorp</strong> since 2019, owning products end-to-end, from MySQL schema and Laravel APIs to Vue.js interfaces. I build the data layer and tooling behind high-traffic products: the <strong class="text-amber-700 dark:text-amber-400 font-bold">MySQL + Redis data model and admin platform for a shortlink system serving 2M+ clicks</strong>, a <strong class="text-cyan-700 dark:text-cyan-400 font-bold">self-service recommendation &amp; A/B testing platform (40 sites, 309 boxes)</strong>, and <strong class="text-emerald-700 dark:text-emerald-400 font-bold">WebGIS maps running at 60 FPS on mobile</strong> for two government portals.'
  },

  // Badge trạng thái đầu Hero
  get heroBadge() {
    return this.title + ' • ' + this.city
  },
  get heroBadgeEn() {
    return this.title + ' • ' + this.cityEn
  },

  get heroRecognition() {
    const years = recognition.professional.years
    return '🏆 ' + years.length + 'x Nhân viên Xuất sắc VCCorp (' + years.join(', ') + ')'
  },
  get heroRecognitionEn() {
    const years = recognition.professional.years
    return '🏆 ' + years.length + 'x Outstanding Employee at VCCorp (' + years.join(', ') + ')'
  },

  ecosystemsLabel: 'Nền tảng & Hệ sinh thái đã triển khai sản phẩm:',
  ecosystemsLabelEn: 'Production Ecosystems & Platforms:',

  // 2 nút CTA trong Hero: Xem Case Studies + Tải CV
  heroCtas: [
    {
      id: 'cta-deliverables',
      label: 'Xem Case Studies ↓',
      labelEn: 'Explore Case Studies ↓',
      href: '#deliverables',
      variant: 'primary',
    },
    {
      id: 'cta-cv',
      label: 'Tải CV (PDF)',
      labelEn: 'Download CV (PDF)',
      href: `${import.meta.env?.BASE_URL ?? '/'}cv-thuyduong.pdf`,
      download: 'NguyenThiThuyDuong_SoftwareEngineer.pdf',
      variant: 'secondary',
    },
  ],

  // Thông số dưới khung Canvas WebGIS (HeroPlayground / Showcase)
  playground: {
    fileName: 'webgis-clustering-demo.vue',
    badge: 'Interactive 60FPS',
    tags: [
      { label: 'QGIS Geometry Simplification', color: 'cyan' },
      { label: 'Marker Clustering', color: 'amber' },
    ],
    hint: 'Di chuột để kiểm tra gom cụm điểm tọa độ',
    hintEn: 'Hover to test spatial marker clustering',
    fps: '● 60 FPS',
    specs: [
      { label: '• Backend & Data Layer:', value: 'PHP Laravel • MySQL • Redis', color: 'amber' },
      { label: '• Web App & Core Widget:', value: 'Vue 2/3 • Svelte • Zero CLS', color: 'emerald' },
      { label: '• WebGIS & Spatial Data:', value: 'QGIS • Leaflet • GeoJSON (-91%)', color: 'cyan' },
      { label: '• AI Workflow:', value: 'Codex • Antigravity • Gemini', color: 'purple' },
    ],
  },

  // Nền tảng & Hệ sinh thái đã triển khai sản phẩm thực tế
  ecosystems: [
    {
      id: 'gov-map',
      label: '02 Cổng TT Nhà Nước & Báo Giao Thông',
      labelEn: '02 National Portals & Giao Thong News',
      icon: '🗺️',
      color: 'cyan',
    },
    {
      id: 'core-box',
      label: 'Kenh14 & Soha (Core Box)',
      labelEn: 'Kenh14 & Soha (Core Box)',
      icon: '🧩',
      color: 'emerald',
    },
    {
      id: 'bizfly-admicro',
      label: 'Bizfly Shortlink & Admicro Tools',
      labelEn: 'Bizfly Shortlink & Admicro Tools',
      icon: '⚡',
      color: 'purple',
    },
    {
      id: 'campaign-emag',
      label: 'Campaign Landing Pages & CafeF Emagazine',
      labelEn: 'Campaign Landing Pages & CafeF Emagazine',
      icon: '✨',
      color: 'amber',
    },
  ],

  // 4 Chỉ số thực tế nổi bật (Lưới 2x2 trên mobile, 4 cột trên desktop)
  get stats() {
    return [
      {
        to: this.experienceYears,
        suffix: '+ Năm',
        value: '6+ Năm',
        valueEn: '6+ Yrs',
        label: 'Kinh nghiệm tại VCCorp (từ 2019)',
        labelEn: 'At VCCorp (since 2019)',
        color: 'amber',
      },
      {
        to: 2,
        suffix: 'M+',
        value: '2M+',
        valueEn: '2M+',
        label: 'Lượt click hệ thống Shortlink',
        labelEn: 'Shortlink clicks served',
        color: 'cyan',
      },
      {
        to: 309,
        suffix: ' Box',
        value: '309 Box',
        valueEn: '309 Boxes',
        label: 'Vận hành trên 40 site & app',
        labelEn: 'Active across 40 sites & apps',
        color: 'emerald',
      },
      {
        to: 91,
        suffix: '%',
        value: '-91%',
        valueEn: '-91%',
        label: 'Giảm GeoJSON (33→3 MB) · 60 FPS',
        labelEn: 'GeoJSON size (33→3 MB) · 60 FPS',
        color: 'amber',
      },
    ]
  },

  codeStack: {
    frontend: ['Vue.js (2 & 3)', 'Svelte', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    webgis: ['QGIS', 'Leaflet', 'GeoJSON', 'MapSVG.js'],
    backend: ['Laravel', 'PHP', 'MySQL', 'Redis'],
  },

  highlights: [
    { icon: 'layers', text: 'Laravel · MySQL · Redis' },
    { icon: 'code', text: 'Vue.js · Svelte · Inertia' },
    { icon: 'map', text: 'WebGIS (QGIS / Leaflet)' },
    { icon: 'sparkle', text: 'A/B Testing & Data Dashboards' },
  ],
}

// Metadata SEO
export const seo = {
  get title() {
    return `${profile.name} — ${profile.title} | Portfolio`
  },
  get description() {
    return `${profile.name} — ${profile.title} tại VCCorp từ 2019. Làm chủ sản phẩm end-to-end với Vue.js, Laravel, MySQL, Redis & WebGIS: hệ thống Shortlink 2M+ clicks, nền tảng Recommendation & A/B Testing (40 sites, 309 boxes) và bản đồ số 60 FPS.`
  },
  get socialTitle() {
    return `${profile.name} — ${profile.title}`
  },
  get socialDescription() {
    return `${profile.tagline} — Vue.js · Laravel · Redis · MySQL · WebGIS (QGIS / Leaflet).`
  },
  locale: 'vi_VN',
  knowsAbout: [
    'Vue.js',
    'Svelte',
    'JavaScript ES6+',
    'TypeScript',
    'GSAP ScrollTrigger',
    'Leaflet.js',
    'QGIS Geometry Simplification',
    'GeoJSON',
    'Laravel',
    'PHP',
    'MySQL',
    'Redis',
    'Core Box Widget',
    'A/B Testing Platform',
    'Dynamic QR & Shortlink',
    'AI Workflow (Codex, Antigravity, Gemini)',
  ],
}

// Menu điều hướng theo kiến trúc thông tin mới: Dự án -> Giới thiệu -> Kỹ năng -> Lộ trình -> Liên hệ
export const navLinks = [
  { id: 'skills', label: 'Kỹ năng', labelEn: 'Skills', href: '#skill-matrix' },
  { id: 'deliverables', label: 'Dự án', labelEn: 'Case Studies', href: '#deliverables' },
  { id: 'about', label: 'Giới thiệu', labelEn: 'About', href: '#about' },
]

export const marquee = [
  'Vue.js',
  'Laravel',
  'Svelte',
  'TypeScript',
  'WebGIS',
  'Leaflet',
  'GeoJSON',
  'QGIS',
  'GSAP ScrollTrigger',
  'Core Box Widget',
  'A/B Testing',
  'Dynamic QR',
  'MySQL',
  'Redis',
  'AI Workflow (Codex • Antigravity • Gemini)',
]

// Mục 2 trong portfolio_content.md — Bản đầy đủ 3 đoạn (VI & EN)
export const about = {
  eyebrow: '04 / Giới thiệu & Tư duy kỹ thuật',
  eyebrowEn: '04 / About & Engineering Mindset',
  title: 'Xây dựng sản phẩm thực tế, không chỉ viết tính năng',
  titleEn: 'Building products that scale, not just features',
  paragraphs: [
    '<strong class="text-slate-900 dark:text-white font-bold">Mình xây dựng sản phẩm, không chỉ viết tính năng.</strong> Từ năm 2019 tại <strong>VCCorp</strong> — một trong những công ty truyền thông số và AdTech lớn nhất Việt Nam — mình đã đưa nhiều sản phẩm từ tài liệu yêu cầu trắng đến vận hành thực tế: thiết kế mô hình dữ liệu, viết backend, hoàn thiện giao diện và trực vận hành khi lưu lượng tăng đột biến.',
    '<strong class="text-slate-900 dark:text-white font-bold">Cách mình làm việc:</strong> bắt đầu từ bài toán kinh doanh, đo đạc trước khi tối ưu, và để lại mã nguồn mà kỹ sư kế tiếp dễ dàng mở rộng. Từ 2025 mình ứng dụng quy trình AI (<strong>Codex, Antigravity, Gemini</strong>) để giao hàng nhanh hơn mà không hạ tiêu chuẩn chất lượng.',
  ],
  paragraphsEn: [
    '<strong class="text-slate-900 dark:text-white font-bold">I build products, not just features.</strong> Since 2019 at <strong>VCCorp</strong>, one of Vietnam\'s largest digital media and AdTech companies, I\'ve taken products from a blank requirements doc to production: designing the data model, writing the backend, shipping the UI and staying on call when traffic spikes.',
    '<strong class="text-slate-900 dark:text-white font-bold">How I work:</strong> start from the business problem, measure before optimizing, and leave code that the next engineer can extend. Since 2025 I\'ve used AI-assisted workflows (<strong>Codex, Antigravity, Gemini</strong>) to ship faster without lowering the bar.',
  ],
  pills: [
    { icon: 'pin', text: 'Hà Nội, Việt Nam', textEn: 'Hanoi, Vietnam' },
    { icon: 'briefcase', text: 'VCCorp · 2019 – Hiện tại (6+ năm)', textEn: 'VCCorp · 2019 – Present (6+ yrs)' },
    { icon: 'award', text: "3x Nhân viên Xuất sắc ('22, '23, '25)", textEn: "3x Outstanding Employee ('22, '23, '25)" },
  ],
  facts: [
    {
      icon: 'layers',
      title: 'Data Model & Admin Platform Ownership',
      titleEn: 'Data Model & Admin Platform Ownership',
      text: 'Thiết kế CSDL MySQL, định nghĩa hợp đồng dữ liệu Redis (key-value contract), tích hợp VirusTotal API quét link độc hại và xây dựng nền tảng quản trị Laravel/Vue.js từ đầu.',
      textEn: 'Designing MySQL schemas, defining Redis key-value contracts, integrating VirusTotal security scans, and building Laravel/Vue.js admin platforms from scratch.',
    },
    {
      icon: 'zap',
      title: 'High-Performance & Data Visualization',
      titleEn: 'High-Performance & Data Visualization',
      text: 'Biến số liệu thô từ BigData thành dashboard kiểm định thống kê (FDR 0.05); cắt giảm 91% dung lượng GeoJSON bằng QGIS kết hợp Leaflet Canvas & Clustering đạt 60 FPS.',
      textEn: 'Turning raw BigData logs into statistical dashboards (FDR 0.05); cutting GeoJSON payloads by 91% in QGIS with Leaflet Canvas & Clustering for 60 FPS mobile maps.',
    },
    {
      icon: 'sparkle',
      title: 'AI-Assisted Engineering Workflow',
      titleEn: 'AI-Assisted Engineering Workflow',
      text: 'Ứng dụng Codex, Antigravity và Gemini từ 08/2025 để tăng tốc phân tích kiến trúc, kiểm tra logic, chuẩn hóa dữ liệu GeoJSON và refactor code mà vẫn giữ chuẩn kỹ thuật cao.',
      textEn: 'Using Codex, Antigravity and Gemini since 08/2025 to accelerate architecture analysis, edge-case checks, GeoJSON processing and clean refactoring.',
    },
  ],
}

export const education = {
  institution: 'Viện Đại học Mở Hà Nội',
  institutionEn: 'Hanoi Open University',
  degree: 'Kỹ sư Phần mềm / Công nghệ Thông tin',
  degreeEn: 'B.Eng. in Software Engineering / Information Technology',
  period: '2015 – 2019',
  text: 'Tốt nghiệp Kỹ sư Phần mềm; đạt Giải Ba Nghiên cứu Khoa học cấp Khoa (05/2019) với đề tài ứng dụng thuật toán phân cụm K-Means.',
  textEn: 'B.Eng. in Software Engineering; Third Prize in Student Scientific Research (05/2019) for applying K-Means clustering in R.',
}

export const community = {
  title: 'Câu lạc bộ Mã nguồn mở',
  titleEn: 'Open Source Club',
  role: 'Thành viên · Open Source Club',
  period: '2017 – 2019',
  text: 'Hoạt động tại Câu lạc bộ Mã nguồn mở và Tổ phát triển & chuyển giao công nghệ — Viện Đại học Mở Hà Nội.',
}

export const philosophy = {
  title: 'Triết lý làm nghề',
  titleEn: 'Engineering Philosophy',
  values: ['Làm chủ bài toán', 'Đo đạc trước khi tối ưu', 'Kiến trúc dễ mở rộng'],
  text: 'Bắt đầu từ bài toán kinh doanh, đo đạc bằng số liệu thực tế trước khi tối ưu, và để lại mã nguồn rõ ràng cho người kế tiếp.',
}
