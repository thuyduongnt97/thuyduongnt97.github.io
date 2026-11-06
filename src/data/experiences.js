import { profile } from './profile.js'
import { projectScreenshots } from './projectScreenshots.js'

/** @typedef {import('../types/portfolio.js').Experience} Experience */
/** @typedef {import('../types/portfolio.js').DeliverableGroup} DeliverableGroup */

export const selectedSamplesNotice = '📌 Một số sản phẩm minh họa tiêu biểu (Selected Samples):'
export const selectedSamplesNoticeEn = '📌 Selected Production Samples & Live Demos:'

export const deliverablesSection = {
  eyebrow: '03 / Dự án trọng điểm (Case Studies)',
  eyebrowEn: '03 / Featured Case Studies & Deliverables',
  title: 'Các sản phẩm chủ lực & Case Study kỹ thuật',
  titleEn: 'Core Engineering Case Studies & Selected Work',
  description:
    'Ba dự án cốt lõi giải quyết bài toán quy mô lớn về dữ liệu, hiệu năng và vận hành thực tế tại VCCorp, tiếp nối bởi các mảng sản phẩm bổ trợ.',
  descriptionEn:
    'Three flagship case studies solving high-volume data, performance, and operational challenges at VCCorp, followed by supporting production work.',
  coreHeading: '★ 03 Dự án Trọng điểm (Core Case Studies)',
  coreHeadingEn: '★ 03 Flagship Case Studies',
  secondaryHeading: '◆ Các mảng sản phẩm & Dự án khác (Other Production Work)',
  secondaryHeadingEn: '◆ Other Production Systems & Campaign Work',
  supportingHeading: '◇ Dự án bổ trợ & Giai đoạn đầu sự nghiệp (Early Career & Supporting)',
  supportingHeadingEn: '◇ Early Career & Supporting Projects',
  sampleNotice: selectedSamplesNotice,
  sampleNoticeEn: selectedSamplesNoticeEn,
  filters: [
    { id: 'all', label: 'Tất cả mảng công việc', labelEn: 'All Categories' },
    { id: 'adtech', label: '⚡ 1. Shortlink/QR, AdsDemo & AdTech', labelEn: '⚡ 1. Shortlink/QR, AdsDemo & AdTech' },
    { id: 'webapp', label: '🧩 2. A/B Testing, Widget & Core Box', labelEn: '🧩 2. A/B Testing, Widget & Core Box' },
    { id: 'webgis', label: '🗺️ 3. Bản đồ số WebGIS & MapSVG', labelEn: '🗺️ 3. WebGIS & Interactive Maps' },
    { id: 'motion', label: '✨ 4. Landing Page, Emagazine & Sự kiện', labelEn: '✨ 4. Landing Pages, Emagazine & Events' },
  ],
}

/**
 * Thứ tự theo CV Fullstack: AdTech, Web App, WebGIS, Core Box, Landing Page.
 * Chỉ tham chiếu ID; experiences bên dưới vẫn là nguồn duy nhất sở hữu dự án.
 * isSupporting giữ nguyên (5 false + 2 true) để tương thích 100% với bộ test hiện có;
 * thuộc tính `tier` ('core' | 'secondary' | 'supporting') quyết định giao diện Case Study mới.
 * @type {DeliverableGroup[]}
 */
