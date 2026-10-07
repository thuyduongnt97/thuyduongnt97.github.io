# 🌐 Trang Profile Cá Nhân - Thuỳ Dương

Website cá nhân xây dựng bằng **Vue 3 + Vite**, deploy tự động lên **GitHub Pages**.

🔗 **Xem trực tiếp:** [https://thuyduongnt97.github.io](https://thuyduongnt97.github.io)

---

## 🚀 Chạy local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build production → dist/
npm run preview   # xem thử bản build
```

Yêu cầu Node.js 20.19+ thuộc nhánh 20, hoặc 22.12+ (khuyến nghị Node 22 LTS).

## ✏️ Cập nhật nội dung

Nội dung hồ sơ, kỹ năng, kinh nghiệm và dự án nằm trong [`src/data/`](src/data). Nhãn giao diện và bố cục nằm trong component.

| File | Nội dung |
|---|---|
| `profile.js` | Tên, email, LinkedIn, GitHub, chức danh, số năm kinh nghiệm, địa điểm, số liệu, giới thiệu, học vấn, hoạt động cộng đồng và SEO |
| `recognition.js` | Danh hiệu Nhân viên Xuất sắc và giải nghiên cứu khoa học |
| `skills.js` | Nhóm kỹ năng frontend nổi bật (`featured`) và nền tảng fullstack có thể mở rộng |
| `experience.js` | Vai trò hiện tại, thực tập/nghiên cứu đại học và giai đoạn hỗ trợ tuyển sinh |
| `career.js` | Thứ tự công việc, thời gian đã xác nhận, dấu mốc bắt đầu dùng agent và nhãn phiên bản gốc của dự án |
| `projects.js` | Nhóm dự án, giải pháp và sản phẩm con; ID được phần kinh nghiệm liên kết tới |
| `showcase.js` | Link landing page đã thực hiện và danh sách demo tương tác |

- Email / LinkedIn để trống (`''`) thì nút tương ứng tự ẩn.
- Sửa `profile.title`, `experienceYears`, `since`, `city`, `country` và `countryCode` để cập nhật thông tin dùng chung. Chức danh, số năm và địa điểm trong giao diện được lấy từ đây.
- `profile.websiteUrl` là URL website public. `seo` cấu hình tiêu đề, mô tả và chủ đề; Vite sinh title/meta/canonical/Open Graph/JSON-LD từ dữ liệu này ở cả dev và build. Sau khi sửa dữ liệu, dev server có thể khởi động lại để cập nhật metadata; chạy build lại trước khi deploy.
- File CV nằm ở `public/Thuy-Duong-CV.pdf` (thay file để cập nhật CV).
- Luồng trang: giới thiệu và thành tựu → dự án & demo → kinh nghiệm → kỹ năng → học vấn → liên hệ. Nút xem dự án và tải CV nằm ngay phần giới thiệu.
- Demo và landing page là sản phẩm con trong các nhóm dự án `maps` và `landing-pages`. Phần kinh nghiệm gắn trách nhiệm với dự án tương ứng và các link demo công khai. Mỗi demo mở trong tab riêng và tự chọn bản PC / Mobile theo thiết bị.
- Dòng thời gian giữ thứ tự công việc trong `careerMilestones`. Chỉ điền `period` khi đã xác nhận thời gian; dấu mốc sử dụng agent là `08/2025`. Nhãn “Bản gốc trước AI/agent” nói về phiên bản gốc, kể cả khi demo hiện tại đã được sửa hoặc nâng cấp sau đó.
- Mốc đã xác nhận: vận hành quảng cáo `2019 — 2020`, Shortlink/Ads Demo `2020 — 2023`, Recommendation/A/B Testing `2024`, tiếp nhận microsite `08/2025`. Các công việc xuyên suốt như Emagazine nằm trong `careerOngoingWork`, tách khỏi các mốc đánh số và không gán một giai đoạn AI riêng.
- Đặt `featured: true` trong `projects.js` để đưa dự án lên nhóm chính. Các dự án khác nằm trong mục mở rộng; khi bấm link từ dòng thời gian, nhóm chứa dự án tương ứng tự mở. Dùng `details` để bổ sung luồng sử dụng/triển khai mà vẫn giữ card gọn.
- Mỗi demo HTML/CSS/JS nằm trong `public/interactives/<ten-demo>/`, có `index.html` và các tài nguyên đi kèm. Thêm demo hoặc link landing page trong `src/data/showcase.js`; xem [hướng dẫn chi tiết](docs/interactives.md). Có thể thêm `?view=desktop` hoặc `?view=mobile` vào URL demo để chủ động xem một phiên bản.
- Bản nháp CV tham khảo nằm trong `docs/`, không được copy vào website khi build. Chỉ đặt tài nguyên cần publish vào `public/`.
- Nội dung website được biên tập từ hồ sơ tham khảo trong `docs/gemini-code-1791192343855.md` và thông tin chủ hồ sơ bổ sung. Các trường chưa điền không hiển thị trên trang. Khi bổ sung tên công ty hoặc thông tin liên hệ, cập nhật file dữ liệu tương ứng.

## 🗂️ Cấu trúc

```
├── index.html              # Entry + fonts / theme
├── vite.config.js          # Vue + sinh SEO / JSON-LD từ dữ liệu hồ sơ
├── docs/                   # Bản nháp CV tham khảo, không publish cùng website
├── public/                 # Tài nguyên tĩnh (favicon, CV PDF, interactives/)
├── src/
│   ├── main.js             # Khởi tạo app, đăng ký directives
│   ├── App.vue             # Ghép các section
│   ├── assets/style.css    # Design tokens + toàn bộ style
│   ├── components/         # Section & thành phần UI (art/ = hình minh hoạ SVG)
│   ├── composables/        # useTheme, useScroll, useScrollSpy, useTyped, useInView
│   ├── directives/         # v-reveal, v-spotlight, v-tilt
│   └── data/               # Dữ liệu nội dung
└── .github/workflows/deploy.yml
```

## 📦 Deploy

Mỗi lần push lên nhánh `main`, GitHub Actions sẽ tự build và publish.

> Lần đầu cần bật: **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
