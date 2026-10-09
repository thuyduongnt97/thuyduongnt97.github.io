<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
import { useAccent } from '../composables/useAccent'
import { useCommandPalette } from '../composables/useCommandPalette'
import { useTheme } from '../composables/useTheme'
import { lockScroll, unlockScroll, forceUnlockScroll } from '../utils/scrollLock.js'

const { isOpen, close, toggle, setActiveFilter, toastMessage, showToast } = useCommandPalette()
const { accents, currentAccent, setAccent } = useAccent()
const { theme, toggle: toggleTheme } = useTheme()

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputEl = ref(null)
const listBodyEl = ref(null)
let previousActiveElement = null

function scrollToSection(sectionId, toastText) {
  close()
  nextTick(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    if (toastText) showToast(toastText)
  })
}

function handleFilter(filterId, label) {
  close()
  setActiveFilter(filterId)
  showToast(`✓ Đã kích hoạt bộ lọc: ${label}`)
}

function copyEmail() {
  close()
  navigator.clipboard?.writeText(profile.email).then(() => {
    showToast(`✓ Đã sao chép email: ${profile.email} vào clipboard!`)
  }).catch(() => {
    window.location.href = `mailto:${profile.email}`
  })
}

function handleThemeToggle() {
  toggleTheme()
  showToast(`✓ Đã chuyển sang giao diện: ${theme.value === 'dark' ? 'Tối' : 'Sáng'}`)
}

function handleAccent(accentId, label) {
  setAccent(accentId)
  showToast(`✓ Đã đổi màu Accent sang: ${label}`)
}

