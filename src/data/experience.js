import { profile } from './profile'

export const job = {
  stageLabel: 'Phát triển sản phẩm & hệ thống nội bộ',
  role: profile.title,
  scope: profile.roleSummary,
  period: `${profile.since} – Hiện tại (${profile.experienceYears} năm)`,
  location: profile.city,
}

// `desc` cho phép <strong>.
export const experience = [
  {
    title: 'Core Template quảng cáo & Ads Demo Simulator',
    tag: 'Svelte / Rich Media',
    desc: 'Thiết kế <strong>Core Template bằng Svelte</strong> cho các định dạng Ads Display/Rich Media, ưu tiên bundle gọn và khả năng hiển thị trên các trang báo. Lên kế hoạch, phát triển và vận hành <strong>Ads Demo Simulator</strong> với Laravel và Svelte/Vue, cung cấp môi trường xem trước đa thiết bị cho đội ngũ Sản phẩm &amp; Kinh doanh.',
    tech: ['Svelte', 'Laravel', 'Vue.js', 'Rich Media'],
  },
  {
    title: 'Tái cấu trúc & vận hành hệ thống nội bộ',
    tag: 'Rebuild / Refactor',
    desc: 'Chủ trì <strong>rebuild/refactor</strong> các microsite, công cụ nghiệp vụ và landing page từ mã nguồn cũ sang kiến trúc hiện đại, phân tách component để thuận tiện mở rộng và bảo trì. Chuẩn hóa triển khai, rà soát bảo mật, xử lý tương thích trình duyệt và tối ưu thời gian phản hồi máy chủ.',
    tech: ['Legacy Refactoring', 'Component Architecture', 'Security', 'Deployment'],
  },
  {
    title: 'Dynamic Shortlink & quản lý QR Code',
    tag: 'End-to-End Ownership',
    desc: 'Làm chủ toàn bộ chu trình từ thiết kế cơ sở dữ liệu đến hoàn thiện hệ thống rút gọn liên kết bằng <strong>Laravel &amp; MySQL</strong>. Phát triển <strong>Dynamic QR Code</strong> cho ấn phẩm in: thay đổi URL đích linh hoạt mà không cần in lại mã. Tối ưu luồng chuyển hướng để phục vụ lượng truy cập đồng thời lớn.',
    tech: ['Laravel', 'MySQL', 'Dynamic QR', 'Redirect'],
  },
  {
    title: 'Nền tảng A/B Testing & đề xuất nội dung',
    tag: 'Frontend Lead',
    desc: 'Giữ vai trò <strong>Frontend Lead</strong>, phối hợp cùng Backend xây dựng dashboard điều phối A/B testing và hệ thống gợi ý nội dung. Kết nối <strong>RESTful API</strong>, quản lý state phức tạp bằng Vue.js và xây dựng giao diện báo cáo số liệu thử nghiệm theo thời gian thực.',
    tech: ['Vue.js', 'RESTful API', 'State Management', 'Data Visualization'],
  },
  {
    title: 'Bản đồ tương tác & chuyên đề dữ liệu quốc gia',
    tag: 'GIS / Data Storytelling',
    desc: 'Xây dựng module bản đồ số cho các cổng thông tin <strong>Thiên tai – Lũ lụt &amp; An toàn thực phẩm</strong>, xử lý layers, markers và vùng rủi ro để hỗ trợ tra cứu dữ liệu địa lý. Triển khai <strong>02 landing page dữ liệu</strong> về mạng lưới cao tốc và hệ thống hầm đường bộ trọng điểm trên cả nước.',
    tech: ['Leaflet', 'GeoJSON', 'GIS', 'Data Storytelling'],
  },
  {
    title: 'Emagazine & trải nghiệm báo chí tương tác',
    tag: 'Interactive Media',
    desc: 'Cắt giao diện và lập trình các tuyến bài <strong>Emagazine/Longform</strong> cho cơ quan báo chí nội bộ. Ứng dụng <strong>GSAP &amp; CSS Animation</strong> để kể chuyện bằng chuyển động, đồng thời tối ưu tải ảnh và video độ phân giải cao cho trải nghiệm đọc đa phương tiện.',
    tech: ['GSAP', 'CSS Animation', 'Emagazine', 'Media Optimization'],
  },
]

// Giai đoạn nghiên cứu: thông tin đơn vị và thời gian giữ đúng theo hồ sơ gốc.
export const universityExperience = {
  stageLabel: 'Nền tảng nghiên cứu & chuyển giao công nghệ',
  organization: 'Tổ phát triển và chuyển giao công nghệ – Viện Đại học Mở Hà Nội',
  role: 'Lập trình viên PHP (Thực tập & Nghiên cứu chuyển giao)',
  period: '09/2018 – 05/2019',
  location: 'Hà Nội',
  items: [
    {
      title: 'Hệ thống Quản lý Tuyển sinh',
      tag: 'CodeIgniter',
      desc: 'Tham gia nghiên cứu và phát triển hệ thống tuyển sinh bằng <strong>CodeIgniter</strong>. Đảm nhiệm các module đăng ký xét tuyển, tiếp nhận hồ sơ nhập học, thẩm định văn bằng, hỗ trợ thanh toán học phí nhập học và kết xuất báo cáo thống kê tuyển sinh.',
      tech: ['PHP', 'CodeIgniter', 'Enrollment Systems'],
    },
    {
      title: 'Quản lý đào tạo phi chính quy',
      tag: 'Laravel',
      desc: 'Nghiên cứu và xây dựng hệ thống hỗ trợ <strong>quản lý đào tạo phi chính quy</strong> bằng PHP và Laravel Framework, số hóa quy trình quản lý học viên và chương trình học của trường.',
      tech: ['PHP', 'Laravel', 'Education Management'],
    },
  ],
  earlierSupport: {
    period: '07/2016 – 09/2018',
    text: 'Tham gia hỗ trợ nghiệp vụ tuyển sinh, nhập liệu và xử lý thủ tục xét tuyển/nhập học cho sinh viên. Trải nghiệm thực tế này tạo nền tảng hiểu nghiệp vụ trước khi phát triển các hệ thống phần mềm của trường.',
  },
}
