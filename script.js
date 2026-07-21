const expertise = [
  'Engineering Leadership',
  'Product Ownership',
  'AI Solutions Engineering',
  'Agentic AI & RAG',
  'Global Delivery & GCC',
  'Stakeholder Management',
  'Digital Transformation',
  'Technology Strategy',
  'Program Management',
  'Data Science',
  'Automation & AI Tooling',
  'Business & IT Alignment',
];

const credentials = [
  { icon: '🎓', title: 'B.E. Computer Science Engineering', sub: 'BMIET · 2003' },
  { icon: '🎓', title: 'PG Diploma in Information Technology', sub: 'Symbiosis' },
  { icon: '📊', title: 'Data Science Professional Certification', sub: 'Learnbay' },
  { icon: '🗂️', title: 'PMP Certification', sub: 'Project Management Institute' },
  { icon: '🧭', title: 'Certified Scrum Product Owner (CSPO)', sub: 'KnowledgeHut · 2022' },
  { icon: '🔁', title: 'Certified Scrum Master (CSM)', sub: '' },
  { icon: '☁️', title: 'Microsoft Azure Fundamentals', sub: '' },
  { icon: '⚙️', title: 'ITIL v3', sub: '' },
  { icon: '📉', title: 'Lean Six Sigma', sub: '' },
];

const videos = [
  {
    tag: 'QA & Testing',
    title: 'QA Automation Mistakes',
    desc: 'Common mistakes teams make when automating QA, and how to avoid them.',
    url: 'https://youtu.be/1kaiGv36lew',
    thumb: 'https://i.ytimg.com/vi/1kaiGv36lew/hqdefault.jpg',
  },
  {
    tag: 'AI Strategy',
    title: 'AI in the Enterprise — Where to Start',
    desc: 'A practical framework for leaders integrating AI into organizations without the hype.',
  },
  {
    tag: 'Leadership',
    title: 'Digital Transformation Pitfalls',
    desc: 'The most common mistakes large organizations make during digital transformation.',
  },
  {
    tag: 'Data Science',
    title: 'Data-Driven Decision Making',
    desc: 'How to build a culture of data literacy and use insights to drive real business outcomes.',
  },
];

const repos = [
  {
    tag: 'AI Platform',
    lang: 'FastAPI · React',
    name: 'Release Risk Radar',
    desc: 'Multi-tenant RAG platform I designed and built as AI architect. Ingests JIRA tickets, GitHub diffs, and test coverage to score release risk and surface bug patterns.',
    url: 'https://www.aiqariskradar.com',
    live: 'aiqariskradar.com',
  },
  {
    tag: 'Data Science',
    lang: 'Python',
    name: 'data-science-notebooks',
    desc: 'Jupyter notebooks covering data science fundamentals, EDA patterns, and ML model walkthroughs.',
  },
  {
    tag: 'PM',
    lang: 'Markdown',
    name: 'pmp-study-resources',
    desc: 'Curated PMP exam prep resources, practice questions, and process group reference sheets.',
  },
  {
    tag: 'Automation',
    lang: 'Python',
    name: 'automation-snippets',
    desc: 'Scripts and automation templates for common enterprise workflows — pipelines, reporting, and more.',
  },
];

const PAGE_IDS = {
  'index.html': 'home',
  '': 'home',
  'about.html': 'about',
  'videos.html': 'videos',
  'code.html': 'code',
  'contact.html': 'contact',
};

function getCurrentPageId() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return PAGE_IDS[path] ?? '';
}

function setActiveNav() {
  const pageId = getCurrentPageId();
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const isActive = btn.dataset.page === pageId;
    btn.classList.toggle('active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
}

function renderChips() {
  const el = document.getElementById('expertiseChips');
  if (!el) return;
  el.innerHTML = expertise.map((s) => `<span class="chip">${s}</span>`).join('');
}

function renderCredentials() {
  const el = document.getElementById('credGrid');
  if (!el) return;
  el.innerHTML = credentials
    .map(
      (c) => `
    <div class="cred">
      <span class="cred-icon">${c.icon}</span>
      <div class="cred-title">${c.title}</div>
      <div class="cred-sub">${c.sub}</div>
    </div>
  `
    )
    .join('');
}

function renderVideos() {
  const el = document.getElementById('videoGrid');
  if (!el) return;
  el.innerHTML = videos
    .map((v) => {
      const thumbInner = v.thumb
        ? `<img src="${v.thumb}" alt="${v.title}" class="vthumb-img" loading="lazy">`
        : '';
      const card = `
    <div class="vthumb" ${v.thumb ? `style="background-image:url('${v.thumb}');background-size:cover;background-position:center;"` : ''}>
      <span class="vtag">${v.tag}</span>
      <div class="play" aria-hidden="true">▶</div>
      ${v.url ? '' : '<span class="soon">Coming Soon</span>'}
    </div>
    <div class="cbody">
      <div class="ctitle">${v.title}</div>
      <div class="cdesc">${v.desc}</div>
    </div>
  `;
      return v.url
        ? `<a class="vcard" href="${v.url}" target="_blank" rel="noreferrer">${card}</a>`
        : `<article class="vcard">${card}</article>`;
    })
    .join('');
}

function renderRepos() {
  const el = document.getElementById('repoGrid');
  if (!el) return;
  el.innerHTML = repos
    .map((r) => {
      const card = `
    <div class="repo-top">
      <span class="repo-tag">${r.tag}</span>
      <span class="repo-lang">${r.lang}</span>
    </div>
    <div class="repo-name">${r.name}</div>
    <div class="cdesc">${r.desc}</div>
    ${r.live ? `<div class="repo-live">Live · ${r.live} ↗</div>` : ''}
  `;
      return r.url
        ? `<a class="repo" href="${r.url}" target="_blank" rel="noreferrer">${card}</a>`
        : `<article class="repo">${card}</article>`;
    })
    .join('');
}

function setupNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navLinks?.classList.toggle('open', !open);
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('open');
    });
  });

  setActiveNav();
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

renderChips();
renderCredentials();
renderVideos();
renderRepos();
setupNav();
