/**
 * Total Fitness Gym - Standalone JavaScript Bundle
 * Chanchalguda, Hyderabad
 * 
 * Works seamlessly under both file:// (double-click index.html) and http:// (dev server)
 * Zero dependencies, no CORS restrictions, 60fps performance
 */

(function () {
  'use strict';

  // Centralized Gym Business Data
  const gymData = {
    brand: {
      name: "Total Fitness Gym",
      tagline: "Build Your Stronger Self.",
      subtagline: "Train with purpose. Move with confidence. Make fitness part of your lifestyle.",
      locationName: "Chanchalguda, Hyderabad",
      rating: "4.4",
      reviewsCount: "219",
      servicesCount: "9",
      establishedYear: "2016",
    },
    contact: {
      phone: "074160 57199",
      phoneClean: "+917416057199",
      whatsappClean: "917416057199",
      address: {
        full: "16-8, 931/2, Nalgonda X Roads, near Bharat Petrol Pump, Officers Colony, Chanchalguda, Hyderabad, Telangana 500024",
      },
    },
    gallery: [
      {
        id: "gal-1",
        title: "Heavy Strength Zone",
        category: "Strength · Olympic Platforms",
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "gal-2",
        title: "Functional & HIIT Arena",
        category: "Conditioning · Battle Ropes",
        src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "gal-3",
        title: "1-on-1 Coaching Zone",
        category: "Personal Training",
        src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "gal-4",
        title: "Cardio & Cycling Deck",
        category: "Cardio · High Cadence",
        src: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "gal-5",
        title: "Mind & Mobility Studio",
        category: "Yoga · Balance",
        src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85",
      },
      {
        id: "gal-6",
        title: "Steam & Recovery Facility",
        category: "Spa · Thermal Recovery",
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      },
    ]
  };

  // 1. Navigation & Mobile Drawer
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    const sections = document.querySelectorAll('section[id]');

    if (!header) return;

    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

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

    updateHeader();

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

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            toggleMobileMenu(true);
            
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    });
  }

  // 2. Animations & Counters
  function initAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    if ('IntersectionObserver' in window) {
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

      const counters = document.querySelectorAll('[data-counter-target]');
      if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseFloat(el.getAttribute('data-counter-target'));
              const isDecimal = el.getAttribute('data-counter-decimal') === 'true';
              const duration = 1600;
              const startTime = performance.now();

              function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
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
    } else {
      // Fallback if IntersectionObserver is unsupported
      document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .accent-line-expand').forEach(el => {
        el.classList.add('is-revealed');
      });
    }
  }

  // 3. Gallery Lightbox
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    
    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxTitle = lightbox.querySelector('.lightbox__title');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    let currentIndex = 0;
    const itemsData = gymData.gallery;

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      const item = itemsData[currentIndex];
      if (!item) return;

      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
      }
      if (lightboxTitle) {
        lightboxTitle.textContent = `${item.title} — ${item.category}`;
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(itemsData.length).padStart(2, '0')}`;
      }
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % itemsData.length;
      updateLightboxContent();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + itemsData.length) % itemsData.length;
      updateLightboxContent();
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `View ${itemsData[index]?.title || 'gallery image'}`);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    nextBtn?.addEventListener('click', showNext);
    prevBtn?.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        showNext();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        showPrev();
      }
    }, { passive: true });
  }

  // 4. Enquiry Form UX
  function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    const successBox = document.getElementById('enquiry-success');
    const resetBtn = document.getElementById('enquiry-reset');
    const whatsappConfirmBtn = document.getElementById('whatsapp-confirm-btn');

    if (!form) return;

    const nameInput = form.querySelector('#user-name');
    const phoneInput = form.querySelector('#user-phone');
    const goalSelect = form.querySelector('#user-goal');
    const trainingSelect = form.querySelector('#user-training');
    const messageInput = form.querySelector('#user-message');

    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
        validateGroup(phoneInput.closest('.form-group'), e.target.value.length === 10);
      });
    }

    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        validateGroup(nameInput.closest('.form-group'), nameInput.value.trim().length >= 2);
      });
    }

    function validateGroup(groupEl, isValid) {
      if (!groupEl) return;
      if (isValid) {
        groupEl.classList.remove('has-error');
      } else {
        groupEl.classList.add('has-error');
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        validateGroup(nameInput.closest('.form-group'), false);
        hasErrors = true;
      } else {
        validateGroup(nameInput.closest('.form-group'), true);
      }

      const phoneVal = phoneInput.value.trim();
      if (!phoneVal || phoneVal.length !== 10) {
        validateGroup(phoneInput.closest('.form-group'), false);
        hasErrors = true;
      } else {
        validateGroup(phoneInput.closest('.form-group'), true);
      }

      if (hasErrors) {
        const firstError = form.querySelector('.has-error input, .has-error select');
        firstError?.focus();
        return;
      }

      const formData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        goal: goalSelect?.value || 'General Fitness',
        training: trainingSelect?.value || 'Weight Training',
        message: messageInput?.value.trim() || 'No additional notes',
      };

      const waText = encodeURIComponent(
        `*New Enquiry - Total Fitness Gym*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📞 *Phone:* +91 ${formData.phone}\n` +
        `🎯 *Fitness Goal:* ${formData.goal}\n` +
        `🏋️ *Preferred Training:* ${formData.training}\n` +
        `💬 *Message:* ${formData.message}\n\n` +
        `_Sent via Total Fitness Gym Website_`
      );

      const waUrl = `https://wa.me/${gymData.contact.whatsappClean}?text=${waText}`;

      if (whatsappConfirmBtn) {
        whatsappConfirmBtn.href = waUrl;
      }

      form.style.display = 'none';
      if (successBox) {
        successBox.classList.add('is-visible');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
        if (successBox) successBox.classList.remove('is-visible');
        form.style.display = 'grid';
        nameInput?.focus();
      });
    }
  }

  // 5. Initializer & Micro-interactions
  function init() {
    initNavigation();
    initAnimations();
    initGallery();
    initEnquiryForm();

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      const magneticBtns = document.querySelectorAll('.btn--accent, .brand__symbol');

      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const serviceTitle = card.querySelector('.service-card__title')?.textContent;
        const targetForm = document.getElementById('enquiry');
        const trainingSelect = document.getElementById('user-training');
        
        if (trainingSelect && serviceTitle) {
          for (let option of trainingSelect.options) {
            if (option.text.toLowerCase().includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(option.text.toLowerCase())) {
              trainingSelect.value = option.value;
              break;
            }
          }
        }

        if (targetForm) {
          targetForm.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
