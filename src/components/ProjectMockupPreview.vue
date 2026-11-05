<script setup>
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile'
import { useProjectLightbox } from '../composables/useProjectLightbox'

const props = defineProps({
  project: { type: Object, required: true },
  mini: { type: Boolean, default: false },
  lightbox: { type: Boolean, default: false },
})

const { openLightbox } = useProjectLightbox()

function handleScreenClick() {
  if (!props.lightbox) {
    openLightbox(props.project)
  }
}

const mockupUrl = computed(() => {
  if (props.project.id === 'landing-pages') return 'omogieotrieumamxanh.vn'
  if (props.project.id === 'government-map') return 'gis.portal.gov.vn/map'
  if (props.project.id === 'experiments') return 'abtesting.internal/dashboard'
  if (props.project.id === 'qr') return 'short.bizfly.vn'
  if (props.project.id === 'maps') return 'baogiaothong.vn/cao-toc-bac-nam'
  if (props.project.id === 'ads') return 'ads-simulator.internal/sandbox'
  if (props.project.id === 'emagazines') return 'special.magazine/scrollytelling'
  if (props.project.id === 'recognition-event') return 'ai-vision.event/checkin'
  if (props.project.id === 'feature-core') return 'kenh14.vn & soha.vn/box-feature'
  return `${props.project.id}.internal/specs`
})

const isLive = computed(() => Boolean(props.project.demoUrl || props.project.links?.length))
const hasSandbox = computed(() => ['landing-pages', 'government-map', 'experiments', 'qr', 'maps', 'ads', 'emagazines', 'recognition-event', 'feature-core'].includes(props.project.id))
</script>

