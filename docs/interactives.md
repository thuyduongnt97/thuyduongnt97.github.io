# Thêm landing page và demo tương tác

Dữ liệu gallery nằm trong `src/data/showcase.js`. `landingPages` chứa các liên kết website; `interactiveDemos` chứa liên kết tới các demo tương tác. Showcase nằm cuối trang, sau phần Liên hệ và trước footer. Hai demo đã được đăng ký là **Cao tốc Bắc – Nam** và **Hầm đường bộ trên cao tốc Bắc – Nam**, mỗi demo có bản PC và Mobile riêng.

## Landing page

Thêm một phần tử vào `landingPages` với các trường `id`, `title`, `url`, `description` và `category`. `id` phải duy nhất; `url` là địa chỉ đầy đủ của website. Chỉ ghi vai trò, công nghệ hoặc kết quả khi đã có thông tin xác nhận.

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

Mọi tệp trong `public`, kể cả demo chưa đăng ký vào gallery, đều được đưa vào website khi deploy. Giữ bản nháp chưa muốn xuất bản và mã nguồn đang chỉnh sửa trong `docs/interactives-drafts/<slug>/` hoặc thư mục ngoài `public`; chỉ đưa bản sẵn sàng công khai vào `public/interactives`.

## Đăng ký demo vào gallery

Sau khi đã có tệp demo, thêm mục tương ứng vào `interactiveDemos` trong `src/data/showcase.js`. Đây là ví dụ cấu trúc dữ liệu; thay nội dung bằng demo thực tế của bạn:

```js
export const interactiveDemos = [
  {
    id: 'my-demo',
    title: 'Tên demo của bạn',
    description: 'Mô tả ngắn về thao tác người xem có thể thử.',
    category: 'Interactive',
    tech: ['Vue.js', 'GSAP'],
    entry: 'my-demo/index.html',
  },
]
```

| Trường | Bắt buộc | Nội dung |
| --- | --- | --- |
| `id` | Có | Định danh duy nhất của demo. |
| `title` | Có | Tên hiển thị. |
| `description` | Có | Mô tả ngắn, đúng với demo đã có. |
| `entry` | Có | Đường dẫn tương đối tính từ `public/interactives`, ví dụ `my-demo/index.html`. |
| `category` | Không | Nhãn phân loại hiển thị trong gallery. |
| `tech` | Không | Mảng tên công nghệ thực tế được sử dụng. |
| `desktopEntry` | Không | Đường dẫn tham khảo tới bản PC khi có hai phiên bản riêng. |
| `mobileEntry` | Không | Đường dẫn tham khảo tới bản Mobile khi có hai phiên bản riêng. |

`entry` không chứa tiền tố `public/`, `interactives/`, dấu `/` ở đầu, đường dẫn `../` hoặc URL bên ngoài. Component gallery tự ghép `import.meta.env.BASE_URL` với `interactives/` và `entry`, nên dữ liệu vẫn giữ nguyên nếu portfolio chuyển sang GitHub Pages dưới thư mục repository.

Người xem bấm “Xem demo” để mở demo trong tab riêng, sử dụng toàn bộ cửa sổ trình duyệt. Link dùng trang `entry`, tự chọn phiên bản theo thiết bị. Các landing page cũng mở trong tab mới.

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

`entry` trỏ tới `index.html` của demo và được dùng cho link “Xem demo”; `desktopEntry` và `mobileEntry` lưu đường dẫn tham khảo tới từng phiên bản. Ví dụ:

```js
entry: 'ham-giao-thong/index.html',
desktopEntry: 'ham-giao-thong/PC/index.html',
mobileEntry: 'ham-giao-thong/MB/index.html',
```

