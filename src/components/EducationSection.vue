<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { community, education } from '../data/profile'
</script>

<template>
  <section id="education" aria-labelledby="edu-title">
    <div class="container">
      <SectionHead
        eyebrow="04 — Nền tảng"
        title="Học vấn &amp; cộng đồng"
        title-id="edu-title"
      />
      <div class="duo">
        <article v-reveal v-spotlight class="card info">
          <div class="info__icon"><BaseIcon name="cap" /></div>
          <h3>{{ education.institution }}</h3>
          <div class="info__meta">{{ education.period }}</div>
          <p class="info__label">{{ education.degree }}</p>
          <p>{{ education.text }}</p>
        </article>
        <article v-reveal="80" v-spotlight class="card info">
          <div class="info__icon"><BaseIcon name="code" /></div>
          <h3>{{ community.title }}</h3>
          <div class="info__meta">{{ community.period }}</div>
          <p class="info__label">{{ community.role }}</p>
          <p>{{ community.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
