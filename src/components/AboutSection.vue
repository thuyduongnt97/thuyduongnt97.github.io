<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { about } from '../data/profile'
</script>

<template>
  <section id="about" aria-labelledby="about-title">
    <div class="container">
      <SectionHead eyebrow="01 — Giới thiệu" title="Làm chủ trọn vẹn chu trình phần mềm" title-id="about-title" />
      <div class="about__grid">
        <div v-reveal class="about__text">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-for="(para, i) in about.paragraphs" :key="i" v-html="para" />
          <div class="pill-list">
            <span v-for="pill in about.pills" :key="pill.text" class="pill">
              <BaseIcon :name="pill.icon" /> {{ pill.text }}
            </span>
          </div>
        </div>
        <div class="facts">
          <div v-for="(fact, i) in about.facts" :key="fact.title" v-reveal="(i + 1) * 60" v-spotlight class="card fact">
            <div class="fact__icon"><BaseIcon :name="fact.icon" /></div>
            <div>
              <h3>{{ fact.title }}</h3>
              <p>{{ fact.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
