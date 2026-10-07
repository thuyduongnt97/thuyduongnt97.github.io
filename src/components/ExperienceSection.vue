<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import ProjectCard from './ProjectCard.vue'
import SectionHead from './SectionHead.vue'
import { experiences } from '../data/experiences'
import { splitExperienceProjects } from '../utils/portfolio'

const experienceGroups = experiences.map((experience) => ({
  ...experience,
  ...splitExperienceProjects(experience.projects),
}))
const expandedExperienceIds = ref(new Set())
const projectTransitions = new Map()
const toggleRevisions = new Map()
let reducedMotionQuery
let mounted = false

const kindLabels = {
  ongoing: 'Công việc xuyên suốt',
  research: 'Nghiên cứu & chuyển giao công nghệ',
  support: 'Giai đoạn nền tảng',
}

const resetTransitionStyles = (element) => {
  element.style.removeProperty('height')
  element.style.removeProperty('opacity')
  element.style.removeProperty('overflow')
}

const prepareExpand = (element) => {
  // A cancelled leave keeps its current size, so reversing does not jump.
  if (!element.style.height) element.style.height = '0px'
  if (!element.style.opacity) element.style.opacity = '0'
  element.style.overflow = 'hidden'
}

const finishProjectTransition = (element) => {
  const transition = projectTransitions.get(element)
  projectTransitions.delete(element)
  resetTransitionStyles(element)
  transition?.resolve(true)
}

const cancelProjectTransition = (element) => {
  const transition = projectTransitions.get(element)
  if (!transition) return

  const height = element.getBoundingClientRect().height
  const opacity = getComputedStyle(element).opacity
  transition.animation.onfinish = null
  transition.animation.cancel()
  projectTransitions.delete(element)
  element.style.height = height + 'px'
  element.style.opacity = opacity
  element.style.overflow = 'hidden'
  transition.resolve(false)
}

