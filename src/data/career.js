import { interactiveDemos, landingPages } from './showcase'

// Thứ tự công việc và các mốc được chủ hồ sơ xác nhận.
// Chỉ gán năm riêng cho những công việc đã có thời gian cụ thể.
export const agentMilestone = {
  period: '08/2025',
  date: '2025-08',
  label: 'Trở lại công việc & bắt đầu sử dụng agent',
}

export const deliveryPhases = [
  {
    id: 'before-ai',
    title: 'Trước khi sử dụng agent',
    period: '2019 — Trước 08/2025',
    description: 'Những dự án nổi bật có phiên bản gốc được xây dựng trước khi mình sử dụng AI/agent.',
  },
  {
    id: 'with-agents',
    title: 'Từ khi sử dụng agent',
    period: 'Từ 08/2025',
    description: 'Tiếp tục xây dựng, tiếp nhận và vận hành sản phẩm khi bắt đầu sử dụng agent.',
  },
]

export const careerMilestones = [
  {
    id: 'ad-operations',
    phase: 'before-ai',
    period: '2019 — 2020',
    title: 'Vận hành công cụ quảng cáo',
    description: 'Hỗ trợ vận hành tool quản lý, phân vùng quảng cáo và duyệt hiển thị banner.',
    projects: [],
    products: [],
  },
  {
    id: 'ads-shortlink',
    phase: 'before-ai',
    period: '2020 — 2023',
    title: 'Xây dựng Shortlink & Ads Demo',
    description: 'Tham gia xây dựng tool preview quảng cáo trên website, lưu và chia sẻ mẫu qua shortlink/QR để đội kinh doanh, vận hành trình bày với khách hàng.',
    projects: [
      { id: 'ads', label: 'Ads Demo Simulator' },
      { id: 'qr', label: 'Shortlink & QR' },
    ],
    products: [],
  },
  {
    id: 'ad-maintenance',
    phase: 'before-ai',
    title: 'Bảo trì AdServing & TagManager',
    description: 'Hỗ trợ maintain và sửa các lỗi bảo mật cho công cụ phân phối quảng cáo và quản lý tag.',
    projects: [],
    products: [],
  },
  {
    id: 'traffic-interactives',
    phase: 'before-ai',
    title: 'Interactive cho Báo Giao thông',
    description: 'Triển khai các bài tương tác, gồm chuyên đề Cao tốc Bắc – Nam và hầm đường bộ, với giao diện riêng cho PC/mobile.',
    projects: [{ id: 'maps', label: 'Bản đồ tương tác' }],
    products: interactiveDemos,
  },
  {
    id: 'recommendation-experiments',
    phase: 'before-ai',
    period: '2024',
    title: 'Recommendation & A/B Testing',
    description: 'Xây dựng frontend quản lý kịch bản, cấu hình thuật toán, template/widget và báo cáo experiment từ dữ liệu BigData trả về.',
    projects: [{ id: 'experiments', label: 'Quản trị template & experiment' }],
    products: [],
  },
  {
    id: 'internal-minigames',
    phase: 'before-ai',
    title: 'Minigame nội bộ',
    description: 'Xây dựng một số minigame quay số may mắn, trúng thưởng cho các chương trình trong công ty.',
    projects: [{ id: 'minigames', label: 'Minigame quay số' }],
    products: [],
  },
  {
    id: 'microsite-handover',
    phase: 'with-agents',
    period: '08/2025',
    title: 'Tiếp nhận & bảo trì microsite',
    description: 'Nhận bàn giao các microsite, tiếp tục maintain và xử lý các yêu cầu phát sinh.',
    projects: [{ id: 'rebuild', label: 'Bảo trì microsite' }],
    products: [],
  },
  {
    id: 'microsite-delivery',
    phase: 'with-agents',
    title: 'Báo giá & triển khai microsite',
    description: 'Lên báo giá và thực thi microsite theo yêu cầu; các sản phẩm tiêu biểu gồm Athena và OMO.',
    projects: [{ id: 'landing-pages', label: 'Microsite tiêu biểu' }],
    products: landingPages,
  },
  {
    id: 'government-map',
    phase: 'with-agents',
    title: 'Module bản đồ cổng thông tin',
    description: 'Tích hợp module bản đồ cho cổng thông tin nhà nước.',
    projects: [{ id: 'government-map', label: 'Tích hợp bản đồ' }],
    products: [],
  },
  {
    id: 'recognition-event',
    phase: 'with-agents',
    title: 'Check-in & vinh danh nhân viên',
    description: 'Kết nối camera với API nhận diện nhân viên qua khuôn mặt, rồi hiển thị thông tin vinh danh cho nhân viên khối kinh doanh.',
    projects: [{ id: 'recognition-event', label: 'Camera & API nhận diện' }],
    products: [],
  },
  {
    id: 'feature-campaigns',
    phase: 'with-agents',
    title: 'Core box feature & campaign',
    description: 'Viết core cho các box feature và triển khai campaign feature.',
    projects: [{ id: 'feature-core', label: 'Core & campaign feature' }],
    products: [],
  },
  {
    id: 'adsponsor-maintenance',
    phase: 'with-agents',
    title: 'Bảo trì Adsponsor',
    description: 'Tham gia bảo trì công cụ Adsponsor.',
    projects: [{ id: 'ad-sponsor', label: 'Bảo trì công cụ Adsponsor' }],
    products: [],
  },
].map((milestone, index) => ({ ...milestone, order: index + 1 }))

// Công việc thực hiện xuyên suốt, không gán vào một mốc hoặc giai đoạn AI riêng.
export const careerOngoingWork = [
  {
    id: 'emagazines',
    title: 'Emagazine cho các site báo nội bộ',
    description: 'Thực hiện các bài Emagazine xuyên suốt quá trình làm việc, kết hợp giao diện bài viết với nội dung đa phương tiện.',
    projects: [{ id: 'emagazines', label: 'Emagazine & nội dung tương tác' }],
    products: [],
  },
]

// Cùng nguồn dữ liệu cho nhãn dự án và dòng thời gian, tránh lệch mốc.
export function getProjectDelivery(projectId) {
  if (careerOngoingWork.some((item) => item.projects.some((project) => project.id === projectId))) {
    return { phase: 'ongoing', label: 'Công việc xuyên suốt' }
  }
  const milestone = careerMilestones.find((item) => item.projects.some((project) => project.id === projectId))
  if (!milestone) return undefined
  return {
    phase: milestone.phase,
    label: milestone.phase === 'before-ai' ? 'Bản gốc trước AI/agent' : 'Giai đoạn dùng agent',
    period: milestone.period,
  }
}
