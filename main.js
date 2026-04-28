// DevPath — main.js

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// ===== INTERSECTION OBSERVER — reveal on scroll =====
const revealEls = document.querySelectorAll(
  '.paradigm-card, .ethics-card, .arch-obj-item, .sdlc-phase, .model-card, .fw-card, .devops-pillar, .solid-item, .pattern-card'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.style.color = '';
          a.style.background = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ===== PIPELINE ANIMATION =====
const pipelineStages = document.querySelectorAll('.pipeline-stage');
let currentStage = 0;

function animatePipeline() {
  pipelineStages.forEach((s, i) => {
    s.style.borderColor = '';
    s.style.boxShadow = '';
  });
  if (pipelineStages[currentStage]) {
    pipelineStages[currentStage].style.borderColor = 'var(--accent)';
    pipelineStages[currentStage].style.boxShadow = '0 0 20px rgba(91,140,245,0.2)';
  }
  currentStage = (currentStage + 1) % pipelineStages.length;
}

setInterval(animatePipeline, 900);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu
      navLinks?.classList.remove('open');
    }
  });
});

// ===== TYPING EFFECT FOR HERO CODE =====
const codeBody = document.querySelector('.code-body');
if (codeBody) {
  const originalHTML = codeBody.innerHTML;
  // Already rendered; just add cursor blink
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = `
    color: var(--accent);
    animation: blink 1s step-end infinite;
    font-family: var(--font-mono);
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`;
  document.head.appendChild(style);
  codeBody.appendChild(cursor);
}

// ===== NAV MOBILE STYLES =====
const styleTag = document.createElement('style');
styleTag.textContent = `
  @media (max-width: 900px) {
    .nav-links.open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: rgba(10,12,16,0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 1rem 2rem 1.5rem;
      gap: 0.25rem;
      z-index: 99;
    }
  }
`;
document.head.appendChild(styleTag);
