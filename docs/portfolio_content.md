# Portfolio Content Rewrite — Nguyễn Thị Thùy Dương

> [!NOTE]
> Mình chỉ dùng các con số đã có sẵn trong `src/data/profile.js` và `experiences.js` (2M+ clicks, đỉnh ~240K clicks/ngày, 02 cổng thông tin Nhà nước, 60 FPS trên mobile, 3 lần Nhân viên Xuất sắc). Những chỗ ghi **`[…]`** là nơi bạn nên điền số liệu thật. **Đừng bịa số**, vì nhà tuyển dụng kỹ thuật sẽ hỏi lại đúng những con số đó khi phỏng vấn.

> [!WARNING]
> **Mốc thời gian chưa khớp:** trong yêu cầu bạn ghi *"từ 2019"*, còn portfolio đang ghi `since: '2018'` và `experienceYears: 7`. Bạn nên chốt một mốc. Gợi ý: **"Software Engineer since 2019"** (VCCorp), còn giai đoạn 2018–2019 ở ĐH Mở xếp vào *Early career / University systems*.

---

## 1. Headline (Hero)

**EN:**
> **Fullstack Software Engineer** building high-traffic web products, data dashboards & interactive maps.
> *Vue.js · Laravel · Redis · MySQL · WebGIS (QGIS / Leaflet)*

**VI:**
> **Fullstack Software Engineer**: xây dựng sản phẩm web chịu tải cao, dashboard dữ liệu và bản đồ số tương tác.

**Tagline (một dòng, dùng cho thẻ SEO hoặc ảnh chia sẻ mạng xã hội):**
> *I turn messy, high-volume data into fast, reliable products people actually use.*

---

## 2. Bio

### Bản ngắn (Hero lead, khoảng 50 từ)

**EN:**
> Software Engineer at **VCCorp** since 2019, owning products end-to-end, from MySQL schema and Laravel APIs to Vue.js interfaces. I build the data layer and tooling behind high-traffic products: the **MySQL + Redis data model and admin platform for a shortlink system serving 2M+ clicks**, a self-service recommendation and A/B testing platform, and **WebGIS maps running at 60 FPS on mobile** for two government portals.

**VI:**
> Software Engineer tại **VCCorp** từ 2019, làm chủ sản phẩm end-to-end: từ thiết kế CSDL MySQL, API Laravel đến giao diện Vue.js. Mình xây dựng tầng dữ liệu và công cụ phía sau các sản phẩm lưu lượng lớn: **mô hình dữ liệu MySQL + Redis và web quản trị cho hệ thống Shortlink phục vụ hơn 2 triệu lượt click**, nền tảng gợi ý nội dung và A/B testing dạng tự phục vụ, và **bản đồ WebGIS đạt 60 FPS trên di động** cho 02 cổng thông tin Nhà nước.

### Bản đầy đủ (mục About, 3 đoạn)

**EN:**
> **I build products, not just features.** Since 2019 at VCCorp, one of Vietnam's largest digital media and AdTech companies, I've taken products from a blank requirements doc to production: designing the data model, writing the backend, shipping the UI and staying on call when traffic spikes.
>
> **My edge is performance and data.** I'm most effective where scale and complexity meet: designing the Redis key structure that a ~240K clicks/day redirect service reads from, turning raw BigData experiment data into a self-service A/B testing platform (powering **309 boxes across 40 sites & apps**), and simplifying heavy GeoJSON in QGIS (33 MB → 3 MB) so thousands of map points render smoothly on mid-range phones.
>
> **How I work:** start from the business problem, measure before optimizing, and leave code that the next engineer can extend. I've been named **Outstanding Employee three times (2022, 2023, 2025)**, and since 2025 I've used AI-assisted workflows (Codex, Antigravity, Gemini) to ship faster without lowering the bar.

**VI:**
> **Mình xây dựng sản phẩm, không chỉ viết tính năng.** Từ năm 2019 tại VCCorp, một trong những công ty truyền thông số và AdTech lớn nhất Việt Nam, mình đã đưa nhiều sản phẩm từ tài liệu yêu cầu đến production: thiết kế dữ liệu, viết backend, hoàn thiện UI và trực vận hành khi traffic tăng đột biến.
>
> **Thế mạnh của mình là hiệu năng và dữ liệu.** Mình làm tốt nhất ở những bài toán vừa lớn về quy mô vừa phức tạp: thiết kế cấu trúc key Redis cho dịch vụ redirect chịu ~240.000 clicks/ngày, biến dữ liệu thử nghiệm thô từ BigData thành nền tảng A/B testing tự phục vụ (đang chạy **309 box trên 40 site & app**), và tối giản GeoJSON nặng bằng QGIS (33 MB → 3 MB) để hàng nghìn điểm bản đồ vẫn mượt trên điện thoại cấu hình thấp.
>
> **Cách mình làm việc:** bắt đầu từ bài toán kinh doanh, đo đạc trước khi tối ưu, và để lại code mà người sau dễ mở rộng. **3 lần Nhân viên Xuất sắc (2022, 2023, 2025)**; từ 2025 mình ứng dụng quy trình AI (Codex, Antigravity, Gemini) để giao hàng nhanh hơn mà không hạ tiêu chuẩn chất lượng.