const commandItems = [
  // 1. Quick Navigation to Sections
  { id: 'sec-hero', title: 'Về tôi (Giới thiệu & Định vị)', category: 'Chuyển nhanh Section', icon: 'sparkle', action: () => scrollToSection('hero') },
  { id: 'sec-skills', title: 'Kỹ năng chuyên môn (Bento Architecture)', category: 'Chuyển nhanh Section', icon: 'code', action: () => scrollToSection('skills') },
  { id: 'sec-exp', title: 'Dự án tiêu biểu (Visual Case Studies)', category: 'Chuyển nhanh Section', icon: 'layers', action: () => scrollToSection('experience') },
  { id: 'sec-timeline', title: 'Lịch sử sự nghiệp (Career Timeline & Milestones)', category: 'Chuyển nhanh Section', icon: 'briefcase', action: () => scrollToSection('timeline') },
  { id: 'sec-edu', title: 'Học vấn & Bằng cấp', category: 'Chuyển nhanh Section', icon: 'cap', action: () => scrollToSection('education') },
  { id: 'sec-vitals', title: 'Thước đo chất lượng (Core Web Vitals & Clean Code)', category: 'Chuyển nhanh Section', icon: 'zap', action: () => scrollToSection('engineering-vitals', '⚡ Khám phá chỉ số Core Web Vitals') },
  { id: 'sec-contact', title: 'Liên hệ & Hợp tác', category: 'Chuyển nhanh Section', icon: 'mail', action: () => scrollToSection('contact') },

  // 2. Tech Stack Filter & Deep-links
  { id: 'tech-vue', title: 'Lọc dự án: Vue / Nuxt.js', category: 'Bộ lọc công nghệ', icon: 'code', action: () => handleFilter('vue', 'Vue / Nuxt') },
  { id: 'tech-react', title: 'Lọc dự án: React / Next.js', category: 'Bộ lọc công nghệ', icon: 'code', action: () => handleFilter('react', 'React / Next.js') },
  { id: 'tech-ds', title: 'Lọc dự án: Design System & UI', category: 'Bộ lọc công nghệ', icon: 'layers', action: () => handleFilter('design-system', 'Design System & UI') },
  { id: 'tech-perf', title: 'Lọc dự án: Performance Optimization & GIS', category: 'Bộ lọc công nghệ', icon: 'zap', action: () => handleFilter('perf', 'Performance Optimization') },
  { id: 'tech-ts', title: 'Kỹ năng: TypeScript & JavaScript ES6+', category: 'Kỹ năng chuyên môn', icon: 'code', action: () => scrollToSection('skills', '⚡ Khám phá kỹ năng TypeScript & ES6+') },
  { id: 'tech-tw', title: 'Kỹ năng: Tailwind CSS & Design System Architecture', category: 'Kỹ năng chuyên môn', icon: 'layers', action: () => scrollToSection('skills', '⚡ Khám phá kỹ năng Tailwind & Design System') },
  { id: 'tech-gsap', title: 'Kỹ năng: GSAP Animation & SVG Manipulation', category: 'Kỹ năng chuyên môn', icon: 'zap', action: () => scrollToSection('skills', '⚡ Khám phá kỹ năng GSAP Animation') },

  // 3. Quick Actions
  { id: 'act-email', title: `Sao chép Email: ${profile.email}`, category: 'Hành động nhanh', icon: 'copy', action: copyEmail },
  { id: 'act-cv', title: 'Tải CV hoàn chỉnh (PDF)', category: 'Hành động nhanh', icon: 'download', action: () => { window.open(profile.cvUrl, '_blank') } },
  { id: 'act-theme', title: 'Đổi Theme Sáng / Tối', category: 'Hành động nhanh', icon: 'sun', action: handleThemeToggle },

  // 4. Accent Palette
  { id: 'acc-indigo', title: 'Đổi Accent: Indigo (Mặc định)', category: 'Bảng màu Accent', icon: 'sparkle', action: () => handleAccent('indigo', 'Indigo') },
  { id: 'acc-emerald', title: 'Đổi Accent: Emerald (Xanh ngọc)', category: 'Bảng màu Accent', icon: 'sparkle', action: () => handleAccent('emerald', 'Emerald') },
  { id: 'acc-rose', title: 'Đổi Accent: Rose (Hồng đào)', category: 'Bảng màu Accent', icon: 'sparkle', action: () => handleAccent('rose', 'Rose') },
  { id: 'acc-amber', title: 'Đổi Accent: Amber (Hổ phách)', category: 'Bảng màu Accent', icon: 'sparkle', action: () => handleAccent('amber', 'Amber') },

  // 5. Featured Projects
  { id: 'proj-omo', title: 'OMO — Gieo triệu mầm xanh (FMCG Campaign)', category: 'Dự án tiêu biểu', icon: 'external', action: () => scrollToSection('project-landing-pages') },
  { id: 'proj-athena', title: 'Landing page Athena (MarTech)', category: 'Dự án tiêu biểu', icon: 'external', action: () => scrollToSection('project-landing-pages') },
  { id: 'proj-gis', title: 'Bản đồ số & GIS Layers (Leaflet GovTech)', category: 'Dự án tiêu biểu', icon: 'map', action: () => scrollToSection('project-government-map') },
  { id: 'proj-exp', title: 'Recommendation & A/B Testing Engine (BigData)', category: 'Dự án tiêu biểu', icon: 'layers', action: () => scrollToSection('project-experiments') },
  { id: 'proj-maps', title: 'Interactive Báo Giao thông (Cao tốc & Hầm)', category: 'Dự án tiêu biểu', icon: 'map', action: () => scrollToSection('project-maps') },
  { id: 'proj-ads', title: 'Ads Demo Simulator & Template Core Engine', category: 'Dự án tiêu biểu', icon: 'play', action: () => scrollToSection('project-ads') },
  { id: 'proj-emag', title: 'Emagazine Báo chí & Scrollytelling', category: 'Dự án tiêu biểu', icon: 'zap', action: () => scrollToSection('project-emagazines') },
  { id: 'proj-ai', title: 'Camera Check-in & AI Vinh danh', category: 'Dự án tiêu biểu', icon: 'sparkle', action: () => scrollToSection('project-recognition-event') },
]

const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return commandItems
  return commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
  )
})

function scrollToActiveItem(behavior = 'smooth') {
  nextTick(() => {
    const container = listBodyEl.value
    if (!container) return

    if (selectedIndex.value === 0) {
      container.scrollTo({ top: 0, behavior })
      return
    }

    if (selectedIndex.value === filteredItems.value.length - 1) {
      container.scrollTo({ top: container.scrollHeight, behavior })
      return
    }

    const items = container.querySelectorAll('.cmd-item')
    const activeEl = items[selectedIndex.value]
    if (!activeEl) return

    const containerRect = container.getBoundingClientRect()
    const itemRect = activeEl.getBoundingClientRect()

    if (itemRect.top < containerRect.top) {
      const diff = containerRect.top - itemRect.top + 8
      container.scrollTo({ top: container.scrollTop - diff, behavior })
    } else if (itemRect.bottom > containerRect.bottom) {
      const diff = itemRect.bottom - containerRect.bottom + 8
      container.scrollTo({ top: container.scrollTop + diff, behavior })
    }
  })
}