const animateProjects = (element, done, expanding) => {
  const startHeight = element.getBoundingClientRect().height
  const startOpacity = Number.parseFloat(getComputedStyle(element).opacity)
  // The inner grid's layout height excludes translated v-reveal children.
  const endHeight = expanding ? element.firstElementChild.getBoundingClientRect().height : 0
  const endOpacity = expanding ? 1 : 0
  element.style.overflow = 'hidden'

  if (reducedMotionQuery?.matches || !element.animate) {
    done()
    return
  }

  let resolve
  const promise = new Promise((complete) => { resolve = complete })
  const animation = element.animate(
    [
      { height: startHeight + 'px', opacity: startOpacity },
      { height: endHeight + 'px', opacity: endOpacity },
    ],
    { duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' },
  )
  const transition = { animation, promise, resolve }
  projectTransitions.set(element, transition)

  animation.onfinish = () => {
    if (projectTransitions.get(element) !== transition) return
    element.style.height = endHeight + 'px'
    element.style.opacity = String(endOpacity)
    animation.onfinish = null
    animation.cancel()
    done()
  }
}

const expandProjects = (element, done) => animateProjects(element, done, true)
const collapseProjects = (element, done) => animateProjects(element, done, false)

const waitForProjectTransition = (experienceId) => {
  const element = document.getElementById('experience-extra-' + experienceId)
  return projectTransitions.get(element)?.promise ?? Promise.resolve(true)
}

const onReducedMotionChange = ({ matches }) => {
  if (matches) {
    projectTransitions.forEach(({ animation }) => animation.finish())
  }
}

const toggleExperience = async (experienceId, event) => {
  const button = event.currentTarget
  const focusAtToggle = document.activeElement
  const revision = (toggleRevisions.get(experienceId) ?? 0) + 1
  toggleRevisions.set(experienceId, revision)
  const collapsing = expandedExperienceIds.value.has(experienceId)
  if (collapsing) expandedExperienceIds.value.delete(experienceId)
  else expandedExperienceIds.value.add(experienceId)

  await nextTick()
  if (!collapsing) return
  const completed = await waitForProjectTransition(experienceId)
  if (!completed || !mounted || toggleRevisions.get(experienceId) !== revision || expandedExperienceIds.value.has(experienceId)) return
  // Keep a later keyboard/click interaction from having its focus taken back.
  if (document.activeElement !== focusAtToggle && document.activeElement !== button && document.activeElement !== document.body) return

  button.focus({ preventScroll: true })
  const { top, bottom } = button.getBoundingClientRect()
  const navBottom = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0
  if (top < navBottom + 12 || bottom > window.innerHeight - 12) {
    button.scrollIntoView({ block: 'nearest' })
  }
}

const revealLinkedProject = async () => {
  const requestedHash = window.location.hash
  let targetId
  try {
    targetId = decodeURIComponent(requestedHash.slice(1))
  } catch {
    return
  }
  if (!targetId.startsWith('project-')) return

  const experience = experienceGroups.find((group) =>
    group.projects.some((project) => 'project-' + project.id === targetId),
  )
  if (!experience) return

  const additional = experience.additionalProjects.some((project) => 'project-' + project.id === targetId)
  if (additional) expandedExperienceIds.value.add(experience.id)
  await nextTick()
  if (additional && !(await waitForProjectTransition(experience.id))) return
  if (!mounted || window.location.hash !== requestedHash) return
  document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
}

onMounted(() => {
  mounted = true
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', onReducedMotionChange)
  revealLinkedProject()
  window.addEventListener('hashchange', revealLinkedProject)
})
onBeforeUnmount(() => {
  mounted = false
  window.removeEventListener('hashchange', revealLinkedProject)
  reducedMotionQuery?.removeEventListener('change', onReducedMotionChange)
  projectTransitions.forEach((transition, element) => {
    transition.animation.onfinish = null
    transition.animation.cancel()
    resetTransitionStyles(element)
    transition.resolve(false)
  })
  projectTransitions.clear()
})
</script>

<template>
  <section id="experience" aria-labelledby="experience-title">
    <span id="projects" class="experience-anchor" aria-hidden="true"></span>
    <span id="showcase" class="experience-anchor" aria-hidden="true"></span>
    <div class="container">
      <SectionHead
        eyebrow="02 — Kinh nghiệm & dự án"
        title="Kinh nghiệm & dự án"
        title-id="experience-title"
        sub="Các dự án tiêu biểu theo từng giai đoạn làm việc. Demo và landing page được chọn lọc để chia sẻ công khai, đồng thời tôn trọng bảo mật thông tin của công ty."
      />

      <div class="experience-list">
        <article
          v-for="experience in experienceGroups"
          :key="experience.id"
          class="experience-entry"
          :class="'experience-entry--' + experience.kind"
          :aria-labelledby="'experience-' + experience.id"
        >
          <header class="experience-entry__head">
            <div v-reveal class="experience-entry__identity">
              <p v-if="experience.period" class="experience-entry__period"><BaseIcon name="calendar" /> {{ experience.period }}</p>
              <p v-if="kindLabels[experience.kind]" class="experience-entry__kind">{{ kindLabels[experience.kind] }}</p>
              <h3 :id="'experience-' + experience.id">{{ experience.company }}</h3>
              <p v-if="experience.role" class="experience-entry__role">{{ experience.role }}</p>
              <p v-if="experience.location" class="experience-entry__location"><BaseIcon name="pin" /> {{ experience.location }}</p>
              <p v-if="experience.summary" class="experience-entry__summary">{{ experience.summary }}</p>
              <div v-if="experience.agentMilestone" id="agent-milestone" class="experience-agent">
                <BaseIcon name="sparkle" />
                <p>
                  <time :datetime="experience.agentMilestone.date">{{ experience.agentMilestone.period }}</time>
                  · {{ experience.agentMilestone.label }}
                </p>
              </div>
            </div>
          </header>

          <div v-if="experience.projects.length" class="experience-entry__body">
            <div class="experience-projects">
              <ProjectCard v-for="project in experience.defaultProjects" :key="project.id" :project="project" />
            </div>
            <Transition
              v-if="experience.additionalProjects.length"
              :css="false"
              @before-enter="prepareExpand"
              @enter="expandProjects"
              @after-enter="finishProjectTransition"
              @enter-cancelled="cancelProjectTransition"
              @leave="collapseProjects"
              @after-leave="finishProjectTransition"
              @leave-cancelled="cancelProjectTransition"
            >
              <div
                v-show="expandedExperienceIds.has(experience.id)"
                :id="'experience-extra-' + experience.id"
                class="experience-extra"
                role="region"
                :aria-label="'Dự án khác tại ' + experience.company + ', ' + experience.period"
                :aria-hidden="!expandedExperienceIds.has(experience.id)"
                :inert="!expandedExperienceIds.has(experience.id)"
              >
                <div class="experience-projects experience-projects--additional">
                  <ProjectCard v-for="project in experience.additionalProjects" :key="project.id" :project="project" />
                </div>
              </div>
            </Transition>
            <button
              v-if="experience.additionalProjects.length"
              class="btn btn--ghost experience-toggle"
              type="button"
              :aria-expanded="expandedExperienceIds.has(experience.id)"
              :aria-controls="'experience-extra-' + experience.id"
              @click="toggleExperience(experience.id, $event)"
            >
              <template v-if="expandedExperienceIds.has(experience.id)">Thu gọn</template>
              <template v-else>Xem thêm +{{ experience.additionalProjects.length }} dự án khác tại {{ experience.company }}</template>
              <BaseIcon class="experience-toggle__icon" name="chevron-down" />
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-anchor { display: block; height: 0; scroll-margin-top: calc(var(--nav-h) + 12px); }
.experience-list { display: grid; gap: 3rem; }
.experience-entry { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: clamp(1.5rem, 3vw, 2.5rem); min-width: 0; }
.experience-entry + .experience-entry { padding-top: 3rem; border-top: 1px solid var(--border); }
.experience-entry__head { position: sticky; top: calc(var(--nav-h) + 1.25rem); align-self: start; min-width: 0; padding-left: 1.15rem; border-left: 1px solid var(--border-strong); }
.experience-entry__head::before { content: ''; position: absolute; top: .3rem; left: -5px; width: 9px; height: 9px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--bg); }
.experience-entry__identity { min-width: 0; }
.experience-entry__period { display: flex; align-items: flex-start; gap: .4rem; margin-bottom: .65rem; color: var(--text-muted); font-family: var(--font-mono); font-size: .82rem; line-height: 1.6; }
.experience-entry__period .icon, .experience-entry__location .icon { flex-shrink: 0; width: 1rem; height: 1rem; margin-top: .1rem; }
.experience-entry__kind { margin-bottom: .25rem; color: var(--text-muted); font-family: var(--font-mono); font-size: .75rem; line-height: 1.5; }
.experience-entry__head h3 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; line-height: 1.4; letter-spacing: -.02em; overflow-wrap: anywhere; }
.experience-entry__role { margin-top: .2rem; color: var(--text-muted); font-size: .88rem; line-height: 1.55; }
.experience-entry__location { display: flex; align-items: flex-start; gap: .35rem; margin-top: .4rem; color: var(--text-muted); font-size: .82rem; line-height: 1.6; }
.experience-entry__summary { margin-top: .75rem; color: var(--text-muted); font-size: .94rem; line-height: 1.75; }
.experience-entry__body { min-width: 0; }
.experience-agent { display: flex; align-items: flex-start; gap: .45rem; width: fit-content; max-width: 100%; margin-top: .65rem; padding: .55rem .7rem; border: 1px solid var(--border); border-radius: 9px; background: var(--bg-soft); scroll-margin-top: 6rem; }
.experience-agent > .icon { width: 1rem; height: 1rem; margin-top: .1rem; color: var(--accent); }
.experience-agent p { color: var(--text-muted); font-size: .82rem; line-height: 1.55; }
.experience-agent time { color: var(--text); font-family: var(--font-mono); font-weight: 500; white-space: nowrap; }
.experience-projects { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.15rem; }
.experience-projects--additional { padding-top: 1.15rem; }
.experience-toggle { max-width: 100%; margin-top: 1rem; padding: .65rem .9rem; color: var(--accent); font-size: .86rem; text-align: left; line-height: 1.5; scroll-margin-top: calc(var(--nav-h) + 20px); }
.experience-toggle__icon { flex-shrink: 0; transition: transform .2s; }
.experience-toggle[aria-expanded="true"] .experience-toggle__icon { transform: rotate(180deg); }
@media (max-width: 1024px) {
  .experience-entry { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
  .experience-entry__head { position: relative; top: auto; }
}
@media (max-width: 560px) {
  .experience-list { gap: 1.75rem; }
  .experience-entry + .experience-entry { padding-top: 1.75rem; border-top: 1px solid var(--border); }
  .experience-entry__head h3 { font-size: 1.2rem; }
  .experience-projects { gap: 1rem; }
  .experience-projects--additional { padding-top: 1rem; }
}
@media (prefers-reduced-motion: reduce) {
  .experience-toggle__icon { transition: none; }
}
</style>