---

## 3. Dự án nổi bật theo cấu trúc STAR

> [!TIP]
> **Cách hiển thị hiệu quả trên UI:** đừng in nguyên 4 nhãn "S / T / A / R" lên card, vì trông giống bài tập hơn là portfolio. Nên đổi thành **Challenge → Approach → Impact** (S+T gộp thành *Challenge*). Card bên ngoài chỉ hiện *tiêu đề + 1 dòng Impact + tech tags*; bản STAR đầy đủ đặt trong `ProjectLightboxModal`.

---

### 🔗 Project 1: Dynamic QR & Shortlink Platform

`Laravel` `MySQL` `Redis (key design)` `Vue.js` `VirusTotal API` · *Data model & admin platform owner* · 2019 – Present

**Impact (một dòng trên card):** *Designed the data layer and admin platform behind a shortlink system that has served 2M+ clicks: campaigns change destinations without reprinting, and malicious URLs are blocked before going live.*

> [!IMPORTANT]
> **Phạm vi công việc (ghi rõ để trả lời phỏng vấn cho chuẩn):**
> - **Phần của bạn:** thiết kế CSDL MySQL, **thiết kế cấu trúc key-value trên Redis**, xây web quản trị (Laravel + Vue.js), kiểm tra mã độc qua VirusTotal, và dashboard phân tích dựa trên API log.
> - **Phần của đội khác:** dịch vụ redirect cho người dùng cuối (shortlink → Redis → URL đích), và pipeline ghi log/thống kê lượt truy cập.
>
> Cách nói chuẩn: *"I designed the data contract that the redirect service reads from, and built everything users and admins interact with."*

| | EN | VI |
|---|---|---|
| **Situation** | Marketing teams printed QR codes on packaging and ads. Once printed, the target URL was locked: any campaign change meant reprinting, nobody could see who actually scanned, and an open link-shortening tool could be abused to hide phishing or malware links behind a trusted domain. | Đội marketing in mã QR lên bao bì và ấn phẩm. Đã in là URL đích bị "khóa cứng": đổi chiến dịch phải in lại, không biết ai thực sự quét mã, và một công cụ rút gọn link mở cũng dễ bị lợi dụng để giấu link lừa đảo hoặc mã độc sau một tên miền uy tín. |
| **Task** | Own the data model and the admin platform: let users create and edit links and QR codes safely, keep Redis in sync for a high-traffic redirect service run by another team, and turn that team's click logs into usable analytics. | Phụ trách mô hình dữ liệu và nền tảng quản trị: cho phép tạo và sửa link/QR an toàn, giữ Redis luôn đồng bộ cho dịch vụ redirect tải cao do đội khác vận hành, và biến dữ liệu log của đội đó thành báo cáo phân tích dùng được. |
| **Action** | • **Data model:** designed the MySQL schema with a **shortlink indirection layer** that decouples the printed code from its destination URL.<br>• **Redis key design:** defined the **key-value structure** the redirect service reads, and synced it on every create, update and delete from the admin app, so redirects never need to hit MySQL.<br>• **Security:** integrated the **VirusTotal API** to scan destination URLs for malware and phishing **before a link goes live**.<br>• **Admin web app (Laravel + Vue.js):** link and QR management with tagging, filters, bulk import, and one-click destination editing.<br>• **Analytics:** consumed the logging team's **REST API** and built Vue.js charts covering traffic over time, top referrers and top locations for each link. | • **Mô hình dữ liệu:** thiết kế CSDL MySQL với **lớp ánh xạ Shortlink**, tách mã đã in khỏi URL đích.<br>• **Thiết kế key Redis:** định nghĩa **cấu trúc key-value** mà dịch vụ redirect đọc, và đồng bộ mỗi khi tạo, sửa hoặc xóa trên web quản trị, để luồng redirect không cần truy vấn MySQL.<br>• **Bảo mật:** tích hợp **VirusTotal API** để quét mã độc và lừa đảo ở URL đích **trước khi link được kích hoạt**.<br>• **Web quản trị (Laravel + Vue.js):** quản lý link và QR, gắn tag, bộ lọc, import hàng loạt, đổi URL đích chỉ với một thao tác.<br>• **Phân tích:** lấy dữ liệu từ **REST API** của đội log, vẽ biểu đồ Vue.js về lưu lượng theo thời gian, top nguồn truy cập và top vị trí cho từng link. |
| **Result** | The platform has served **2M+ total clicks** (peak **~240K/day**). The redirect service reads directly from the Redis keys I designed, with end-to-end redirects measured at **25–60 ms**. Campaigns switch destinations instantly at **zero reprint cost**, and malicious URLs are rejected before they reach end users. | Nền tảng đã phục vụ **hơn 2 triệu clicks** (đỉnh **~240.000/ngày**). Dịch vụ redirect đọc trực tiếp từ cấu trúc key Redis mình thiết kế; thời gian redirect đo được **25–60 ms**. Đổi trang đích tức thì, **không tốn chi phí in lại**, và link độc hại bị chặn trước khi tới người dùng. |

