<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { navLinks, profile } from '../data/profile'
import { useCommandPalette } from '../composables/useCommandPalette'
import { useLocale } from '../composables/useLocale'
import { useScroll } from '../composables/useScroll'
import { useScrollSpy } from '../composables/useScrollSpy'
import { useTheme } from '../composables/useTheme'

const { scrollY } = useScroll()
const active = useScrollSpy(navLinks.map(item => item.href.slice(1)))
const { theme, toggle: toggleTheme } = useTheme()
const { open: openCommandPalette } = useCommandPalette()
const { locale, toggleLocale, pick } = useLocale()
const mobileMenuOpen = ref(false)
const headerRef = ref(null)
const menuButtonRef = ref(null)
const emojiMap = {
  deliverables: '🧩',
  about: '👤',
  skills: '⚡',
  timeline: '⏳',
}
const dockItems = computed(() =>
  navLinks.map(item => ({
    ...item,
    displayLabel: pick(item.label, item.labelEn),
    emoji: emojiMap[item.id] || '📌',
  }))
)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function handleKeyDown(event) {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
    menuButtonRef.value?.focus()
  }
}

function handleOutsidePointer(event) {
  if (!headerRef.value?.contains(event.target)) closeMobileMenu()
}

function openSearch() {
  closeMobileMenu()
  openCommandPalette()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('pointerdown', handleOutsidePointer)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('pointerdown', handleOutsidePointer)
})
</script>

