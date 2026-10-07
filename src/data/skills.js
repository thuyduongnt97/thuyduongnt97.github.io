// Các nhóm năng lực và công nghệ được đối chiếu với bản nội dung hồ sơ trong docs/.
export const skills = [
  {
    icon: 'code',
    featured: true,
    title: 'Frontend & Frameworks',
    sub: 'Giao diện hiện đại, responsive',
    description: 'Xây dựng giao diện với Vue và Svelte, quản lý state và tối ưu trải nghiệm trên nhiều kích thước màn hình.',
    chips: ['Vue 2 / Vue 3', 'Composition API', 'Svelte', 'JavaScript ES6+', 'TypeScript', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    icon: 'zap',
    featured: true,
    title: 'UI & Interactive Media',
    sub: 'Quảng cáo, chuyển động và kể chuyện',
    description: 'Thiết kế core template quảng cáo và lập trình Emagazine, kết hợp chuyển động với nội dung đa phương tiện.',
    chips: ['Core Ads Architecture', 'GSAP', 'SVG Manipulation', 'CSS Animation', 'Emagazine', 'Interactive Storytelling'],
  },
  {
    icon: 'map',
    featured: true,
    title: 'Bản đồ & Trực quan dữ liệu',
    sub: 'Thông tin địa lý, nhiều lớp dữ liệu',
    description: 'Tích hợp bản đồ số, xử lý GeoJSON, layers và markers cho các cổng thông tin chuyên đề.',
    chips: ['Leaflet', 'OpenLayers', 'GeoJSON', 'GIS Data Handling', 'Multi-layers', 'Real-time Markers'],
  },
  {
    icon: 'server',
    title: 'Backend & APIs',
    sub: 'Dịch vụ ổn định, dễ mở rộng',
    description: 'Phát triển hệ thống nghiệp vụ và RESTful API với Laravel; có nền tảng CodeIgniter từ các dự án tại trường đại học.',
    chips: ['PHP', 'Laravel', 'Eloquent ORM', 'Queues', 'Middleware', 'Service Container', 'RESTful API', 'CodeIgniter · nền tảng'],
  },
  {
    icon: 'db',
    title: 'Database & Caching',
    sub: 'Thiết kế dữ liệu, tối ưu truy vấn',
    description: 'Thiết kế cơ sở dữ liệu MySQL, tối ưu chỉ mục và truy vấn, ứng dụng Redis cho bộ nhớ đệm.',
    chips: ['MySQL', 'Schema Design', 'Indexing', 'Query Optimization', 'Redis Cache'],
  },
  {
    icon: 'layers',
    title: 'Architecture & DevOps',
    sub: 'Tái cấu trúc, triển khai và bảo trì',
    description: 'Rebuild và refactor hệ thống cũ, chuẩn hóa quy trình triển khai; có kiến thức cơ bản về Docker và phân tích dữ liệu với R.',
    chips: ['Legacy Refactoring', 'System Rebuilding', 'Git', 'Vite', 'Rollup', 'Webpack', 'Linux Kiosk Deployment', 'Docker · cơ bản', 'R / phân tích dữ liệu · cơ bản'],
  },
]
