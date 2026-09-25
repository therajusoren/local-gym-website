/**
 * Sticky Navigation & Mobile Menu Management
 * Lightweight, accessible, 60fps
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
  const sections = document.querySelectorAll('section[id]');
  const mobileActionBar = document.querySelector('.mobile-action-bar');

  if (!header) return;

  // 1. Scroll State Management
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    // Add scrolled class after 30px
    if (scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Active Section Tracking
    let currentSectionId = '';
    const scrollOffset = scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollOffset >= top && scrollOffset < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateHeader();

  // 2. Mobile Menu Toggle
  function toggleMobileMenu(forceClose = false) {
    if (!mobileNav || !menuToggle) return;

    const isOpen = forceClose ? false : !mobileNav.classList.contains('is-open');

    if (isOpen) {
      mobileNav.classList.add('is-open');
      menuToggle.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
    } else {
      mobileNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile nav and smooth scroll when clicking any internal hash link
  const allHashLinks = document.querySelectorAll('a[href^="#"]');
  allHashLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          toggleMobileMenu(true);
          
          const headerHeight = header.offsetHeight || 68;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      toggleMobileMenu(true);
    }
  });
}