Trang mở demo và cả hai bản đều nạp `device-route.js` ở đầu `<head>`. Script nhận đường dẫn tương đối qua `data-desktop` và `data-mobile`, phát hiện thiết bị rồi chuyển hướng bằng `location.replace`. Mở link Mobile trên PC sẽ chuyển sang PC; mở link PC trên điện thoại sẽ chuyển sang Mobile. Tham số URL và hash được giữ nguyên. Nhận diện dựa trên thiết bị và trình duyệt đang dùng, kết hợp màn hình nhỏ tối đa 760px có con trỏ cảm ứng để hỗ trợ chế độ giả lập điện thoại của DevTools. Thu nhỏ cửa sổ PC dùng chuột vẫn mở bản PC. Script kiểm tra lại khi đổi kích thước hoặc chế độ cảm ứng.

Ví dụ đặt trong `ham-giao-thong/MB/index.html`:

```html
<script src="../../device-route.js"
        data-desktop="../PC/index.html"
        data-mobile="../MB/index.html"></script>
```

Khi thay bộ source mới cho một demo, giữ hoặc thêm lại đoạn `<script>` này vào cả hai bản PC và Mobile, trước CSS/JS của demo. Nếu chỉ trang `entry` có chuyển hướng, mở trực tiếp link `/pc/index.html` hoặc `/mb/index.html` sẽ không tự đổi phiên bản.

Khi cần kiểm tra thủ công, thêm `?view=desktop` hoặc `?view=mobile` vào URL demo để chọn một phiên bản, kể cả khi đang dùng thiết bị khác. Ví dụ: `ham-giao-thong/index.html?view=mobile`. Nếu URL đã có tham số khác, nối thêm `&view=mobile` hoặc `&view=desktop`. Lựa chọn này được ưu tiên hơn nhận diện tự động.

Giữ đúng chữ hoa/chữ thường trong mọi đường dẫn tài nguyên: GitHub Pages phân biệt `PC` với `pc`, và `MB` với `mb`.

## Animation bản đồ cao tốc

Chi tiết tuyến đang hiển thị lấy từ `window.dataDuan` trong `cao-toc-bac-nam/pc/js/dataJson.js` và `cao-toc-bac-nam/mb/js/dataJson.js`. Các file SVG/HTML trong thư mục `doanduong-content` là bản chi tiết riêng; khi chỉnh animation, cập nhật cả file riêng và mục tương ứng trong `dataJson.js`.

Mũi tên dùng `animateMotion`; nét vẽ dùng `animate` với `attributeName="stroke-dashoffset"` và `begin="<id-mũi-tên>.begin"`. Hai animation có cùng `dur` và `fill="freeze"`, nên cùng di chuyển và giữ trạng thái trong thời gian nghỉ. Thời gian di chuyển và nghỉ vẫn riêng cho từng tuyến, từng bản PC/Mobile.

Path đặt `pathLength="375"`, `stroke-dasharray="375"` và `stroke-dashoffset="375"`; nét vẽ chạy từ `375` về `0` để đi hết tuyến đúng lúc mũi tên đến điểm cuối. Dùng ID riêng cho path, mũi tên và animation, kiểm tra các tham chiếu `href` khớp nhau. Khi cập nhật, thử lượt đầu, lượt lặp và mở lại tuyến để xác nhận đồng bộ.

## Kiểm tra và xuất bản

Chạy `npm run dev`, tới showcase cuối trang và mở từng demo trong tab riêng. Kiểm tra đường dẫn tài nguyên, thao tác tương tác và phiên bản được chọn trên máy tính, điện thoại. Khi cần xem thủ công bản còn lại, dùng tham số `view` như trên. Chạy `npm run build` trước khi commit để kiểm tra bản build portfolio.

Commit dữ liệu cùng toàn bộ tài nguyên demo rồi push lên nhánh `main`. Workflow `.github/workflows/deploy.yml` chạy `npm ci`, build portfolio và deploy thư mục `dist` lên GitHub Pages. Có thể xem kết quả tại tab Actions của repository; workflow cũng hỗ trợ chạy thủ công.
