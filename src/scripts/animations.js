/**
 * Scroll Reveal & Number Counter Animations
 * 60fps, GPU-accelerated, respects prefers-reduced-motion
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Hero Load Entrance
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add('is-loaded');
    });
  }

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .accent-line-expand').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  const elementsToReveal = document.querySelectorAll(
    '.reveal, .reveal--left, .reveal--right, .reveal--scale, .accent-line-expand'
  );
  elementsToReveal.forEach(el => revealObserver.observe(el));

  // 3. Counter Animation for Trust Statistics
  const counters = document.querySelectorAll('[data-counter-target]');
  
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const isDecimal = el.getAttribute('data-counter-decimal') === 'true';
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            if (isDecimal) {
              el.textContent = currentVal.toFixed(1);
            } else {
              el.textContent = Math.floor(currentVal);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = isDecimal ? target.toFixed(1) : target;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.25
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }
}
