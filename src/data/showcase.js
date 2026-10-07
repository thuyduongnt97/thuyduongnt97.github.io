// Landing page đã có URL do bạn cung cấp.
export const landingPages = [
  {
    id: 'omo-gieo-trieu-mam-xanh',
    title: 'OMO — Gieo triệu mầm xanh',
    url: 'https://omogieotrieumamxanh.vn/',
    description: 'Landing page OMO — Gieo triệu mầm xanh.',
    category: 'Landing page',
  },
  {
    id: 'athena',
    title: 'Athena',
    url: 'https://athenacm.dev.vcadm.vn/',
    description: 'Landing page Athena.',
    category: 'Landing page',
  },
]

// Chỉ đăng ký demo đã có bản HTML/CSS/JS hoàn chỉnh trong public/interactives.
// entry là đường dẫn tương đối, ví dụ: 'my-demo/index.html'.
// Xem docs/interactives.md để thêm demo mới.
export const interactiveDemos = [
  {
    id: 'cao-toc-bac-nam',
    title: 'Cao tốc Bắc – Nam',
    description: 'Khám phá các tuyến cao tốc, chọn từng đoạn đường trên bản đồ và xem thông tin chi tiết.',
    category: 'Bản đồ tương tác',
    tech: ['JavaScript', 'jQuery', 'MapSVG', 'SVG'],
    entry: 'cao-toc-bac-nam/index.html',
    desktopEntry: 'cao-toc-bac-nam/pc/index.html',
    mobileEntry: 'cao-toc-bac-nam/mb/index.html',
  },
  {
    id: 'ham-giao-thong',
    title: 'Hầm đường bộ trên cao tốc Bắc – Nam',
    description: 'Khám phá vị trí các hầm xuyên núi và xem thông tin từng hầm qua bản đồ tương tác.',
    category: 'Bản đồ tương tác',
    tech: ['JavaScript', 'jQuery', 'MapSVG', 'Swiper'],
    entry: 'ham-giao-thong/index.html',
    desktopEntry: 'ham-giao-thong/PC/index.html',
    mobileEntry: 'ham-giao-thong/MB/index.html',
  },
]
