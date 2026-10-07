<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { interactiveDemos, landingPages } from '../data/showcase'

const demoUrl = (entry) => `${import.meta.env.BASE_URL}interactives/${entry}`
const hostname = (url) => new URL(url).hostname
const siteName = (title) => title.split(' — ')[0]
const hasVersions = (demo) => Boolean(demo.desktopEntry && demo.mobileEntry)
</script>

<template>
  <section id="showcase" aria-labelledby="showcase-title">
    <div class="container">
      <SectionHead
        eyebrow="Showcase — Sản phẩm đã thực hiện"
        title="Interactive demo &amp; Landing page"
        title-id="showcase-title"
        sub="Khám phá các website mình đã làm và trải nghiệm những demo tương tác."
      />

      <div class="showcase-group" aria-labelledby="landing-title">
        <div class="showcase-group__head">
          <h3 id="landing-title">Landing page đã thực hiện</h3>
          <span class="showcase-count">{{ landingPages.length }} website</span>
        </div>
        <div class="showcase-grid">
          <a
            v-for="(page, index) in landingPages"
            :key="page.id"
            v-reveal="index * 80"
            v-spotlight
            class="card landing"
            :href="page.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="landing__preview" aria-hidden="true">
              <span class="landing__number">{{ String(index + 1).padStart(2, '0') }} / WEBSITE</span>
              <span class="landing__brand">{{ siteName(page.title) }}</span>
              <BaseIcon class="landing__arrow" name="external" />
            </div>
            <div class="landing__body">
              <span class="chip">{{ page.category || 'Landing page' }}</span>
              <h4>{{ page.title }}</h4>
              <p class="landing__domain">{{ hostname(page.url) }}</p>
              <p v-if="page.description" class="landing__description">{{ page.description }}</p>
              <span class="landing__link">Xem website <BaseIcon name="external" /><span class="sr-only"> (mở trong tab mới)</span></span>
            </div>
          </a>
        </div>
      </div>

      <div class="showcase-group" aria-labelledby="interactive-title">
        <div class="showcase-group__head">
          <h3 id="interactive-title">Interactive demo</h3>
          <span v-if="interactiveDemos.length" class="showcase-count">{{ interactiveDemos.length }} demo</span>
        </div>
        <div v-if="interactiveDemos.length" class="showcase-grid">
          <article
            v-for="(demo, index) in interactiveDemos"
            :key="demo.id"
            v-reveal="index * 80"
            v-spotlight
            class="card interactive-card"
          >
            <div class="interactive-card__head">
              <div class="interactive-card__icon"><BaseIcon name="play" /></div>
              <span class="chip">{{ demo.category || 'Interactive' }}</span>
            </div>
            <h4>{{ demo.title }}</h4>
            <p>{{ demo.description }}</p>
            <div v-if="demo.tech?.length" class="chips">
              <span v-if="hasVersions(demo)" class="chip">PC &amp; Mobile</span>
              <span v-for="tech in demo.tech" :key="tech" class="chip">{{ tech }}</span>
            </div>
            <div class="interactive-card__actions">
              <a
                class="btn btn--primary btn--sm"
                :href="demoUrl(demo.entry)"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Xem demo: ${demo.title} (mở trong tab mới)`"
              >
                Xem demo <BaseIcon name="external" />
              </a>
              <span class="interactive-card__note">Mở trong tab mới</span>
            </div>
          </article>
        </div>
        <div v-else class="showcase-empty">
          <BaseIcon name="code" />
          <p>Các demo tương tác đang được chuẩn bị và sẽ được cập nhật tại đây.</p>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.showcase-group + .showcase-group { margin-top: 2.5rem; }
.showcase-group__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.1rem; }
.showcase-group__head h3 { font-family: var(--font-display); font-size: 1.25rem; letter-spacing: -.02em; }
.showcase-count { color: var(--text-faint); font-family: var(--font-mono); font-size: .8rem; white-space: nowrap; }
.showcase-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
.landing { display: flex; flex-direction: column; }
.landing__preview { position: relative; display: flex; align-items: center; min-height: 180px; padding: 2rem; border-bottom: 1px solid var(--border); background: var(--gradient-soft); overflow: hidden; }
.landing:nth-child(2n) .landing__preview { background: linear-gradient(135deg, hsl(187 92% 55% / .12), hsl(258 90% 66% / .2)); }
.landing__preview::before { content: ''; position: absolute; width: 190px; height: 190px; right: 55px; top: -55px; border: 1px solid var(--border-strong); border-radius: 50%; }
.landing__preview::after { content: ''; position: absolute; width: 190px; height: 190px; right: -60px; bottom: -105px; border: 1px solid var(--border-strong); border-radius: 50%; }
.landing__number { position: absolute; top: 1rem; left: 2rem; color: var(--text-muted); font-family: var(--font-mono); font-size: .7rem; letter-spacing: .1em; }
.landing__brand { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -.04em; overflow-wrap: anywhere; }
.landing__arrow { position: absolute; right: 1.6rem; bottom: 1.3rem; width: 1.6rem; height: 1.6rem; color: var(--cyan); }
.landing__body { padding: 1.6rem 2rem; }
.landing h4, .interactive-card h4 { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: -.02em; line-height: 1.3; margin: .8rem 0 .5rem; }
.landing__domain { color: var(--cyan); font-family: var(--font-mono); font-size: .82rem; overflow-wrap: anywhere; }
.landing__description { color: var(--text-muted); font-size: .92rem; margin-top: .7rem; }
.landing__link { display: inline-flex; align-items: center; gap: .5rem; margin-top: 1.3rem; font-size: .9rem; font-weight: 600; }
.landing:hover .landing__link { color: var(--cyan); }
.showcase-empty { display: flex; align-items: center; gap: 1rem; padding: 1.6rem 2rem; border: 1px dashed var(--border-strong); border-radius: var(--radius); color: var(--text-muted); font-size: .95rem; }
.showcase-empty > .icon { color: var(--cyan); width: 1.5rem; height: 1.5rem; }
.interactive-card { padding: 2rem; display: flex; flex-direction: column; }
.interactive-card__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.interactive-card__icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; background: var(--gradient-soft); color: var(--cyan); }
.interactive-card > p { color: var(--text-muted); font-size: .94rem; margin-bottom: 1.2rem; }
.interactive-card__actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem 1rem; margin-top: auto; padding-top: 1.5rem; }
.interactive-card__note { font-size: .82rem; color: var(--text-muted); }
@media (max-width: 760px) { .showcase-grid { grid-template-columns: 1fr; } }
@media (max-width: 560px) {
  .landing__preview { min-height: 150px; padding-inline: 1.4rem; }
  .landing__number { left: 1.4rem; }
  .landing__body, .interactive-card { padding: 1.4rem; }
  .showcase-empty { padding: 1.3rem; align-items: flex-start; }
}
</style>
