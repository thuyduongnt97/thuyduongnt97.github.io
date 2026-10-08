import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'
import { experiences } from '../src/data/experiences.js'
import { getAchievementSegments, getProjectLinks, resolveProjectUrl, splitExperienceProjects } from '../src/utils/portfolio.js'

test('achievement metrics emphasize quantities and percentages without changing the result text', () => {
  const achievement = 'Giảm 32,5% thời gian xử lý; phục vụ 1.200 lượt và tăng +18 %.'
  const segments = getAchievementSegments(achievement)
  assert.equal(segments.map((segment) => segment.text).join(''), achievement)
  assert.deepEqual(segments.filter((segment) => segment.isMetric).map((segment) => segment.text), ['32,5%', '1.200', '+18 %'])
})

test('achievement text without metrics and technology identifiers remain plain text', () => {
  for (const achievement of ['Triển khai giao diện theo thiết kế.', 'Tích hợp HTML5 và Vue3.5.']) {
    const segments = getAchievementSegments(achievement)
    assert.equal(segments.map((segment) => segment.text).join(''), achievement)
    assert.ok(segments.every((segment) => !segment.isMetric))
  }
})

test('achievement segmentation preserves literal markup as text for Vue interpolation', () => {
  const achievement = '<b>50%</b> & "2" kết quả'
  const segments = getAchievementSegments(achievement)
  assert.equal(segments.map((segment) => segment.text).join(''), achievement)
  assert.deepEqual(segments.filter((segment) => segment.isMetric).map((segment) => segment.text), ['50%', '2'])
})

const findExperience = (id) => experiences.find((experience) => experience.id === id)
const findProject = (id) => experiences.flatMap((experience) => experience.projects).find((project) => project.id === id)

test('all existing projects belong to the correct work stage or organization exactly once', () => {
  const expected = {
    'work-with-agents': ['rebuild', 'landing-pages', 'government-map', 'recognition-event', 'feature-core', 'ad-sponsor'],
    'work-before-agents': ['ad-operations', 'ads', 'qr', 'ad-maintenance', 'maps', 'experiments', 'minigames'],
    'work-ongoing': ['emagazines'],
    'research-transfer': ['enrollment-management', 'non-formal-training'],
    'enrollment-support': [],
  }
  assert.deepEqual(experiences.map((experience) => experience.id), Object.keys(expected))
  for (const [id, projectIds] of Object.entries(expected)) {
    assert.deepEqual(findExperience(id).projects.map((project) => project.id), projectIds)
  }
  const projectIds = experiences.flatMap((experience) => experience.projects.map((project) => project.id))
  assert.equal(new Set(projectIds).size, projectIds.length)
})

test('experience and project records follow the JavaScript data contract', () => {
  for (const experience of experiences) {
    for (const key of ['id', 'company', 'companyId', 'role', 'period', 'location', 'summary']) {
      assert.equal(typeof experience[key], 'string', `${experience.id}.${key}`)
      assert.ok(experience[key].trim(), `${experience.id}.${key} cannot be empty`)
    }
    assert.ok(Array.isArray(experience.projects))
    for (const project of experience.projects) {
      for (const key of ['id', 'name', 'role', 'description']) {
        assert.equal(typeof project[key], 'string', `${project.id}.${key}`)
        assert.ok(project[key].trim(), `${project.id}.${key} cannot be empty`)
      }
      for (const key of ['achievements', 'techStack']) {
        assert.ok(Array.isArray(project[key]), `${project.id}.${key}`)
        assert.ok(project[key].every((value) => typeof value === 'string' && value.trim()))
      }
      assert.equal(typeof project.isHighlight, 'boolean')
    }
  }
})

test('confirmed dates are preserved and ongoing work has no invented date or AI stage', () => {
  assert.deepEqual(experiences.filter((experience) => experience.kind !== 'ongoing').map((experience) => experience.period), [
    '08/2025 — Hiện tại', '2019 — Trước 08/2025', '09/2018 — 05/2019', '07/2016 — 09/2018',
  ])
  assert.equal(findProject('ad-operations').period, '2019 — 2020')
  assert.equal(findProject('ads').period, '2020 — 2023')
  assert.equal(findProject('qr').period, '2020 — 2023')
  assert.equal(findProject('experiments').period, '2024')
  assert.equal(findExperience('work-with-agents').agentMilestone.date, '2025-08')
  assert.equal(findProject('emagazines').period, undefined)
  assert.equal(findProject('emagazines').delivery, 'ongoing')
  for (const id of ['work-with-agents', 'work-before-agents', 'work-ongoing']) {
    assert.equal(findExperience(id).companyId, 'current-employer')
  }
})

