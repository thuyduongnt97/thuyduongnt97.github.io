# Thêm landing page và demo tương tác

Dữ liệu kinh nghiệm và mọi dự án nằm trong `src/data/experiences.js`. Mỗi `Experience` sở hữu mảng `projects`; mỗi `Project` có thể chứa một hoặc nhiều link sản phẩm. Các dự án và demo hiển thị trong phần **Kinh nghiệm & dự án**. Hợp đồng dữ liệu dùng JSDoc tại `src/types/portfolio.js`, cùng môi trường JavaScript hiện tại.

Hai demo **Cao tốc Bắc – Nam** và **Hầm đường bộ trên cao tốc Bắc – Nam** nằm trong dự án `maps` của giai đoạn trước khi dùng agent; mỗi demo có bản PC và Mobile riêng. Hai landing page OMO và Athena nằm trong dự án `landing-pages` của giai đoạn từ `08/2025`.

## Landing page

Thêm một phần tử vào `links` của dự án phù hợp, chẳng hạn `landing-pages`. `id` phải duy nhất trong danh sách link; `url` là địa chỉ đầy đủ của website. Ví dụ cấu trúc link:

```js
{
  id: 'my-landing-page',
  label: 'Tên landing page',
  url: 'https://example.com/',
  kind: 'site',
  category: 'Landing page',
}
```

`demoUrl` có thể lưu URL sản phẩm chính. Nếu URL đó đã nằm trong `links`, helper `getProjectLinks` chỉ hiển thị một lần. Chỉ ghi vai trò, công nghệ hoặc kết quả đã xác nhận. Nội dung chia sẻ là một số landing page/demo tiêu biểu đã thực hiện, được chọn lọc để tôn trọng bảo mật công ty.

## Chuẩn bị demo

Đặt mỗi demo trong một thư mục riêng:

```text
public/
  interactives/
    my-demo/
      index.html
      assets/
        demo.css
        demo.js
        image.webp
```

`index.html` phải là bản HTML/CSS/JS tĩnh chạy được trong trình duyệt. Dùng đường dẫn tương đối cho CSS, JavaScript, ảnh và các tài nguyên khác, chẳng hạn `./assets/demo.css` hoặc `./assets/demo.js`. Tránh đường dẫn từ gốc domain như `/assets/demo.js`, vì demo có thể chạy dưới một đường dẫn GitHub Pages khác.

Nếu demo viết bằng Vue, Svelte hoặc công cụ cần biên dịch, build riêng demo trước rồi chép đầu ra hoàn chỉnh vào thư mục trên. Với Vite, cấu hình `base: './'` cho bản build demo để tài nguyên tiếp tục được tải đúng khi đặt trong thư mục con. Build của portfolio sao chép nội dung `public` vào `dist`; bước này không biên dịch mã nguồn demo.

Mọi tệp trong `public`, kể cả demo chưa đăng ký trong dữ liệu, đều được đưa vào website khi deploy. Giữ bản nháp chưa muốn xuất bản và mã nguồn đang chỉnh sửa trong `docs/interactives-drafts/<slug>/` hoặc thư mục ngoài `public`; chỉ đưa bản sẵn sàng công khai vào `public/interactives`.

## Đăng ký demo trong dự án

Sau khi đã có tệp demo, thêm một `Project` vào `projects` của giai đoạn phù hợp trong `src/data/experiences.js`. Ví dụ dưới đây là trường `projects` trong nhóm `work-with-agents`; giữ nguyên các dự án đang có và thay nội dung mẫu bằng thông tin thực tế:

```js
projects: [
  // Giữ các dự án hiện có của Experience này.
  {
    id: 'my-demo',
    name: 'Tên demo của bạn',
    role: 'Vai trò thực tế của bạn trong dự án',
    description: 'Mô tả ngắn về thao tác người xem có thể thử.',
    achievements: [],
    techStack: [],
    demoUrl: 'interactives/my-demo/index.html',
    isHighlight: false,
    delivery: 'with-agents',
  },
],
```

