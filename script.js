const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters = document.querySelectorAll('.signal-row strong, .experience-facts strong');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const animateCounter = (element) => {
    const label = element.textContent.trim();
    const match = label.match(/^(\D*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, number, suffix] = match;
    const target = Number(number);
    const started = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  }), { threshold: .7 });
  counters.forEach((counter) => observer.observe(counter));
}
