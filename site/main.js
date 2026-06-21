document.documentElement.classList.add('js-ready');

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const links  = document.getElementById('nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile nav when a link is clicked
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll spy: mark nav link active when its section is in view
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

if (navLinks.length) {
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.removeAttribute('aria-current'));
          const active = [...navLinks].find(
            (link) => link.getAttribute('href') === `#${entry.target.id}`
          );
          if (active) active.setAttribute('aria-current', 'page');
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach((section) => spyObserver.observe(section));
}
