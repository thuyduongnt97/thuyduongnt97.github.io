<script setup>
import BaseIcon from './BaseIcon.vue'
import CountUp from './CountUp.vue'
import { profile } from '../data/profile'
import { recognition } from '../data/recognition'
import { useTyped } from '../composables/useTyped'

const typed = useTyped(profile.roles)

// Dựng bằng JS (v-html) để giữ nguyên khoảng trắng canh lề — template Vue sẽ gộp khoảng trắng.
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c])
const k = (s) => `<span class="t-key">${s}</span>`
const str = (s) => `<span class="t-str">'${escapeHtml(s)}'</span>`
const p = (s) => `<span class="t-p">${s}</span>`
const kw = (s) => `<span class="t-kw">${s}</span>`
const list = (items) => `${p('[')}${items.map(str).join(p(', '))}${p('],')}`
const codeLines = [
  `${kw('const')} ${k('developer')} ${p('= {')}`,
  `  ${k('name')}${p(':')}       ${str(profile.name)}${p(',')}`,
  `  ${k('role')}${p(':')}       ${str(profile.title)}${p(',')}`,
  `  ${k('experience')}${p(':')} <span class="t-num">${profile.experienceYears}</span>${p(',')} <span class="t-com">// năm</span>`,
  `  ${k('backend')}${p(':')}    ${list(profile.codeStack.backend)}`,
  `  ${k('frontend')}${p(':')}   ${list(profile.codeStack.frontend)}`,
  `  ${k('data')}${p(':')}       ${list(profile.codeStack.data)}`,
  `  ${k('location')}${p(':')}   ${str(profile.location)}${p(',')}`,
  `  <span class="t-fn">ship</span>${p('()')} ${p('{')} ${kw('return')} ${str('clean & fast')}${p(';')} ${p('}')}`,
  p('};'),
]
</script>

<template>
  <section id="home" class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero__grid">
        <div>
          <div v-reveal class="status">
            <span class="status__dot" aria-hidden="true" /> Sẵn sàng cho cơ hội &amp; dự án mới
          </div>
          <p v-reveal="60" class="hero__hello">// Xin chào, mình là</p>
          <h1 id="hero-title" v-reveal="120" class="hero__name">
            <span class="gradient-text">{{ profile.name }}</span>
          </h1>
          <p v-reveal="180" class="hero__role" aria-live="off">
            <span class="typed">{{ typed }}</span><span class="caret" aria-hidden="true" />
          </p>
          <a v-reveal="210" class="hero__recognition" href="#recognition">
            <BaseIcon name="award" />
            <span>{{ recognition.professional.title }} · {{ recognition.professional.years.join(', ') }}</span>
            <BaseIcon name="arrow" />
          </a>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-reveal="240" class="hero__lead" v-html="profile.lead" />
          <div v-reveal="300" class="hero__cta">
            <a class="btn btn--primary" href="#showcase">
              Xem demo &amp; landing page <BaseIcon class="icon-arrow" name="arrow" />
            </a>
            <a class="btn btn--ghost" :href="profile.cvUrl" download>
              <BaseIcon name="download" /> Tải CV (PDF)
            </a>
          </div>
          <div v-reveal="360" class="socials">
            <span class="socials__label">find me →</span>
            <a class="icon-btn" :href="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <BaseIcon name="github" />
            </a>
            <a v-if="profile.linkedin" class="icon-btn" :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <BaseIcon name="linkedin" />
            </a>
            <a v-if="profile.email" class="icon-btn" :href="`mailto:${profile.email}`" aria-label="Email">
              <BaseIcon name="mail" />
            </a>
          </div>
        </div>

        <div v-reveal="200" v-tilt class="hero__visual">
          <div class="window" role="img" :aria-label="`Đoạn mã mô tả hồ sơ ${profile.name}`">
            <div class="window__bar">
              <span class="dot dot--r" /><span class="dot dot--y" /><span class="dot dot--g" />
              <span class="window__title">developer.ts</span>
            </div>
            <div class="window__body" aria-hidden="true">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <code v-for="(line, i) in codeLines" :key="i" class="code-line" v-html="line" />
            </div>
          </div>
          <span v-for="(highlight, i) in profile.highlights" :key="highlight.text" class="float-chip" :class="`float-chip--${i + 1}`">
            <BaseIcon :name="highlight.icon" /> {{ highlight.text }}
          </span>
        </div>
      </div>

      <div class="stats">
        <div
          v-for="(stat, i) in profile.stats"
          :key="stat.label"
          v-reveal="i * 80"
          v-spotlight
          class="card stat"
        >
          <div class="stat__num gradient-text"><CountUp :to="stat.to" :suffix="stat.suffix" /></div>
          <div class="stat__label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
