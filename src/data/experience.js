import { profile } from './profile'

export const job = {
  stageLabel: 'Phát triển sản phẩm & hệ thống nội bộ',
  role: profile.title,
  scope: profile.roleSummary,
  period: `${profile.since} — Hiện tại`,
  location: profile.city,
}

// Dòng thời gian dùng chung nguồn dữ liệu với nhãn dự án.
export { careerMilestones as experience } from './career'

// Thông tin đơn vị và thời gian giữ đúng theo hồ sơ gốc.
export const universityExperience = {
  stageLabel: 'Nghiên cứu & chuyển giao công nghệ',
  organization: 'Tổ phát triển và chuyển giao công nghệ — Viện Đại học Mở Hà Nội',
  role: 'Lập trình viên PHP (Thực tập & Nghiên cứu chuyển giao)',
  period: '09/2018 — 05/2019',
  location: 'Hà Nội',
  items: [
    {
      title: 'Quản lý Tuyển sinh',
      description: 'Phát triển các module xét tuyển, tiếp nhận hồ sơ, thẩm định văn bằng, hỗ trợ thanh toán học phí và báo cáo với CodeIgniter.',
    },
    {
      title: 'Quản lý đào tạo phi chính quy',
      description: 'Nghiên cứu và xây dựng hệ thống PHP/Laravel, số hóa quản lý học viên và chương trình học.',
    },
  ],
  earlierSupport: {
    stageLabel: 'Giai đoạn nền tảng',
    title: 'Hỗ trợ nghiệp vụ tuyển sinh',
    start: { date: '2016-07', label: '07/2016' },
    end: { date: '2018-09', label: '09/2018' },
    description: 'Hỗ trợ tuyển sinh, nhập liệu và xử lý thủ tục xét tuyển, nhập học cho sinh viên.',
  },
}