watch(filteredItems, () => {
  selectedIndex.value = 0
  nextTick(() => {
    if (listBodyEl.value) {
      listBodyEl.value.scrollTo({ top: 0, behavior: 'auto' })
    }
  })
})

watch(isOpen, async (val) => {
  if (val) {
    previousActiveElement = document.activeElement
    searchQuery.value = ''
    selectedIndex.value = 0
    await nextTick()
    if (listBodyEl.value) {
      listBodyEl.value.scrollTo({ top: 0, behavior: 'auto' })
    }
    inputEl.value?.focus()
    lockScroll()
  } else {
    unlockScroll()
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus()
    }
  }
})

function executeItem(item) {
  if (!item) return
  item.action?.()
}

function onKeyDown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    toggle()
    return
  }

  if (!isOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (filteredItems.value.length > 0) {
      selectedIndex.value = (selectedIndex.value + 1) % filteredItems.value.length
      scrollToActiveItem('smooth')
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (filteredItems.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
      scrollToActiveItem('smooth')
    }
  } else if (e.key === 'Tab') {
    e.preventDefault()
    if (filteredItems.value.length > 0) {
      if (e.shiftKey) {
        selectedIndex.value =
          (selectedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
      } else {
        selectedIndex.value = (selectedIndex.value + 1) % filteredItems.value.length
      }
      scrollToActiveItem('smooth')
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (filteredItems.value[selectedIndex.value]) {
      executeItem(filteredItems.value[selectedIndex.value])
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  if (!isOpen.value) {
    forceUnlockScroll()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  forceUnlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <!-- Floating Toast Feedback Banner -->
    <Transition name="toast-slide">
      <div v-if="toastMessage" class="cmd-global-toast" role="status" aria-live="polite">
        <span class="cmd-toast-icon">✓</span>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <Transition name="palette-fade">
      <div
        v-if="isOpen"
        class="cmd-palette-backdrop"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-label="Quick Search Command Palette"
      >
        <div class="cmd-palette-modal">
          <header class="cmd-palette-header">
            <BaseIcon name="search" class="cmd-search-icon" />
            <input
              ref="inputEl"
              v-model="searchQuery"
              type="text"
              class="cmd-search-input"
              placeholder="Tìm kiếm dự án, kỹ năng, chuyển section, thao tác nhanh..."
              aria-autocomplete="list"
              aria-controls="cmd-listbox"
              :aria-activedescendant="`cmd-opt-${selectedIndex}`"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="cmd-clear-btn"
              @click="searchQuery = ''"
              aria-label="Xoá tìm kiếm"
            >
              <BaseIcon name="close" />
            </button>
            <kbd class="cmd-esc-badge" @click="close">ESC</kbd>
          </header>

          <div
            id="cmd-listbox"
            ref="listBodyEl"
            class="cmd-palette-body"
            role="listbox"
            aria-label="Danh sách kết quả tìm kiếm"
          >
            <div v-if="filteredItems.length === 0" class="cmd-empty">
              <BaseIcon name="search" />
              <p>Không tìm thấy kết quả phù hợp cho "{{ searchQuery }}"</p>
            </div>

            <div
              v-for="(item, index) in filteredItems"
              :id="`cmd-opt-${index}`"
              :key="item.id"
              class="cmd-item"
              :class="{ 'is-selected': index === selectedIndex }"
              @mouseenter="selectedIndex = index"
              @click="executeItem(item)"
              role="option"
              :aria-selected="index === selectedIndex"
            >
              <div class="cmd-item-icon">
                <BaseIcon :name="item.icon" />
              </div>
              <div class="cmd-item-info">
                <span class="cmd-item-title">{{ item.title }}</span>
                <span class="cmd-item-category">{{ item.category }}</span>
              </div>
              <BaseIcon name="arrow" class="cmd-item-arrow" />
            </div>
          </div>

          <footer class="cmd-palette-footer">
            <div class="cmd-footer-hints">
              <span><kbd>↑</kbd><kbd>↓</kbd> để di chuyển</span>
              <span><kbd>↵</kbd> để chọn</span>
              <span><kbd>ESC</kbd> để đóng</span>
            </div>
            <span class="cmd-footer-brand">Senior Frontend Palette</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Floating Toast Feedback Banner */
.cmd-global-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  background: var(--surface-solid);
  border: 1px solid var(--interactive-border);
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 20px 25px -5px rgb(15 23 42 / 0.15), 0 8px 10px -6px rgb(15 23 42 / 0.1);
  pointer-events: none;
}

[data-theme="light"] .cmd-global-toast {
  background: #ffffff;
  border-color: #cbd5e1;
}

.cmd-toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

/* Modal Backdrop */
.cmd-palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(2rem, 8vh, 6rem) 1rem 2rem;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.cmd-palette-modal {
  width: 100%;
  max-width: 620px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 25px 35px -5px rgb(15 23 42 / 0.2), 0 10px 15px -6px rgb(15 23 42 / 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: palette-slide-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] .cmd-palette-modal {
  background: #ffffff;
  border-color: #cbd5e1;
}

.cmd-palette-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface-solid);
}

[data-theme="light"] .cmd-palette-header {
  background: #ffffff;
}

.cmd-search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
  flex-shrink: 0;
}

.cmd-search-input {
  flex: 1 1 auto;
  border: none;
  background: transparent;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1rem;
  outline: none;
}

.cmd-search-input::placeholder {
  color: var(--text-faint);
  font-size: 0.95rem;
}

.cmd-clear-btn {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  color: var(--text-muted);
}

.cmd-clear-btn:hover {
  background: var(--bg-soft);
  color: var(--text);
}

.cmd-clear-btn .icon {
  width: 1rem;
  height: 1rem;
}

.cmd-esc-badge {
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
}

.cmd-palette-body {
  max-height: 400px;
  overflow-y: auto;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  scroll-padding: 0.6rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border-strong, #cbd5e1) transparent;
}

.cmd-palette-body::-webkit-scrollbar {
  width: 6px;
}

.cmd-palette-body::-webkit-scrollbar-track {
  background: transparent;
}

.cmd-palette-body::-webkit-scrollbar-thumb {
  background: var(--border-strong, #cbd5e1);
  border-radius: 9999px;
}

.cmd-palette-body::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted, #94a3b8);
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
  user-select: none;
}

.cmd-item.is-selected {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
}

.cmd-item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--bg-soft);
  color: var(--text-muted);
  flex-shrink: 0;
  transition: background-color 120ms ease, color 120ms ease;
}

.cmd-item.is-selected .cmd-item-icon {
  background: var(--surface-solid);
  color: var(--interactive-accent);
  box-shadow: var(--shadow-sm);
}

.cmd-item-icon .icon {
  width: 1.1rem;
  height: 1.1rem;
}

.cmd-item-info {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.cmd-item-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cmd-item.is-selected .cmd-item-title {
  color: var(--interactive-accent);
}

.cmd-item-category {
  font-size: 0.72rem;
  color: var(--text-faint);
  margin-top: 0.1rem;
}

.cmd-item-arrow {
  width: 1rem;
  height: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 120ms ease, transform 120ms ease;
  color: var(--interactive-accent);
}

.cmd-item.is-selected .cmd-item-arrow {
  opacity: 1;
  transform: translateX(0);
}

.cmd-empty {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.cmd-empty .icon {
  width: 2rem;
  height: 2rem;
  color: var(--text-faint);
}

.cmd-empty p {
  font-size: 0.9rem;
}

.cmd-palette-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.25rem;
  border-top: 1px solid var(--border);
  background: var(--bg-soft);
  font-size: 0.75rem;
  color: var(--text-faint);
}

.cmd-footer-hints {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.cmd-footer-hints kbd {
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
}

.cmd-footer-brand {
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

@keyframes palette-slide-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: opacity 180ms ease;
}

.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
}
</style>
