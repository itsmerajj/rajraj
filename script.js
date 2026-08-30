// ===========================================================
// Mobile nav toggle
// ===========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after a link is tapped
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================================
// Highlight active nav link based on scroll position
// ===========================================================
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('[data-nav]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => navObserver.observe(section));

// ===========================================================
// Scroll reveal
// ===========================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ===========================================================
// Rotating "right now" status line
// ===========================================================
const statuses = [
  'building a course scheduler app',
  'TA-ing Intro to Programming',
  'learning Rust in my spare time',
  'looking for summer 2027 internships',
];

const statusEl = document.getElementById('statusText');
let statusIndex = 0;

function rotateStatus() {
  statusIndex = (statusIndex + 1) % statuses.length;
  statusEl.style.opacity = 0;
  setTimeout(() => {
    statusEl.textContent = statuses[statusIndex];
    statusEl.style.opacity = 1;
  }, 250);
}

statusEl.style.transition = 'opacity 250ms ease';
setInterval(rotateStatus, 3800);

// ===========================================================
// Project filtering
// ===========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('emptyState');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.getAttribute('data-filter');
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    emptyState.hidden = visibleCount !== 0;
  });
});

// ===========================================================
// Footer year
// ===========================================================
document.getElementById('year').textContent = new Date().getFullYear();
