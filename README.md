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

Nội dung hồ sơ, kỹ năng và kinh nghiệm nằm trong [`src/data/`](src/data). Mọi dự án và link sản phẩm được lưu trong `Experience.projects` tại [`src/data/experiences.js`](src/data/experiences.js). Nhãn giao diện và bố cục nằm trong component.

| File | Nội dung |
|---|---|
| `profile.js` | Tên, email, LinkedIn, GitHub, chức danh, số năm kinh nghiệm, địa điểm, số liệu, giới thiệu, học vấn, hoạt động cộng đồng và SEO |
| `recognition.js` | Danh hiệu Nhân viên Xuất sắc và giải nghiên cứu khoa học |
| `skills.js` | Sáu nhóm công nghệ trong Bento Grid: frontend, UI/animation, bản đồ, backend, dữ liệu và công cụ |
| `experiences.js` | Các giai đoạn làm việc/nghiên cứu, dự án thuộc từng giai đoạn, dấu mốc dùng agent và link demo/landing page |

Hợp đồng dữ liệu được mô tả bằng JSDoc trong [`src/types/portfolio.js`](src/types/portfolio.js), dùng với JavaScript hiện tại:

- `Experience`: `id`, `company`, `companyId`, `role`, `period`, `location`, `summary`, `kind`, `projects`; có thể thêm `agentMilestone`.
- `Project`: `id`, `name`, `role`, `description`, `achievements`, `techStack`, `isHighlight`. Các trường tùy chọn gồm `demoUrl`, `githubUrl`, `period`, `delivery`, `links`, `details`, `icon`, `status`. Để `achievements`/`techStack` là `[]` khi chưa có thông tin xác nhận.
- `Project.links` chứa nhiều sản phẩm với `id`, `label`, `url`, `kind` (`demo`, `site` hoặc `github`); có thể thêm `category`, `description`, `techStack`, `desktopUrl`, `mobileUrl`.

Các lưu ý khi cập nhật:

- Email / LinkedIn để trống (`''`) thì nút tương ứng tự ẩn.
- Sửa `profile.title`, `experienceYears`, `since`, `city`, `country` và `countryCode` để cập nhật thông tin dùng chung. Chức danh, số năm và địa điểm trong giao diện được lấy từ đây.
- `profile.heroTitle` là tiêu đề chuyên môn riêng của Hero; `profile.title` vẫn là chức danh dùng cho kinh nghiệm. Sửa `profile.availability` để cập nhật badge trạng thái, hoặc để trống để ẩn. Trang mặc định dùng giao diện sáng và giữ lựa chọn sáng/tối đã lưu của người xem.
- `profile.websiteUrl` là URL website public. `seo` cấu hình tiêu đề, mô tả và chủ đề; Vite sinh title/meta/canonical/Open Graph/JSON-LD từ dữ liệu này ở cả dev và build. Sau khi sửa dữ liệu, dev server có thể khởi động lại để cập nhật metadata; chạy build lại trước khi deploy.
- File CV nằm ở `public/Thuy-Duong-CV.pdf` (thay file để cập nhật CV).
- Luồng trang: giới thiệu và thành tựu (Hero) → kỹ năng (Bento Grid) → kinh nghiệm với các dự án con → học vấn & cộng đồng → liên hệ/footer. CTA “Xem Kinh nghiệm & Dự án” ở Hero cuộn đến `#experience`; điều hướng giữ các mốc Giới thiệu, Kỹ năng, Kinh nghiệm và Liên hệ. Các sản phẩm công khai nằm ngay trong dự án tương ứng.
- Dải số liệu hiện tạm ẩn trong `src/App.vue`; vẫn giữ `MetricsStrip.vue` và `profile.stats` để có thể khôi phục bằng cách thêm lại import và component. Dữ liệu gồm số năm kinh nghiệm, số năm nhận danh hiệu, số mảng sản phẩm và số demo interactive; chỉ cập nhật số liệu khi đã xác nhận.
- Bento Grid hiển thị toàn bộ từ khóa của `skills`, giữ các ghi chú mức độ như “cơ bản” và “nền tảng”. Card dự án hiển thị nhãn “Tiêu biểu” theo `isHighlight`, vai trò dưới tên và các link demo/website/repo ở góc phải header. Kết quả dùng dấu ✓, nền slate nhạt và đường nhấn trái; badge công nghệ nằm cuối card dưới đường phân cách. Trên mobile, nhóm link tự xuống hàng để tiêu đề dễ đọc.
- Mảng `experiences` có năm nhóm: làm việc từ `08/2025 — Hiện tại`, làm việc `2019 — Trước 08/2025`, công việc xuyên suốt (Emagazine), nghiên cứu/chuyển giao `09/2018 — 05/2019`, hỗ trợ tuyển sinh `07/2016 — 09/2018`. Các giai đoạn có ngày được xếp mới trước; nhóm xuyên suốt không được gán thêm ngày hoặc giai đoạn agent.
- Dấu mốc bắt đầu dùng agent là `08/2025`. `delivery` dùng `before-ai`, `with-agents` hoặc `ongoing`; nhãn “Bản gốc trước AI/agent” nói về phiên bản gốc, kể cả khi demo hiện tại đã được sửa hoặc nâng cấp sau đó. Chỉ điền `period` của dự án khi thời gian đã được xác nhận.
- Mốc dự án đã xác nhận: vận hành quảng cáo `2019 — 2020`, Shortlink/Ads Demo `2020 — 2023`, Recommendation/A/B Testing `2024`, tiếp nhận microsite `08/2025`.
- Trên desktop rộng hơn `1024px`, phần kinh nghiệm dùng `StickyTimeline`: cột giai đoạn chiếm khoảng một phần ba và giữ vị trí khi cuộn, cột dự án chiếm khoảng hai phần ba (tỷ lệ `1fr / 2fr`, khoảng cách `2rem`). Tablet/mobile hiển thị một cột theo thứ tự nguồn, khoảng cách `1rem`. Mốc bắt đầu dùng agent trình bày bằng icon và dòng chữ, không có khung riêng.
- `splitExperienceProjects` hiển thị toàn bộ dự án có `isHighlight === true`; nếu một kinh nghiệm không có dự án nổi bật, hiển thị ba dự án đầu hoặc toàn bộ nếu ít hơn ba. Các dự án còn lại giữ thứ tự nguồn trong mục mở rộng riêng của từng `Experience`. Hiện mỗi giai đoạn làm việc có ba dự án nổi bật, nhóm nghiên cứu có hai và nhóm xuyên suốt có một.
- Nút “Xem thêm” cho biết số dự án còn lại và công ty của kinh nghiệm đó; “Thu gọn” đóng phần mở rộng. Link `#project-<id>` tự mở nhóm chứa dự án đang ẩn trước khi cuộn đến dự án. Giữ `id` ổn định; dùng `details` để bổ sung luồng sử dụng/triển khai mà vẫn giữ card gọn.
- Card dự án và Bento dùng `v-spotlight` với lớp phủ `.card-spotlight` không nhận sự kiện chuột: radial gradient bán kính `350px`, indigo opacity `0.08`, hiện/ẩn trong `300ms`. Vị trí được cập nhật qua `requestAnimationFrame` và dịch chuyển texture gradient bằng `transform`; không có listener chuột trùng hoặc vòng lặp khi chuột đứng yên/cuộn trang. Hiệu ứng chỉ bật với chuột chính xác và tắt khi người xem chọn giảm chuyển động. Card chuyển tiếp `300ms` với bóng indigo nhẹ; tag công nghệ đổi màu trong `150ms`, icon link nhích lên phải trong `200ms` khi hover card, mũi tên “Xem thêm” xoay trong `300ms`. Mở/thu gọn dự án dùng animation chiều cao `280ms`, cập nhật đích nếu layout đổi trong lúc mở.
- Demo và landing page nằm trong các dự án `maps` và `landing-pages`. `getProjectLinks` tại `src/utils/portfolio.js` gộp `links`, `demoUrl`, `githubUrl` và tránh lặp URL chính; `resolveProjectUrl` ghép URL nội bộ với `import.meta.env.BASE_URL`. Demo mở trong tab riêng, dùng trang `index.html` tự chọn PC / Mobile theo thiết bị.
- Mỗi demo HTML/CSS/JS nằm trong `public/interactives/<ten-demo>/`, có `index.html` và tài nguyên đi kèm. Thêm dự án vào `projects` của giai đoạn phù hợp trong `src/data/experiences.js`, hoặc thêm link vào dự án sẵn có. URL nội bộ ghi `interactives/<ten-demo>/index.html`; xem [hướng dẫn chi tiết](docs/interactives.md). Có thể thêm `?view=desktop` hoặc `?view=mobile` vào URL demo để chủ động xem một phiên bản.
- Bản nháp CV tham khảo nằm trong `docs/`, không được copy vào website khi build. Chỉ đặt tài nguyên cần publish vào `public/`.
- Nội dung website được biên tập từ hồ sơ tham khảo trong `docs/gemini-code-1791192343855.md` và thông tin chủ hồ sơ bổ sung. Tên công ty hiện tại là VCcorp, đã được chủ hồ sơ cung cấp. Một số landing page/demo tiêu biểu được chọn lọc để chia sẻ công khai và tôn trọng bảo mật công ty.

Kiểm tra dữ liệu, URL và vòng đời hiệu ứng spotlight bằng:

```bash
node --test --test-isolation=none tests/portfolio.test.js tests/spotlight.test.js
```

## 🗂️ Cấu trúc

```
├── index.html              # Entry + fonts / theme
├── vite.config.js          # Vue + sinh SEO / JSON-LD từ dữ liệu hồ sơ
├── docs/                   # Bản nháp CV tham khảo, không publish cùng website
├── public/                 # Tài nguyên tĩnh (favicon, CV PDF, interactives/)
├── src/
│   ├── main.js             # Khởi tạo app, đăng ký directives
│   ├── App.vue             # Ghép các section
│   ├── assets/style.css    # Design tokens + style dùng chung
│   ├── components/         # Section & thành phần UI (art/ = hình minh hoạ SVG)
│   ├── composables/        # useTheme, useScroll, useScrollSpy, useTyped, useInView
│   ├── directives/         # v-reveal, v-spotlight, v-tilt
│   ├── data/               # Hồ sơ, kỹ năng và experiences.js chứa dự án
│   ├── types/portfolio.js  # Hợp đồng Experience / Project bằng JSDoc
│   └── utils/portfolio.js  # Chuẩn hóa link và nhãn giai đoạn dự án
├── tests/                 # Kiểm tra dữ liệu, URL và spotlight bằng Node.js
└── .github/workflows/deploy.yml
```

## 📦 Deploy

Mỗi lần push lên nhánh `main`, GitHub Actions sẽ tự build và publish.

> Lần đầu cần bật: **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
