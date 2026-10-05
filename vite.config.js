import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { education, profile, seo } from './src/data/profile.js'
import { recognition } from './src/data/recognition.js'

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c])

function profileMetadata() {
  return {
    name: 'profile-metadata',
    transformIndexHtml() {
      const person = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        url: profile.websiteUrl,
        jobTitle: profile.title,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.city,
          addressCountry: profile.countryCode,
        },
        sameAs: [profile.github, profile.linkedin].filter(Boolean),
        knowsAbout: seo.knowsAbout,
        alumniOf: { '@type': 'EducationalOrganization', name: education.institution },
        award: [
          ...recognition.professional.years.map((year) => `${recognition.professional.title} ${year}`),
          `${recognition.research.title} cấp Khoa (${recognition.research.period})`,
        ],
      }

      return [
        { tag: 'title', children: escapeHtml(seo.title) },
        { tag: 'meta', attrs: { name: 'description', content: seo.description } },
        { tag: 'meta', attrs: { name: 'author', content: profile.name } },
        { tag: 'link', attrs: { rel: 'canonical', href: profile.websiteUrl } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'profile' } },
        { tag: 'meta', attrs: { property: 'og:title', content: seo.socialTitle } },
        { tag: 'meta', attrs: { property: 'og:description', content: seo.socialDescription } },
        { tag: 'meta', attrs: { property: 'og:url', content: profile.websiteUrl } },
        { tag: 'meta', attrs: { property: 'og:locale', content: seo.locale } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(person).replace(/</g, '\\u003c'),
        },
      ]
    },
  }
}

// Đây là "user site" (thuyduongnt97.github.io) nên chạy ở gốc domain → base = '/'.
// Nếu sau này đổi sang project site (vd. /ten-repo/) thì sửa base tương ứng.
export default defineConfig({
  base: '/',
  plugins: [vue(), profileMetadata()],
})
