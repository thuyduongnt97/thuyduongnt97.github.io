<script setup>
import BaseIcon from './BaseIcon.vue'
import SectionHead from './SectionHead.vue'
import { experience, job, universityExperience } from '../data/experience'
import { profile } from '../data/profile'
</script>

<template>
  <section id="experience" aria-labelledby="exp-title">
    <div class="container">
      <SectionHead
        eyebrow="04 — Kinh nghiệm"
        :title="`${profile.experienceYears} năm phát triển sản phẩm & giải quyết bài toán thực tế`"
        title-id="exp-title"
        sub="Từ nền tảng nghiên cứu đại học đến kiến trúc quảng cáo, hệ thống nghiệp vụ và trải nghiệm dữ liệu tương tác."
      />

      <div class="experience-stage" role="group" aria-labelledby="current-job-title">
        <div v-reveal v-spotlight class="card tl-head">
          <div class="tl-head__identity">
            <span class="tl-head__eyebrow">{{ job.stageLabel }}</span>
            <h3 id="current-job-title">{{ job.role }}</h3>
            <p class="tl-head__role">{{ job.scope }}</p>
          </div>
          <div class="tl-head__meta">
            <span><BaseIcon name="calendar" /> {{ job.period }}</span>
            <span><BaseIcon name="pin" /> {{ job.location }}</span>
          </div>
        </div>

        <div class="timeline">
          <article v-for="item in experience" :key="item.title" v-reveal v-spotlight class="card tl-item">
            <div class="tl-item__top">
              <h4 class="tl-item__title">{{ item.title }}</h4>
              <span class="tag">{{ item.tag }}</span>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="item.desc" />
            <div class="tl-item__tech">
              <span v-for="t in item.tech" :key="t" class="chip">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>

      <div class="experience-stage" role="group" aria-labelledby="university-job-title">
        <div v-reveal v-spotlight class="card tl-head tl-head--university">
          <div class="tl-head__identity">
            <span class="tl-head__eyebrow">{{ universityExperience.stageLabel }}</span>
            <h3 id="university-job-title">{{ universityExperience.organization }}</h3>
            <p class="tl-head__role">{{ universityExperience.role }}</p>
          </div>
          <div class="tl-head__meta">
            <span><BaseIcon name="calendar" /> {{ universityExperience.period }}</span>
            <span><BaseIcon name="pin" /> {{ universityExperience.location }}</span>
          </div>
        </div>

        <div class="timeline">
          <article v-for="item in universityExperience.items" :key="item.title" v-reveal v-spotlight class="card tl-item">
            <div class="tl-item__top">
              <h4 class="tl-item__title">{{ item.title }}</h4>
              <span class="tag">{{ item.tag }}</span>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="item.desc" />
            <div class="tl-item__tech">
              <span v-for="t in item.tech" :key="t" class="chip">{{ t }}</span>
            </div>
          </article>
        </div>

        <aside v-reveal class="experience-stage__note">
          <span class="experience-stage__note-period"><BaseIcon name="calendar" /> {{ universityExperience.earlierSupport.period }}</span>
          <p>{{ universityExperience.earlierSupport.text }}</p>
        </aside>
      </div>
    </div>
  </section>
</template>
