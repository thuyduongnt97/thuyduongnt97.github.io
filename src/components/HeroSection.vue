<script setup>
import { onMounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import HeroPlayground from './HeroPlayground.vue'
import { profile } from '../data/profile'
import { useCommandPalette } from '../composables/useCommandPalette'

const { open: openCommandPalette } = useCommandPalette()
const isMac = ref(false)

onMounted(() => {
  if (typeof navigator !== 'undefined') {
    isMac.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent)
  }
})
</script>

<template>
  <section id="about" class="hero-intro" aria-labelledby="hero-title">
    <div class="hero-intro__ambient" aria-hidden="true" />
    <span id="home" class="hero-intro__home" aria-hidden="true" />

    <div class="container hero-intro__grid">
      <!-- CỘT TRÁI: THÔNG TIN ĐỊNH VỊ -->
      <div v-reveal class="hero-intro__copy">
        <!-- Status badge động nhỏ có chấm xanh pulsing -->
        <div class="hero-status-pill">
          <span class="hero-status-dot" aria-hidden="true" />
          <span class="hero-status-text">Available for new opportunities</span>
        </div>

        <!-- Headline: Tên ứng viên + Title Senior Frontend Developer / UI-UX Engineer -->
        <h1 id="hero-title" class="hero-name">{{ profile.name }}</h1>
        <p class="hero-title-role">
          Senior Frontend Developer
          <span class="hero-title-separator" aria-hidden="true">/</span>
          UI-UX Engineer
        </p>

        <!-- Subtitle: 2 câu tóm tắt giá trị cốt lõi -->
        <p class="hero-subtitle">
          Chuyên sâu tối ưu <strong>hiệu năng &amp; trải nghiệm người dùng</strong> (Core Web Vitals 60fps), làm chủ kiến trúc State phức tạp trên quy mô lớn.
          <br class="hero-break" />
          Định hình và phát triển <strong>Design System</strong> chuẩn mực, cầu nối liền mạch giữa tư duy thiết kế tinh tế và kỹ thuật lập trình hiện đại.
        </p>

        <!-- Quick CTAs + Phím tắt gợi ý [Cmd + K] để mở Quick Search -->
        <div class="hero-actions-container">
          <div class="hero-actions">
            <a class="btn btn--primary hero-btn" href="#experience">
              <span>Xem dự án nổi bật</span>
              <BaseIcon class="icon-arrow" name="arrow" />
            </a>
            <a class="btn btn--ghost hero-btn" :href="profile.cvUrl" download>
              <BaseIcon name="download" />
              <span>Tải CV (PDF)</span>
            </a>
          </div>

          <!-- Phím tắt gợi ý mở Quick Search -->
          <button
            type="button"
            class="hero-search-trigger"
            @click="openCommandPalette"
            aria-label="Mở Quick Search (phím tắt Cmd + K hoặc Ctrl + K)"
          >
            <kbd class="hero-kbd">{{ isMac ? '⌘K' : 'Ctrl+K' }}</kbd>
            <span class="hero-search-hint">để mở Quick Search</span>
          </button>
        </div>

        <!-- Social Meta & Location -->
        <div class="hero-intro__meta">
          <div v-if="profile.github || profile.linkedin || profile.email" class="hero-intro__socials" role="group" aria-label="Liên kết cá nhân">
            <a v-if="profile.github" class="hero-intro__social" :href="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub (mở trong tab mới)">
              <BaseIcon name="github" /> <span>GitHub</span>
            </a>
            <a v-if="profile.linkedin" class="hero-intro__social" :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (mở trong tab mới)">
              <BaseIcon name="linkedin" /> <span>LinkedIn</span>
            </a>
            <a v-if="profile.email" class="hero-intro__social" :href="`mailto:${profile.email}`" aria-label="Gửi email">
              <BaseIcon name="mail" /> <span>Email</span>
            </a>
          </div>
          <span v-if="profile.location" class="hero-intro__location">
            <BaseIcon name="pin" /> {{ profile.location }}
          </span>
        </div>
      </div>

      <!-- CỘT PHẢI: INTERACTIVE UI COMPONENT PLAYGROUND -->
      <aside v-reveal="80" class="hero-intro__playground hidden lg:block" aria-label="Interactive UI Component Playground">
        <HeroPlayground />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-intro {
  display: flex;
  align-items: center;
  isolation: isolate;
  min-height: 580px;
  padding-top: calc(var(--nav-h) + clamp(2rem, 5vw, 3.5rem));
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.hero-intro__ambient {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(#000 75%, transparent);
}

.hero-intro__ambient::before {
  content: '';
  position: absolute;
  inset: -15% -8%;
  background:
    radial-gradient(ellipse at 12% 35%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 52%),
    radial-gradient(ellipse at 88% 22%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%),
    radial-gradient(ellipse at 60% 82%, rgba(224, 231, 255, 0.45), transparent 50%);
  filter: blur(64px);
  opacity: 0.65;
  animation: hero-ambient-drift 24s ease-in-out infinite alternate;
}

:global([data-theme="dark"] .hero-intro__ambient) {
  opacity: 0.35;
}

.hero-intro__home {
  position: absolute;
  inset: 0 auto auto 0;
}

.hero-intro__grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: clamp(2rem, 4.5vw, 3.5rem);
}

.hero-intro__grid > * {
  min-width: 0;
}

.hero-intro__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Status badge: Pill badge động nhỏ có chấm xanh pulsing */
.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px 0 rgb(16 185 129 / 0.05);
}