| Trường | Bắt buộc | Nội dung |
| --- | --- | --- |
| `id` | Có | Định danh dự án duy nhất toàn portfolio; giữ ổn định cho link `#project-<id>`. |
| `name` | Có | Tên dự án hiển thị. |
| `role` | Có | Vai trò thực tế của bạn trong dự án. |
| `description` | Có | Mô tả ngắn, đúng với demo đã có. |
| `achievements` | Có | Mảng kết quả/tính năng đã xác nhận; có thể để `[]`. |
| `techStack` | Có | Mảng công nghệ thực tế; có thể để `[]`. |
| `isHighlight` | Có | Dự án `true` hiển thị mặc định. Nếu cả kinh nghiệm không có highlight, ba dự án đầu được hiển thị; phần còn lại nằm trong “Xem thêm”. |
| `demoUrl`, `githubUrl` | Không | URL sản phẩm chính hoặc repo có thể công khai. |
| `period` | Không | Thời gian riêng của dự án, chỉ thêm khi đã xác nhận. |
| `delivery` | Không | `before-ai`, `with-agents` hoặc `ongoing`, phù hợp với ngữ cảnh dự án. |
| `links` | Không | Nhiều demo/website/repo thuộc cùng dự án. |
| `details` | Không | Mảng mô tả luồng sử dụng hoặc chi tiết triển khai. |
| `icon`, `status` | Không | Icon và nhãn trạng thái của dự án. |

URL nội bộ tính từ `public/`: ghi `interactives/my-demo/index.html`, có tiền tố `interactives/`, không ghi `public/`, dấu `/` đầu hoặc `../`. `resolveProjectUrl` trong `src/utils/portfolio.js` ghép URL này với `import.meta.env.BASE_URL`; URL website bên ngoài dùng đầy đủ `https://...` và được giữ nguyên. Dữ liệu vẫn dùng được khi portfolio chuyển sang GitHub Pages dưới thư mục repository.

Nếu demo thuộc dự án đã có, thêm vào `Project.links` thay vì tạo dự án lặp. Mỗi link có `id`, `label`, `url`, `kind` (`demo`, `site` hoặc `github`); các trường tùy chọn là `category`, `description`, `techStack`, `desktopUrl`, `mobileUrl`. `getProjectLinks` gộp các link này với `demoUrl`/`githubUrl` và bỏ URL chính bị lặp.

Người xem mở demo trong tab riêng, sử dụng toàn bộ cửa sổ trình duyệt. Link dùng trang `index.html` tự chọn phiên bản theo thiết bị. Các landing page cũng mở trong tab mới.

Trên desktop rộng hơn `1024px`, `StickyTimeline` giữ cột giai đoạn bên trái khi cuộn, chia khoảng một phần ba cho timeline và hai phần ba cho dự án (tỷ lệ `1fr / 2fr`, sau khoảng cách giữa cột). Tablet/mobile dùng một cột. Mỗi `Experience` có nút “Xem thêm” riêng, kèm số dự án còn lại và công ty; khi mở có thể “Thu gọn”. Liên kết `#project-<id>` tự mở phần chứa dự án đang ẩn rồi cuộn tới dự án.

## Demo có bản PC và Mobile riêng

Hai demo hiện có giữ nguyên tên thư mục, kể cả chữ hoa/chữ thường:

```text
public/interactives/
  device-route.js
  cao-toc-bac-nam/
    index.html
    pc/index.html
    mb/index.html
  ham-giao-thong/
    index.html
    PC/index.html
    MB/index.html
```

`demoUrl` hoặc `links[].url` trỏ tới `index.html` chung của demo; `desktopUrl` và `mobileUrl` trong link lưu đường dẫn tham khảo tới từng phiên bản. Các đường dẫn đều có tiền tố `interactives/`. Ví dụ một phần tử trong `Project.links`:

```js
{
  id: 'ham-giao-thong',
  label: 'Hầm đường bộ trên cao tốc Bắc – Nam',
  url: 'interactives/ham-giao-thong/index.html',
  kind: 'demo',
  desktopUrl: 'interactives/ham-giao-thong/PC/index.html',
  mobileUrl: 'interactives/ham-giao-thong/MB/index.html',
}
```

