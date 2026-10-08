<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navLinks, profile } from '../data/profile'
import { useCommandPalette } from '../composables/useCommandPalette'
import { useScroll } from '../composables/useScroll'
import { useScrollSpy } from '../composables/useScrollSpy'
import { useTheme } from '../composables/useTheme'

const { scrollY } = useScroll()
const active = useScrollSpy(navLinks.map((link) => link.id))
const { theme, toggle } = useTheme()
const { open: openCommandPalette } = useCommandPalette()

const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

const open = ref(false)
const menuEl = ref(null)
const burgerEl = ref(null)
let mobileQuery

const closeMenu = (restoreFocus = false) => {
  if (mobileQuery?.matches && (restoreFocus || menuEl.value?.contains(document.activeElement))) {
    burgerEl.value?.focus({ preventScroll: true })
  }
  open.value = false
}
const onKey = (e) => {
  if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    closeMenu(true)
  }
}
const onDocClick = (e) => {
  if (!menuEl.value?.contains(e.target) && !burgerEl.value?.contains(e.target)) closeMenu()
}
const onViewportChange = ({ matches }) => {
  if (matches && menuEl.value?.contains(document.activeElement)) {
    burgerEl.value?.focus({ preventScroll: true })
  } else if (!matches && document.activeElement === burgerEl.value) {
    menuEl.value?.querySelector('a')?.focus({ preventScroll: true })
  }
  open.value = false
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 1100px)')
  mobileQuery.addEventListener('change', onViewportChange)
  document.addEventListener('keydown', onKey)
  document.addEventListener('click', onDocClick)
})
onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', onViewportChange)
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('click', onDocClick)
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrollY > 12 }">
    <div class="container nav__inner">
      <a href="#home" class="logo" :aria-label="`${profile.name} — về đầu trang`">
        <span class="logo__mark">{{ profile.initial }}</span>
        <span>{{ profile.name }}</span>
      </a>

      <nav aria-label="Điều hướng chính">
        <ul id="nav-links" ref="menuEl" class="nav__links" :class="{ 'is-open': open }">
          <li v-for="link in navLinks" :key="link.id">
            <a
              class="nav__link"
              :class="{ 'is-active': active === link.id }"
              :href="`#${link.id}`"
              :aria-current="active === link.id ? 'true' : undefined"
              @click="closeMenu()"
            >{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav__actions">
        <!-- Quick Search Cmd+K Button -->
        <button
          class="nav__search-btn"
          type="button"
          aria-label="Mở tìm kiếm nhanh (Cmd + K)"
          @click="openCommandPalette"
        >
          <BaseIcon name="search" class="nav__search-icon" />
          <span class="nav__search-text">Tìm nhanh</span>
          <kbd class="nav__search-kbd">{{ isMac ? '⌘K' : 'Ctrl K' }}</kbd>
        </button>

        <a class="btn btn--primary btn--sm nav__cta" :href="profile.cvUrl" download>
          <BaseIcon name="download" /> Tải CV
        </a>
        <button
          class="icon-btn theme-toggle"
          type="button"
          aria-label="Chuyển giao diện sáng / tối"
          :aria-pressed="theme === 'light'"
          @click="toggle"
        >
          <BaseIcon class="icon-moon" name="moon" />
          <BaseIcon class="icon-sun" name="sun" />
        </button>
        <button
          ref="burgerEl"
          class="icon-btn nav__burger"
          type="button"
          :aria-label="open ? 'Đóng menu' : 'Mở menu'"
          :aria-expanded="open"
          aria-controls="nav-links"
          @click="open = !open"
        >
          <BaseIcon name="menu" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav__search-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 180ms ease;
  user-select: none;
}

.nav__search-btn:hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
  color: var(--text);
}

.nav__search-icon {
  width: 0.85rem;
  height: 0.85rem;
  color: var(--accent);
}

.nav__search-kbd {
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-faint);
}

@media (max-width: 640px) {
  .nav__search-text,
  .nav__search-kbd {
    display: none;
  }
  .nav__search-btn {
    padding: 0.45rem;
    border-radius: 8px;
  }
}
</style>
