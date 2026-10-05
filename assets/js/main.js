/* =========================================================
   Thuỳ Dương — Portfolio interactions (vanilla JS, no deps)
   ========================================================= */

/* ▼▼ CẬP NHẬT THÔNG TIN LIÊN HỆ CỦA BẠN TẠI ĐÂY ▼▼
   Để trống ('') thì nút liên hệ tương ứng sẽ tự động ẩn. */
const CONFIG = {
  email: 'duongthuynt97@gmail.com',      // ví dụ: 'ban@gmail.com'
  linkedin: '',   // ví dụ: 'https://www.linkedin.com/in/ten-ban'
  roles: [
    'Senior Fullstack Developer',
    'Laravel & Vue.js Specialist',
    'GIS & Map Visualization',
    'Emagazine / Longform Engineer',
  ],
};

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');
  const applyTheme = (t) => {
    root.setAttribute('data-theme', t);
    themeBtn?.setAttribute('aria-pressed', String(t === 'light'));
    $('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f6f7fc' : '#0a0a14');
  };
  applyTheme(root.getAttribute('data-theme') || 'dark');
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (_) { /* ignore */ }
  });

  /* ---------- Contact config ---------- */
  const email = CONFIG.email.trim();
  const linkedin = CONFIG.linkedin.trim();
  $$('[data-contact="email"]').forEach((el) => {
    if (email) { el.href = `mailto:${email}`; el.hidden = false; }
  });
  $$('[data-contact="linkedin"]').forEach((el) => {
    if (linkedin) { el.href = linkedin; el.hidden = false; }
  });

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state, progress bar, scroll-spy ---------- */
  const nav = $('#nav');
  const progress = $('#progress');
  const links = $$('.nav__link');
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 12);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => {
        const active = l.getAttribute('href') === `#${e.target.id}`;
        l.classList.toggle('is-active', active);
        if (active) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  const menu = $('#nav-links');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  links.forEach((l) => l.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
  });

  /* ---------- Typed role ---------- */
  const typedEl = $('#typed');
  if (typedEl) {
    const roles = CONFIG.roles;
    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      let r = 0, i = 0, del = false;
      const tick = () => {
        const word = roles[r];
        typedEl.textContent = word.slice(0, i);
        let wait = del ? 28 : 65;
        if (!del && i === word.length) { del = true; wait = 1800; }
        else if (del && i === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
        i += del ? -1 : 1;
        setTimeout(tick, wait);
      };
      tick();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Counters ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const dur = 1600, start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * easeOut(p)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterIO = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => counterIO.observe(el));

  /* ---------- Skill meters ---------- */
  const meterIO = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$('.meter__fill', e.target).forEach((f) => { f.style.width = `${f.dataset.level}%`; });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  $$('.meter').forEach((m) => meterIO.observe(m));

  /* ---------- Card spotlight (cursor-follow) ---------- */
  if (finePointer) {
    $$('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Hero window 3D tilt ---------- */
  const win = $('#tilt');
  if (win && finePointer && !reduceMotion) {
    const wrap = win.parentElement;
    wrap.addEventListener('pointermove', (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      win.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
    });
    wrap.addEventListener('pointerleave', () => { win.style.transform = ''; });
  }

  /* ---------- Parallax orbs ---------- */
  if (!reduceMotion) {
    const orbs = $$('.orb');
    let raf = 0;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        orbs.forEach((o, i) => { o.style.translate = `0 ${y * (0.06 + i * 0.03) * -1}px`; });
        raf = 0;
      });
    }, { passive: true });
  }

  /* ---------- Generated QR-art for project #1 ---------- */
  const qr = $('#qr-cells');
  if (qr) {
    const N = 11, S = 14, ox = 30, oy = 30;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const inFinder = (x, y) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
    let out = '';
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (inFinder(x, y) || rnd() < 0.5) continue;
        out += `<rect x="${ox + x * S}" y="${oy + y * S}" width="${S - 2}" height="${S - 2}" rx="3"/>`;
      }
    }
    qr.innerHTML = out;
  }
})();
