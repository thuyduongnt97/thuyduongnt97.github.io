/** @typedef {import('../types/portfolio.js').Project} Project */
/** @typedef {import('../types/portfolio.js').ProjectLink} ProjectLink */

/**
 * Tách số liệu để nhấn mạnh khi render, giữ nguyên văn bản gốc của thành tựu.
 * @param {string} achievement
 * @returns {{ text: string, isMetric: boolean }[]}
 */
export function getAchievementSegments(achievement) {
  const segments = []
  const metrics = /(?<![\p{L}\p{N}_.,])[+-]?\d+(?:[.,]\d+)*(?:[ \u00a0\u202f]?%)?(?![\p{L}\p{N}_]|[.,]\d)/gu
  let position = 0

  for (const match of achievement.matchAll(metrics)) {
    if (match.index > position) {
      segments.push({ text: achievement.slice(position, match.index), isMetric: false })
    }
    segments.push({ text: match[0], isMetric: true })
    position = match.index + match[0].length
  }

  if (position < achievement.length) {
    segments.push({ text: achievement.slice(position), isMetric: false })
  }
  return segments
}

/**
 * Ưu tiên dự án nổi bật; nếu chưa đánh dấu thì hiển thị ba dự án đầu tiên.
 * @param {Project[]} projects
 * @returns {{ defaultProjects: Project[], additionalProjects: Project[] }}
 */
export function splitExperienceProjects(projects) {
  const highlights = projects.filter((project) => project.isHighlight === true)
  const defaultProjects = highlights.length ? highlights : projects.slice(0, 3)
  const defaultIds = new Set(defaultProjects.map((project) => project.id))
  return {
    defaultProjects,
    additionalProjects: projects.filter((project) => !defaultIds.has(project.id)),
  }
}

/**
 * Giữ URL demo tương thích khi portfolio chạy ở gốc hoặc thư mục GitHub Pages.
 * @param {string} url
 * @param {string} [baseUrl]
 * @returns {string}
 */
export function resolveProjectUrl(url, baseUrl = import.meta.env?.BASE_URL ?? '/') {
  if (/^https?:\/\//i.test(url)) return url
  return `${baseUrl.replace(/\/?$/, '/')}${url.replace(/^\/+/, '')}`
}

/**
 * Trả về các link của một dự án, thêm demo/repo chính nếu chưa có trong links.
 * @param {Project} project
 * @returns {ProjectLink[]}
 */
export function getProjectLinks(project) {
  const links = [...(project.links ?? [])]
  if (project.demoUrl && !links.some((link) => link.url === project.demoUrl)) {
    links.unshift({ id: `${project.id}-demo`, label: project.name, url: project.demoUrl, kind: 'demo' })
  }
  if (project.githubUrl && !links.some((link) => link.url === project.githubUrl)) {
    links.push({ id: `${project.id}-github`, label: 'Mã nguồn GitHub', url: project.githubUrl, kind: 'github' })
  }
  return links
}

/** @param {Project} project */
export function getProjectDeliveryLabel(project) {
  return {
    'before-ai': 'Bản gốc trước AI/agent',
    'with-agents': 'Giai đoạn dùng agent',
    ongoing: 'Công việc xuyên suốt',
  }[project.delivery] ?? ''
}
