/**
 * Enquiry Form UX & WhatsApp Bridge
 * Clean, frictionless, zero-spam
 */

import { gymData } from '../data/gymData.js';

export function initEnquiryForm() {
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

  // Phone input formatting (Numbers only, max 10 digits)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      validateGroup(phoneInput.closest('.form-group'), e.target.value.length === 10);
    });
  }

  // Name validation
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

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      validateGroup(nameInput.closest('.form-group'), false);
      hasErrors = true;
    } else {
      validateGroup(nameInput.closest('.form-group'), true);
    }

    // Validate Phone
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

    // Build Form Submission Data
    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      goal: goalSelect?.value || 'General Fitness',
      training: trainingSelect?.value || 'Weight Training',
      message: messageInput?.value.trim() || 'No additional notes',
    };

    // Pre-populate WhatsApp Link
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

    // Hide form, show success state smoothly
    form.style.display = 'none';
    if (successBox) {
      successBox.classList.add('is-visible');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Reset / Send another enquiry
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
