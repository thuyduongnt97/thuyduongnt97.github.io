// =====================================================
//  GHI NHẬN & GIẢI THƯỞNG (3 THẺ BENTO ĐIỂM NHẤN)
//  Hỗ trợ song ngữ VI / EN
// =====================================================

/** @typedef {import('../types/portfolio.js').RecognitionItem} RecognitionItem */

export const recognition = {
  /** @type {RecognitionItem[]} */
  items: [
    {
      id: 'ai-workflow',
      icon: 'sparkle',
      emoji: '⚡',
      badge: 'Modern Workflow • Từ 08/2025',
      badgeEn: 'Modern Workflow • Since 08/2025',
      title: 'Quy trình AI Workflow (Codex, Antigravity, Gemini)',
      titleEn: 'AI-Assisted Workflow (Codex, Antigravity, Gemini)',
      description:
        'Chủ động kết hợp bộ 3 công cụ AI (Codex, Antigravity, Gemini) trong quy trình kỹ thuật hàng ngày: tăng tốc phân tích kiến trúc, kiểm tra edge-cases, tối ưu truy vấn MySQL/Redis và chuẩn hóa dữ liệu GeoJSON.',
      descriptionEn:
        'Actively combining Codex, Antigravity, and Gemini in daily engineering workflows to accelerate architecture design, verify edge cases, optimize MySQL/Redis queries, and automate GeoJSON processing.',
      color: 'emerald',
      accentColor: 'emerald',
      period: '08/2025 – Nay',
    },
    {
      id: 'professional',
      icon: 'award',
      emoji: '🏆',
      badge: 'Ghi nhận tại VCCorp',
      badgeEn: 'Recognition at VCCorp',
      title: '3 Năm Nhân viên Xuất sắc (2022, 2023, 2025)',
      titleEn: '3x Outstanding Employee (2022, 2023, 2025)',
      description:
        'Ghi nhận năng lực giải quyết bài toán kỹ thuật, tinh thần làm chủ sản phẩm và đóng góp bền bỉ vào các hệ thống lưu lượng lớn của công ty.',
      descriptionEn:
        'Awarded three times for technical problem-solving, end-to-end product ownership, and reliable delivery across high-traffic company platforms.',
      color: 'amber',
      accentColor: 'amber',
      years: [2022, 2023, 2025],
    },
    {
      id: 'research',
      icon: 'cap',
      emoji: '🔬',
      badge: 'Viện ĐH Mở Hà Nội • 05/2019',
      badgeEn: 'Hanoi Open University • 05/2019',
      title: 'Giải Ba Nghiên cứu Khoa học',
      titleEn: 'Third Prize — Scientific Research',
      description:
        'Đề tài: "Tìm hiểu phần mềm R và ứng dụng thuật toán phân cụm K-Means" — nền tảng tư duy toán học, thống kê và phân cụm dữ liệu.',
      descriptionEn:
        'Research topic: "Applying K-Means Clustering in R" — laying a strong foundation in statistical analysis and data clustering.',
      color: 'cyan',
      accentColor: 'cyan',
      period: '05/2019',
      institution: 'Viện Đại học Mở Hà Nội',
    },
  ],

  get professional() {
    const item = this.items.find(i => i.id === 'professional') || this.items[1]
    return { ...item, label: item.badge, values: ['Năng lực kỹ thuật', 'Tinh thần trách nhiệm', 'Đóng góp sản phẩm'] }
  },
  get research() {
    const item = this.items.find(i => i.id === 'research') || this.items[2]
    return {
      ...item,
      label: item.badge,
      topic: 'Tìm hiểu phần mềm R và ứng dụng thuật toán phân cụm K-Means',
      tech: ['R', 'K-Means', 'Phân tích dữ liệu'],
    }
  },
  get aiWorkflow() {
    const item = this.items.find(i => i.id === 'ai-workflow') || this.items[0]
    return { ...item, label: item.badge }
  },
}
