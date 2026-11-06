/**
 * =====================================================
 *  LỘ TRÌNH SỰ NGHIỆP & HỌC VẤN (2015 – HIỆN TẠI)
 *  Nhóm theo tổ chức; các giai đoạn dự án nằm trong mốc VCCorp.
 *  Hỗ trợ song ngữ VI / EN.
 * =====================================================
 */

/** @typedef {import('../types/portfolio.js').TimelineMilestone} TimelineMilestone */
/** @typedef {import('../types/portfolio.js').TimelineGroup} TimelineGroup */

export const timelineSection = {
  eyebrow: '04 / Lộ trình sự nghiệp',
  eyebrowEn: '04 / Career Timeline & Education',
  title: 'Quá trình làm việc tại VCCorp & Nền tảng học vấn',
  titleEn: 'Professional Journey at VCCorp & Education',
}

/** @type {TimelineMilestone[]} */
export const careerMilestones = [
  {
    id: 'vccorp-senior-frontend',
    period: '08/2025 – Hiện tại',
    periodEn: '08/2025 – Present',
    periodStyle: 'pill',
    color: 'amber',
    role: 'WebGIS, Core Box Feature & Campaign Landing Pages',
    roleEn: 'WebGIS, Core Box Architecture & Campaign Landing Pages',
    company: 'Công ty Cổ phần VCCorp',
    companyEn: 'VCCorp Joint Stock Company',
    location: 'Hà Nội',
    isCurrent: true,
    award: 'Nhân viên Xuất sắc 2025',
    badges: [{ label: '🏆 Nhân viên Xuất sắc 2025', labelEn: '🏆 Outstanding Employee 2025', color: 'emerald' }],
    bulletPoints: [
      'Chủ trì tối ưu dữ liệu không gian <strong>Module Bản đồ số 02 Cổng thông tin Nhà nước</strong> (Cảnh báo thiên tai – lũ lụt; An toàn thực phẩm): dùng <strong>QGIS Geometry Simplification</strong> giảm <strong>91% dung lượng GeoJSON (33 MB → 3 MB)</strong>; kết hợp <strong>Leaflet Canvas + Marker Clustering</strong> đạt <strong>60 FPS</strong> trên di động.',
      'Thiết kế kiến trúc <strong>Core Box Feature bằng Svelte/Vue.js</strong>, triển khai Sticky &amp; Inline Box trên Kenh14, Soha với cơ chế nhúng DOM Injection độc lập, cô lập CSS/JS và đảm bảo Zero CLS; làm chủ mảng Landing Page chiến dịch (<strong>OMO, Athena</strong>) với GSAP ScrollTrigger.',
      'Kết nối Camera &amp; API nhận diện khuôn mặt cho sự kiện vinh danh; tích hợp <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Chatbot AI tư vấn tài trợ</strong> cho <strong>adsponsor.vn</strong> (streaming poll API từ Triact AI Service, parse JSON → UI đa dạng, fallback offline, Lead capture); ứng dụng bộ 3 công cụ AI (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Codex, Antigravity, Gemini</strong>) từ 08/2025 vào quy trình phát triển Fullstack (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong>) và tự động hóa xử lý dữ liệu.',
    ],
    bulletPointsEn: [
      'Spearheaded spatial data optimization for <strong>02 National Government Portals</strong> (disaster/flooding &amp; food safety): used <strong>QGIS Geometry Simplification</strong> to cut <strong>GeoJSON by 91% (33 MB → 3 MB)</strong> and combined <strong>Leaflet Canvas + Marker Clustering</strong> for <strong>60 FPS</strong> mobile interaction.',
      'Architected reusable <strong>Svelte/Vue.js Core Box Widgets</strong> (Sticky &amp; Inline) on Kenh14 and Soha via DOM Injection with Zero CLS; owned brand campaign landing pages (<strong>OMO, Athena</strong>) with GSAP ScrollTrigger.',
      'Connected live Camera streams with a Face Recognition API for event check-ins; integrated an <strong class="text-cyan-700 dark:text-cyan-400 font-bold">AI Sponsorship Advisor Chatbot</strong> for <strong>adsponsor.vn</strong> (streaming-poll API from Triact AI, multi-type block rendering, offline fallback, Lead capture); applied <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Codex, Antigravity, and Gemini</strong> since 08/2025 to accelerate Fullstack (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong>) delivery.',
    ],
    summary:
      'Triển khai WebGIS cho 02 Cổng thông tin Nhà nước (-91% GeoJSON, 60 FPS); thiết kế Core Box Feature (Svelte/Vue.js) trên Kenh14, Soha; làm chủ Landing Page chiến dịch (OMO, Athena) và ứng dụng AI Workflow.',
    summaryEn:
      'Delivered WebGIS for 02 national portals (-91% GeoJSON, 60 FPS); architected Svelte/Vue.js Core Box widgets on Kenh14 & Soha; owned brand landing pages and AI-assisted workflows.',
    icon: 'sparkle',
  },
  {
    id: 'vccorp-frontend-abtesting',
    period: 'Năm 2024',
    periodEn: '2023 – 2024',
    periodStyle: 'text',
    color: 'emerald',
    role: 'Content Recommendation & A/B Testing Platform (40 Sites · 309 Boxes)',
    roleEn: 'Content Recommendation & A/B Testing Platform (40 Sites · 309 Boxes)',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    badges: [],
    bulletPoints: [
      'Xây dựng từ đầu nền tảng tự phục vụ bằng <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel 8 + Vue 3 + Inertia.js</strong> cùng bộ sinh code <strong>Macro Engine</strong> xuất JS bundle đẩy thẳng lên CDN qua xác thực <strong>TOTP</strong>, hiện vận hành <strong>309 box gợi ý trên 40 site &amp; app</strong>.',
      'Phát triển trọn vòng đời thử nghiệm <strong>A/B Testing</strong> có kiểm định thống kê (<strong>FDR = 0.05</strong>), dashboard <strong>ApexCharts</strong> và tầng tích hợp API BigData tự hồi phục (exponential-backoff retry + cảnh báo Telegram chống spam 5 phút).',
    ],
    bulletPointsEn: [
      'Built from scratch a self-service platform in <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel 8 + Vue 3 + Inertia.js</strong> with a <strong>Macro Engine</strong> JS compiler and <strong>TOTP-authenticated</strong> CDN upload, now powering <strong>309 boxes across 40 sites &amp; apps</strong>.',
      'Implemented the full <strong>A/B testing lifecycle</strong> with statistical significance testing (<strong>FDR = 0.05</strong>), <strong>ApexCharts</strong> dashboards, and resilient BigData API integration (exponential-backoff retry + de-duplicated Telegram alerts).',
    ],
    summary:
      'Xây dựng từ đầu nền tảng Recommendation & A/B Testing (Laravel 8, Vue 3, Inertia, ApexCharts), vận hành 309 box trên 40 site & app với kiểm định FDR 0.05.',
    summaryEn:
      'Built from scratch the Recommendation & A/B Testing platform (Laravel 8, Vue 3, Inertia, ApexCharts), powering 309 boxes across 40 sites & apps with FDR 0.05 testing.',
    icon: 'layers',
  },
  {
    id: 'vccorp-adtech-interactive',
    period: '2021 – 2023',
    periodEn: '2021 – 2023',
    periodStyle: 'text',
    color: 'purple',
    role: 'Dynamic QR / Shortlink Platform, AdsDemo & Interactive Media',
    roleEn: 'Dynamic QR / Shortlink Platform, AdsDemo & Interactive Media',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    award: 'Nhân viên Xuất sắc 2022 & 2023',
    badges: [{ label: '🏆 Nhân viên Xuất sắc 2022 & 2023', labelEn: '🏆 Outstanding Employee 2022 & 2023', color: 'amber' }],
    bulletPoints: [
      'Thiết kế mô hình dữ liệu MySQL, <strong class="text-amber-700 dark:text-amber-400 font-bold">cấu trúc key-value trên Redis</strong> và nền tảng quản trị <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong> cho <strong class="text-slate-900 dark:text-white font-bold">Dynamic QR &amp; Shortlink (short.bizfly.vn)</strong> phục vụ <strong class="text-amber-700 dark:text-amber-400 font-bold">hơn 2 triệu clicks</strong> (đỉnh <strong class="text-amber-700 dark:text-amber-400 font-bold">~240.000 clicks/ngày</strong>, redirect 25–60 ms); tích hợp <strong>VirusTotal API</strong> chặn link độc hại và vẽ biểu đồ phân tích từ REST API Log.',
      'Phát triển công cụ <strong>AdsDemo</strong> xem trước và chia sẻ quảng cáo đa định dạng trong ngữ cảnh web PC/Mobile thực tế; bảo trì và vá lỗi bảo mật cho <strong>AdServing, TagManager, Adsponsor</strong>.',
      'Xây dựng 02 chuyên đề bản đồ tương tác cho <strong>Báo Giao Thông</strong> (22 dự án cao tốc &amp; 12 tuyến hầm) bằng <strong>MapSVG.js, TweenMax, Draggable</strong> và chuỗi bài <strong>Emagazine trên báo CafeF</strong>.',
    ],
    bulletPointsEn: [
      'Designed the MySQL data model, <strong class="text-amber-700 dark:text-amber-400 font-bold">Redis key-value contract</strong>, and <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong> admin platform for <strong class="text-slate-900 dark:text-white font-bold">Dynamic QR &amp; Shortlink (short.bizfly.vn)</strong> serving <strong class="text-amber-700 dark:text-amber-400 font-bold">2M+ clicks</strong> (peak <strong class="text-amber-700 dark:text-amber-400 font-bold">~240K/day</strong>, 25–60 ms redirects); integrated <strong>VirusTotal API</strong> scanning and REST API analytics charts.',
      'Built <strong>AdsDemo Simulator</strong> to preview and share ad units inside live PC/Mobile pages; handled maintenance and security patching for <strong>AdServing, TagManager, and Adsponsor</strong>.',
      'Created 02 interactive editorial maps for <strong>Giao Thong News</strong> (22 expressways &amp; 12 road tunnels) using <strong>MapSVG.js, TweenMax, and Draggable</strong>, plus interactive <strong>Emagazines on CafeF</strong>.',
    ],
    summary:
      'Làm chủ tầng dữ liệu MySQL + Redis key contract và web quản trị cho Dynamic QR/Shortlink (2M+ clicks, đỉnh ~240K/ngày); phát triển AdsDemo, bản đồ Báo Giao Thông và Emagazine CafeF.',
    summaryEn:
      'Owned the MySQL + Redis key contract and admin platform for Dynamic QR/Shortlink (2M+ clicks, peak ~240K/day); built AdsDemo, Giao Thong interactive maps, and CafeF Emagazines.',
    icon: 'briefcase',
  },
  {
    id: 'vccorp-ad-operations',
    period: '2019 – 2020',
    periodEn: '2019 – 2020',
    periodStyle: 'text',
    color: 'slate',
    role: 'Vận hành Công cụ Quản lý & Khai thác Vị trí Quảng cáo',
    roleEn: 'Ad Inventory & Placement Management Operations',
    company: 'VCCorp',
    location: 'Hà Nội',
    isCurrent: false,
    compact: true,
    badges: [],
    bulletPoints: [
      'Vận hành công cụ quản lý, phân vùng khai thác vị trí quảng cáo và kiểm duyệt hiển thị banner trên hệ thống báo điện tử đối tác.',
    ],
    bulletPointsEn: [
      'Operated ad inventory zoning tools and verified banner placements across partner digital publications.',
    ],
    summary:
      'Vận hành công cụ quản lý, phân vùng khai thác vị trí quảng cáo và kiểm duyệt hiển thị banner trên hệ thống website.',
    summaryEn:
      'Operated ad inventory zoning tools and verified banner placements across partner websites.',
    icon: 'play',
  },
  {
    id: 'hou-software-engineer',
    period: '2015 – 2019',
    periodEn: '2015 – 2019 (Early Career & B.Eng.)',
    periodStyle: 'text',
    color: 'cyan',
    role: 'Kỹ sư Phần mềm & Lập trình viên PHP (Early Career)',
    roleEn: 'B.Eng. in Software Engineering & PHP Developer (Early Career)',
    company: 'Viện Đại học Mở Hà Nội',
    companyEn: 'Hanoi Open University',
    location: 'Hà Nội',
    isCurrent: false,
    award: 'Giải Ba NCKH (05/2019)',
    badges: [{ label: '🔬 Giải Ba NCKH (05/2019)', labelEn: '🔬 3rd Prize Scientific Research (05/2019)', color: 'cyan' }],
    bulletPoints: [
      'Tốt nghiệp Kỹ sư Phần mềm; hoạt động tại <strong>Câu lạc bộ Mã nguồn mở</strong> và <strong>Tổ phát triển &amp; chuyển giao công nghệ</strong> (2018–2019), trực tiếp xây dựng hệ thống Quản lý Tuyển sinh &amp; Đào tạo phi chính quy bằng <strong>PHP CodeIgniter và Laravel</strong>.',
    ],
    bulletPointsEn: [
      'Graduated with a B.Eng. in Software Engineering; active in the <strong>Open Source Club</strong> and <strong>Technology Transfer Division</strong> (2018–2019), building University Admission and Non-Formal Training ERP modules in <strong>PHP CodeIgniter and Laravel</strong>.',
    ],
    summary:
      'Tốt nghiệp Kỹ sư Phần mềm; đạt Giải Ba NCKH (05/2019) với đề tài phần mềm R và thuật toán phân cụm K-Means; xây dựng phần mềm Quản lý Tuyển sinh & Đào tạo bằng PHP (CodeIgniter, Laravel).',
    summaryEn:
      'B.Eng. in Software Engineering; 3rd Prize in Student Scientific Research (05/2019, K-Means clustering in R); built University Admission & Training systems in PHP (CodeIgniter, Laravel).',
    icon: 'cap',
  },
]

