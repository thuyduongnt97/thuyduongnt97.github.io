// =====================================================
//  KỸ NĂNG & ĐẦU VIỆC (DUAL-VIEW: 4 BENTO PILLARS & DETAILED TABLE)
//  Hỗ trợ song ngữ VI / EN, thu gọn giao diện để quét mắt nhanh.
// =====================================================

/** @typedef {import('../types/portfolio.js').SkillPillar} SkillPillar */
/** @typedef {import('../types/portfolio.js').SkillDetailedItem} SkillDetailedItem */

/** Tiêu đề section + nhãn 2 tab chuyển chế độ xem */
export const skillsSection = {
  eyebrow: '02 / Ma trận Kỹ năng & Công nghệ',
  eyebrowEn: '02 / Technical Skills & Stack Matrix',
  title: 'Năng lực Kỹ thuật cốt lõi & Số năm thực chiến',
  titleEn: 'Core Technical Stack & Production Experience',
  subtitleHtml:
    'Bấm vào từng nhóm năng lực để lọc dự án tương ứng, hoặc chuyển sang <strong>Bảng chi tiết từng công nghệ</strong>.',
  subtitleHtmlEn:
    'Click any capability pillar to filter matching projects, or switch to the <strong>Detailed Technology Breakdown</strong>.',
  deliverablesLabel: 'Sản phẩm & Đầu việc chính:',
  deliverablesLabelEn: 'Key Production Deliverables:',
  views: [
    { id: 'bento', label: '1. Xem theo 4 Nhóm Năng Lực (Bento)', labelEn: '1. 4 Capability Pillars (Bento)' },
    { id: 'table', label: '2. Bảng chi tiết Từng Kỹ Năng & Số Năm', labelEn: '2. Detailed Stack & Years Table' },
  ],
  tableHeaders: ['Kỹ năng & Công nghệ', 'Số năm KN', 'Trục thời gian', 'Hạng mục thực tế làm được (Deliverables)'],
  tableHeadersEn: ['Technology & Stack', 'Experience', 'Timeline', 'Production Deliverables'],
}

/**
 * 4 Khối Bento năng lực chính, ưu tiên năng lực Fullstack ở hàng đầu.
 * @type {SkillPillar[]}
 */
