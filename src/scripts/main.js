/**
 * Main Application Orchestrator
 * Total Fitness Gym - Chanchalguda, Hyderabad
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';
import { initEnquiryForm } from './form.js';
import { gymData } from '../data/gymData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initNavigation();
  initAnimations();
  initGallery();
  initEnquiryForm();

  // Subtle Desktop Magnetic Micro-interaction for Key Buttons (Non-touch only)
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

  // Pre-fill program enquiry when user clicks on a service or program card
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceTitle = card.querySelector('.service-card__title')?.textContent;
      const targetForm = document.getElementById('enquiry');
      const trainingSelect = document.getElementById('user-training');
      
      if (trainingSelect && serviceTitle) {
        // Find matching option
        for (let option of trainingSelect.options) {
          if (option.text.toLowerCase().includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(option.text.toLowerCase())) {
            trainingSelect.value = option.value;
            break;
          }
        }
      }

      if (targetForm) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 68;
        const targetPosition = targetForm.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      }
    });
  });

  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const goalSelect = document.getElementById('user-goal');
      const trainingSelect = document.getElementById('user-training');
      const targetForm = document.getElementById('enquiry');
      if (goalSelect) {
        const goalMap = ['Muscle Building', 'Fat Loss & Conditioning', 'General Health & Mobility'];
        if (goalMap[idx]) goalSelect.value = goalMap[idx];
      }
      if (trainingSelect) {
        const trainingMap = ['Weight Training', 'HIIT', 'Yoga'];
        if (trainingMap[idx]) trainingSelect.value = trainingMap[idx];
      }
      if (targetForm) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 68;
        const targetPosition = targetForm.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' });
      }
    });
  });

  console.info(
    `%c Total Fitness Gym %c Chanchalguda, Hyderabad %c`,
    'background:#111111;color:#D4FF00;font-weight:bold;padding:4px 8px;border-radius:4px 0 0 4px;',
    'background:#D4FF00;color:#111111;font-weight:bold;padding:4px 8px;border-radius:0 4px 4px 0;',
    'background:transparent;'
  );
});
