// `art`: qr | ads | map | rebuild → component minh họa tương ứng trong src/components/art.
export const projects = [
  {
    num: '01',
    art: 'qr',
    title: 'Dynamic Shortlink & QR Code động',
    role: 'Fullstack Developer — thiết kế dữ liệu, phát triển & vận hành',
    points: [
      'Xây dựng hệ thống rút gọn liên kết bằng Laravel và MySQL từ thiết kế dữ liệu đến vận hành.',
      'Cập nhật URL đích của QR Code mà không cần in lại mã trên bao bì và ấn phẩm.',
      'Tối ưu luồng chuyển hướng và Redis cache để phục vụ nhiều lượt truy cập đồng thời.',
    ],
    tech: ['Laravel', 'MySQL', 'Redis', 'REST API'],
  },
  {
    num: '02',
    art: 'ads',
    title: 'Core Ads Template & Demo Simulator',
    role: 'Thiết kế core template, phát triển & vận hành simulator',
    points: [
      'Xây dựng core template Display / Rich Media bằng Svelte, tập trung vào bundle nhẹ và tốc độ hiển thị.',
      'Phát triển Ads Demo Simulator với Laravel và Svelte / Vue, xem trước định dạng quảng cáo trên nhiều thiết bị.',
      'Cung cấp môi trường demo trực quan để đội ngũ sản phẩm và kinh doanh trao đổi, duyệt phương án.',
    ],
    tech: ['Svelte', 'Laravel', 'Vue.js', 'Vite'],
  },
  {
    num: '03',
    art: 'map',
    title: 'Bản đồ số & Hạ tầng giao thông',
    role: 'Frontend Developer & GIS Integration',
    points: [
      'Xây dựng module GIS cho các cổng thông tin về thiên tai, lũ lụt và an toàn thực phẩm.',
      'Tích hợp dữ liệu địa lý nhiều lớp, markers và vùng rủi ro để hỗ trợ tra cứu thông tin.',
      'Triển khai hai landing page dữ liệu về mạng lưới cao tốc và hệ thống hầm đường bộ trên cả nước.',
    ],
    tech: ['Vue.js', 'Leaflet', 'GeoJSON', 'Tailwind CSS'],
  },
  {
    num: '04',
    art: 'rebuild',
    title: 'Tái cấu trúc hệ thống & công cụ nội bộ',
    role: 'Chủ trì rebuild / refactor & duy trì hệ thống',
    points: [
      'Chuyển microsite, công cụ nghiệp vụ và landing page từ mã nguồn cũ sang kiến trúc hiện đại.',
      'Phân tách component rõ ràng để hệ thống dễ mở rộng, bảo trì và tiếp tục phát triển.',
      'Chuẩn hóa triển khai, xử lý vấn đề bảo mật, tương thích trình duyệt và tối ưu phản hồi máy chủ.',
    ],
    tech: ['Legacy Refactoring', 'Component Architecture', 'Git', 'Deployment'],
  },
]
