const expertise = [
  'AI & Emerging Technology',
  'Digital Transformation',
  'Technology Strategy',
  'Program Management',
  'Data Science',
  'Leadership & Mentoring',
  'Automation & AI Tooling',
  'Cross-functional Teams',
  'Business & IT Alignment',
  'Agile & PMP',
  'Global Delivery',
  'Innovation at Scale',
];

const credentials = [
  { icon: '🎓', title: 'B.E. Computer Science Engineering', sub: 'BMIET · 2003' },
  { icon: '🎓', title: 'PG Diploma in Information Technology', sub: 'Symbiosis' },
  { icon: '📊', title: 'Data Science Professional Certification', sub: 'Learnbay' },
  { icon: '📋', title: 'PMP Certification', sub: 'Project Management Institute' },
];

const videos = [
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
    tag: 'AI Strategy',
    lang: 'Python',
    name: 'ai-transformation-playbook',
    desc: 'Structured guide and templates for running AI-readiness assessments in enterprise settings.',
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
    .map(
      (v) => `
    <article class="vcard">
      <div class="vthumb">
        <span class="vtag">${v.tag}</span>
        <div class="play" aria-hidden="true">▶</div>
        <span class="soon">Coming Soon</span>
      </div>
      <div class="cbody">
        <div class="ctitle">${v.title}</div>
        <div class="cdesc">${v.desc}</div>
      </div>
    </article>
  `
    )
    .join('');
}

function renderRepos() {
  const el = document.getElementById('repoGrid');
  if (!el) return;
  el.innerHTML = repos
    .map(
      (r) => `
    <article class="repo">
      <div class="repo-top">
        <span class="repo-tag">${r.tag}</span>
        <span class="repo-lang">${r.lang}</span>
      </div>
      <div class="repo-name">${r.name}</div>
      <div class="cdesc">${r.desc}</div>
    </article>
  `
    )
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

  const sections = ['about', 'videos', 'code', 'contact'];
  const navBtns = navLinks?.querySelectorAll('.nav-btn') ?? [];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navBtns.forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

renderChips();
renderCredentials();
renderVideos();
renderRepos();
setupNav();