[data-theme="dark"] .hero-status-pill {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.25);
  color: #86efac;
}

.hero-status-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}

.hero-status-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border: 1px solid #22c55e;
  border-radius: inherit;
  animation: hero-status-pulse 2.4s ease-out infinite;
}

/* Headline: Tên ứng viên + Title */
.hero-name {
  color: #0f172a;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.04em;
  margin-bottom: 0.5rem;
  overflow-wrap: anywhere;
}

[data-theme="dark"] .hero-name {
  color: var(--text);
}

.hero-title-role {
  color: var(--accent);
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
  margin-bottom: 1.15rem;
  transition: color 200ms ease;
}

.hero-title-separator {
  color: var(--border-strong);
  margin-inline: 0.35rem;
  font-weight: 400;
}

/* Subtitle: 2 câu tóm tắt giá trị cốt lõi */
.hero-subtitle {
  color: #475569;
  font-size: 0.98rem;
  line-height: 1.75;
  max-width: 54ch;
  margin-bottom: 1.65rem;
}

.hero-subtitle strong {
  color: #0f172a;
  font-weight: 600;
}

[data-theme="dark"] .hero-subtitle {
  color: var(--text-muted);
}

[data-theme="dark"] .hero-subtitle strong {
  color: var(--text);
}

.hero-break {
  display: block;
  margin-bottom: 0.35rem;
}

/* Quick CTAs + Phím tắt gợi ý */
.hero-actions-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
}

.hero-actions-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.25rem;
  margin-bottom: 1.25rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.hero-btn {
  min-height: 44px;
  padding: 0.65rem 1.15rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.hero-btn.btn--ghost {
  background: var(--surface-solid);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.hero-btn.btn--ghost:hover {
  background: var(--bg-soft);
  border-color: var(--border-strong);
}

/* Phím tắt gợi ý Quick Search */
.hero-search-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border-radius: 10px;
  background: var(--surface-solid);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 180ms ease;
}

.hero-search-trigger:hover {
  background: var(--interactive-soft);
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
  transform: translateY(-1px);
}

.hero-kbd {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-search-hint {
  font-size: 0.78rem;
}

/* Meta socials & location */
.hero-intro__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.2rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

.hero-intro__socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.hero-intro__social,
.hero-intro__location {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.hero-intro__social {
  min-height: 36px;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-solid);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 150ms ease;
}

.hero-intro__social:hover,
.hero-intro__social:focus-visible {
  color: var(--interactive-accent);
  border-color: var(--interactive-border);
  background: var(--interactive-soft);
}

.hero-intro__social .icon,
.hero-intro__location .icon {
  width: 0.95rem;
  height: 0.95rem;
}

.hero-intro__location {
  font-size: 0.82rem;
  color: var(--text-faint);
}

/* Playground wrapper */
.hero-intro__playground {
  position: relative;
  width: 100%;
}

@keyframes hero-ambient-drift {
  from { transform: translate3d(-1%, -1%, 0) scale(1); }
  to { transform: translate3d(2%, 1%, 0) scale(1.04); }
}

@keyframes hero-status-pulse {
  0% { transform: scale(0.8); opacity: 0.65; }
  75%, 100% { transform: scale(1.8); opacity: 0; }
}

@media (max-width: 960px) {
  .hero-intro {
    min-height: 0;
    padding-top: calc(var(--nav-h) + 2rem);
    padding-bottom: 2rem;
  }
  .hero-intro__grid {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }
  .hero-intro__ambient::before {
    filter: blur(44px);
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: clamp(2.2rem, 10vw, 2.7rem);
  }
  .hero-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }
  .hero-btn {
    justify-content: center;
  }
  .hero-search-trigger {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-intro__ambient::before,
  .hero-status-dot::after {
    animation: none;
  }
  .hero-intro__social,
  .hero-search-trigger {
    transition: none;
  }
}
</style>
