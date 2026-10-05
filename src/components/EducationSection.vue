<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { community, education, philosophy } from '../data/profile'
</script>

<template>
  <section id="education" aria-labelledby="edu-title">
    <div class="container">
      <SectionHead
        eyebrow="06 — Nền tảng"
        title="Học vấn &amp; tinh thần mã nguồn mở"
        title-id="edu-title"
        sub="Nền tảng nghiên cứu, thực hành và chia sẻ kiến thức từ những năm đại học."
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
      <div v-reveal class="card working-principles">
        <div class="working-principles__heading">
          <BaseIcon name="compass" />
          <h3>{{ philosophy.title }}</h3>
        </div>
        <div>
          <div class="values">
            <span v-for="value in philosophy.values" :key="value" class="tag">{{ value }}</span>
          </div>
          <p>{{ philosophy.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
