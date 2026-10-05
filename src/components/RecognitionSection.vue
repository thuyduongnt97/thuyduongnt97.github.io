<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { recognition } from '../data/recognition'

const { professional, research } = recognition
</script>

<template>
  <section id="recognition" aria-labelledby="recognition-title">
    <div class="container">
      <SectionHead
        eyebrow="02 — Thành tựu"
        title="Những dấu mốc được ghi nhận"
        title-id="recognition-title"
        sub="Từ nghiên cứu tại đại học đến những đóng góp vào sản phẩm thực tế."
      />
      <div class="recognition-grid">
        <article v-reveal v-spotlight class="card recognition-card recognition-card--career">
          <div class="recognition-card__top">
            <div class="recognition-card__icon"><BaseIcon name="award" /></div>
            <span class="recognition-card__label">{{ professional.label }}</span>
          </div>
          <h3>{{ professional.title }}</h3>
          <p class="recognition-card__description">{{ professional.description }}</p>
          <ul class="recognition-years" aria-label="Các năm đạt danh hiệu Nhân viên Xuất sắc">
            <li v-for="year in professional.years" :key="year">
              <BaseIcon name="sparkle" />
              <strong>{{ year }}</strong>
              <span>Top Performer</span>
            </li>
          </ul>
          <div class="recognition-card__values">
            <span v-for="value in professional.values" :key="value">{{ value }}</span>
          </div>
        </article>

        <article v-reveal="100" v-spotlight class="card recognition-card recognition-card--research">
          <div class="recognition-card__top">
            <div class="recognition-card__icon"><BaseIcon name="cap" /></div>
            <span class="recognition-card__label">{{ research.label }}</span>
          </div>
          <h3>{{ research.title }}</h3>
          <div class="recognition-card__meta">{{ research.period }} · {{ research.institution }}</div>
          <p class="recognition-card__topic">“{{ research.topic }}”</p>
          <div class="chips">
            <span v-for="tech in research.tech" :key="tech" class="chip">{{ tech }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
