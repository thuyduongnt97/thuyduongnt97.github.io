/**
 * Hợp đồng dữ liệu Portfolio bằng JSDoc, dùng trực tiếp với JavaScript hiện tại.
 * Experience là nguồn sở hữu Project; dự án không được lưu lại ở mảng độc lập.
 */

/** @typedef {'before-ai' | 'with-agents' | 'ongoing'} ProjectDelivery */

/**
 * Một sản phẩm hoặc repo công khai thuộc dự án.
 * URL nội bộ tính từ public/, không ghi public/ hoặc BASE_URL vào dữ liệu.
 * @typedef {Object} ProjectLink
 * @property {string} id
 * @property {string} label
 * @property {string} url
 * @property {'demo' | 'site' | 'github'} kind
 * @property {string} [category]
 * @property {string} [description]
 * @property {string[]} [techStack]
 * @property {string} [desktopUrl]
 * @property {string} [mobileUrl]
 */

/**
 * @typedef {Object} Project
 * @property {string} id ID duy nhất toàn portfolio, giữ ổn định cho link #project-id.
 * @property {string} name
 * @property {string} role Vai trò thực tế của chủ hồ sơ trong dự án.
 * @property {string} description Bài toán hoặc giải pháp, tách khỏi kết quả.
 * @property {string[]} achievements Kết quả đã xác nhận; để [] nếu chưa có thông tin.
 * @property {string[]} techStack Công nghệ đã xác nhận; để [] nếu chưa xác định.
 * @property {string} [demoUrl] Demo/sản phẩm chính.
 * @property {string} [githubUrl] Repo có thể công khai.
 * @property {boolean} isHighlight Ưu tiên hiển thị; nếu cả nhóm không có highlight thì hiện ba dự án đầu.
 * @property {string} [period] Mốc riêng của dự án, chỉ điền khi đã xác nhận.
 * @property {ProjectDelivery} [delivery] Ngữ cảnh phiên bản gốc / sử dụng agent / xuyên suốt.
 * @property {ProjectLink[]} [links] Nhiều demo/sản phẩm thuộc cùng một dự án.
 * @property {string[]} [details] Luồng sử dụng hoặc chi tiết triển khai.
 * @property {string} [icon]
 * @property {string} [status]
 */

/**
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} company Tên tổ chức, hoặc nhãn trung tính khi chưa công khai tên.
 * @property {string} companyId Liên kết các giai đoạn tại cùng một tổ chức.
 * @property {string} role
 * @property {string} period Khoảng thời gian đã xác nhận; kind=ongoing dùng nhãn xuyên suốt.
 * @property {string} location
 * @property {string} summary
 * @property {'work' | 'ongoing' | 'research' | 'support'} kind
 * @property {Project[]} projects Các dự án thực hiện trong giai đoạn/tổ chức này.
 * @property {{ period: string, date: string, label: string }} [agentMilestone]
 */

export {}