**🧠 Problem-solving insight:** *"Print is immutable, so I added one level of indirection. And because another team owned the hot path, my job was to make the Redis contract so simple and so reliably in sync that their redirect never needed to ask the database anything."*

---

### 📊 Project 2: Content Recommendation & A/B Testing Platform

`Laravel 8` `Vue 3` `Inertia.js` `ApexCharts` `REST API (BigData)` · *Lead developer, built from scratch* · 07/2023 – Present

**Impact:** *A self-service platform where product and editorial teams build, publish and A/B-test 309 recommendation boxes across 40 news sites and apps, with no engineer needed to ship a widget.*

| | EN | VI |
|---|---|---|
| **Situation** | The recommendation engine (owned by the BigData team) served "related articles" boxes to many partner news sites. Creating or changing a box meant hand-editing JavaScript per site, and experiment results were only available as raw API data. | Hệ thống gợi ý nội dung (do đội BigData phụ trách thuật toán) cung cấp box "bài viết liên quan" cho nhiều site báo đối tác. Muốn tạo hoặc sửa box phải sửa tay JavaScript cho từng site, còn kết quả thử nghiệm chỉ có ở dạng dữ liệu API thô. |
| **Task** | Build the operating layer on top of the engine: multi-site management with permissions, a widget builder that publishes production code, and dashboards that turn experiment data into decisions. | Xây dựng lớp vận hành phía trên engine: quản lý nhiều site có phân quyền, công cụ dựng widget xuất thẳng code production, và dashboard biến dữ liệu thử nghiệm thành quyết định. |
| **Action** | • **Widget code generator:** a template + **macro engine** (`%%URL%%`, `%%divId%%`, `%%limitItem%%`…) compiles a site-specific JS bundle, with a separate **beta build** for testing, and publishes it to the CDN through a **TOTP-authenticated** upload.<br>• **A/B experiment lifecycle:** create, run, fork and restore experiments, run phase checks, and **compare phases with significance testing (FDR 0.05)**, plus KPI and algorithm monitors.<br>• **Analytics UI:** clicks, exit rate, view/click, time-on-read and session dashboards in **Vue 3 + ApexCharts**, including a public read-only dashboard for editors.<br>• **Resilient integration:** wrapped every upstream call with timeouts, **exponential-backoff retry** (0.5 s → 1 s → 2 s, retrying only 5xx and network errors), and **Telegram alerts de-duplicated with a 5-minute cache fingerprint**.<br>• **Architecture:** repository pattern, role- and site-level RBAC, and a migration script that moved legacy v1 data (customers, templates, scenarios, widgets) into the new schema. | • **Bộ sinh code widget:** template kết hợp **macro engine** (`%%URL%%`, `%%divId%%`, `%%limitItem%%`…) biên dịch ra file JS riêng cho từng site, có thêm **bản beta** để thử nghiệm, rồi đẩy lên CDN qua kênh upload **xác thực bằng TOTP**.<br>• **Vòng đời A/B test:** tạo, chạy, fork và khôi phục thử nghiệm, kiểm tra phase, và **so sánh các phase bằng kiểm định thống kê (FDR 0.05)**, kèm KPI Monitor và Algorithm Monitor.<br>• **Giao diện phân tích:** dashboard lượt click, tỉ lệ thoát, view/click, thời gian đọc và phiên tương tác bằng **Vue 3 + ApexCharts**; có thêm dashboard công khai chỉ xem cho Ban biên tập.<br>• **Tích hợp bền vững:** mọi lệnh gọi API upstream đều có timeout, **retry với exponential backoff** (0.5 s → 1 s → 2 s, chỉ retry lỗi 5xx và lỗi mạng), và **cảnh báo Telegram chống spam bằng fingerprint cache 5 phút**.<br>• **Kiến trúc:** repository pattern, phân quyền RBAC theo vai trò và theo site, cùng script chuyển dữ liệu cũ v1 (khách hàng, template, kịch bản, widget) sang schema mới. |
| **Result** | Shipping a widget went from a developer task to a self-service form. The platform has run in production for **3+ years**, now powering **40 sites (PC, Mobile & Apps)** and **309 active widget boxes**, and API outages are reported on Telegram before users notice. | Tạo widget từ việc của lập trình viên trở thành thao tác tự phục vụ trên form. Nền tảng đã vận hành production **hơn 3 năm**, hiện phục vụ **40 site (PC, Mobile & App)** với tổng **309 box gợi ý**; sự cố API được báo lên Telegram trước khi người dùng phát hiện. |

