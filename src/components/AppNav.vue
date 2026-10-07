<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navLinks, profile } from '../data/profile'
import { useScroll } from '../composables/useScroll'
import { useScrollSpy } from '../composables/useScrollSpy'
import { useTheme } from '../composables/useTheme'

const { scrollY } = useScroll()
const active = useScrollSpy()
const { theme, toggle } = useTheme()

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