export const deliverableGroups = [
  {
    id: 'adtech-tools',
    tier: 'core',
    caseProjectId: 'qr',
    title: 'Dynamic QR & Shortlink Platform (kèm AdsDemo & AdTech)',
    titleEn: 'Dynamic QR & Shortlink Platform (with AdsDemo & AdTech)',
    filterCategory: 'adtech',
    categories: ['adtech'],
    domain: 'AdTech & High-Traffic Tools',
    domainEn: 'AdTech & High-Traffic Tools',
    period: '2019 – Nay',
    periodEn: '2019 – Present',
    roleBadge: 'Data Model & Admin Platform Owner',
    roleBadgeEn: 'Data Model & Admin Platform Owner',
    impact:
      'Thiết kế tầng dữ liệu MySQL + cấu trúc key Redis và nền tảng quản trị cho hệ thống Shortlink phục vụ hơn 2 triệu clicks (đỉnh ~240.000/ngày, redirect 25–60 ms): đổi URL đích tức thì không tốn chi phí in lại QR và chặn link độc hại qua VirusTotal trước khi kích hoạt.',
    impactEn:
      'Designed the MySQL + Redis key contract and admin platform behind a shortlink system serving 2M+ clicks (peak ~240K/day, 25–60 ms redirects): campaigns switch destinations at zero reprint cost, and malicious URLs are blocked via VirusTotal before going live.',
    cardMetrics: [
      { value: '2M+', valueEn: '2M+', label: 'Tổng lượt click', labelEn: 'Total clicks served' },
      { value: '~240K', valueEn: '~240K', label: 'Clicks / ngày (đỉnh)', labelEn: 'Peak clicks / day' },
      { value: '25–60 ms', valueEn: '25–60 ms', label: 'Độ trễ Redirect', labelEn: 'Redirect latency' },
    ],
    projectIds: ['qr', 'ads', 'ad-maintenance', 'ad-sponsor', 'ad-operations'],
    techStack: ['Laravel', 'MySQL', 'Redis (key design)', 'Vue.js', 'VirusTotal API'],
    architecture:
      'Vue Admin → VirusTotal Check → MySQL Indirection Layer ⇄ Redis Key Sync → [Redirect Service: 25–60 ms] → Log REST API → Analytics UI',
    architectureEn:
      'Vue Admin → VirusTotal Check → MySQL Indirection Layer ⇄ Redis Key Sync → [Redirect Service: 25–60 ms] → Log REST API → Analytics UI',
    sections: [
      {
        label: 'Mô hình dữ liệu & Đồng bộ Redis',
        labelEn: 'Data Model & Redis Key Sync',
        html: 'Thiết kế <strong class="text-slate-900 dark:text-white font-bold">CSDL MySQL</strong> với lớp ánh xạ Shortlink tách mã QR đã in khỏi URL đích; định nghĩa <strong class="text-amber-700 dark:text-amber-400 font-bold">cấu trúc key-value trên Redis</strong> và đồng bộ mỗi khi tạo/sửa/xóa trên web quản trị (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong>), giúp dịch vụ redirect đọc trực tiếp từ Redis mà không cần truy vấn MySQL.',
        htmlEn:
          'Designed the <strong class="text-slate-900 dark:text-white font-bold">MySQL schema</strong> with a shortlink indirection layer decoupling printed QR codes from target URLs; defined the <strong class="text-amber-700 dark:text-amber-400 font-bold">Redis key-value contract</strong> synced on every admin create/update/delete (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong>) so redirects never hit MySQL.',
      },
      {
        label: 'Bảo mật VirusTotal & Dashboard Analytics',
        labelEn: 'VirusTotal Security & Analytics Dashboard',
        html: 'Tích hợp <strong>VirusTotal API</strong> quét mã độc/lừa đảo ở URL đích trước khi link được kích hoạt. Tiêu thụ <strong>REST API từ đội Log</strong> để vẽ biểu đồ Vue.js theo thời gian, <strong>Top referrers, Top locations</strong>; hỗ trợ gắn tag, bộ lọc và import hàng loạt.',
        htmlEn:
          'Integrated the <strong>VirusTotal API</strong> to block phishing and malware URLs before activation. Consumed the logging team\'s <strong>REST API</strong> to build Vue.js charts for traffic over time, <strong>top referrers, and top locations</strong> with tagging, filtering, and bulk import.',
      },
      {
        label: 'AdsDemo Simulator & Bảo trì AdTech',
        labelEn: 'AdsDemo Simulator & AdTech Maintenance',
        html: 'Xây dựng công cụ <strong>AdsDemo</strong> (nhập URL → chọn PC/Mobile → cấu hình banner Sponsor/Video/HTML5 → preview → chia sẻ qua Shortlink/QR) và bảo trì, vá lỗi bảo mật (<strong>Security Patching</strong>) cho <strong>AdServing, TagManager, Adsponsor</strong>.',
        htmlEn:
          'Built <strong>AdsDemo Simulator</strong> (enter URL → switch PC/Mobile → configure Sponsor/Video/HTML5 units → preview → share via Shortlink/QR) and handled query optimization & <strong>security patching</strong> for <strong>AdServing, TagManager, and Adsponsor</strong>.',
      },
    ],
    isSupporting: false,
  },
  {
    id: 'template-widgets',
    tier: 'core',
    caseProjectId: 'experiments',
    title: 'Content Recommendation & A/B Testing Platform',
    titleEn: 'Content Recommendation & A/B Testing Platform',
    filterCategory: 'webapp',
    categories: ['webapp'],
    domain: 'Self-Service Experimentation Platform',
    domainEn: 'Self-Service Experimentation Platform',
    period: '07/2023 – Nay',
    periodEn: '07/2023 – Present',
    roleBadge: 'Lead Developer · Built from Scratch',
    roleBadgeEn: 'Lead Developer · Built from Scratch',
    impact:
      'Xây dựng từ đầu nền tảng tự phục vụ giúp đội sản phẩm & biên tập tự tạo, xuất bản và chạy A/B test (FDR 0.05) cho 309 box gợi ý nội dung trên 40 site báo & app mà không cần lập trình viên can thiệp từng site.',
    impactEn:
      'Built from scratch a self-service platform where product and editorial teams build, publish, and A/B-test (FDR 0.05) 309 recommendation boxes across 40 news sites & apps without engineer intervention.',
    cardMetrics: [
      { value: '40 Sites', valueEn: '40 Sites', label: 'PC, Mobile & App', labelEn: 'PC, Mobile & Apps' },
      { value: '309 Boxes', valueEn: '309 Boxes', label: 'Widget gợi ý đang chạy', labelEn: 'Active widget boxes' },
      { value: 'FDR 0.05', valueEn: 'FDR 0.05', label: 'Kiểm định thống kê A/B', labelEn: 'Statistical A/B testing' },
    ],
    projectIds: ['experiments'],
    techStack: ['Laravel 8', 'Vue 3', 'Inertia.js', 'ApexCharts', 'REST API (BigData)', 'TOTP CDN'],
    architecture:
      'Template + Macro Engine (%%URL%%, %%divId%%) → TOTP CDN Upload → A/B Lifecycle & Statistical Check (FDR 0.05) → Backoff Retry + Telegram Dedup Alert',
    architectureEn:
      'Template + Macro Engine (%%URL%%, %%divId%%) → TOTP CDN Upload → A/B Lifecycle & Statistical Check (FDR 0.05) → Backoff Retry + Telegram Dedup Alert',
    sections: [
      {
        label: 'Bộ sinh code Widget & Vòng đời A/B Testing',
        labelEn: 'Widget Code Generator & A/B Experiment Lifecycle',
        html: 'Xây dựng <strong>macro engine</strong> (<code>%%URL%%</code>, <code>%%divId%%</code>, <code>%%limitItem%%</code>…) biên dịch JS riêng cho từng site (kèm bản beta) và đẩy lên CDN qua xác thực <strong>TOTP</strong>. Quản lý trọn vòng đời A/B test: tạo, chạy, fork, khôi phục và <strong>so sánh các phase bằng kiểm định thống kê (FDR 0.05)</strong>.',
        htmlEn:
          'Built a template + <strong>macro engine</strong> (<code>%%URL%%</code>, <code>%%divId%%</code>, <code>%%limitItem%%</code>…) compiling site-specific JS bundles (plus beta builds) uploaded to CDN via <strong>TOTP authentication</strong>. Full A/B lifecycle: create, run, fork, restore, and <strong>compare phases with statistical testing (FDR 0.05)</strong>.',
      },
      {
        label: 'Dashboard ApexCharts & Tích hợp chịu lỗi',
        labelEn: 'ApexCharts Dashboards & Resilient Integration',
        html: 'Trực quan hóa clicks, tỉ lệ thoát, view/click, thời gian đọc bằng <strong>Vue 3 + ApexCharts</strong>. Bọc mọi lệnh gọi API BigData bằng timeout, <strong>exponential-backoff retry</strong> (0.5s → 1s → 2s cho lỗi 5xx/mạng) và <strong>cảnh báo Telegram chống spam bằng cache fingerprint 5 phút</strong>.',
        htmlEn:
          'Visualized clicks, exit rate, view/click, and time-on-read in <strong>Vue 3 + ApexCharts</strong>. Wrapped upstream BigData calls with timeouts, <strong>exponential-backoff retry</strong> (0.5s → 1s → 2s on 5xx/network errors), and <strong>Telegram alerts de-duplicated via 5-minute cache fingerprints</strong>.',
      },
    ],
    isSupporting: false,
  },
  {
    id: 'spatial-maps',
    tier: 'core',
    caseProjectId: 'government-map',
    title: 'WebGIS for Government Portals & Interactive Maps',
    titleEn: 'WebGIS for Government Portals & Interactive Maps',
    filterCategory: 'webgis',
    categories: ['webgis'],
    domain: 'WebGIS & Spatial Data Engineering',
    domainEn: 'WebGIS & Spatial Data Engineering',
    period: '2021 – Nay',
    periodEn: '2021 – Present',
    roleBadge: 'WebGIS & Frontend Performance Engineer',
    roleBadgeEn: 'WebGIS & Frontend Performance Engineer',
    impact:
      'Cắt giảm 91% dung lượng GeoJSON (33 MB → 3 MB) bằng QGIS và kết hợp Leaflet Canvas + Marker Clustering, giúp hàng nghìn điểm tọa độ hiển thị mượt 60 FPS trên điện thoại cho 02 Cổng thông tin Nhà nước.',
    impactEn:
      'Cut GeoJSON payload by 91% (33 MB → 3 MB) in QGIS and combined Leaflet Canvas renderer with Marker Clustering to render thousands of spatial points at 60 FPS on mobile for 02 national portals.',
    cardMetrics: [
      { value: '-91%', valueEn: '-91%', label: 'Dung lượng (33→3 MB)', labelEn: 'Payload (33→3 MB)' },
      { value: '60 FPS', valueEn: '60 FPS', label: 'Tương tác trên Mobile', labelEn: 'Smooth mobile pan/zoom' },
      { value: '02 Portals', valueEn: '02 Portals', label: 'Cổng TT Nhà nước', labelEn: 'National Gov Portals' },
    ],
    projectIds: ['government-map', 'maps'],
    techStack: ['QGIS', 'GeoJSON', 'Leaflet', 'Canvas Renderer', 'Marker Clustering', 'MapSVG.js'],
    architecture:
      'Raw GeoJSON (33 MB) → QGIS Geometry Simplification (3 MB, -91%) → Leaflet Canvas Renderer + Marker Clustering → 60 FPS Mobile UX',
    architectureEn:
      'Raw GeoJSON (33 MB) → QGIS Geometry Simplification (3 MB, -91%) → Leaflet Canvas Renderer + Marker Clustering → 60 FPS Mobile UX',
    sections: [
      {
        label: 'WebGIS 02 Cổng thông tin Nhà nước (2025 – Nay)',
        labelEn: 'WebGIS for 02 National Government Portals (2025 – Present)',
        html: 'Tiền xử lý ranh giới hành chính bằng <strong>QGIS Geometry Simplification</strong> giảm <strong>~91% dung lượng (33 MB → 3 MB)</strong>; chuyển Leaflet sang <strong>Canvas renderer</strong> kết hợp <strong>Marker Clustering</strong> duy trì <strong>60 FPS trên thiết bị di động</strong> cho cổng cảnh báo thiên tai – lũ lụt và an toàn thực phẩm.',
        htmlEn:
          'Pre-processed boundaries with <strong>QGIS Geometry Simplification</strong> cutting payload by <strong>~91% (33 MB → 3 MB)</strong>; switched Leaflet to <strong>Canvas renderer</strong> with <strong>Marker Clustering</strong> to sustain <strong>60 FPS on mobile</strong> for disaster/flooding and food-safety portals.',
      },
      {
        label: 'Chuyên đề Bản đồ tương tác Báo Giao Thông (2021 – 2023)',
        labelEn: 'Interactive Editorial Maps for Giao Thong News (2021 – 2023)',
        html: 'Trực quan hóa <strong>22 dự án cao tốc Bắc – Nam và 12 tuyến hầm đường bộ</strong> bằng <strong>MapSVG.js, TweenMax, Draggable</strong>; liên kết điểm chọn trên bản đồ với quy mô, vốn đầu tư và tiến độ trên cả PC và Mobile.',
        htmlEn:
          'Visualized <strong>22 North–South expressway projects and 12 road tunnels</strong> using <strong>MapSVG.js, TweenMax, and Draggable</strong>, linking map selections to investment scale and construction progress across PC and Mobile.',
      },
    ],
    isSupporting: false,
  },
  {
    id: 'core-box-features',
    tier: 'secondary',
    caseProjectId: 'feature-core',
    title: 'Core Box Feature & Banner PR (Kenh14, Soha)',
    titleEn: 'Core Box Feature & PR Banner Engine (Kenh14, Soha)',
    filterCategory: 'webapp',
    categories: ['webapp', 'motion'],
    domain: 'Component Architecture & Embeds',
    domainEn: 'Component Architecture & Embeds',
    period: '08/2025 – Nay',
    periodEn: '08/2025 – Present',
    roleBadge: 'Frontend Architect · Core Widget',
    roleBadgeEn: 'Frontend Architect · Core Widget',
    impact:
      'Thiết kế kiến trúc Core Widget (Svelte/Vue.js) nhúng độc lập qua DOM Injection cho Box Sticky và Box Inline trên Kenh14, Soha; cô lập hoàn toàn CSS/JS và đảm bảo Zero CLS.',
    impactEn:
      'Architected reusable Svelte/Vue.js Core Widgets embedded via DOM Injection for Sticky and Inline boxes on Kenh14 and Soha with strict CSS/JS isolation and Zero CLS.',
    projectIds: ['feature-core'],
    techStack: ['Svelte', 'Vue.js', 'Sticky & Inline Box', 'DOM Injection', 'Zero CLS'],
    sections: [
      {
        label: 'Component Architecture',
        labelEn: 'Component Architecture',
        html: 'Thiết kế core <strong>Svelte/Vue.js</strong> tái sử dụng cho <strong>Box Sticky và Inline</strong>; nhúng độc lập qua <strong>DOM Injection</strong>, cô lập CSS/JS và không gây xô lệch bố cục (CLS) trang báo.',
        htmlEn:
          'Designed a reusable <strong>Svelte/Vue.js</strong> core supporting both <strong>Sticky and Inline</strong> modes; injected via <strong>DOM Injection</strong> with scoped styles and zero layout shift (CLS).',
      },
      {
        label: 'Triển khai chiến dịch',
        labelEn: 'Campaign Rollout',
        html: 'Phát triển box lịch thi đấu, bảng huy chương và Banner PR trên <strong>Kenh14, Soha</strong> cho các kỳ World Cup, ASIAD; tái sử dụng một nhân core cho nhiều vị trí nhúng.',
        htmlEn:
          'Shipped match schedules, medal tables, and PR banners on <strong>Kenh14 and Soha</strong> for World Cup and ASIAD events, reusing one core across multiple placements.',
      },
    ],
    isSupporting: false,
  },
  {
    id: 'campaigns-editorials',
    tier: 'secondary',
    caseProjectId: 'landing-pages',
    title: 'Campaign Landing Pages & Emagazine Chuyên đề (CafeF, OMO, Athena)',
    titleEn: 'Campaign Landing Pages & Interactive Emagazines (CafeF, OMO, Athena)',
    filterCategory: 'motion',
    categories: ['motion'],
    domain: 'Interactive Motion & Scrollytelling',
    domainEn: 'Interactive Motion & Scrollytelling',
    period: '2022 – Nay',
    periodEn: '2022 – Present',
    roleBadge: 'Owner · Estimation & GSAP Implementation',
    roleBadgeEn: 'Owner · Estimation & GSAP Implementation',
    impact:
      'Làm chủ mảng Landing Page chiến dịch (lên báo giá, phát triển mới với GSAP ScrollTrigger và bảo trì hệ thống microsite) cùng chuỗi bài Emagazine tương tác trên báo CafeF.',
    impactEn:
      'Owned campaign landing pages end-to-end (estimation, GSAP ScrollTrigger development, and microsite maintenance) alongside interactive scrollytelling Emagazines on CafeF.',
    projectIds: ['landing-pages', 'rebuild', 'emagazines'],
    techStack: ['HTML5/CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Responsive UI'],
    sections: [
      {
        label: 'Mảng Landing Page & Microsite (08/2025 – Nay)',
        labelEn: 'Campaign Landing Pages & Microsites (08/2025 – Present)',
        html: 'Làm chủ mảng Landing Page chiến dịch: trực tiếp lên báo giá, phát triển các trang chiến dịch mới bằng <strong>GSAP, ScrollTrigger</strong> (tiêu biểu: <em>OMO, Athena</em>) và duy trì hệ thống microsite.',
        htmlEn:
          'Owned the campaign landing page stream: handled estimation, built new interactive pages with <strong>GSAP &amp; ScrollTrigger</strong> (notably <em>OMO, Athena</em>), and maintained existing microsites.',
      },
      {
        label: 'Bài Emagazine chuyên đề (2022 – Nay)',
        labelEn: 'Interactive Emagazines on CafeF (2022 – Present)',
        html: 'Xây dựng giao diện và hiệu ứng cuộn tương tác (scrollytelling) cho chuỗi bài Emagazine chuyên đề về <strong>Bất động sản</strong> và <strong>Thiết bị công nghệ</strong> trên báo <strong>CafeF</strong>.',
        htmlEn:
          'Built responsive layouts and scrollytelling motion effects for special-issue Emagazines covering <strong>Real Estate</strong> and <strong>Consumer Tech</strong> on <strong>CafeF</strong>.',
      },
    ],
    isSupporting: false,
  },
  {
    id: 'events-gamification',
    tier: 'supporting',
    caseProjectId: 'recognition-event',
    title: 'Chatbot AI, Camera Check-in & AI Workflow',
    titleEn: 'AI Chatbot, Face Check-in & AI Workflow',
    filterCategory: 'motion',
    categories: ['motion', 'adtech'],
    domain: 'AI Integration & AI Workflow • VCCorp',
    domainEn: 'AI Integration & AI Workflow • VCCorp',
    period: '2024 – Nay',
    periodEn: '2024 – Present',
    projectIds: ['recognition-event', 'minigames'],
    techStack: ['Vue 3', 'Streaming API', 'Triact AI Service', 'Camera Stream', 'Face Recognition API', 'Canvas', 'Codex', 'Antigravity', 'Gemini'],
    sections: [
      {
        label: 'Chatbot AI Tư vấn Tài trợ',
        labelEn: 'AI Sponsorship Advisor Chatbot',
        html: 'Tích hợp <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Chatbot AI tư vấn tài trợ</strong> cho <a href="https://adsponsor.vn/" target="_blank" rel="noopener" class="text-amber-700 dark:text-amber-400 underline font-bold">adsponsor.vn</a>: xây dựng giao diện hội thoại (Vue 3), streaming poll API từ <strong>Triact AI Service</strong> (BigData AI), parse JSON response thành UI đa dạng (text / thẻ gói tài trợ / thẻ dự án / nút gợi ý), tự viết Markdown renderer, kịch bản fallback offline và pipeline thu thập Lead.',
        htmlEn:
          'Integrated an <strong class="text-cyan-700 dark:text-cyan-400 font-bold">AI Sponsorship Advisor Chatbot</strong> for <a href="https://adsponsor.vn/" target="_blank" rel="noopener" class="text-amber-700 dark:text-amber-400 underline font-bold">adsponsor.vn</a>: built the conversational UI (Vue 3), streaming-poll API from <strong>Triact AI Service</strong> (BigData AI), parsed structured JSON into multi-type blocks (text / package cards / project cards / quick-reply buttons), hand-rolled Markdown renderer, offline fallback scenarios, and Lead capture pipeline.',
      },
      {
        label: 'Camera & Nhận diện',
        labelEn: 'Camera Stream & Face Recognition',
        html: 'Kết nối luồng Camera trực tiếp trên Canvas với API nhận diện khuôn mặt để kích hoạt hiệu ứng vinh danh nhân viên sự kiện; xây dựng minigame vòng quay may mắn trên Canvas.',
        htmlEn:
          'Connected live Camera streams on HTML5 Canvas with a Face Recognition API to trigger real-time employee recognition animations, plus a Canvas lucky-wheel minigame.',
      },
      {
        label: 'Quy trình AI Workflow',
        labelEn: 'AI-Assisted Engineering Workflow',
        html: 'Ứng dụng bộ 3 công cụ AI (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Codex, Antigravity, Gemini</strong>) từ 08/2025 vào quy trình phát triển: phân tích &amp; refactor code Fullstack (<strong class="text-cyan-700 dark:text-cyan-400 font-bold">Laravel/Vue.js</strong>), tự động hóa chuẩn hóa GeoJSON và rút ngắn thời gian giao hàng.',
        htmlEn:
          'Applied <strong class="text-cyan-700 dark:text-cyan-400 font-bold">Codex, Antigravity, and Gemini</strong> since 08/2025 to accelerate Laravel/Vue.js refactoring, automate GeoJSON preprocessing, and ship faster with higher test coverage.',
      },
    ],
    isSupporting: true,
  },
  {
    id: 'university-systems',
    tier: 'supporting',
    caseProjectId: 'enrollment-management',
    title: 'Hệ thống Quản lý Tuyển sinh & Đào tạo Phi chính quy',
    titleEn: 'University Enrollment & Non-Formal Training ERP',
    filterCategory: 'adtech',
    categories: ['adtech'],
    domain: 'Early Career • ĐH Mở Hà Nội',
    domainEn: 'Early Career • Hanoi Open University',
    period: '2018 – 2019',
    periodEn: '2018 – 2019',
    projectIds: ['enrollment-management', 'non-formal-training'],
    techStack: ['PHP', 'CodeIgniter', 'Laravel', 'MySQL'],
    sections: [
      {
        label: '',
        labelEn: '',
        html: 'Phát triển các module xét tuyển, tiếp nhận hồ sơ, thẩm định văn bằng, thanh toán học phí (PHP CodeIgniter) và hệ thống quản lý đào tạo phi chính quy (Laravel).',
        htmlEn:
          'Developed online admission, dossier verification, diploma audit, and tuition payment modules (PHP CodeIgniter) alongside a non-formal training management system (Laravel).',
      },
    ],
    isSupporting: true,
  },
]