test('each main work stage has three highlights while secondary projects remain available', () => {
  for (const id of ['work-with-agents', 'work-before-agents']) {
    const projects = findExperience(id).projects
    assert.equal(projects.filter((project) => project.isHighlight).length, 3)
    assert.ok(projects.some((project) => !project.isHighlight))
  }
  assert.equal(findProject('maps').isHighlight, true)
  assert.equal(findProject('landing-pages').isHighlight, true)
  assert.equal(findExperience('research-transfer').projects.filter((project) => project.isHighlight).length, 2)
})

test('experience project split keeps every highlight and preserves source order in both groups', () => {
  const projects = [
    { id: 'additional-first', isHighlight: false },
    { id: 'highlight-first', isHighlight: true },
    { id: 'highlight-second', isHighlight: true },
    { id: 'additional-second', isHighlight: false },
    { id: 'highlight-third', isHighlight: true },
    { id: 'highlight-fourth', isHighlight: true },
  ]
  const { defaultProjects, additionalProjects } = splitExperienceProjects(projects)
  assert.deepEqual(defaultProjects.map((project) => project.id), [
    'highlight-first', 'highlight-second', 'highlight-third', 'highlight-fourth',
  ])
  assert.deepEqual(additionalProjects.map((project) => project.id), ['additional-first', 'additional-second'])
})

test('experience without highlights defaults to its first three projects', () => {
  const projects = Array.from({ length: 5 }, (_, index) => ({ id: `project-${index}`, isHighlight: false }))
  const { defaultProjects, additionalProjects } = splitExperienceProjects(projects)
  assert.deepEqual(defaultProjects.map((project) => project.id), ['project-0', 'project-1', 'project-2'])
  assert.deepEqual(additionalProjects.map((project) => project.id), ['project-3', 'project-4'])
})

test('fallback shows all projects when there are at most three and accepts an empty experience', () => {
  for (const length of [0, 1, 2, 3]) {
    const projects = Array.from({ length }, (_, index) => ({ id: `project-${index}`, isHighlight: false }))
    const { defaultProjects, additionalProjects } = splitExperienceProjects(projects)
    assert.deepEqual(defaultProjects, projects, `Fallback for ${length} projects`)
    assert.deepEqual(additionalProjects, [], `No additional projects for ${length} projects`)
  }
})

test('project grouping does not mutate the source array or records in either branch', () => {
  for (const hasHighlights of [true, false]) {
    const projects = Object.freeze([
      Object.freeze({ id: 'first', isHighlight: false }),
      Object.freeze({ id: 'second', isHighlight: hasHighlights }),
      Object.freeze({ id: 'third', isHighlight: false }),
      Object.freeze({ id: 'fourth', isHighlight: hasHighlights }),
    ])
    const before = projects.map((project) => ({ ...project }))
    splitExperienceProjects(projects)
    assert.deepEqual(projects, before)
  }
})

test('both landing pages and both PC/mobile demo entries are retained without duplicated links', () => {
  assert.deepEqual(getProjectLinks(findProject('landing-pages')).map((link) => link.url), [
    'https://omogieotrieumamxanh.vn/', 'https://athenacm.dev.vcadm.vn/',
  ])
  const demos = getProjectLinks(findProject('maps'))
  assert.deepEqual(demos.map((link) => [link.url, link.desktopUrl, link.mobileUrl]), [
    ['interactives/cao-toc-bac-nam/index.html', 'interactives/cao-toc-bac-nam/pc/index.html', 'interactives/cao-toc-bac-nam/mb/index.html'],
    ['interactives/ham-giao-thong/index.html', 'interactives/ham-giao-thong/PC/index.html', 'interactives/ham-giao-thong/MB/index.html'],
  ])
  for (const link of demos) {
    for (const url of [link.url, link.desktopUrl, link.mobileUrl]) {
      assert.ok(existsSync(new URL(`../public/${url}`, import.meta.url)), `Missing demo: ${url}`)
    }
  }
})

test('demo and repository fields work without extra link records and do not mutate source data', () => {
  const project = { id: 'sample', name: 'Sample', demoUrl: 'interactives/sample/index.html', githubUrl: 'https://github.com/example/sample' }
  assert.deepEqual(getProjectLinks(project).map((link) => link.kind), ['demo', 'github'])
  assert.equal(project.links, undefined)
  project.links = [{ id: 'existing', label: 'Demo', url: project.demoUrl, kind: 'demo' }]
  assert.equal(getProjectLinks(project).length, 2)
  assert.equal(project.links.length, 1)
})

test('local links support GitHub Pages subdirectories while public URLs stay unchanged', () => {
  const entry = 'interactives/cao-toc-bac-nam/index.html'
  assert.equal(resolveProjectUrl(entry, '/'), `/${entry}`)
  assert.equal(resolveProjectUrl(entry, '/portfolio/'), `/portfolio/${entry}`)
  assert.equal(resolveProjectUrl(`/${entry}`, '/portfolio'), `/portfolio/${entry}`)
  assert.equal(resolveProjectUrl('https://omogieotrieumamxanh.vn/', '/portfolio/'), 'https://omogieotrieumamxanh.vn/')
})
