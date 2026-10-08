<script setup>
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand-block">
        <span>© {{ year }} {{ profile.name }} · Senior Frontend / UI-UX Engineer</span>
        <div class="footer__vitals-badge" role="region" aria-label="Thước đo chất lượng trang">
          <span class="vitals-pill">
            <span class="dot-green" /> Lighthouse: 99
          </span>
          <span class="vitals-pill">CLS &lt; 0.01</span>
          <span class="vitals-pill">60 FPS Budget</span>
          <span class="vitals-pill">Zero Bloat</span>
        </div>
      </div>
      <a class="to-top" href="#home">Về đầu trang <BaseIcon name="arrow" /></a>
    </div>
  </footer>
</template>

<style scoped>
.footer__brand-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__vitals-badge {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.vitals-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
}

.dot-green {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

@media (max-width: 640px) {
  .footer__brand-block {
    text-align: center;
    align-items: center;
  }
  .footer__vitals-badge {
    justify-content: center;
  }
}
</style>
