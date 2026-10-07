<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
import { recognition } from '../data/recognition'

const { professional, research } = recognition
</script>

<template>
  <section id="about" class="hero-intro" aria-labelledby="hero-title">
    <span id="home" class="hero-intro__home" aria-hidden="true" />
    <div class="container hero-intro__grid">
      <div v-reveal class="hero-intro__copy">
        <p class="hero-intro__eyebrow">Frontend · Interactive Web</p>
        <h1 id="hero-title" class="hero-intro__name"><span class="gradient-text">{{ profile.name }}</span></h1>
        <p class="hero-intro__role">{{ profile.title }}</p>
        <p class="hero-intro__summary">
          <strong>{{ profile.experienceYears }} năm</strong> xây dựng sản phẩm web.
          Tập trung <strong>Vue.js, Svelte</strong>, giao diện responsive và <strong>SVG/animation</strong>,
          với nền tảng fullstack Laravel.
        </p>
        <div class="hero-intro__actions">
          <a class="btn btn--primary" href="#experience">
            Xem Kinh nghiệm &amp; Dự án <BaseIcon class="icon-arrow" name="arrow" />
          </a>
          <a class="btn btn--ghost" :href="profile.cvUrl" download>
            <BaseIcon name="download" /> Tải CV
          </a>
        </div>
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
          <span v-if="profile.location" class="hero-intro__location"><BaseIcon name="pin" /> {{ profile.location }}</span>
        </div>
      </div>

      <aside id="recognition" v-reveal="100" class="hero-intro__recognition" aria-labelledby="hero-recognition-title">
        <h2 id="hero-recognition-title">Thành tựu</h2>
        <article v-spotlight class="card hero-intro__achievement hero-intro__achievement--career">
          <div class="hero-intro__award-icon"><BaseIcon name="award" /></div>
          <div class="hero-intro__award-copy">
            <p class="hero-intro__award-label">{{ professional.label }}</p>
            <h3>{{ professional.title }}</h3>
            <p class="hero-intro__award-years">{{ professional.years.join(' · ') }}</p>
          </div>
        </article>
        <article v-spotlight class="card hero-intro__achievement">
          <div class="hero-intro__award-icon hero-intro__award-icon--research"><BaseIcon name="cap" /></div>
          <div class="hero-intro__award-copy">
            <p class="hero-intro__award-label">{{ research.label }} · {{ research.period }}</p>
            <h3>{{ research.title }}</h3>
            <p class="hero-intro__research-topic">{{ research.tech.slice(0, 2).join(' · ') }}</p>
          </div>
        </article>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-intro {
  display: flex;
  align-items: center;
  min-height: 420px;
  padding-top: calc(var(--nav-h) + 1.5rem);
  padding-bottom: 2rem;
}
.hero-intro__home { position: absolute; inset: 0 auto auto 0; }
.hero-intro__grid { display: grid; grid-template-columns: 1.15fr 1fr; align-items: center; gap: clamp(2rem, 4vw, 3.5rem); }
.hero-intro__grid > * { min-width: 0; }
.hero-intro__eyebrow { margin-bottom: .65rem; color: var(--cyan); font-family: var(--font-mono); font-size: .76rem; font-weight: 500; letter-spacing: .07em; }
.hero-intro__name { margin-bottom: .5rem; font-family: var(--font-display); font-size: clamp(2.35rem, 4.6vw, 3.25rem); font-weight: 700; line-height: 1.08; letter-spacing: -.04em; }
.hero-intro__role { margin-bottom: .85rem; color: var(--text-muted); font-size: 1rem; line-height: 1.65; }
.hero-intro__summary { max-width: 54ch; color: var(--text-muted); font-size: 1rem; line-height: 1.7; }
.hero-intro__summary strong { color: var(--text); font-weight: 600; }
.hero-intro__actions { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.25rem; }
.hero-intro__actions .btn { --pad-y: .7rem; padding-inline: 1.15rem; font-size: .88rem; border-radius: 12px; }
.hero-intro__meta { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem 1.2rem; margin-top: 1rem; color: var(--text-muted); font-size: .86rem; line-height: 1.65; }
.hero-intro__socials { display: flex; flex-wrap: wrap; align-items: center; gap: .85rem; }
.hero-intro__social, .hero-intro__location { display: inline-flex; align-items: center; gap: .4rem; }
.hero-intro__social { padding-block: .35rem; transition: color .2s; }
.hero-intro__social:hover { color: var(--cyan); }
.hero-intro__location { font-size: .82rem; }
.hero-intro__recognition { display: grid; gap: .65rem; }
.hero-intro__recognition > h2 { margin-bottom: .15rem; font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -.01em; }
.hero-intro__achievement { display: flex; align-items: flex-start; gap: .85rem; padding: 1.25rem; border-radius: 14px; border-color: var(--border); background: var(--surface); }
.hero-intro__award-icon { display: grid; place-items: center; flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; color: var(--gold); background: var(--bg-soft); }
.hero-intro__award-icon--research { color: var(--text-muted); background: var(--bg-soft); }
.hero-intro__award-icon .icon { width: 1.15rem; height: 1.15rem; }
.hero-intro__award-copy { min-width: 0; }
.hero-intro__award-label { color: var(--text-muted); font-size: .82rem; line-height: 1.65; }
.hero-intro__award-copy h3 { margin-top: .2rem; font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; line-height: 1.45; letter-spacing: -.01em; }
.hero-intro__award-years { margin-top: .45rem; color: var(--gold); font-family: var(--font-mono); font-size: .84rem; font-weight: 500; line-height: 1.65; }
.hero-intro__research-topic { margin-block: .45rem .15rem; color: var(--text-muted); font-size: .86rem; line-height: 1.7; }
@media (max-width: 800px) {
  .hero-intro { min-height: 0; padding-top: calc(var(--nav-h) + 1.25rem); padding-bottom: 1.75rem; }
  .hero-intro__grid { grid-template-columns: 1fr; gap: 1.2rem; }
  .hero-intro__summary { max-width: 60ch; }
  .hero-intro__recognition { gap: .6rem; }
  .hero-intro__achievement { padding: 1.05rem; }
}
@media (max-width: 460px) {
  .hero-intro__actions { display: grid; grid-template-columns: 1fr; gap: .5rem; }
  .hero-intro__actions .btn { padding-inline: .85rem; font-size: .8rem; }
  .hero-intro__actions .btn--ghost { justify-self: start; }
  .hero-intro__achievement { gap: .7rem; }
  .hero-intro__meta { gap: .45rem 1rem; }
}
</style>