Trang mở demo và cả hai bản đều nạp `device-route.js` ở đầu `<head>`. Script nhận đường dẫn tương đối qua `data-desktop` và `data-mobile`, phát hiện thiết bị rồi chuyển hướng bằng `location.replace`. Mở link Mobile trên PC sẽ chuyển sang PC; mở link PC trên điện thoại sẽ chuyển sang Mobile. Tham số URL và hash được giữ nguyên. Nhận diện dựa trên thiết bị và trình duyệt đang dùng, kết hợp màn hình nhỏ tối đa 760px có con trỏ cảm ứng để hỗ trợ chế độ giả lập điện thoại của DevTools. Thu nhỏ cửa sổ PC dùng chuột vẫn mở bản PC. Script kiểm tra lại khi đổi kích thước hoặc chế độ cảm ứng.

Ví dụ đặt trong `ham-giao-thong/MB/index.html`:

```html
<script src="../../device-route.js"
        data-desktop="../PC/index.html"
        data-mobile="../MB/index.html"></script>
```

Khi thay bộ source mới cho một demo, giữ hoặc thêm lại đoạn `<script>` này vào cả hai bản PC và Mobile, trước CSS/JS của demo. Nếu chỉ trang `index.html` chung có chuyển hướng, mở trực tiếp bản PC hoặc Mobile sẽ không tự đổi phiên bản.

Khi cần kiểm tra thủ công, thêm `?view=desktop` hoặc `?view=mobile` vào URL demo để chọn một phiên bản, kể cả khi đang dùng thiết bị khác. Ví dụ: `ham-giao-thong/index.html?view=mobile`. Nếu URL đã có tham số khác, nối thêm `&view=mobile` hoặc `&view=desktop`. Lựa chọn này được ưu tiên hơn nhận diện tự động.

Giữ đúng chữ hoa/chữ thường trong mọi đường dẫn tài nguyên: GitHub Pages phân biệt `PC` với `pc`, và `MB` với `mb`.

## Animation bản đồ cao tốc

Chi tiết tuyến đang hiển thị lấy từ `window.dataDuan` trong `cao-toc-bac-nam/pc/js/dataJson.js` và `cao-toc-bac-nam/mb/js/dataJson.js`. Các file SVG/HTML trong thư mục `doanduong-content` là bản chi tiết riêng; khi chỉnh animation, cập nhật cả file riêng và mục tương ứng trong `dataJson.js`.

Mũi tên dùng `animateMotion`; nét vẽ dùng `animate` với `attributeName="stroke-dashoffset"` và `begin="<id-animateMotion>.begin"`. Hai animation có cùng `dur` và `fill="freeze"`, nên cùng di chuyển và giữ trạng thái trong thời gian nghỉ. Thời gian di chuyển và nghỉ vẫn riêng cho từng tuyến, từng bản PC/Mobile.

Path đặt `pathLength="375"`, `stroke-dasharray="375"` và `stroke-dashoffset="375"`; nét vẽ chạy từ `375` về `0` để đi hết tuyến đúng lúc mũi tên đến điểm cuối. Dùng ID riêng cho path, mũi tên và animation, kiểm tra các tham chiếu `href` khớp nhau. Khi cập nhật, thử lượt đầu, lượt lặp và mở lại tuyến để xác nhận đồng bộ.

## Kiểm tra và xuất bản

Chạy `npm run dev`, tới dự án trong phần Kinh nghiệm & dự án và mở từng demo trong tab riêng; mở “Xem thêm” nếu dự án đang ẩn. Thử link `#project-<id>` tới một dự án ẩn để kiểm tra phần mở rộng tự mở. Kiểm tra bố cục desktop/tablet/mobile, đường dẫn tài nguyên, thao tác tương tác và phiên bản demo được chọn trên máy tính, điện thoại. Khi cần xem thủ công bản còn lại, dùng tham số `view` như trên. Chạy `node --test tests/portfolio.test.js` để kiểm tra dữ liệu/URL và `npm run build` trước khi commit để kiểm tra bản build portfolio.

Commit dữ liệu cùng toàn bộ tài nguyên demo rồi push lên nhánh `main`. Workflow `.github/workflows/deploy.yml` chạy `npm ci`, build portfolio và deploy thư mục `dist` lên GitHub Pages. Có thể xem kết quả tại tab Actions của repository; workflow cũng hỗ trợ chạy thủ công.