**🧠 Problem-solving insight:** *"I didn't own the algorithm. I owned everything that made it usable: turning a code change into a form, raw numbers into a pass/fail answer, and a flaky upstream into a system that heals itself and tells you when it can't."*

---

### 🗺️ Project 3: WebGIS for Government Portals

`QGIS` `GeoJSON` `Leaflet` `Canvas` `Marker Clustering` · 2025 – Present

**Impact:** *Thousands of spatial data points rendered at 60 FPS on mobile for 02 national public-information portals.*

| | EN | VI |
|---|---|---|
| **Situation** | Two government portals (natural disasters & flooding, food safety) needed public interactive maps. The raw GeoJSON was heavy and the point count ran into the thousands, so maps loaded slowly and lagged on phones, the device most citizens use. | Hai cổng thông tin Nhà nước (thiên tai – lũ lụt, an toàn thực phẩm) cần bản đồ tương tác công khai. GeoJSON gốc rất nặng, số điểm lên tới hàng nghìn, nên bản đồ tải chậm và giật trên điện thoại, thiết bị mà phần lớn người dân sử dụng. |
| **Task** | Make the maps load fast and scroll smoothly on mid-range mobile devices without losing geographic accuracy that matters to users. | Giúp bản đồ tải nhanh và thao tác mượt trên điện thoại tầm trung, mà không làm mất độ chính xác địa lý quan trọng với người dùng. |
| **Action** | • Pre-processed boundaries with **QGIS Geometry Simplification**, removing vertices invisible at web zoom levels.<br>• Switched Leaflet to the **Canvas renderer** instead of thousands of SVG DOM nodes.<br>• Applied **Marker Clustering** so the visible point count scales with zoom, not with dataset size. | • Tiền xử lý ranh giới bằng **QGIS Geometry Simplification**, loại bỏ các đỉnh không nhìn thấy ở mức zoom web.<br>• Chuyển Leaflet sang **Canvas renderer** thay cho hàng nghìn node SVG.<br>• Áp dụng **Marker Clustering** để số điểm hiển thị phụ thuộc mức zoom, không phụ thuộc kích thước dữ liệu. |
| **Result** | Smooth **60 FPS** interaction on mobile; GeoJSON payload cut by **~91% (33 MB → 3 MB)**; deployed on **02 national portals**. | Tương tác **60 FPS** trên di động; dung lượng GeoJSON giảm **~91% (33 MB → 3 MB)**; triển khai trên **02 cổng thông tin Nhà nước**. |

**🧠 Problem-solving insight:** *"I fixed the data before the code. The fastest pixel is the one you never send to the browser."*

---

## 4. Checklist từ góc nhìn Tech Recruiter

| Nên làm ✅ | Tránh ❌ |
|---|---|
| Mở mỗi gạch đầu dòng bằng **động từ mạnh**: *Designed, Built, Reduced, Owned* | "Tham gia", "Hỗ trợ", "Responsible for…" |
| **Mỗi dự án có một con số** ở dòng Impact | Liệt kê tech stack mà không nói tác động |
| Viết bản **tiếng Anh làm chính** nếu nhắm tới công ty nước ngoài hoặc remote, có nút chuyển sang VI | Trộn Anh–Việt trong cùng một câu |
| Card ngắn, chi tiết đặt trong modal | Viết đoạn văn dài trên card |
| Tách *core projects* (3 dự án trên) khỏi *supporting work* (Landing page, Emagazine…) | Để 10 dự án ngang hàng nhau, làm loãng thông điệp chính |

---

## 5. Áp dụng vào code (nếu bạn muốn)

| Nội dung | File |
|---|---|
| Headline, Bio ngắn (`heroHeadline`, `lead`) | [profile.js](file:///d:/profile/thuyduongnt97.github.io/src/data/profile.js#L41-L47) |
| Bio đầy đủ (`about.paragraphs`) | [profile.js](file:///d:/profile/thuyduongnt97.github.io/src/data/profile.js#L222-L227) |
| STAR cho từng dự án (`deliverableGroups[].sections`) | [experiences.js](file:///d:/profile/thuyduongnt97.github.io/src/data/experiences.js#L29-L94) |
