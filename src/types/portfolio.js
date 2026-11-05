/**
 * Hợp đồng dữ liệu Portfolio bằng JSDoc, dùng trực tiếp với JavaScript hiện tại.
 * Experience là nguồn sở hữu Project; dự án không được lưu lại ở mảng độc lập.
 */

/** @typedef {'before-ai' | 'with-agents' | 'ongoing'} ProjectDelivery */
/** @typedef {'webgis' | 'webapp' | 'adtech' | 'motion'} ProjectCategory */
/** @typedef {'adtech-tools' | 'template-widgets' | 'spatial-maps' | 'core-box-features' | 'campaigns-editorials' | 'events-gamification' | 'university-systems'} DeliverableGroupId */
/** @typedef {'all' | ProjectCategory | DeliverableGroupId} PortfolioFilter */

/**
 * Một sản phẩm hoặc repo công khai thuộc dự án.
 * URL nội bộ tính từ public/, không ghi public/ hoặc BASE_URL vào dữ liệu.
 * @typedef {Object} ProjectLink
 * @property {string} id
 * @property {string} label
 * @property {string} [labelEn]
 * @property {string} url
 * @property {'demo' | 'site' | 'github'} kind
 * @property {string} [category]
 * @property {string} [description]
 * @property {string[]} [techStack]
 * @property {string} [desktopUrl]
 * @property {string} [mobileUrl]
 */

/**
 * @typedef {Object} ProjectScreenshot
 * @property {string} src Đường dẫn ảnh tính từ public/, tương thích BASE_URL.
 * @property {string} label Tên ảnh hiển thị dưới thumbnail và trong cửa sổ xem ảnh.
 * @property {string} [labelEn]
 * @property {string} alt Mô tả nội dung ảnh cho trình đọc màn hình.
 */

/**
 * @typedef {Object} ProjectCaseStudy
 * @property {string} challenge
 * @property {string} [challengeEn]
 * @property {string} [solution]
 * @property {string} [solutionEn]
 * @property {string[]} [actions]
 * @property {string[]} [actionsEn]
 * @property {string} impact
 * @property {string} [impactEn]
 * @property {string} [insight]
 * @property {string} [insightEn]
 * @property {{ mine: string, others: string, mineEn?: string, othersEn?: string }} [scopeNote]
 * @property {{ label: string, labelEn?: string, value: string, valueEn?: string }[]} [metrics]
 */

/**
 * @typedef {Object} Project
 * @property {string} id ID duy nhất toàn portfolio, giữ ổn định cho link #project-id.
 * @property {string} name
 * @property {string} [nameEn]
 * @property {string} role Vai trò thực tế của chủ hồ sơ trong dự án.
 * @property {string} [roleEn]
 * @property {string} description Bài toán hoặc giải pháp, tách khỏi kết quả.
 * @property {string} [descriptionEn]
 * @property {string[]} achievements Kết quả đã xác nhận; để [] nếu chưa có thông tin.
 * @property {string[]} [achievementsEn]
 * @property {string[]} techStack Công nghệ đã xác nhận; để [] nếu chưa xác định.
 * @property {ProjectCaseStudy} [caseStudy]
 * @property {{ label: string, labelEn?: string, value: string, valueEn?: string }[]} [metrics]
 * @property {string} [demoUrl] Demo/sản phẩm chính.
 * @property {string} [githubUrl] Repo có thể công khai.
 * @property {boolean} isHighlight Ưu tiên hiển thị; nếu cả nhóm không có highlight thì hiện ba dự án đầu.
 * @property {string} [period] Mốc riêng của dự án, chỉ điền khi đã xác nhận.
 * @property {ProjectDelivery} [delivery] Ngữ cảnh phiên bản gốc / sử dụng agent / xuyên suốt.
 * @property {ProjectCategory} [filterCategory] Nhóm phân loại chính cho bộ lọc (webgis, webapp, adtech, motion).
 * @property {string} [category] Nhãn danh mục dự án.
 * @property {string} [domain] Mảng sản phẩm hiển thị trên thẻ dự án.
 * @property {string[]} [categories] Danh sách danh mục hỗ trợ đa phân loại.
 * @property {string[]} [categoryTags] Tag tương thích ngược cho bộ lọc cũ.
 * @property {string} [sampleNotice] Ghi chú dẫn link minh họa tiêu biểu.
 * @property {ProjectLink[]} [links] Nhiều demo/sản phẩm thuộc cùng một dự án.
 * @property {string[]} [details] Luồng sử dụng hoặc chi tiết triển khai.
 * @property {ProjectScreenshot[]} [screenshots] Ảnh chụp thực tế, khai báo tại data/projectScreenshots.js.
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

/**
 * Nhóm trình bày trong #deliverables; chỉ tham chiếu dự án thuộc Experience.
 * @typedef {Object} DeliverableGroup
 * @property {string} id
 * @property {string} title
 * @property {string} [titleEn]
 * @property {ProjectCategory} filterCategory
 * @property {ProjectCategory[]} categories
 * @property {string} domain
 * @property {string} [domainEn]
 * @property {string} [period] Để trống khi bản mẫu không xác nhận thời gian.
 * @property {string} [periodEn]
 * @property {'core' | 'secondary' | 'supporting'} [tier]
 * @property {string} [roleBadge]
 * @property {string} [roleBadgeEn]
 * @property {string} [impact]
 * @property {string} [impactEn]
 * @property {string} [caseProjectId]
 * @property {{ label: string, labelEn?: string, value: string, valueEn?: string }[]} [cardMetrics]
 * @property {string[]} projectIds ID dự án theo thứ tự hiển thị trong nhóm.
 * @property {string[]} techStack Công nghệ tóm tắt của nhóm theo bản mẫu.
 * @property {string} [architecture] Luồng xử lý kỹ thuật hiển thị trong box điểm nhấn.
 * @property {string} [architectureEn]
 * @property {{ label: string, labelEn?: string, html: string, htmlEn?: string }[]} sections Nội dung trình bày tĩnh từ bản mẫu; không nhận HTML người dùng.
 * @property {boolean} isSupporting Nhóm bổ trợ hiển thị gọn hơn thẻ chính.
 */