<template>
  <div
    class="project-mockup"
    :class="[{ 'is-mini': mini, 'is-lightbox': lightbox }, `project-mockup--${project.id}`]"
    role="region"
    :aria-label="`Visual preview cho ${project.name}`"
  >
    <!-- Browser Window Bar -->
    <div class="mockup-bar">
      <div class="mockup-dots" aria-hidden="true">
        <span class="mockup-dot mockup-dot--red" />
        <span class="mockup-dot mockup-dot--yellow" />
        <span class="mockup-dot mockup-dot--green" />
      </div>
      <div class="mockup-address">
        <BaseIcon name="sparkle" class="mockup-ssl-icon" />
        <span class="mockup-url-text">{{ mockupUrl }}</span>
      </div>
      <div class="mockup-badge">
        <span class="pulse-indicator" :class="{ 'pulse-indicator--green': isLive }" />
        {{ project.videoUrl ? 'Video Demo' : (isLive ? 'Live Demo' : (hasSandbox ? 'Interactive Sandbox' : 'System Spec')) }}
      </div>
    </div>

    <!-- Screen Content based on project -->
    <div
      class="mockup-screen"
      :class="{ 'is-interactive': !lightbox, 'is-lightbox-screen': lightbox }"
      :tabindex="!lightbox ? 0 : undefined"
      :role="!lightbox ? 'button' : undefined"
      :aria-label="!lightbox ? `Phóng to xem chi tiết giao diện ${project.name}` : undefined"
      @click="handleScreenClick"
      @keydown.enter="handleScreenClick"
      @keydown.space.prevent="handleScreenClick"
    >
      <div class="mockup-screen__inner">
        <!-- 0. Video / GIF Demo Autoplay Support (Muted Autoplay Loop) -->
        <div v-if="project.videoUrl" class="preview-media-player">
          <video
            :src="project.videoUrl"
            autoplay
            muted
            loop
            playsinline
            class="mockup-video-element"
            :aria-label="`Video demo mô phỏng cho ${project.name}`"
          />
          <div class="media-live-tag">
            <span class="pulse-indicator" /> Video Autoplay
          </div>
        </div>

        <div v-else-if="project.gifUrl || (project.imageUrl && !lightbox)" class="preview-media-player">
          <img
            :src="project.gifUrl || project.imageUrl"
            :alt="`Demo giao diện cho ${project.name}`"
            class="mockup-media-img"
            loading="lazy"
          />
          <div class="media-live-tag">
            <span class="pulse-indicator" /> Motion Demo
          </div>
        </div>

        <!-- 1. LANDING PAGES: OMO & ATHENA -->
        <div v-else-if="project.id === 'landing-pages'" class="preview-landing">
        <div class="preview-landing__nav">
          <div class="preview-brand">
            <span class="preview-logo-dot" />
            <strong>OMO · Greener Earth</strong>
          </div>
          <div class="preview-landing__links">
            <span>Chiến dịch</span>
            <span>Bản đồ xanh</span>
            <span class="preview-btn-mini">Khám phá</span>
          </div>
        </div>
        <div class="preview-landing__hero">
          <div class="preview-landing__content">
            <span class="preview-badge-eco">🌱 Mục tiêu 2025</span>
            <h5 class="preview-hero-title">Gieo Triệu Mầm Xanh Cho Tương Lai</h5>
            <p class="preview-hero-desc">Chiến dịch tương tác bảo vệ môi trường quy mô lớn với 1.2M+ lượt cam kết.</p>
            <div class="preview-landing__stats">
              <div class="stat-pill"><strong>1.240.500+</strong> <span>Mầm cây</span></div>
              <div class="stat-pill"><strong>63/63</strong> <span>Tỉnh thành</span></div>
              <div class="stat-pill stat-pill--highlight"><strong>0.8s</strong> <span>FCP Speed</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. GOVERNMENT GIS MAP -->
      <div v-else-if="project.id === 'government-map'" class="preview-map">
        <div class="preview-map__grid" />
        <div class="preview-map__overlay">
          <div class="preview-map__hud">
            <div class="hud-item hud-item--live">
              <span class="pulse-indicator" /> Lớp dữ liệu: <strong>QGIS · -91% GeoJSON (33→3 MB)</strong>
            </div>
            <div class="hud-coords">60 FPS Smooth Pan/Zoom · 02 Cổng thông tin</div>
          </div>
          <!-- Simulated Map Markers -->
          <div class="map-marker marker-alert" style="top: 28%; left: 38%;">
            <span class="marker-pulse" />
            <div class="marker-tooltip">Vùng rủi ro bão lũ (Level 3)</div>
          </div>
          <div class="map-marker marker-safe" style="top: 60%; left: 62%;">
            <span class="marker-pulse" />
            <div class="marker-tooltip">Trạm thủy văn an toàn</div>
          </div>
          <div class="map-marker marker-warning" style="top: 45%; left: 75%;">
            <span class="marker-pulse" />
            <div class="marker-tooltip">Cảnh báo ngập úng đô thị</div>
          </div>
          <div class="map-legend">
            <span><i class="dot-red" /> Nguy cơ cao</span>
            <span><i class="dot-yellow" /> Theo dõi</span>
            <span><i class="dot-green" /> An toàn</span>
          </div>
        </div>
      </div>

      <!-- 3. EXPERIMENTS: A/B TESTING & RECOMMENDATION -->
      <div v-else-if="project.id === 'experiments'" class="preview-ab">
        <div class="preview-ab__header">
          <div class="preview-ab__title">
            <span class="badge-tag">40 Sites · 309 Boxes</span>
            <strong>Recommendation &amp; A/B Testing (Macro Engine &amp; TOTP CDN)</strong>
          </div>
          <span class="badge-status">FDR = 0.05</span>
        </div>
        <div class="preview-ab__split">
          <div class="ab-card ab-card--control">
            <div class="ab-card__tag">Variant A (Control)</div>
            <div class="ab-card__metric">4.12% <span>CTR</span></div>
            <div class="ab-card__bar"><div class="bar-fill" style="width: 48%;" /></div>
            <span class="ab-card__sub">50% Traffic Split · Multi-step Config</span>
          </div>
          <div class="ab-card ab-card--variant">
            <div class="ab-card__tag">Variant B (Algo v2) <span class="winner-chip">★ Passed FDR</span></div>
            <div class="ab-card__metric text-emerald-600">5.86% <span>CTR (+42.2%)</span></div>
            <div class="ab-card__bar"><div class="bar-fill bar-fill--winner" style="width: 76%;" /></div>
            <span class="ab-card__sub">50% Traffic Split · Significance Badge</span>
          </div>
        </div>
        <div class="preview-ab__footer">
          <span>Vận hành: <strong>Backoff Retry &amp; Telegram Dedup Alert</strong></span>
          <span>Kiểm định: <strong>FDR = 0.05 (Significant)</strong></span>
        </div>
      </div>

      <!-- DYNAMIC QR & SHORTLINK ENGINE -->
      <div v-else-if="project.id === 'qr'" class="preview-qr">
        <div class="preview-qr__topbar">
          <div class="qr-brand">
            <span class="qr-pulse-dot" />
            <strong>Bizfly Dynamic QR &amp; Shortlink</strong>
          </div>
          <div class="qr-badge-live">
            <span class="live-dot" /> MySQL ⇄ Redis Sync
          </div>
        </div>

        <div class="preview-qr__main">
          <!-- Left: Dynamic QR Generator Simulation -->
          <div class="qr-visual-card">
            <div class="qr-code-box">
              <svg class="qr-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Finder Patterns -->
                <rect x="6" y="6" width="26" height="26" rx="4" fill="none" stroke="#38bdf8" stroke-width="4" />
                <rect x="12" y="12" width="14" height="14" rx="2" fill="#38bdf8" />
                <rect x="68" y="6" width="26" height="26" rx="4" fill="none" stroke="#38bdf8" stroke-width="4" />
                <rect x="74" y="12" width="14" height="14" rx="2" fill="#38bdf8" />
                <rect x="6" y="68" width="26" height="26" rx="4" fill="none" stroke="#38bdf8" stroke-width="4" />
                <rect x="12" y="74" width="14" height="14" rx="2" fill="#38bdf8" />
                <!-- Center Dynamic Data Matrix Dots -->
                <rect x="42" y="8" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="52" y="8" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="42" y="18" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="8" y="42" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="18" y="42" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="28" y="42" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="8" y="52" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="#6366f1" />
                <rect x="68" y="42" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="78" y="42" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="88" y="42" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="68" y="52" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="88" y="52" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="42" y="68" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="52" y="68" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="42" y="78" width="6" height="6" rx="1.5" fill="#818cf8" />
                <rect x="52" y="78" width="6" height="6" rx="1.5" fill="#38bdf8" />
                <rect x="68" y="68" width="26" height="26" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3 3" />
                <text x="81" y="84" font-size="8" font-family="monospace" fill="#38bdf8" text-anchor="middle" font-weight="bold">SCAN</text>
              </svg>
            </div>
            <div class="qr-code-slug">
              <span class="slug-prefix">short.bizfly.vn/</span><span class="slug-code">x9K2pQ</span>
            </div>
          </div>

          <!-- Right: Dynamic Routing & Analytics Simulation -->
          <div class="qr-details-panel">
            <div class="routing-row">
              <span class="routing-label">Target URL (Dynamic):</span>
              <div class="routing-url-pill">
                <span class="pill-method">SYNC</span>
                <span class="pill-url">https://bizfly.vn/event/digital-growth</span>
              </div>
            </div>

            <div class="routing-stats-grid">
              <div class="routing-stat-box">
                <span class="stat-number text-sky-400">~240K</span>
                <span class="stat-name">Peak clicks/ngày</span>
              </div>
              <div class="routing-stat-box">
                <span class="stat-number text-emerald-400">25–60ms</span>
                <span class="stat-name">Redis Key Read</span>
              </div>
              <div class="routing-stat-box">
                <span class="stat-number text-amber-300">2M+</span>
                <span class="stat-name">Total Clicks</span>
              </div>
            </div>

            <div class="routing-status-badge">
              <span class="status-pulse-dot" />
              <span>Đổi URL đích linh hoạt &bull; VirusTotal Scan &bull; Không in lại QR</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. HIGHWAY & TUNNEL INTERACTIVE (BÁO GIAO THÔNG) -->
      <div v-else-if="project.id === 'maps'" class="preview-highway">
        <div class="preview-highway__header">
          <span class="badge-tag">Chuyên đề tương tác</span>
          <strong>Hệ thống Cao tốc &amp; Hầm đường bộ Bắc – Nam</strong>
        </div>
        <div class="preview-highway__track">
          <div class="route-line">
            <div class="route-node is-active" style="left: 10%;">
              <span class="node-pin" />
              <span class="node-label">Hà Nội</span>
            </div>
            <div class="route-node is-active" style="left: 35%;">
              <span class="node-pin" />
              <span class="node-label">Mai Sơn</span>
            </div>
            <div class="route-node is-tunnel" style="left: 60%;">
              <span class="node-pin tunnel-pin">⛰</span>
              <span class="node-label">Hầm Đèo Cả</span>
            </div>
            <div class="route-node is-active" style="left: 90%;">
              <span class="node-pin" />
              <span class="node-label">TP.HCM</span>
            </div>
          </div>
        </div>
        <div class="preview-highway__card">
          <div class="tunnel-info">
            <strong>Hầm xuyên núi Đèo Cả</strong>
            <span>Chiều dài: 4.125m · Tiêu chuẩn 4 làn xe · 60 FPS Vector Render</span>
          </div>
          <span class="device-badge">PC &amp; Mobile Responsive</span>
        </div>
      </div>

      <!-- 5. ADS DEMO SIMULATOR -->
      <div v-else-if="project.id === 'ads'" class="preview-ads">
        <div class="preview-ads__toolbar">
          <span class="tool-chip is-active">Desktop 1440px</span>
          <span class="tool-chip">Mobile 375px</span>
          <span class="tool-chip">Format: Sponsor Box</span>
          <span class="tool-qr">QR Sync: Ready</span>
        </div>
        <div class="preview-ads__canvas">
          <div class="mock-article">
            <div class="mock-line mock-line--h" />
            <div class="mock-line" />
            <div class="mock-line" style="width: 80%;" />
            <!-- Injected Ad Container -->
            <div class="injected-ad">
              <span class="ad-flag">SPONSOR DEMO PREVIEW</span>
              <div class="ad-content">
                <strong>Premium Interactive Display Unit</strong>
                <span>Tự động inject demo theo ngữ cảnh trang báo</span>
              </div>
              <span class="ad-cta">Khám phá</span>
            </div>
            <div class="mock-line" style="width: 90%;" />
            <div class="mock-line" style="width: 70%;" />
          </div>
        </div>
      </div>

      <!-- 6. EMAGAZINES & SCROLLYTELLING -->
      <div v-else-if="project.id === 'emagazines'" class="preview-emag">
        <div class="preview-emag__progress" />
        <div class="preview-emag__article">
          <span class="emag-category">BÁO CHÍ ĐẶC BIỆT · SCROLLYTELLING</span>
          <h5 class="emag-title">Dấu Ấn Kỷ Nguyên Mới</h5>
          <div class="emag-quote">
            <span class="quote-mark">“</span>
            <p>Sự kết hợp hoàn hảo giữa đồ hoạ vector chuyển động và chiều sâu thông tin báo chí chuyên sâu.</p>
          </div>
          <div class="emag-footer">
            <span class="emag-badge">GSAP Timeline Engine</span>
            <span class="emag-badge">60 FPS Hardware Layer</span>
            <span class="emag-time">Avg Read: 4.8 phút</span>
          </div>
        </div>
      </div>

      <!-- 7. RECOGNITION EVENT & CAMERA AI -->
      <div v-else-if="project.id === 'recognition-event'" class="preview-vision">
        <div class="vision-viewport">
          <div class="face-box">
            <div class="face-corner tl" />
            <div class="face-corner tr" />
            <div class="face-corner bl" />
            <div class="face-corner br" />
            <div class="face-tag">
              <span class="pulse-indicator" /> {{ profile.shortName }} · {{ profile.title }}
            </div>
          </div>
          <div class="vision-hud">
            <span>Latency: <strong>350ms</strong></span>
            <span>Accuracy: <strong>99.4%</strong></span>
            <span>Status: <strong>Verified</strong></span>
          </div>
        </div>
      </div>

      <!-- 8. CORE BOX FEATURE & DESIGN SYSTEM (STICKY & INLINE BOXES) -->
      <div v-else-if="project.id === 'feature-core'" class="preview-core">
        <div class="preview-core__header">
          <div class="core-header-left">
            <span class="core-badge-tag">Headless Engine</span>
            <strong>Core Box Feature</strong>
          </div>
          <span class="core-chip-live">● Live on Kenh14 &amp; Soha</span>
        </div>

        <div class="preview-core__showcase">
          <!-- Mode 1: In-article Inline Box simulation -->
          <div class="core-mode-panel core-mode--inline">
            <div class="mode-meta">
              <span class="mode-tag">1. In-article Inline Box</span>
              <span class="mode-spec">Soha &bull; Lịch đấu &amp; Bảng huy chương</span>
            </div>
            <div class="simulated-article-box">
              <div class="sim-text-line" />
              <div class="sim-box-widget">
                <div class="widget-top">
                  <span class="widget-title">⚡ ASIAD 2026 · Lịch thi đấu Đoàn VN</span>
                  <span class="widget-live">Live</span>
                </div>
                <div class="widget-row">
                  <span>Bắn súng 10m</span>
                  <strong class="text-emerald-400">Chung kết · 09:30</strong>
                </div>
              </div>
              <div class="sim-text-line sim-text-line--short" />
            </div>
          </div>

          <!-- Mode 2: Viewport Sticky Box simulation -->
          <div class="core-mode-panel core-mode--sticky">
            <div class="mode-meta">
              <span class="mode-tag">2. Viewport Sticky Box</span>
              <span class="mode-spec">Kenh14 &bull; World Cup 2026 Widget</span>
            </div>
            <div class="simulated-sticky-box">
              <div class="sticky-widget-pill">
                <span class="sticky-badge-pin">📌 Sticky</span>
                <div class="sticky-info">
                  <strong>World Cup Live Hub</strong>
                  <span>Tự động neo bám khi cuộn trang</span>
                </div>
              </div>
              <div class="sticky-tech-notes">
                <span>CLS = 0.00</span>
                <span>Reactive State</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 9. INTERNAL OPERATIONS & SYSTEM SPEC PREVIEW -->
      <div v-else class="preview-ops">
        <div class="preview-ops__card">
          <div class="preview-ops__head">
            <div class="ops-icon-box">
              <BaseIcon :name="project.icon || 'refresh'" />
            </div>
            <div class="ops-title-group">
              <span class="ops-category-tag">Hệ thống nội bộ &bull; Vận hành</span>
              <strong>{{ project.name }}</strong>
              <p>{{ project.role }}</p>
            </div>
          </div>
          <div v-if="project.achievements?.length" class="ops-tasks-preview">
            <div class="ops-tasks-label">Nhiệm vụ &amp; Phạm vi vận hành:</div>
            <ul class="ops-tasks-list" role="list">
              <li v-for="(ach, idx) in project.achievements" :key="idx">
                <span class="task-bullet">✓</span>
                <span>{{ ach }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- End mockup-screen__inner -->

      <!-- Hover Overlay with Magnifying Glass / Zoom button -->
      <div v-if="!lightbox" class="mockup-hover-overlay" aria-hidden="true">
        <div class="overlay-pill">
          <svg
            class="zoom-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span class="overlay-text">{{ mini ? 'Phóng to' : (hasSandbox ? 'Khám phá Sandbox' : 'Xem chi tiết') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-mockup {
  position: relative;
  width: 100%;
  border-radius: 14px;
  background: #0f172a;
  border: 1px solid rgba(226, 232, 240, 0.15);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2), 0 8px 10px -6px rgba(15, 23, 42, 0.15);
  overflow: hidden;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease;
  user-select: none;
}