export const pillars = [
  {
    id: 'adtech',
    filterCategory: 'adtech',
    categoryTitle: 'Fullstack & Data Layer',
    categoryTitleEn: 'Fullstack & Data Layer',
    title: 'Laravel, MySQL, Redis Key Design & AdTech',
    titleEn: 'Laravel, MySQL, Redis Key Design & AdTech',
    yearsBadge: '6+ Năm',
    yearsBadgeEn: '6+ Yrs',
    period: '2019 – Nay',
    periodEn: '2019 – Present',
    icon: 'server',
    accentColor: 'purple',
    subMetrics: [
      { label: 'Laravel / MySQL', labelEn: 'Laravel / MySQL', value: '6+ năm', valueEn: '6+ yrs' },
      { label: 'Redis Key Contract', labelEn: 'Redis Key Contract', value: '5+ năm', valueEn: '5+ yrs' },
      { label: 'VirusTotal / REST API', labelEn: 'VirusTotal / REST API', value: 'Production', valueEn: 'Production' },
    ],
    deliverables: [
      'Thiết kế mô hình dữ liệu MySQL, cấu trúc key-value Redis và web quản trị <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong> cho nền tảng <strong class="text-slate-900 dark:text-white font-bold">Dynamic QR &amp; Shortlink</strong> (<strong class="text-amber-700 dark:text-amber-400 font-bold">2M+ clicks</strong>, đỉnh ~240K/ngày) kèm quét link độc hại bằng VirusTotal API.',
      'Phát triển công cụ <strong>Ads Demo Simulator (adsdemo.admicro.vn)</strong> và bảo trì, vá lỗi bảo mật (<strong>Security Patching</strong>) cho <strong>AdServing, TagManager, Adsponsor</strong>.',
    ],
    deliverablesEn: [
      'Designed the MySQL schema, Redis key-value contract, and <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong> admin platform for <strong class="text-slate-900 dark:text-white font-bold">Dynamic QR &amp; Shortlink</strong> (<strong class="text-amber-700 dark:text-amber-400 font-bold">2M+ clicks</strong>, peak ~240K/day) with VirusTotal URL scanning.',
      'Built <strong>Ads Demo Simulator (adsdemo.admicro.vn)</strong> and executed query optimization &amp; <strong>security patching</strong> for <strong>AdServing, TagManager, and Adsponsor</strong>.',
    ],
    chips: ['PHP Laravel', 'MySQL Schema', 'Redis (Key Design)', 'VirusTotal API', 'CodeIgniter'],
  },
  {
    id: 'webapp',
    filterCategory: 'webapp',
    categoryTitle: 'Frontend & Experimentation Platform',
    categoryTitleEn: 'Frontend & Experimentation Platform',
    title: 'Vue.js (2/3), Inertia, A/B Testing & Core Widget',
    titleEn: 'Vue.js (2/3), Inertia, A/B Testing & Core Widget',
    yearsBadge: '5.5+ Năm',
    yearsBadgeEn: '5.5+ Yrs',
    period: '2020 – Nay',
    periodEn: '2020 – Present',
    icon: 'code',
    accentColor: 'emerald',
    subMetrics: [
      { label: 'Vue 2/3 & Inertia', labelEn: 'Vue 2/3 & Inertia', value: '5.5+ năm', valueEn: '5.5+ yrs' },
      { label: 'A/B Platform', labelEn: 'A/B Platform', value: '40 Sites · 309 Box', valueEn: '40 Sites · 309 Boxes' },
      { label: 'Svelte / Core Box', labelEn: 'Svelte / Core Box', value: 'Zero CLS', valueEn: 'Zero CLS' },
    ],
    deliverables: [
      'Xây dựng từ đầu nền tảng <strong>Recommendation &amp; A/B Testing (Laravel 8 + Vue 3 + Inertia + ApexCharts)</strong>: bộ sinh code Macro Engine đẩy CDN qua TOTP, kiểm định thống kê <strong>FDR 0.05</strong>, vận hành <strong>309 box trên 40 site &amp; app</strong>.',
      'Thiết kế kiến trúc <strong>Core Box Feature (Svelte/Vue.js)</strong> nhúng độc lập qua DOM Injection (Sticky &amp; Inline Box) trên Kenh14, Soha với Zero CLS.',
    ],
    deliverablesEn: [
      'Built from scratch the <strong>Recommendation &amp; A/B Testing Platform (Laravel 8 + Vue 3 + Inertia + ApexCharts)</strong>: Macro Engine JS compiler with TOTP CDN upload and <strong>FDR 0.05</strong> significance testing across <strong>40 sites &amp; 309 boxes</strong>.',
      'Architected <strong>Core Box Widgets (Svelte/Vue.js)</strong> embedded via DOM Injection (Sticky &amp; Inline) on Kenh14 and Soha with Zero CLS.',
    ],
    chips: ['Vue 3 / Vue 2', 'Inertia.js', 'ApexCharts', 'Svelte', 'TypeScript'],
  },
  {
    id: 'webgis',
    filterCategory: 'webgis',
    categoryTitle: 'WebGIS & Spatial Performance',
    categoryTitleEn: 'WebGIS & Spatial Performance',
    title: 'QGIS, GeoJSON (-91%), Leaflet Canvas & Clustering',
    titleEn: 'QGIS, GeoJSON (-91%), Leaflet Canvas & Clustering',
    yearsBadge: '4+ Năm',
    yearsBadgeEn: '4+ Yrs',
    period: '2021 – Nay',
    periodEn: '2021 – Present',
    icon: 'map',
    accentColor: 'cyan',
    subMetrics: [
      { label: 'QGIS / GeoJSON', labelEn: 'QGIS / GeoJSON', value: '-91% (33→3 MB)', valueEn: '-91% (33→3 MB)' },
      { label: 'Leaflet Canvas', labelEn: 'Leaflet Canvas', value: '60 FPS Mobile', valueEn: '60 FPS Mobile' },
      { label: 'MapSVG / Vector', labelEn: 'MapSVG / Vector', value: 'Từ 2021', valueEn: 'Since 2021' },
    ],
    deliverables: [
      'Tiền xử lý ranh giới bằng <strong>QGIS Geometry Simplification</strong> giảm <strong>91% dung lượng GeoJSON (33 MB → 3 MB)</strong>; kết hợp <strong>Leaflet Canvas + Marker Clustering</strong> đạt <strong>60 FPS trên di động</strong> cho 02 Cổng thông tin Nhà nước.',
      'Xây dựng 02 chuyên đề bản đồ tương tác cho <strong>Báo Giao Thông</strong> (22 dự án cao tốc &amp; 12 tuyến hầm) bằng <strong>MapSVG.js, TweenMax, Draggable</strong>.',
    ],
    deliverablesEn: [
      'Pre-processed boundaries with <strong>QGIS Geometry Simplification</strong> cutting <strong>GeoJSON by 91% (33 MB → 3 MB)</strong>; combined <strong>Leaflet Canvas + Marker Clustering</strong> for <strong>60 FPS on mobile</strong> across 02 national portals.',
      'Built 02 interactive editorial maps for <strong>Giao Thong News</strong> (22 expressways &amp; 12 road tunnels) using <strong>MapSVG.js, TweenMax, and Draggable</strong>.',
    ],
    chips: ['QGIS Simplification', 'Leaflet Canvas', 'Marker Clustering', 'GeoJSON', 'MapSVG.js'],
  },
  {
    id: 'motion',
    filterCategory: 'motion',
    categoryTitle: 'Interactive UI & AI Workflow',
    categoryTitleEn: 'Interactive UI & AI Workflow',
    title: 'Campaign Landing Pages, GSAP & AI Engineering',
    titleEn: 'Campaign Landing Pages, GSAP & AI Engineering',
    yearsBadge: '6+ Năm',
    yearsBadgeEn: '6+ Yrs',
    period: '2019 – Nay',
    periodEn: '2019 – Present',
    icon: 'zap',
    accentColor: 'amber',
    subMetrics: [
      { label: 'GSAP / ScrollTrigger', labelEn: 'GSAP / ScrollTrigger', value: '4.5+ năm', valueEn: '4.5+ yrs' },
      { label: 'Canvas / Face API', labelEn: 'Canvas / Face API', value: 'Realtime', valueEn: 'Realtime' },
      { label: 'AI Workflow', labelEn: 'AI Workflow', value: 'Từ 08/2025', valueEn: 'Since 08/2025' },
    ],
    deliverables: [
      'Làm chủ mảng <strong>Landing Page chiến dịch</strong>: lên báo giá, phát triển mới với <strong>GSAP ScrollTrigger</strong> (<em>OMO, Athena</em>) và xây dựng chuỗi bài <strong>Emagazine tương tác trên CafeF</strong>.',
      'Tích hợp Camera &amp; Face Recognition API trên Canvas; ứng dụng <strong>Codex, Antigravity, Gemini</strong> từ 08/2025 để tăng tốc phát triển và kiểm thử.',
    ],
    deliverablesEn: [
      'Owned <strong>campaign landing pages</strong>: handled estimation, built <strong>GSAP ScrollTrigger</strong> experiences (<em>OMO, Athena</em>), and delivered interactive <strong>Emagazines on CafeF</strong>.',
      'Integrated live Camera &amp; Face Recognition API on Canvas; leveraged <strong>Codex, Antigravity, and Gemini</strong> since 08/2025 to ship faster with higher code quality.',
    ],
    chips: ['GSAP ScrollTrigger', 'Tailwind CSS', 'HTML5 Canvas', 'Codex • Antigravity • Gemini'],
  },
]