/**
 * Danh sách kinh nghiệm và dự án thực tế — Nguyễn Thị Thùy Dương
 * Giữ lịch sử giai đoạn/tổ chức và ID cho lightbox, deep link, kiểm thử.
 * @type {Experience[]}
 */
export const experiences = [
  {
    id: 'work-with-agents',
    company: 'VCCorp',
    companyId: 'current-employer',
    role: profile.title,
    period: '08/2025 — Hiện tại',
    location: profile.city,
    summary:
      'Triển khai module bản đồ số Cổng thông tin Nhà nước, mảng Landing Page chiến dịch với GSAP ScrollTrigger, kiến trúc Core Box Feature (Sticky & Inline), Camera/API nhận diện và ứng dụng AI Agent vào quy trình làm việc.',
    kind: 'work',
    agentMilestone: {
      period: '08/2025',
      date: '2025-08',
      label: 'Bắt đầu ứng dụng AI Agent vào quy trình phát triển',
    },
    projects: [
      {
        id: 'rebuild',
        name: 'Làm chủ & Bảo trì Hệ thống Landing Page / Microsite',
        nameEn: 'Landing Page & Microsite System Ownership',
        role: 'Bảo trì · Microsite & Công cụ nghiệp vụ',
        roleEn: 'Maintenance · Microsites & Internal Tools',
        domain: 'Microsite & Architecture Maintenance',
        filterCategory: 'motion',
        category: 'motion',
        categories: ['motion', 'webapp'],
        categoryTags: ['motion', 'webapp', 'design-system'],
        description:
          'Làm chủ mảng Landing Page/Microsite, duy trì ổn định các dự án đang chạy và tái cấu trúc component khi phát sinh yêu cầu mới.',
        descriptionEn:
          'Took ownership of the Landing Page/Microsite portfolio, maintaining live campaigns and refactoring shared UI components.',
        achievements: [
          'Chủ động tiếp quản và duy trì ổn định hệ thống microsite cùng các công cụ nội bộ.',
          'Khắc phục lỗi, tối ưu hiệu năng tải trang và tái cấu trúc (refactor) các component giao diện.',
        ],
        techStack: ['HTML5 / CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger'],
        isHighlight: false,
        period: '08/2025',
        icon: 'refresh',
        status: 'Dự án nội bộ',
        delivery: 'with-agents',
      },
      {
        id: 'landing-pages',
        screenshots: projectScreenshots['landing-pages'],
        name: 'Triển khai Landing Page Chiến dịch (OMO & Athena)',
        nameEn: 'Interactive Campaign Landing Pages (OMO & Athena)',
        role: 'Báo giá & Triển khai Landing Page',
        roleEn: 'Estimation & Interactive Frontend Lead',
        domain: 'FMCG & Campaign Landing Pages',
        filterCategory: 'motion',
        category: 'motion',
        categories: ['motion'],
        categoryTags: ['motion', 'perf', 'design-system'],
        description:
          'Làm chủ mảng Landing Page chiến dịch: trực tiếp lên báo giá, xây dựng hiệu ứng GSAP ScrollTrigger cho các chiến dịch lớn (OMO, Athena) và bảo trì hệ thống microsite.',
        descriptionEn:
          'Owned campaign landing pages: handled technical estimation, built GSAP ScrollTrigger animations for major brand campaigns (OMO, Athena), and maintained microsites.',
        achievements: [
          'Trực tiếp ước lượng chi phí, lên báo giá và phát triển hoàn chỉnh các landing page chiến dịch thương hiệu lớn: OMO và Athena.',
          'Thiết kế và tối ưu hiệu ứng cuộn trang tương tác mượt mà bằng GSAP ScrollTrigger trên cả PC và Mobile.',
        ],
        techStack: ['HTML5 / CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Performance Optimization'],
        demoUrl: 'https://omogieotrieumamxanh.vn/',
        isHighlight: true,
        icon: 'external',
        status: 'Có link live',
        delivery: 'with-agents',
        sampleNotice: selectedSamplesNotice,
        links: [
          {
            id: 'omo-gieo-trieu-mam-xanh',
            label: 'OMO — Gieo triệu mầm xanh',
            labelEn: 'OMO — Green Future Campaign',
            url: 'https://omogieotrieumamxanh.vn/',
            kind: 'site',
            category: 'Landing page',
            description: 'Landing page chiến dịch OMO — Gieo triệu mầm xanh.',
          },
          {
            id: 'athena',
            label: 'Athena CM Landing Page',
            labelEn: 'Athena CM Landing Page',
            url: 'https://athenacm.vn/',
            kind: 'site',
            category: 'Landing page',
            description: 'Landing page giới thiệu giải pháp Athena CM.',
          },
        ],
      },
      {
        id: 'government-map',
        name: 'WebGIS cho 02 Cổng thông tin Nhà nước',
        nameEn: 'WebGIS for 02 National Government Portals',
        role: 'Frontend & WebGIS Data Specialist',
        roleEn: 'Frontend & WebGIS Data Specialist',
        domain: 'GovTech & Spatial WebGIS',
        filterCategory: 'webgis',
        category: 'webgis',
        categories: ['webgis'],
        categoryTags: ['webgis', 'perf'],
        description:
          'Tối ưu dữ liệu địa lý GeoJSON (-91% dung lượng, 33 MB → 3 MB) bằng QGIS và xây dựng bản đồ tương tác Leaflet Canvas + Marker Clustering đạt 60 FPS trên di động cho 02 Cổng thông tin Nhà nước.',
        descriptionEn:
          'Cut GeoJSON payload by 91% (33 MB → 3 MB) in QGIS and engineered a Leaflet Canvas + Marker Clustering map running at 60 FPS on mobile for 02 national portals.',
        achievements: [
          'Tiền xử lý ranh giới bằng QGIS Geometry Simplification, cắt giảm ~91% dung lượng GeoJSON (từ 33 MB xuống 3 MB) mà vẫn giữ độ chính xác địa lý.',
          'Chuyển Leaflet sang Canvas renderer kết hợp Marker Clustering để hiển thị hàng nghìn điểm tọa độ mượt 60 FPS trên điện thoại tầm trung.',
        ],
        achievementsEn: [
          'Pre-processed boundaries with QGIS Geometry Simplification, cutting GeoJSON payload by ~91% (33 MB → 3 MB) without losing geographic accuracy.',
          'Switched Leaflet to the Canvas renderer with Marker Clustering so thousands of points render at 60 FPS on mid-range phones.',
        ],
        caseStudy: {
          challenge:
            'Hai cổng thông tin Nhà nước (cảnh báo thiên tai – lũ lụt và an toàn thực phẩm) cần bản đồ tương tác công khai. Dữ liệu GeoJSON gốc rất nặng (33 MB) và số điểm tọa độ lên tới hàng nghìn, khiến bản đồ tải chậm và giật lag trên điện thoại — thiết bị mà phần lớn người dân sử dụng. Nhiệm vụ là giúp bản đồ tải nhanh và thao tác mượt trên điện thoại tầm trung mà không làm mất độ chính xác địa lý cần thiết.',
          challengeEn:
            'Two government portals (natural disasters & flooding, food safety) needed public interactive maps. The raw GeoJSON was 33 MB and the point count ran into the thousands, causing slow loads and lag on mid-range phones—the device most citizens use. Task: make the maps load fast and pan smoothly at 60 FPS without losing meaningful geographic accuracy.',
          solution:
            'Tiền xử lý ranh giới bằng QGIS Geometry Simplification (giảm 91% dung lượng từ 33 MB xuống 3 MB), chuyển Leaflet sang Canvas renderer thay cho hàng nghìn node SVG DOM, và áp dụng Marker Clustering theo mức zoom.',
          solutionEn:
            'Pre-processed boundaries with QGIS Geometry Simplification (33 MB → 3 MB), switched Leaflet to Canvas renderer, and applied zoom-based Marker Clustering.',
          actions: [
            'Tiền xử lý ranh giới bằng QGIS Geometry Simplification, loại bỏ các đỉnh đa giác không nhìn thấy ở mức zoom web.',
            'Chuyển Leaflet sang Canvas renderer thay cho việc gắn hàng nghìn node SVG vào DOM.',
            'Áp dụng Marker Clustering để số điểm hiển thị phụ thuộc vào mức zoom thay vì tổng kích thước tập dữ liệu.',
          ],
          actionsEn: [
            'Pre-processed boundaries with QGIS Geometry Simplification, removing vertices invisible at web zoom levels.',
            'Switched Leaflet to the Canvas renderer instead of mounting thousands of SVG DOM nodes.',
            'Applied Marker Clustering so the visible point count scales with zoom, not with dataset size.',
          ],
          impact:
            'Đạt tốc độ tương tác mượt 60 FPS trên di động; dung lượng tải GeoJSON giảm ~91% (từ 33 MB xuống 3 MB); triển khai thực tế trên 02 cổng thông tin Nhà nước.',
          impactEn:
            'Smooth 60 FPS interaction on mobile; GeoJSON payload cut by ~91% (33 MB → 3 MB); deployed in production on 02 national portals.',
          insight:
            'Mình xử lý dữ liệu trước khi xử lý code. Điểm ảnh nhanh nhất chính là điểm ảnh không bao giờ phải gửi xuống trình duyệt.',
          insightEn:
            'I fixed the data before the code. The fastest pixel is the one you never send to the browser.',
          metrics: [
            { label: 'Dung lượng GeoJSON', labelEn: 'GeoJSON Payload', value: '-91% (33→3 MB)', valueEn: '-91% (33→3 MB)' },
            { label: 'Tương tác di động', labelEn: 'Mobile Frame Rate', value: '60 FPS', valueEn: '60 FPS' },
            { label: 'Kỹ thuật Render', labelEn: 'Render Engine', value: 'Canvas + Cluster', valueEn: 'Canvas + Cluster' },
            { label: 'Quy mô triển khai', labelEn: 'Production Rollout', value: '02 Cổng TTQG', valueEn: '02 Gov Portals' },
          ],
        },
        techStack: ['QGIS', 'GeoJSON', 'Leaflet', 'Canvas', 'Marker Clustering'],
        isHighlight: false,
        period: '2025 – Nay',
        icon: 'map',
        status: 'Tổng quan giải pháp',
        delivery: 'with-agents',
      },
      {
        id: 'recognition-event',
        name: 'Camera Check-in & Vinh danh nhân viên',
        nameEn: 'Live Camera Face Check-in & Recognition',
        role: 'Tích hợp Camera · API nhận diện khuôn mặt',
        roleEn: 'Camera Stream & Face Recognition Integration',
        domain: 'AI Vision Stream & Gamification',
        filterCategory: 'motion',
        category: 'motion',
        categories: ['motion'],
        categoryTags: ['motion', 'perf'],
        description:
          'Kết nối luồng Camera trực tiếp trên Canvas với API nhận diện khuôn mặt để kích hoạt giao diện vinh danh nhân viên khối kinh doanh.',
        descriptionEn:
          'Connected live HTML5 Canvas camera streams with a Face Recognition API to trigger automated employee recognition cards at company events.',
        achievements: [
          'Kết nối luồng Camera trực tiếp và API nhận diện khuôn mặt realtime để kích hoạt animation vinh danh nhân viên sự kiện.',
        ],
        techStack: ['Camera Stream', 'Face Recognition API', 'Canvas Streaming', 'CSS Animation'],
        isHighlight: true,
        icon: 'award',
        status: 'Tổng quan giải pháp',
        delivery: 'with-agents',
      },
      {
        id: 'feature-core',
        name: 'Kiến trúc Core Box Feature & Cắt Box Chạy Chiến dịch (Banner PR)',
        nameEn: 'Core Box Widget Architecture & Campaign Embeds (Kenh14, Soha)',
        role: 'Frontend Architect · Core Box & Campaign Engine',
        roleEn: 'Frontend Architect · Core Box & Campaign Engine',
        domain: 'Design System & Component Architecture',
        filterCategory: 'webapp',
        category: 'webapp',
        categories: ['webapp', 'motion'],
        categoryTags: ['webapp', 'motion', 'design-system'],
        description:
          'Thiết kế Core Widget Svelte/Vue.js tái sử dụng cho Box Sticky và Inline; trực tiếp phát triển box chiến dịch và nhúng độc lập vào trang báo qua DOM Injection.',
        descriptionEn:
          'Designed reusable Svelte/Vue.js Core Widgets for Sticky and Inline placements, embedded into high-traffic news sites via DOM Injection with Zero CLS.',
        achievements: [
          'Chuẩn hóa component độc lập hỗ trợ 2 chế độ Sticky và Inline, tái sử dụng cho nhiều chiến dịch và vị trí nhúng.',
          'Triển khai DOM Injection tương thích bố cục trang báo, cô lập CSS/JS và giữ luồng đọc liền mạch (Zero CLS).',
          'Phát triển box lịch thi đấu, huy chương và Banner PR cho World Cup, ASIAD trên Kenh14 và Soha.',
        ],
        techStack: ['Svelte', 'Vue.js', 'Sticky & Inline Box', 'DOM Injection'],
        sampleNotice: selectedSamplesNotice,
        links: [
          {
            id: 'box-sticky-kenh14',
            label: 'Kenh14 • Ví dụ Box Sticky',
            labelEn: 'Kenh14 • Sticky Box Live Sample',
            url: 'https://kenh14.vn/do-noi-tieng-cua-vi-hon-the-ronaldo-hon-ca-vo-messi-va-victoria-beckham-cong-lai-xung-danh-wag-quyen-luc-nhat-world-cup-2026-215260617140236789.chn',
            kind: 'site',
            category: 'Box Sticky',
            description: 'Box tương tác neo cố định màn hình (Sticky) bám theo luồng đọc của độc giả.',
          },
          {
            id: 'box-inline-kenh14',
            label: 'Kenh14 • Ví dụ Box Giữa bài',
            labelEn: 'Kenh14 • In-Article Box Sample',
            url: 'https://kenh14.vn/cap-nhat-argentina-vs-algeria-luc-8h-sang-17-6-messi-va-duong-kim-vo-dich-bat-dau-hanh-trinh-bao-ve-ngai-vang-215260616175122195.chn',
            kind: 'site',
            category: 'Box giữa bài',
            description: 'Box cập nhật dữ liệu trận đấu và chiến dịch tài trợ nhúng giữa luồng bài viết.',
          },
          {
            id: 'box-asiad-schedule',
            label: 'Soha • Ví dụ Box Lịch thi đấu',
            labelEn: 'Soha • ASIAD Schedule Box',
            url: 'https://soha.vn/lich-thi-dau-asiad-ngay-20-9-the-thao-viet-nam-mo-hang-huy-chuong-198260920081317925.htm',
            kind: 'site',
            category: 'Box giữa bài',
            description: 'Box lịch thi đấu thể thao nhúng giữa bài viết Soha.',
          },
          {
            id: 'box-asiad-medals',
            label: 'Soha • Ví dụ Box Huy chương',
            labelEn: 'Soha • ASIAD Medal Standings Box',
            url: 'https://soha.vn/vdv-viet-nam-kien-cuong-vuot-qua-nhat-ban-han-quoc-do-guc-sau-khi-gianh-huy-chuong-asiad-198260924134304525.htm',
            kind: 'site',
            category: 'Box giữa bài',
            description: 'Box cập nhật thành tích huy chương thể thao nhúng giữa bài viết Soha.',
          },
        ],
        isHighlight: true,
        icon: 'code',
        status: 'Có 4 link thực tế',
        delivery: 'with-agents',
      },
      {
        id: 'ad-sponsor',
        name: 'Bảo trì & Vá lỗi bảo mật Adsponsor',
        nameEn: 'Adsponsor Maintenance & Security Patching',
        role: 'Bảo trì công cụ & Vá lỗi bảo mật',
        roleEn: 'System Maintenance & Security Patching',
        domain: 'AdTech Maintenance',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech'],
        categoryTags: ['adtech', 'perf'],
        description: 'Bảo trì định kỳ và xử lý các lỗ hổng bảo mật cho công cụ quảng cáo Adsponsor.',
        descriptionEn: 'Maintained and patched security vulnerabilities for the internal Adsponsor platform.',
        achievements: [
          'Duy trì vận hành ổn định cho công cụ Adsponsor trong hệ sinh thái AdTech.',
          'Xử lý các lỗi phát sinh và cập nhật bản vá bảo mật định kỳ.',
        ],
        techStack: ['AdTech', 'JavaScript', 'Security Patching', 'Maintenance'],
        isHighlight: false,
        icon: 'refresh',
        status: 'Tổng quan công việc',
        delivery: 'with-agents',
      },
    ],
  },
  {
    id: 'work-before-agents',
    company: 'VCCorp',
    companyId: 'current-employer',
    role: profile.title,
    period: '2019 — Trước 08/2025',
    location: profile.city,
    summary:
      'Xây dựng hệ thống Shortlink/QR, công cụ Ads Demo Simulator, bản đồ số Báo Giao Thông, nền tảng Recommendation & A/B Testing từ BigData, và bảo trì AdTech.',
    kind: 'work',
    projects: [
      {
        id: 'ad-operations',
        name: 'Vận hành Công cụ Quản lý & Khai thác Vị trí Quảng cáo',
        nameEn: 'Ad Inventory & Placement Management Operations',
        role: 'Vận hành công cụ quảng cáo',
        roleEn: 'Ad Operations & Placement Tooling',
        domain: 'Ad Operations & Inventory',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech'],
        categoryTags: ['adtech', 'perf'],
        description:
          'Vận hành công cụ quản lý, phân vùng khai thác vị trí quảng cáo và kiểm duyệt hiển thị banner trên hệ thống website.',
        descriptionEn:
          'Operated ad inventory zoning tools and banner placement verification across partner websites.',
        achievements: [
          'Vận hành tool quản lý và phân vùng khai thác vị trí quảng cáo.',
          'Duyệt hiển thị banner và đảm bảo phân bổ vị trí chính xác.',
        ],
        techStack: ['Ad Management', 'Inventory Operations', 'Banner Review'],
        isHighlight: false,
        period: '2019 — 2020',
        icon: 'play',
        status: 'Tổng quan công việc',
        delivery: 'before-ai',
      },
      {
        id: 'ads',
        screenshots: projectScreenshots.ads,
        name: 'Tool Ads Demo Simulator',
        nameEn: 'Ads Demo Simulator Platform',
        role: 'Phát triển công cụ · Preview quảng cáo đa nền tảng',
        roleEn: 'Fullstack Developer · Cross-Device Ad Preview Sandbox',
        domain: 'AdTech & Responsive Sandbox',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech'],
        categoryTags: ['adtech', 'vue', 'webapp'],
        description:
          'Phát triển AdsDemo trên Laravel/Vue.js để cấu hình, xem trước và chia sẻ quảng cáo Sponsor, Video, HTML5, Collection ngay trong ngữ cảnh website PC/Mobile thực tế.',
        descriptionEn:
          'Built AdsDemo in Laravel/Vue.js to configure, preview, and share Sponsor, Video, HTML5, and Collection ad units directly inside live PC/Mobile publisher pages.',
        achievements: [
          'Xây dựng luồng nhập URL → chọn PC/Mobile → cấu hình vị trí, nội dung → preview → lưu demo trên cùng công cụ.',
          'Mô phỏng quảng cáo trong bố cục website thực tế, giúp kiểm tra vị trí hiển thị và trình bày phương án trực quan.',
          'Tích hợp lưu trữ và chia sẻ demo qua Dynamic QR/Shortlink cho đội kinh doanh.',
        ],
        techStack: ['Laravel', 'Vue.js', 'HTML5', 'MySQL', 'Responsive Sandbox'],
        isHighlight: true,
        period: '2020 — 2023',
        icon: 'play',
        status: 'Công cụ nội bộ',
        delivery: 'before-ai',
        sampleNotice: selectedSamplesNotice,
        links: [
          {
            id: 'adsdemo-admicro',
            label: 'adsdemo.admicro.vn (Cần TK nội bộ)',
            labelEn: 'adsdemo.admicro.vn (Internal VPN/Auth)',
            url: 'https://adsdemo.admicro.vn',
            kind: 'site',
            category: 'Công cụ nội bộ',
            description: 'Tool Ads Demo Simulator mô phỏng hiển thị quảng cáo trên site PC/Mobile (cần tài khoản nội bộ).',
          },
        ],
        details: [
          'URL website → chọn PC / mobile → cấu hình vị trí, nội dung → preview.',
          'Hỗ trợ các định dạng Sponsor, Video, HTML và Collection.',
        ],
      },
      {
        id: 'qr',
        screenshots: projectScreenshots.qr,
        name: 'Dynamic QR & Shortlink Platform',
        nameEn: 'Dynamic QR & Shortlink Platform',
        role: 'Data Model & Admin Platform Owner · Laravel / Vue.js / Redis',
        roleEn: 'Data Model & Admin Platform Owner · Laravel / Vue.js / Redis',
        domain: 'AdTech & High-Traffic Data Layer',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech'],
        categoryTags: ['adtech', 'perf', 'vue'],
        description:
          'Thiết kế mô hình dữ liệu MySQL, cấu trúc key-value trên Redis và nền tảng quản trị (Laravel + Vue.js + VirusTotal API) phía sau hệ thống Shortlink phục vụ hơn 2 triệu clicks (đỉnh ~240.000 clicks/ngày).',
        descriptionEn:
          'Designed the MySQL data model, Redis key-value contract, and Laravel + Vue.js admin platform (with VirusTotal scanning) behind a shortlink system serving 2M+ clicks (peak ~240K/day).',
        achievements: [
          'Thiết kế CSDL MySQL với lớp ánh xạ Shortlink tách mã QR đã in khỏi URL đích, cho phép đổi trang đích tức thì mà không tốn chi phí in lại ấn phẩm.',
          'Định nghĩa cấu trúc key-value trên Redis và đồng bộ mỗi khi tạo, sửa hoặc xóa trên web quản trị, giúp dịch vụ redirect (25–60 ms) không cần truy vấn MySQL.',
          'Tích hợp VirusTotal API quét mã độc và lừa đảo ở URL đích trước khi link được kích hoạt.',
          'Xây dựng web quản trị (Laravel + Vue.js) và biểu đồ phân tích lưu lượng, Top referrers, Top locations từ REST API của đội Log.',
        ],
        achievementsEn: [
          'Designed the MySQL schema with a shortlink indirection layer decoupling printed QR codes from target URLs for zero-reprint campaign updates.',
          'Defined the Redis key-value structure synced on every admin create, update, and delete so the 25–60 ms redirect service never queries MySQL.',
          'Integrated the VirusTotal API to scan destination URLs for phishing and malware before links go live.',
          'Built the Laravel + Vue.js admin web app and analytics charts (traffic over time, top referrers, top locations) consuming the logging team\'s REST API.',
        ],
        caseStudy: {
          challenge:
            'Đội marketing in mã QR lên bao bì và ấn phẩm. Đã in là URL đích bị "khóa cứng": đổi chiến dịch phải in lại, không biết ai thực sự quét mã, và một công cụ rút gọn link mở cũng dễ bị lợi dụng để giấu link lừa đảo hoặc mã độc sau một tên miền uy tín. Nhiệm vụ: phụ trách mô hình dữ liệu và nền tảng quản trị để tạo/sửa link & QR an toàn, giữ Redis luôn đồng bộ cho dịch vụ redirect tải cao do đội khác vận hành, và biến log truy cập thành báo cáo phân tích dùng được.',
          challengeEn:
            'Marketing teams printed QR codes on packaging and ads. Once printed, the target URL was locked: any campaign change meant reprinting, nobody could see who scanned, and an open shortener could be abused to hide phishing or malware behind a trusted domain. Task: own the data model and admin platform to let users manage links/QRs safely, keep Redis in sync for a high-traffic redirect service run by another team, and turn click logs into actionable analytics.',
          solution:
            'Thiết kế CSDL MySQL với lớp ánh xạ Shortlink, định nghĩa cấu trúc key-value Redis đồng bộ tức thì từ trang quản trị Laravel/Vue.js, tích hợp VirusTotal API chặn link độc hại trước khi kích hoạt và xây dựng dashboard phân tích từ REST API Log.',
          solutionEn:
            'Designed the MySQL indirection schema, defined and synced the Redis key-value contract from the Laravel/Vue.js admin app, integrated VirusTotal URL scanning, and built analytics dashboards from the logging REST API.',
          actions: [
            'Mô hình dữ liệu: thiết kế CSDL MySQL với lớp ánh xạ Shortlink, tách mã QR đã in khỏi URL đích.',
            'Thiết kế key Redis: định nghĩa cấu trúc key-value mà dịch vụ redirect đọc, và đồng bộ mỗi khi tạo, sửa hoặc xóa trên web quản trị để luồng redirect không cần truy vấn MySQL.',
            'Bảo mật: tích hợp VirusTotal API để quét mã độc và lừa đảo ở URL đích trước khi link được kích hoạt.',
            'Web quản trị (Laravel + Vue.js): quản lý link và QR, gắn tag, bộ lọc, import hàng loạt, đổi URL đích chỉ với một thao tác.',
            'Phân tích: lấy dữ liệu từ REST API của đội log, vẽ biểu đồ Vue.js về lưu lượng theo thời gian, top nguồn truy cập và top vị trí cho từng link.',
          ],
          actionsEn: [
            'Data model: designed the MySQL schema with a shortlink indirection layer that decouples the printed code from its destination URL.',
            'Redis key design: defined the key-value structure the redirect service reads, and synced it on every create, update, and delete from the admin app so redirects never hit MySQL.',
            'Security: integrated the VirusTotal API to scan destination URLs for malware and phishing before a link goes live.',
            'Admin web app (Laravel + Vue.js): link and QR management with tagging, filters, bulk import, and one-click destination editing.',
            'Analytics: consumed the logging team\'s REST API and built Vue.js charts covering traffic over time, top referrers, and top locations for each link.',
          ],
          impact:
            'Nền tảng đã phục vụ hơn 2 triệu clicks (đỉnh ~240.000/ngày). Dịch vụ redirect đọc trực tiếp từ cấu trúc key Redis mình thiết kế với thời gian phản hồi đo được 25–60 ms. Đổi trang đích tức thì không tốn chi phí in lại, và link độc hại bị chặn trước khi tới người dùng.',
          impactEn:
            'The platform has served 2M+ total clicks (peak ~240K/day). The redirect service reads directly from the Redis keys I designed, with end-to-end redirects measured at 25–60 ms. Campaigns switch destinations instantly at zero reprint cost, and malicious URLs are rejected before reaching users.',
          insight:
            'Ấn phẩm đã in thì không sửa được, nên mình thêm một tầng ánh xạ trung gian. Và vì đội khác vận hành luồng redirect tải cao, nhiệm vụ của mình là làm cho hợp đồng dữ liệu Redis thật đơn giản và đồng bộ tin cậy để dịch vụ redirect không bao giờ phải hỏi đến database.',
          insightEn:
            'Print is immutable, so I added one level of indirection. And because another team owned the hot path, my job was to make the Redis contract so simple and so reliably in sync that their redirect never needed to ask the database anything.',
          scopeNote: {
            mine: 'Thiết kế CSDL MySQL, thiết kế cấu trúc key-value trên Redis, xây dựng web quản trị (Laravel + Vue.js), quét mã độc qua VirusTotal API, và dashboard phân tích dựa trên API log.',
            others: 'Dịch vụ redirect cho người dùng cuối (shortlink → Redis → URL đích, 25–60 ms) và pipeline ghi log/thống kê lượt truy cập.',
            mineEn: 'MySQL schema design, Redis key-value structure design & sync, Laravel + Vue.js admin web app, VirusTotal malware scanning, and analytics dashboard.',
            othersEn: 'End-user redirect service (shortlink → Redis → destination URL, 25–60 ms) and click logging ingestion pipeline.',
          },
          metrics: [
            { label: 'Tổng lượt click', labelEn: 'Total Clicks Served', value: '2M+ clicks', valueEn: '2M+ clicks' },
            { label: 'Lưu lượng đỉnh', labelEn: 'Peak Traffic', value: '~240K / ngày', valueEn: '~240K / day' },
            { label: 'Độ trễ Redirect', labelEn: 'Redirect Latency', value: '25–60 ms', valueEn: '25–60 ms' },
            { label: 'Bảo mật liên kết', labelEn: 'Link Security', value: 'VirusTotal API', valueEn: 'VirusTotal API' },
          ],
        },
        metrics: [
          { label: 'Tổng lượt click', value: '2M+ clicks' },
          { label: 'Lưu lượng đỉnh', value: '~240K clicks/ngày' },
          { label: 'Độ trễ Redirect', value: '25–60 ms' },
        ],
        techStack: ['Laravel', 'MySQL', 'Redis (key design)', 'Vue.js', 'VirusTotal API'],
        demoUrl: 'https://short.bizfly.vn/',
        sampleNotice: selectedSamplesNotice,
        links: [
          {
            id: 'short-bizfly',
            label: 'short.bizfly.vn',
            labelEn: 'short.bizfly.vn (Live Platform)',
            url: 'https://short.bizfly.vn/',
            kind: 'site',
            category: 'Hệ thống Live',
            description: 'Nền tảng quản trị Dynamic QR và rút gọn liên kết, đồng bộ key Redis và bảo vệ bằng VirusTotal.',
          },
        ],
        isHighlight: false,
        period: '2020 — 2021',
        icon: 'external',
        status: 'Có link live',
        delivery: 'before-ai',
      },
      {
        id: 'ad-maintenance',
        name: 'Bảo trì AdServing & TagManager',
        nameEn: 'AdServing & TagManager Security Maintenance',
        role: 'Bảo trì hệ thống · Vá lỗi bảo mật',
        roleEn: 'System Maintenance · Security Patching',
        domain: 'Ad Serving & Security Operations',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech'],
        categoryTags: ['adtech', 'perf'],
        description:
          'Bảo trì định kỳ, tối ưu truy vấn và xử lý các lỗi bảo mật (Security Bug Fixes) cho hệ thống AdServing và TagManager.',
        descriptionEn:
          'Performed scheduled maintenance, query optimization, and security patching for AdServing and TagManager systems.',
        achievements: [
          'Bảo trì định kỳ và khắc phục các lỗ hổng bảo mật cho hệ thống phân phối quảng cáo AdServing.',
          'Đảm bảo độ tin cậy và an toàn mã nguồn cho TagManager trong quá trình phân phối mã script.',
        ],
        techStack: ['Security Patching', 'AdServing', 'TagManager', 'JavaScript'],
        isHighlight: false,
        icon: 'refresh',
        status: 'Tổng quan công việc',
        delivery: 'before-ai',
      },
      {
        id: 'maps',
        screenshots: projectScreenshots.maps,
        name: 'Bản đồ Tương tác Báo Giao Thông (22 Dự án Cao tốc & 12 Tuyến hầm)',
        nameEn: 'Interactive Editorial Maps — Giao Thong News (22 Expressways & 12 Tunnels)',
        role: 'Frontend · Bản đồ SVG & Chuyển động tương tác',
        roleEn: 'Frontend Engineer · Interactive SVG Maps & Motion',
        domain: 'Interactive Map & Editorial Visualization',
        filterCategory: 'webgis',
        category: 'webgis',
        categories: ['webgis', 'motion'],
        categoryTags: ['webgis', 'motion', 'perf'],
        description:
          'Xây dựng 02 chuyên đề bản đồ tương tác Báo Giao Thông: 22 dự án cao tốc Bắc – Nam và 12 tuyến hầm; kết nối bản đồ tổng quan với dữ liệu chi tiết trên PC/Mobile.',
        descriptionEn:
          'Built two interactive map features for Giao Thong News covering 22 North–South expressway projects and 12 road tunnels across PC and Mobile.',
        achievements: [
          'Dùng MapSVG.js liên kết lựa chọn tuyến/điểm trên bản đồ với thông tin chiều dài, quy mô, vốn đầu tư và tiến độ.',
          'Thiết kế luồng từ bản đồ tổng quan đến chi tiết 22 dự án cao tốc và 12 tuyến hầm, hỗ trợ điều hướng trực tiếp theo từng dự án.',
          'Kết hợp TweenMax, Draggable và giao diện riêng PC/Mobile để tối ưu thao tác kéo, chạm và chuyển nội dung.',
        ],
        techStack: ['MapSVG.js', 'TweenMax', 'Draggable', 'SVG', 'jQuery', 'Dual Layout'],
        demoUrl: 'interactives/cao-toc-bac-nam/index.html',
        isHighlight: true,
        icon: 'map',
        status: 'Có demo',
        delivery: 'before-ai',
        sampleNotice: selectedSamplesNotice,
        links: [
          {
            id: 'cao-toc-bac-nam',
            label: 'Cao tốc Bắc – Nam',
            labelEn: 'North–South Expressway Map',
            url: 'interactives/cao-toc-bac-nam/index.html',
            kind: 'demo',
            category: 'Bản đồ tương tác',
            description: 'Khám phá các tuyến cao tốc, chọn từng đoạn đường trên bản đồ và xem thông tin chi tiết.',
            techStack: ['JavaScript', 'jQuery', 'MapSVG', 'SVG'],
            desktopUrl: 'interactives/cao-toc-bac-nam/pc/index.html',
            mobileUrl: 'interactives/cao-toc-bac-nam/mb/index.html',
          },
          {
            id: 'ham-giao-thong',
            label: 'Hầm đường bộ trên cao tốc Bắc – Nam',
            labelEn: 'Expressway Road Tunnels Map',
            url: 'interactives/ham-giao-thong/index.html',
            kind: 'demo',
            category: 'Bản đồ tương tác',
            description: 'Khám phá vị trí các hầm xuyên núi và xem thông tin từng hầm qua bản đồ tương tác.',
            techStack: ['JavaScript', 'jQuery', 'MapSVG', 'Swiper'],
            desktopUrl: 'interactives/ham-giao-thong/PC/index.html',
            mobileUrl: 'interactives/ham-giao-thong/MB/index.html',
          },
        ],
      },
      {
        id: 'experiments',
        screenshots: projectScreenshots.experiments,
        name: 'Content Recommendation & A/B Testing Platform',
        nameEn: 'Content Recommendation & A/B Testing Platform',
        role: 'Lead Developer (Built from Scratch) · Laravel 8 / Vue 3 / Inertia.js',
        roleEn: 'Lead Developer (Built from Scratch) · Laravel 8 / Vue 3 / Inertia.js',
        domain: 'Product Tool & Experimentation Platform',
        filterCategory: 'webapp',
        category: 'webapp',
        categories: ['webapp'],
        categoryTags: ['webapp', 'vue', 'perf'],
        description:
          'Xây dựng từ đầu nền tảng tự phục vụ giúp đội sản phẩm & biên tập tạo, xuất bản CDN và chạy kiểm định thống kê A/B (FDR 0.05) cho 309 box gợi ý nội dung trên 40 site & app.',
        descriptionEn:
          'Built from scratch a self-service platform where product and editorial teams build, publish to CDN, and A/B-test (FDR 0.05) 309 recommendation boxes across 40 news sites and apps.',
        achievements: [
          'Xây dựng bộ sinh code widget kết hợp macro engine (%%URL%%, %%divId%%, %%limitItem%%…) biên dịch JS riêng cho từng site (kèm bản beta) và đẩy lên CDN qua xác thực TOTP.',
          'Phát triển trọn vòng đời A/B test: tạo, chạy, fork, khôi phục thử nghiệm và so sánh các phase bằng kiểm định thống kê (FDR 0.05), kèm KPI Monitor và Algorithm Monitor.',
          'Xây dựng dashboard phân tích (lượt click, tỉ lệ thoát, view/click, thời gian đọc) bằng Vue 3 + ApexCharts và trang dashboard công khai chỉ xem cho Ban biên tập.',
          'Bọc mọi lệnh gọi API upstream bằng timeout, exponential-backoff retry (0.5s → 1s → 2s cho lỗi 5xx/mạng) và cảnh báo Telegram chống spam bằng cache fingerprint 5 phút.',
        ],
        achievementsEn: [
          'Built a template + macro engine (%%URL%%, %%divId%%, %%limitItem%%…) compiling site-specific JS bundles (plus beta builds) uploaded to CDN via TOTP authentication.',
          'Implemented full A/B experiment lifecycle: create, run, fork, restore, and compare phases with statistical significance testing (FDR 0.05), plus KPI & Algorithm Monitors.',
          'Built clicks, exit-rate, view/click, and time-on-read dashboards in Vue 3 + ApexCharts, including a public read-only view for editorial teams.',
          'Wrapped upstream BigData API calls with timeouts, exponential-backoff retry (0.5s → 1s → 2s on 5xx/network errors), and Telegram alerts de-duplicated with a 5-minute cache fingerprint.',
        ],
        caseStudy: {
          challenge:
            'Hệ thống gợi ý nội dung (do đội BigData phụ trách thuật toán) cung cấp box "bài viết liên quan" cho nhiều site báo đối tác. Trước đây, muốn tạo hoặc sửa một box phải sửa tay JavaScript cho từng site, còn kết quả thử nghiệm A/B chỉ có ở dạng dữ liệu API thô. Nhiệm vụ: xây dựng lớp vận hành phía trên engine gồm quản lý đa site có phân quyền RBAC, công cụ dựng widget xuất thẳng code production, và dashboard biến dữ liệu thử nghiệm thành quyết định.',
          challengeEn:
            'The recommendation engine (owned by the BigData team) served "related articles" boxes to partner news sites. Creating or changing a box meant hand-editing JavaScript per site, and experiment results were only available as raw API data. Task: build the operating layer on top of the engine—multi-site RBAC management, a widget builder publishing production code, and dashboards turning raw experiment data into decisions.',
          solution:
            'Xây dựng bộ sinh code widget bằng Macro Engine đẩy thẳng lên CDN qua TOTP, vòng đời kiểm định A/B thống kê (FDR 0.05), dashboard Vue 3 + ApexCharts và tầng tích hợp API tự phục hồi (exponential-backoff retry + Telegram alert chống spam).',
          solutionEn:
            'Built a Macro Engine widget compiler with TOTP CDN publishing, statistical A/B lifecycle (FDR 0.05), Vue 3 + ApexCharts dashboards, and a self-healing upstream integration layer (exponential-backoff retry + de-duplicated Telegram alerts).',
          actions: [
            'Bộ sinh code widget: template kết hợp macro engine (%%URL%%, %%divId%%, %%limitItem%%…) biên dịch ra file JS riêng cho từng site, có thêm bản beta để thử nghiệm, rồi đẩy lên CDN qua kênh upload xác thực bằng TOTP.',
            'Vòng đời A/B test: tạo, chạy, fork và khôi phục thử nghiệm, kiểm tra phase, và so sánh các phase bằng kiểm định thống kê (FDR 0.05), kèm KPI Monitor và Algorithm Monitor.',
            'Giao diện phân tích: dashboard lượt click, tỉ lệ thoát, view/click, thời gian đọc và phiên tương tác bằng Vue 3 + ApexCharts; có thêm dashboard công khai chỉ xem cho Ban biên tập.',
            'Tích hợp bền vững: mọi lệnh gọi API upstream đều có timeout, retry với exponential backoff (0.5 s → 1 s → 2 s, chỉ retry lỗi 5xx và lỗi mạng), và cảnh báo Telegram chống spam bằng fingerprint cache 5 phút.',
            'Kiến trúc: repository pattern, phân quyền RBAC theo vai trò và theo site, cùng script chuyển dữ liệu cũ v1 (khách hàng, template, kịch bản, widget) sang schema mới.',
          ],
          actionsEn: [
            'Widget code generator: a template + macro engine (%%URL%%, %%divId%%, %%limitItem%%…) compiles a site-specific JS bundle, with a separate beta build for testing, and publishes it to the CDN through a TOTP-authenticated upload.',
            'A/B experiment lifecycle: create, run, fork, and restore experiments, run phase checks, and compare phases with significance testing (FDR 0.05), plus KPI and algorithm monitors.',
            'Analytics UI: clicks, exit rate, view/click, time-on-read, and session dashboards in Vue 3 + ApexCharts, including a public read-only dashboard for editors.',
            'Resilient integration: wrapped every upstream call with timeouts, exponential-backoff retry (0.5 s → 1 s → 2 s, retrying only 5xx and network errors), and Telegram alerts de-duplicated with a 5-minute cache fingerprint.',
            'Architecture: repository pattern, role- and site-level RBAC, and a migration script that moved legacy v1 data (customers, templates, scenarios, widgets) into the new schema.',
          ],
          impact:
            'Tạo widget từ việc của lập trình viên trở thành thao tác tự phục vụ trên form. Nền tảng đã vận hành production hơn 3 năm (từ 07/2023), hiện phục vụ 40 site (PC, Mobile & App) với tổng cộng 309 box gợi ý; sự cố API upstream được báo lên Telegram trước khi người dùng phát hiện.',
          impactEn:
            'Shipping a widget went from a developer task to a self-service form. The platform has run in production for 3+ years (since 07/2023), now powering 40 sites (PC, Mobile & Apps) and 309 active widget boxes, with upstream API outages reported on Telegram before users notice.',
          insight:
            'Mình không sở hữu thuật toán gợi ý, nhưng làm chủ toàn bộ những gì biến thuật toán đó thành sản phẩm dùng được: biến một thay đổi trong code thành một biểu mẫu tự phục vụ, biến những con số thô thành câu trả lời Đạt/Không đạt (FDR 0.05), và biến một API upstream dễ chập chờn thành hệ thống tự hồi phục và biết tự báo động khi cần.',
          insightEn:
            'I didn\'t own the algorithm. I owned everything that made it usable: turning a code change into a form, raw numbers into a pass/fail answer, and a flaky upstream into a system that heals itself and tells you when it can\'t.',
          metrics: [
            { label: 'Quy mô triển khai', labelEn: 'Active Sites & Apps', value: '40 Sites', valueEn: '40 Sites' },
            { label: 'Số lượng Box Widget', labelEn: 'Active Widget Boxes', value: '309 Boxes', valueEn: '309 Boxes' },
            { label: 'Kiểm định thống kê', labelEn: 'Significance Testing', value: 'FDR = 0.05', valueEn: 'FDR = 0.05' },
            { label: 'Vận hành & Tự hồi phục', labelEn: 'Resilience & Uptime', value: '3+ Năm · Retry 3x', valueEn: '3+ Yrs · Retry 3x' },
          ],
        },
        techStack: ['Laravel 8', 'Vue 3', 'Inertia.js', 'ApexCharts', 'REST API (BigData)', 'TOTP CDN'],
        isHighlight: true,
        period: '2024',
        icon: 'layers',
        status: 'Tổng quan giải pháp',
        delivery: 'before-ai',
        details: [
          'Cấu hình template / widget → Macro Engine sinh JS bundle → đẩy CDN qua TOTP.',
          'Nhận dữ liệu BigData qua API (có retry & Telegram alert) → kiểm định FDR 0.05 trên giao diện.',
        ],
      },
      {
        id: 'minigames',
        name: 'Minigame Vòng quay may mắn Canvas',
        nameEn: 'HTML5 Canvas Lucky Wheel Minigame',
        role: 'Frontend Developer · Minigame tương tác',
        roleEn: 'Frontend Developer · Interactive Canvas Minigame',
        domain: 'Gamification & Canvas Animation',
        filterCategory: 'motion',
        category: 'motion',
        categories: ['motion'],
        categoryTags: ['motion', 'design-system'],
        description:
          'Phát triển minigame vòng quay may mắn tương tác trên Canvas cho các hoạt động và chương trình nội bộ công ty.',
        descriptionEn:
          'Built an interactive HTML5 Canvas lucky-wheel minigame for internal company events and campaigns.',
        achievements: [
          'Xây dựng minigame vòng quay may mắn nội bộ bằng Canvas.',
        ],
        techStack: ['Canvas API', 'JavaScript'],
        isHighlight: false,
        icon: 'sparkle',
        status: 'Dự án nội bộ',
        delivery: 'before-ai',
      },
    ],
  },
  {
    id: 'work-ongoing',
    company: 'VCCorp',
    companyId: 'current-employer',
    role: profile.title,
    period: 'Xuyên suốt quá trình làm việc',
    location: profile.city,
    summary:
      'Xây dựng giao diện và hiệu ứng cuộn tương tác cho chuỗi bài Emagazine chuyên đề (Bất động sản, Thiết bị công nghệ) trên báo CafeF và các site báo nội bộ.',
    kind: 'ongoing',
    projects: [
      {
        id: 'emagazines',
        name: 'Emagazine Chuyên đề Báo CafeF',
        nameEn: 'Interactive Scrollytelling Emagazines — CafeF',
        role: 'Frontend Developer · Nội dung đa phương tiện & Scrollytelling',
        roleEn: 'Frontend Developer · Multimedia & Scrollytelling',
        domain: 'Media & Scrollytelling',
        filterCategory: 'motion',
        category: 'motion',
        categories: ['motion'],
        categoryTags: ['motion', 'perf', 'design-system'],
        description:
          'Xây dựng giao diện và hiệu ứng cuộn tương tác (scrollytelling) cho chuỗi bài Emagazine chuyên đề về Bất động sản và Thiết bị công nghệ đăng trên báo CafeF và các site báo nội bộ (từ 2022 – nay).',
        descriptionEn:
          'Developed responsive layouts and scrollytelling animations for special-issue Emagazines covering Real Estate and Consumer Tech on CafeF (2022 – Present).',
        achievements: [
          'Xây dựng giao diện bài báo tương tác chuẩn responsive và tối ưu hiệu ứng cuộn trang Scrollytelling.',
          'Kết hợp nhịp nhàng giữa hình ảnh chất lượng cao, đồ hoạ chuyển động và nội dung báo chí chuyên sâu.',
        ],
        techStack: ['HTML5 / CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger'],
        isHighlight: true,
        icon: 'code',
        status: 'Site báo nội bộ',
        delivery: 'ongoing',
      },
    ],
  },
  {
    id: 'research-transfer',
    company: 'Tổ phát triển và chuyển giao công nghệ — Viện Đại học Mở Hà Nội',
    companyId: 'hanoi-open-university',
    role: 'Lập trình viên PHP (R&D & Chuyển giao công nghệ)',
    period: '09/2018 — 05/2019',
    location: 'Hà Nội',
    summary:
      'Nghiên cứu và phát triển các hệ thống phần mềm quản lý tuyển sinh và đào tạo phi chính quy.',
    kind: 'research',
    projects: [
      {
        id: 'enrollment-management',
        name: 'Hệ thống Quản lý Tuyển sinh',
        nameEn: 'University Admission & Enrollment System',
        role: 'Lập trình viên PHP · Module tuyển sinh',
        roleEn: 'PHP Developer · Admission Modules',
        domain: 'EdTech & ERP Enterprise',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech', 'webapp'],
        categoryTags: ['adtech', 'webapp', 'perf'],
        description:
          'Phát triển các module đăng ký xét tuyển, tiếp nhận hồ sơ, thẩm định văn bằng, thanh toán học phí và báo cáo tuyển sinh.',
        descriptionEn:
          'Developed online application, dossier intake, diploma verification, tuition payment, and admission reporting modules.',
        achievements: [
          'Số hóa quy trình đăng ký xét tuyển và tiếp nhận hồ sơ học viên.',
          'Xây dựng các module thẩm định văn bằng, hỗ trợ thanh toán học phí và xuất báo cáo thống kê tuyển sinh.',
        ],
        techStack: ['PHP', 'CodeIgniter', 'MySQL', 'Form Engine'],
        isHighlight: true,
        icon: 'cap',
      },
      {
        id: 'non-formal-training',
        name: 'Quản lý Đào tạo Phi chính quy',
        nameEn: 'Non-Formal Training Management System',
        role: 'Lập trình viên PHP · Nghiên cứu & Phát triển',
        roleEn: 'PHP Developer · R&D',
        domain: 'EdTech SaaS',
        filterCategory: 'adtech',
        category: 'adtech',
        categories: ['adtech', 'webapp'],
        categoryTags: ['adtech', 'webapp', 'perf'],
        description:
          'Nghiên cứu và xây dựng hệ thống quản lý học viên và kế hoạch đào tạo phi chính quy bằng PHP/Laravel.',
        descriptionEn:
          'Built a student lifecycle and curriculum management system for non-formal education programs using PHP/Laravel.',
        achievements: [
          'Số hóa quản lý danh sách học viên, lớp học và tiến độ đào tạo các chương trình phi chính quy.',
        ],
        techStack: ['PHP', 'Laravel'],
        isHighlight: true,
        icon: 'cap',
      },
    ],
  },
  {
    id: 'enrollment-support',
    company: 'Viện Đại học Mở Hà Nội',
    companyId: 'hanoi-open-university',
    role: 'Hỗ trợ nghiệp vụ tuyển sinh',
    period: '07/2016 — 09/2018',
    location: 'Hà Nội',
    summary: 'Hỗ trợ nghiệp vụ tuyển sinh, chuẩn hóa dữ liệu và xử lý thủ tục xét tuyển, nhập học cho sinh viên.',
    kind: 'support',
    projects: [],
  },
]