[data-theme="light"] .project-mockup {
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
}

.project-mockup:hover {
  transform: translateY(-3px) scale(1.008);
  box-shadow: 0 20px 30px -10px rgba(15, 23, 42, 0.18);
}

/* Mini Thumbnail Mode for Compact Cards */
.project-mockup.is-mini {
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 0;
  box-shadow: none;
  border: none;
}

.project-mockup.is-mini:hover {
  transform: none;
  box-shadow: none;
}

.project-mockup.is-mini .mockup-bar {
  flex: 0 0 auto;
  padding: 0.35rem 0.65rem;
}

.project-mockup.is-mini .mockup-dot {
  width: 7px;
  height: 7px;
}

.project-mockup.is-mini .mockup-address {
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  max-width: 170px;
}

.project-mockup.is-mini .mockup-badge {
  display: none;
}

.project-mockup.is-mini .mockup-screen {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  max-height: none;
  padding: 0.55rem;
  overflow: hidden;
  justify-content: flex-start;
}

/* Featured Preview Aspect Ratio 16/10 & object-fit */
.project-mockup:not(.is-mini):not(.is-lightbox) {
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
}

.project-mockup:not(.is-mini):not(.is-lightbox) .mockup-bar {
  flex: 0 0 auto;
}

.project-mockup:not(.is-mini):not(.is-lightbox) .mockup-screen {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.project-mockup:not(.is-mini):not(.is-lightbox) .mockup-screen__inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-mockup img,
.mockup-screen img,
.mockup-screen video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.preview-media-player {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mockup-video-element,
.mockup-media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.media-live-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  color: #38bdf8;
  font-size: 0.65rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 5;
}

.project-mockup.is-mini .preview-hero-title,
.project-mockup.is-mini .emag-title {
  font-size: 0.85rem;
}

.project-mockup.is-mini .preview-landing__stats,
.project-mockup.is-mini .preview-landing__links,
.project-mockup.is-mini .preview-hero-desc,
.project-mockup.is-mini .map-legend,
.project-mockup.is-mini .preview-highway__card,
.project-mockup.is-mini .emag-quote,
.project-mockup.is-mini .preview-ab__footer {
  display: none;
}

/* Window Bar */
.mockup-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.85rem;
  background: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .mockup-bar {
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.mockup-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mockup-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.mockup-dot--red { background: #ef4444; }
.mockup-dot--yellow { background: #f59e0b; }
.mockup-dot--green { background: #10b981; }

.mockup-address {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.4);
  color: #94a3b8;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[data-theme="light"] .mockup-address {
  background: #ffffff;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.mockup-ssl-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: #10b981;
}

.mockup-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: #38bdf8;
}

[data-theme="light"] .mockup-badge {
  color: #0284c7;
}

.pulse-indicator {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
  70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* Screen Area */
.mockup-screen {
  position: relative;
  min-height: 190px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.mockup-screen.is-interactive {
  cursor: zoom-in;
}

.mockup-screen:focus-visible {
  outline: 2px solid var(--interactive-accent);
  outline-offset: -2px;
}

.mockup-screen__inner {
  width: 100%;
  height: 100%;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center center;
}

.mockup-screen.is-interactive:hover .mockup-screen__inner {
  transform: scale(1.05);
}

.mockup-hover-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;
  z-index: 25;
}

[data-theme="light"] .mockup-hover-overlay {
  background: rgba(15, 23, 42, 0.28);
}

.mockup-screen.is-interactive:hover .mockup-hover-overlay,
.mockup-screen.is-interactive:focus-visible .mockup-hover-overlay {
  opacity: 1;
}

.overlay-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.18);
  transform: translateY(6px) scale(0.95);
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

.mockup-screen.is-interactive:hover .overlay-pill,
.mockup-screen.is-interactive:focus-visible .overlay-pill {
  transform: translateY(0) scale(1);
}

.zoom-icon {
  width: 15px;
  height: 15px;
  stroke: var(--interactive-accent, #6366f1);
  flex-shrink: 0;
}

.overlay-text {
  letter-spacing: 0.01em;
  white-space: nowrap;
}

/* Mini overrides */
.project-mockup.is-mini .overlay-pill {
  padding: 0.35rem 0.75rem;
  font-size: 0.7rem;
  gap: 0.35rem;
}

.project-mockup.is-mini .zoom-icon {
  width: 12px;
  height: 12px;
}

/* Lightbox mode overrides */
.project-mockup.is-lightbox {
  box-shadow: none;
  border-radius: 16px;
  width: 100%;
}

.project-mockup.is-lightbox:hover {
  transform: none;
  box-shadow: none;
}

.project-mockup.is-lightbox .mockup-screen {
  min-height: 185px;
  max-height: 205px;
  padding: 0.75rem 1rem;
}

.project-mockup.is-lightbox .preview-hero-title,
.project-mockup.is-lightbox .emag-title {
  font-size: 1.05rem;
}

/* 1. Landing Pages Preview */
.preview-landing {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
  border-radius: 10px;
  padding: 1rem;
  color: #ecfdf5;
}

.preview-landing__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
}

.preview-brand {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.preview-logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
}

.preview-landing__links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.preview-btn-mini {
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: #34d399;
  color: #064e3b;
  font-weight: 700;
  font-size: 0.7rem;
}

.preview-landing__hero {
  padding-top: 0.85rem;
}

.preview-badge-eco {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.15);
  font-size: 0.68rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.preview-hero-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
}

.preview-hero-desc {
  font-size: 0.72rem;
  color: #a7f3d0;
  margin-top: 0.25rem;
}

.preview-landing__stats {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.85rem;
  flex-wrap: wrap;
}

.stat-pill {
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.stat-pill strong {
  font-size: 0.8rem;
  color: #ffffff;
}

.stat-pill span {
  font-size: 0.62rem;
  color: #6ee7b7;
}

.stat-pill--highlight {
  background: rgba(52, 211, 153, 0.25);
  border: 1px solid rgba(52, 211, 153, 0.4);
}

/* 2. GIS Map Preview */
.preview-map {
  position: relative;
  min-height: 180px;
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
}

.preview-map__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(51, 65, 85, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(51, 65, 85, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

.preview-map__overlay {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
}

.preview-map__hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #cbd5e1;
}

.hud-item strong {
  color: #f8fafc;
}

.hud-coords {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: #94a3b8;
}

.map-marker {
  position: absolute;
  cursor: pointer;
}

.map-marker .marker-pulse {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse-ring 1.8s infinite;
}

.marker-alert .marker-pulse { background: #ef4444; }
.marker-safe .marker-pulse { background: #10b981; }
.marker-warning .marker-pulse { background: #f59e0b; }

.marker-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4px;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 0.62rem;
  white-space: nowrap;
}

.map-legend {
  display: flex;
  gap: 0.8rem;
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 5rem;
}

.map-legend span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.dot-red { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; }
.dot-yellow { width: 6px; height: 6px; border-radius: 50%; background: #f59e0b; }
.dot-green { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }

/* 3. A/B Testing Preview */
.preview-ab {
  background: var(--surface-solid);
  border-radius: 10px;
  padding: 0.85rem;
  border: 1px solid var(--border);
}

.preview-ab__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.preview-ab__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.badge-tag {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: var(--bg-soft);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
}

.badge-status {
  padding: 0.15rem 0.4rem;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #059669;
  font-size: 0.65rem;
  font-weight: 600;
}

.preview-ab__split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.ab-card {
  padding: 0.65rem;
  border-radius: 8px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.ab-card--variant {
  border-color: #a7f3d0;
  background: #f0fdf4;
}

.ab-card__tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
}

.winner-chip {
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: #10b981;
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 700;
}

.ab-card__metric {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0.25rem 0;
  color: var(--text);
}

.ab-card__metric span {
  font-size: 0.7rem;
  font-weight: 500;
}

.ab-card__bar {
  height: 5px;
  border-radius: 9999px;
  background: var(--border);
  overflow: hidden;
  margin-bottom: 0.35rem;
}

.bar-fill {
  height: 100%;
  background: #94a3b8;
  border-radius: 9999px;
}

.bar-fill--winner {
  background: #10b981;
}

.ab-card__sub {
  font-size: 0.62rem;
  color: var(--text-faint);
}

.preview-ab__footer {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border);
  font-size: 0.68rem;
  color: var(--text-muted);
}

/* 4. Highway Preview */
.preview-highway {
  background: #1e293b;
  border-radius: 10px;
  padding: 1rem;
  color: #f8fafc;
}

.preview-highway__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  margin-bottom: 1.25rem;
}

.preview-highway__track {
  position: relative;
  padding: 1.25rem 0.5rem;
}

.route-line {
  position: relative;
  height: 4px;
  background: #475569;
  border-radius: 9999px;
}

.route-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-pin {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 0 3px #1e293b;
}

.tunnel-pin {
  width: 16px;
  height: 16px;
  background: #f59e0b;
  font-size: 0.65rem;
  display: grid;
  place-items: center;
}

.node-label {
  margin-top: 8px;
  font-size: 0.65rem;
  color: #cbd5e1;
  white-space: nowrap;
}

.preview-highway__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: #0f172a;
  border: 1px solid #334155;
  font-size: 0.7rem;
}

.tunnel-info {
  display: flex;
  flex-direction: column;
}

.tunnel-info strong {
  color: #f59e0b;
}

.tunnel-info span {
  font-size: 0.62rem;
  color: #94a3b8;
}

.device-badge {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #334155;
  color: #38bdf8;
  font-size: 0.62rem;
}

/* 5. Ads Simulator Preview */
.preview-ads {
  background: #ffffff;
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
}

.preview-ads__toolbar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
  font-size: 0.65rem;
}

.tool-chip {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #f1f5f9;
  color: #64748b;
}

.tool-chip.is-active {
  background: #e0e7ff;
  color: #4f46e5;
  font-weight: 700;
}

.tool-qr {
  margin-left: auto;
  color: #10b981;
  font-weight: 600;
}

.mock-article {
  display: grid;
  gap: 0.35rem;
}

.mock-line {
  height: 6px;
  background: #e2e8f0;
  border-radius: 4px;
}

.mock-line--h {
  height: 12px;
  width: 70%;
  background: #cbd5e1;
}

.injected-ad {
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  background: #eef2ff;
  border: 1.5px dashed #6366f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ad-flag {
  position: absolute;
  top: -8px;
  left: 10px;
  background: #6366f1;
  color: #ffffff;
  font-size: 0.55rem;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-weight: 700;
}

.ad-content {
  display: flex;
  flex-direction: column;
}

.ad-content strong {
  font-size: 0.75rem;
  color: #312e81;
}

.ad-content span {
  font-size: 0.65rem;
  color: #4f46e5;
}

.ad-cta {
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: #4f46e5;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 600;
}

/* 6. Emagazine Preview */
.preview-emag {
  position: relative;
  background: #09090b;
  border-radius: 10px;
  padding: 1rem;
  color: #fafafa;
}

.preview-emag__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 68%;
  height: 3px;
  background: #e11d48;
}

.emag-category {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #f43f5e;
}

.emag-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0.25rem 0 0.5rem;
}

.emag-quote {
  padding: 0.5rem 0.75rem;
  border-left: 2px solid #f43f5e;
  background: rgba(244, 63, 94, 0.08);
  font-size: 0.72rem;
  color: #e4e4e7;
  font-style: italic;
}

.quote-mark {
  color: #f43f5e;
  font-size: 1.1rem;
  line-height: 0;
  margin-right: 4px;
}

.emag-footer {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.65rem;
}

.emag-badge {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  background: #27272a;
  color: #a1a1aa;
}

.emag-time {
  margin-left: auto;
  color: #f43f5e;
  font-weight: 600;
}

/* 7. Vision Preview */
.preview-vision {
  position: relative;
  height: 170px;
  background: #020617;
  border-radius: 10px;
  display: grid;
  place-items: center;
}

.face-box {
  position: relative;
  width: 110px;
  height: 120px;
  border: 1px dashed rgba(56, 189, 248, 0.5);
}

.face-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #38bdf8;
  border-style: solid;
}
.face-corner.tl { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
.face-corner.tr { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
.face-corner.bl { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
.face-corner.br { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

.face-tag {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: rgba(14, 165, 233, 0.9);
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  white-space: nowrap;
}

.vision-hud {
  position: absolute;
  bottom: 8px;
  right: 12px;
  display: flex;
  gap: 0.75rem;
  font-size: 0.65rem;
  color: #94a3b8;
}

.vision-hud strong {
  color: #38bdf8;
}

/* 8. Core Box Preview */
.preview-core {
  background: #090d16;
  border-radius: 10px;
  padding: 0.75rem;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

.preview-core__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.35rem;
}

.core-header-left {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.core-badge-tag {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.core-header-left strong {
  font-size: 0.72rem;
  color: #f8fafc;
}

.core-chip-live {
  font-size: 0.58rem;
  color: #34d399;
  background: rgba(16, 185, 129, 0.1);
  padding: 0.1rem 0.35rem;
  border-radius: 9999px;
  font-weight: 600;
}

.preview-core__showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  flex: 1;
  align-items: stretch;
}

.core-mode-panel {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: space-between;
}

.mode-meta {
  display: flex;
  flex-direction: column;
}

.mode-tag {
  font-size: 0.62rem;
  font-weight: 700;
  color: #38bdf8;
}

.mode-spec {
  font-size: 0.52rem;
  color: #94a3b8;
}

.simulated-article-box {
  background: rgba(15, 23, 42, 0.8);
  padding: 0.35rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sim-text-line {
  height: 3px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  width: 90%;
}

.sim-text-line--short {
  width: 60%;
}

.sim-box-widget {
  background: #1e293b;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 5px;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.widget-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-title {
  font-size: 0.55rem;
  font-weight: 700;
  color: #f1f5f9;
}

.widget-live {
  font-size: 0.48rem;
  background: #dc2626;
  color: #fff;
  padding: 0.05rem 0.2rem;
  border-radius: 3px;
  font-weight: bold;
}

.widget-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.52rem;
  color: #cbd5e1;
}

.simulated-sticky-box {
  background: rgba(15, 23, 42, 0.8);
  padding: 0.35rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 1px dashed rgba(129, 140, 248, 0.35);
}

.sticky-widget-pill {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: #1e1b4b;
  border: 1px solid rgba(129, 140, 248, 0.4);
  padding: 0.3rem 0.4rem;
  border-radius: 6px;
}

.sticky-badge-pin {
  font-size: 0.55rem;
  font-weight: 700;
  color: #a5b4fc;
}

.sticky-info {
  display: flex;
  flex-direction: column;
}

.sticky-info strong {
  font-size: 0.6rem;
  color: #e0e7ff;
}

.sticky-info span {
  font-size: 0.48rem;
  color: #94a3b8;
}

.sticky-tech-notes {
  display: flex;
  justify-content: space-between;
  font-size: 0.52rem;
  color: #64748b;
  font-family: var(--font-mono);
  margin-top: 0.25rem;
}

/* Mini thumbnail overrides for core */
.project-mockup.is-mini .preview-core {
  padding: 0.35rem 0.45rem;
  gap: 0.25rem;
}

.project-mockup.is-mini .core-chip-live,
.project-mockup.is-mini .mode-spec,
.project-mockup.is-mini .sim-text-line {
  display: none;
}

/* 9. Internal Ops / System Spec Preview */
.preview-ops {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background: #090d16;
  border-radius: 10px;
}

.preview-ops__card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-ops__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ops-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.ops-title-group {
  display: flex;
  flex-direction: column;
}

.ops-category-tag {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ops-title-group strong {
  font-size: 0.85rem;
  color: #f1f5f9;
}

.ops-title-group p {
  font-size: 0.68rem;
  color: #64748b;
}

.ops-tasks-preview {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ops-tasks-label {
  font-size: 0.58rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ops-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ops-tasks-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  font-size: 0.65rem;
  color: #cbd5e1;
  line-height: 1.4;
}

.task-bullet {
  color: #10b981;
  font-weight: bold;
  font-size: 0.68rem;
  flex-shrink: 0;
}

/* 10. Dynamic QR & Shortlink Preview */
.preview-qr {
  background: #090d16;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.preview-qr__topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.45rem;
}

.qr-brand {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  color: #f8fafc;
}

.qr-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
}

.qr-badge-live {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.62rem;
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  font-weight: 600;
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: #34d399;
}

.preview-qr__main {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.qr-visual-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0f172a;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  flex-shrink: 0;
}

.qr-code-box {
  width: 72px;
  height: 72px;
}

.qr-svg {
  width: 100%;
  height: 100%;
}

.qr-code-slug {
  margin-top: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: #94a3b8;
}

.slug-prefix {
  color: #64748b;
}

.slug-code {
  color: #38bdf8;
  font-weight: 700;
}

.qr-details-panel {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
  min-width: 0;
}

.routing-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.routing-label {
  font-size: 0.6rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.routing-url-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  overflow: hidden;
}

.pill-method {
  background: #0284c7;
  color: #ffffff;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 700;
  font-size: 0.55rem;
  flex-shrink: 0;
}

.pill-url {
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.routing-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.routing-stat-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.3rem 0.4rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-mono);
  font-weight: 800;
  font-size: 0.78rem;
  line-height: 1.1;
}

.stat-name {
  font-size: 0.55rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.routing-status-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.6rem;
  color: #a5b4fc;
  margin-top: 0.1rem;
}

.status-pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: #818cf8;
}

/* Mini thumbnail mode overrides for QR */
.project-mockup.is-mini .preview-qr {
  padding: 0.45rem 0.6rem;
  gap: 0.35rem;
}

.project-mockup.is-mini .qr-code-box {
  width: 44px;
  height: 44px;
}

.project-mockup.is-mini .routing-status-badge {
  display: none;
}

.project-mockup.is-mini .routing-stats-grid {
  gap: 0.25rem;
}

.project-mockup.is-mini .stat-number {
  font-size: 0.65rem;
}

.project-mockup.is-mini .stat-name {
  font-size: 0.5rem;
}
</style>