/**
 * Bảng chi tiết từng nhóm kỹ năng (#skill-view-table), ưu tiên PHP/Laravel và Vue.js.
 * @type {SkillDetailedItem[]}
 */
export const detailedTable = [
  {
    id: 'fullstack-php',
    skill: 'PHP (Laravel, CodeIgniter), MySQL, Redis (Key Design), REST API',
    skillEn: 'PHP (Laravel, CodeIgniter), MySQL, Redis (Key Design), REST API',
    years: '6+ Năm',
    yearsEn: '6+ Yrs',
    timeline: '2019 ────────● Nay',
    timelineEn: '2019 ────────● Now',
    percent: 94,
    color: 'purple',
    deliverables:
      'Thiết kế CSDL MySQL, cấu trúc key-value Redis, VirusTotal scan và trang quản trị Laravel/Vue.js cho Dynamic QR &amp; Shortlink (<code>short.bizfly.vn</code>, 2M+ clicks, đỉnh ~240K/ngày); xây dựng nền tảng A/B Testing (40 sites, 309 boxes) và AdsDemo.',
    deliverablesEn:
      'Designed MySQL schemas, Redis key-value contracts, VirusTotal scanning, and Laravel/Vue.js admin platform for Dynamic QR &amp; Shortlink (<code>short.bizfly.vn</code>, 2M+ clicks, peak ~240K/day); built A/B Testing platform (40 sites, 309 boxes) and AdsDemo.',
  },
  {
    id: 'vue-ecosystem',
    skill: 'Vue.js (Vue 2 / Vue 3), Inertia.js, ApexCharts, Pinia/Vuex, Vite',
    skillEn: 'Vue.js (Vue 2 / Vue 3), Inertia.js, ApexCharts, Pinia/Vuex, Vite',
    years: '5.5+ Năm',
    yearsEn: '5.5+ Yrs',
    timeline: '2020 ──────● Nay',
    timelineEn: '2020 ──────● Now',
    percent: 88,
    color: 'emerald',
    deliverables:
      'Xây dựng giao diện quản trị &amp; bộ sinh code Macro Engine cho nền tảng Recommendation &amp; A/B Testing (309 box trên 40 site/app), dashboard kiểm định thống kê FDR 0.05 bằng Vue 3 + ApexCharts và biểu đồ phân tích Shortlink.',
    deliverablesEn:
      'Built the admin UI &amp; Macro Engine widget builder for the Recommendation &amp; A/B Testing platform (309 boxes across 40 sites/apps), statistical FDR 0.05 dashboards in Vue 3 + ApexCharts, and Shortlink analytics.',
  },
  {
    id: 'webgis-spatial',
    skill: 'WebGIS: QGIS, Leaflet.js (Canvas), GeoJSON, Marker Clustering, MapSVG',
    skillEn: 'WebGIS: QGIS, Leaflet.js (Canvas), GeoJSON, Marker Clustering, MapSVG',
    years: '4+ Năm',
    yearsEn: '4+ Yrs',
    timeline: '2021 ─────● Nay',
    timelineEn: '2021 ─────● Now',
    percent: 78,
    color: 'cyan',
    deliverables:
      'Dùng QGIS Geometry Simplification giảm 91% dung lượng GeoJSON (33 MB → 3 MB); kết hợp Leaflet Canvas + Marker Clustering đạt 60 FPS trên di động cho 02 Cổng TT Nhà nước; xây dựng bản đồ tương tác Báo Giao Thông.',
    deliverablesEn:
      'Used QGIS Geometry Simplification to cut GeoJSON by 91% (33 MB → 3 MB); combined Leaflet Canvas + Marker Clustering for 60 FPS mobile maps on 02 national portals; built interactive maps for Giao Thong News.',
  },
  {
    id: 'core-frontend',
    skill: 'HTML5, CSS3/SCSS, JavaScript (ES6+), Tailwind CSS, Responsive UI',
    skillEn: 'HTML5, CSS3/SCSS, JavaScript (ES6+), Tailwind CSS, Responsive UI',
    years: '6+ Năm',
    yearsEn: '6+ Yrs',
    timeline: '2019 ────────● Nay',
    timelineEn: '2019 ────────● Now',
    percent: 96,
    color: 'amber',
    deliverables:
      'Xây dựng giao diện chuẩn thiết kế (PC/Mobile), tối ưu Core Web Vitals (Zero CLS), làm chủ hệ thống Microsite, triển khai Campaign Landing Page và chuỗi bài Emagazine trên CafeF.',
    deliverablesEn:
      'Engineered responsive PC/Mobile interfaces, optimized Core Web Vitals (Zero CLS), owned microsite architecture, and delivered campaign landing pages and CafeF Emagazines.',
  },
  {
    id: 'adtech-ops',
    skill: 'AdTech Security & Resilience (Backoff Retry, TOTP CDN, TagManager)',
    skillEn: 'AdTech Security & Resilience (Backoff Retry, TOTP CDN, TagManager)',
    years: '5+ Năm',
    yearsEn: '5+ Yrs',
    timeline: '2019 ──────● Nay',
    timelineEn: '2019 ──────● Now',
    percent: 80,
    color: 'purple',
    deliverables:
      'Tích hợp exponential-backoff retry (0.5s → 1s → 2s), cảnh báo Telegram chống spam (fingerprint 5 phút), upload CDN xác thực TOTP; vá lỗi bảo mật cho AdServing, TagManager, Adsponsor.',
    deliverablesEn:
      'Implemented exponential-backoff retry (0.5s → 1s → 2s), de-duplicated Telegram alerts (5-min fingerprint), and TOTP CDN uploads; patched security issues in AdServing, TagManager, and Adsponsor.',
  },
  {
    id: 'motion-gsap',
    skill: 'GSAP, ScrollTrigger, TweenMax, Draggable, HTML5 Canvas',
    skillEn: 'GSAP, ScrollTrigger, TweenMax, Draggable, HTML5 Canvas',
    years: '4.5+ Năm',
    yearsEn: '4.5+ Yrs',
    timeline: '2021 ─────● Nay',
    timelineEn: '2021 ─────● Now',
    percent: 74,
    color: 'amber',
    deliverables:
      'Xây dựng hiệu ứng cuộn tương tác cho các Landing Page chiến dịch (OMO, Athena), bản đồ Báo Giao Thông, bài Emagazine CafeF và kết nối Camera/Face API trên Canvas.',
    deliverablesEn:
      'Created scroll-triggered animations for brand landing pages (OMO, Athena), Giao Thong maps, CafeF Emagazines, and live Camera/Face API Canvas experiences.',
  },
  {
    id: 'svelte-ai',
    skill: 'Svelte, TypeScript, Core Box Engine & AI Workflow (Codex, Antigravity, Gemini)',
    skillEn: 'Svelte, TypeScript, Core Box Engine & AI Workflow (Codex, Antigravity, Gemini)',
    years: '2+ Năm',
    yearsEn: '2+ Yrs',
    timeline: '2024 ───● Nay',
    timelineEn: '2024 ───● Now',
    percent: 65,
    color: 'emerald',
    deliverables:
      'Thiết kế kiến trúc Core Box Feature (Sticky &amp; Inline Box) chạy trên Kenh14, Soha; ứng dụng bộ 3 AI (Codex, Antigravity, Gemini) từ 08/2025 để tăng tốc viết code, kiểm tra logic và xử lý dữ liệu phức tạp.',
    deliverablesEn:
      'Designed Core Box Feature widgets (Sticky &amp; Inline) running on Kenh14 and Soha; integrated Codex, Antigravity, and Gemini since 08/2025 for faster delivery and rigorous logic verification.',
  },
]

export const skills = pillars