/** @type {TimelineGroup[]} */
export const careerTimeline = [
  {
    id: 'vccorp',
    period: '2019 – Hiện tại',
    periodEn: '2019 – Present',
    periodStyle: 'pill',
    color: 'amber',
    role: 'Fullstack Software Engineer',
    roleEn: 'Fullstack Software Engineer',
    company: 'Công ty Cổ phần VCCorp',
    companyEn: 'VCCorp Joint Stock Company',
    location: 'Hà Nội',
    isCurrent: true,
    tenure: 'Từ 2019 (6+ năm gắn bó và phát triển sản phẩm)',
    tenureEn: 'Since 2019 (6+ years building high-traffic products)',
    badges: [],
    bulletPoints: [],
    summary:
      'Làm chủ sản phẩm end-to-end với Vue.js/Svelte, PHP/Laravel, MySQL và Redis: từ tầng dữ liệu Shortlink (2M+ clicks), nền tảng Recommendation & A/B Testing (40 sites, 309 boxes) đến Core Widget và WebGIS 60 FPS.',
    summaryEn:
      'Owning products end-to-end with Vue.js/Svelte, PHP/Laravel, MySQL, and Redis: from the Shortlink data layer (2M+ clicks) and Recommendation & A/B Testing platform (40 sites, 309 boxes) to Core Widgets and 60 FPS WebGIS.',
    icon: 'briefcase',
    milestones: careerMilestones.filter((item) => item.id.startsWith('vccorp-')),
  },
  {
    ...careerMilestones.find((item) => item.id === 'hou-software-engineer'),
    milestones: [],
  },
]