/**
 * @typedef {Object} SkillSubMetric
 * @property {string} label
 * @property {string} [labelEn]
 * @property {string} value
 * @property {string} [valueEn]
 */

/**
 * @typedef {Object} SkillPillar
 * @property {string} id
 * @property {ProjectCategory} filterCategory
 * @property {string} categoryTitle
 * @property {string} [categoryTitleEn]
 * @property {string} title
 * @property {string} [titleEn]
 * @property {string} yearsBadge
 * @property {string} [yearsBadgeEn]
 * @property {string} period
 * @property {string} [periodEn]
 * @property {string} icon
 * @property {string} accentColor
 * @property {SkillSubMetric[]} subMetrics
 * @property {string[]} deliverables
 * @property {string[]} [deliverablesEn]
 * @property {string[]} chips
 */

/**
 * @typedef {Object} SkillDetailedItem
 * @property {string} id
 * @property {string} skill
 * @property {string} [skillEn]
 * @property {string} years
 * @property {string} [yearsEn]
 * @property {string} timeline
 * @property {string} [timelineEn]
 * @property {number} percent
 * @property {string} color
 * @property {string} deliverables
 * @property {string} [deliverablesEn]
 */

/**
 * @typedef {Object} RecognitionItem
 * @property {string} id
 * @property {string} icon
 * @property {string} emoji
 * @property {string} badge
 * @property {string} [badgeEn]
 * @property {string} title
 * @property {string} [titleEn]
 * @property {string} description
 * @property {string} [descriptionEn]
 * @property {string} color
 * @property {string} accentColor
 * @property {number[]} [years]
 * @property {string} [period]
 * @property {string} [institution]
 */

/**
 * @typedef {Object} TimelineMilestone
 * @property {string} id
 * @property {string} period
 * @property {string} [periodEn]
 * @property {string} role
 * @property {string} [roleEn]
 * @property {string} company
 * @property {string} [companyEn]
 * @property {string} [department]
 * @property {string} [location]
 * @property {boolean} isCurrent
 * @property {string} [badge]
 * @property {string} [award]
 * @property {string} [note]
 * @property {'pill' | 'text'} [periodStyle]
 * @property {string} [color]
 * @property {boolean} [compact]
 * @property {{ label: string, labelEn?: string, color: string }[]} [badges]
 * @property {string[]} bulletPoints
 * @property {string[]} [bulletPointsEn]
 * @property {string} summary
 * @property {string} [summaryEn]
 * @property {string} icon
 */

/**
 * @typedef {TimelineMilestone & { milestones: TimelineMilestone[], tenure?: string, tenureEn?: string }} TimelineGroup
 */

export {}