<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-shadow dark:border-slate-800/80 dark:bg-[#06090F]/85"
    :class="{ 'shadow-sm': scrollY > 12 }"
  >
    <div class="mx-auto flex h-16 max-w-[1380px] flex-nowrap items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
      <a
        href="#home"
        class="group flex min-w-0 items-center gap-2 sm:gap-3"
        :aria-label="pick('Nguyễn Thị Thùy Dương — Về đầu trang', 'Nguyen Thi Thuy Duong — Back to top')"
        @click="closeMobileMenu"
      >
        <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 font-mono text-base font-extrabold text-slate-950 shadow-lg shadow-amber-500/20">{{ profile.initial }}</span>
        <span class="flex min-w-0 flex-col whitespace-nowrap">
          <span class="flex items-center gap-2">
            <span class="text-sm font-bold tracking-tight sm:text-base">
              <span class="sm:hidden">{{ profile.shortName }}</span>
              <span class="hidden sm:inline">{{ profile.name }}</span>
            </span>
            <span class="hidden rounded-md border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-700 xl:inline-block dark:text-amber-400">
              {{ pick('Từ 2019 · 6+ Năm', 'Since 2019 · 6+ Yrs') }}
            </span>
          </span>
          <span class="truncate font-mono text-[10px] text-slate-500 sm:text-xs dark:text-slate-400" :title="profile.roleSummary">
            {{ profile.roleSummary }}
          </span>
        </span>
      </a>

      <nav
        class="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-slate-200/80 bg-slate-100/90 p-1 lg:flex dark:border-slate-800 dark:bg-slate-900/90"
        :aria-label="pick('Menu chính', 'Main navigation')"
      >
        <a
          v-for="item in navLinks" :key="item.id" :href="item.href"
          :aria-current="active === item.href.slice(1) ? 'location' : undefined"
          class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
          :class="active === item.href.slice(1) ? 'bg-amber-500 font-semibold text-slate-950' : 'text-slate-600 hover:bg-white hover:text-amber-600 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-amber-400'"
        >{{ pick(item.label, item.labelEn) }}</a>
      </nav>

      <div class="flex shrink-0 items-center gap-1.5 whitespace-nowrap sm:gap-2">
        <!-- Nút chuyển đổi ngôn ngữ VI / EN -->
        <button
          type="button"
          class="inline-flex h-9 items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5 font-mono text-xs font-bold transition hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900"
          :aria-label="locale === 'vi' ? 'Switch language to English' : 'Chuyển sang Tiếng Việt'"
          :title="locale === 'vi' ? 'Switch to English (EN)' : 'Chuyển sang Tiếng Việt (VI)'"
          @click="toggleLocale"
        >
          <span
            class="rounded-lg px-2 py-1 transition-colors"
            :class="locale === 'vi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'"
          >VI</span>
          <span
            class="rounded-lg px-2 py-1 transition-colors"
            :class="locale === 'en' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-500 dark:text-slate-400'"
          >EN</span>
        </button>

        <button
          type="button"
          class="hidden size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:border-amber-500 2xl:inline-flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          :aria-label="pick('Tìm kiếm nhanh (Ctrl hoặc Command + K)', 'Quick Search (Ctrl or Command + K)')"
          @click="openSearch"
        >
          <BaseIcon name="search" />
        </button>
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-amber-400"
          :aria-label="theme === 'dark' ? pick('Chuyển sang giao diện sáng', 'Switch to light theme') : pick('Chuyển sang giao diện tối', 'Switch to dark theme')"
          :title="theme === 'dark' ? pick('Chuyển sang giao diện sáng', 'Switch to light theme') : pick('Chuyển sang giao diện tối', 'Switch to dark theme')"
          @click="toggleTheme"
        >
          <BaseIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <a
          :href="profile.cvUrl"
          :download="profile.cvFileName"
          class="hidden items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium hover:border-amber-500 sm:inline-flex dark:border-slate-700"
        >
          <BaseIcon name="download" class="text-amber-500" /> {{ pick('Tải CV', 'Download CV') }}
        </a>
        <a
          href="#contact"
          class="inline-flex min-h-9 items-center justify-center rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 sm:px-4 sm:text-sm"
          @click="closeMobileMenu"
        >{{ pick('Liên hệ', 'Contact') }}</a>
        <button
          ref="menuButtonRef"
          type="button"
          class="hidden size-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 min-[400px]:flex lg:hidden dark:border-slate-800 dark:bg-slate-900"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileMenuOpen ? pick('Đóng menu', 'Close menu') : pick('Mở menu', 'Open menu')"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <BaseIcon :name="mobileMenuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
    <nav
      v-if="mobileMenuOpen"
      id="mobile-navigation"
      class="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden dark:border-slate-800 dark:bg-[#06090F]"
      :aria-label="pick('Menu trên điện thoại', 'Mobile navigation')"
    >
      <a
        v-for="item in navLinks"
        :key="item.id"
        :href="item.href"
        class="block rounded-lg px-3 py-2 text-sm font-medium"
        :class="active === item.href.slice(1) ? 'bg-amber-500 text-slate-950 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
        :aria-current="active === item.href.slice(1) ? 'location' : undefined"
        @click="closeMobileMenu"
      >{{ pick(item.label, item.labelEn) }}</a>
      <div class="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 px-3 pt-3 text-xs dark:border-slate-800">
        <a :href="profile.cvUrl" :download="profile.cvFileName" class="font-semibold text-amber-700 dark:text-amber-400">
          {{ pick('Tải CV (PDF)', 'Download CV (PDF)') }}
        </a>
        <button type="button" class="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300" @click="openSearch">
          <BaseIcon name="search" /> {{ pick('Tìm nhanh · Ctrl/⌘ K', 'Quick Search · Ctrl/⌘ K') }}
        </button>
      </div>
    </nav>
  </header>
  <Teleport to="body">
    <nav
      :aria-label="pick('Điều hướng nhanh trên điện thoại', 'Quick mobile navigation')"
      class="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl border border-slate-200 bg-white/95 px-2 py-1.5 shadow-2xl backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-900/95"
      style="bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px))"
    >
      <a
        v-for="item in dockItems"
        :key="item.id"
        :href="item.href"
        class="flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[11px] font-semibold transition-colors"
        :class="active === item.href.slice(1) ? 'bg-amber-500/15 text-amber-800 dark:text-amber-400' : 'text-slate-600 active:bg-slate-100 dark:text-slate-300 dark:active:bg-slate-800'"
        :aria-current="active === item.href.slice(1) ? 'location' : undefined"
        @click="closeMobileMenu"
      >
        <span class="text-base leading-5" aria-hidden="true">{{ item.emoji }}</span>
        <span class="whitespace-nowrap">{{ item.displayLabel }}</span>
      </a>
    </nav>
  </Teleport>
</template>
