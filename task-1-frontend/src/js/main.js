// ============================================================================
// FRONTEND PORTFOLIO - COMPREHENSIVE JAVASCRIPT
// ES6+ Implementation with Accessibility Features
// ============================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCarousel();
  initLazyLoading();
  initMultiStepForm();
  loadTestimonials();
  initSmoothScrolling();
  initKeyboardNavigation();
});

// ============================================================================
// NAVIGATION & MEGA MENU
// ============================================================================

function initNavigation() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      navbarToggle.setAttribute('aria-expanded', !isExpanded);
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('active');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('active');
        navbarToggle.focus();
      }
    });
  }
  
  // Handle mega menu keyboard navigation
  const dropdownItems = document.querySelectorAll('.nav-item--dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const megaMenu = item.querySelector('.mega-menu');
    
    if (link && megaMenu) {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = link.getAttribute('aria-expanded') === 'true';
          link.setAttribute('aria-expanded', !isExpanded);
        }
      });
    }
  });
}

// ============================================================================
// CUSTOM CAROUSEL WITH LAZY LOADING
// ============================================================================

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-btn--prev');
  const nextBtn = carousel.querySelector('.carousel-btn--next');
  const indicators = carousel.querySelectorAll('.carousel-indicator');
  
  let currentSlide = 0;
  let autoplayInterval;
  const autoplayDelay = 5000; // 5 seconds
  
  function showSlide(index) {
    // Wrap around
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
      slide.setAttribute('aria-hidden', i !== currentSlide);
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
      indicator.setAttribute('aria-selected', i === currentSlide);
    });
    
    // Lazy load image in current slide
    const currentImage = slides[currentSlide].querySelector('.lazy-load');
    if (currentImage) {
      lazyLoadImage(currentImage);
    }
    
    // Preload next image
    const nextIndex = (currentSlide + 1) % slides.length;
    const nextImage = slides[nextIndex].querySelector('.lazy-load');
    if (nextImage) {
      lazyLoadImage(nextImage);
    }
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });
  }
  
  // Indicator navigation
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });
  
  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    }
  });
  
  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  
  // Pause on focus
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);
  
  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // minimum distance for swipe
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous slide
        prevSlide();
      } else {
        // Swipe left - go to next slide
        nextSlide();
      }
    }
  }
  
  // Initialize
  showSlide(0);
  startAutoplay();
}

// ============================================================================
// LAZY LOADING FOR IMAGES
// ============================================================================

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-load');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lazyLoadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => lazyLoadImage(img));
  }
}

function lazyLoadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src || img.classList.contains('loaded')) return;
  
  const tempImg = new Image();
  tempImg.onload = () => {
    img.src = src;
    img.classList.add('loaded');
  };
  tempImg.onerror = () => {
    console.error('Failed to load image:', src);
    // Set a placeholder or handle error
    img.alt = 'Image failed to load';
  };
  tempImg.src = src;
}

// ============================================================================
// MULTI-STEP FORM WITH DYNAMIC VALIDATION
// ============================================================================

function initMultiStepForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const formSteps = form.querySelectorAll('.form-step');
  const stepIndicators = form.querySelectorAll('.step-indicator');
  const progressFill = form.querySelector('.progress-fill');
  const nextButtons = form.querySelectorAll('.btn-next');
  const prevButtons = form.querySelectorAll('.btn-prev');
  
  let currentStep = 0;
  
  // Validation rules
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Please enter a valid first name (letters only, minimum 2 characters)'
    },
    lastName: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Please enter a valid last name (letters only, minimum 2 characters)'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      required: false,
      pattern: /^[\d\s\-\+\(\)]+$/,
      message: 'Please enter a valid phone number'
    },
    projectType: {
      required: true,
      message: 'Please select a project type'
    },
    budget: {
      required: true,
      message: 'Please select a budget range'
    },
    message: {
      required: true,
      minLength: 10,
      message: 'Please provide a project description (minimum 10 characters)'
    }
  };
  
  function validateField(field) {
    const fieldName = field.name;
    const rule = validationRules[fieldName];
    
    if (!rule) return true;
    
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Required validation
    if (rule.required && !value) {
      showError(field, errorElement, rule.message);
      return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!rule.required && !value) {
      clearError(field, errorElement);
      return true;
    }
    
    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      showError(field, errorElement, rule.message);
      return false;
    }
    
    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      showError(field, errorElement, rule.message);
      return false;
    }
    
    // All validations passed
    clearError(field, errorElement);
    field.classList.add('success');
    return true;
  }
  
  function showError(field, errorElement, message) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    field.setAttribute('aria-invalid', 'true');
  }
  
  function clearError(field, errorElement) {
    field.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
    field.setAttribute('aria-invalid', 'false');
  }
  
  function validateStep(stepIndex) {
    const step = formSteps[stepIndex];
    const fields = step.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function updateProgress() {
    const progress = ((currentStep + 1) / formSteps.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
      indicator.classList.remove('active', 'completed');
      if (index < currentStep) {
        indicator.classList.add('completed');
      } else if (index === currentStep) {
        indicator.classList.add('active');
      }
    });
  }
  
  function showStep(stepIndex) {
    formSteps.forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
    });
    
    currentStep = stepIndex;
    updateProgress();
    
    // Focus first input in the new step
    const firstInput = formSteps[currentStep].querySelector('input, select, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
  
  // Next button handlers
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < formSteps.length - 1) {
          showStep(currentStep + 1);
        }
      }
    });
  });
  
  // Previous button handlers
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });
  
  // Real-time validation
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.value) {
        validateField(field);
      }
    });
    
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all steps
    let isFormValid = true;
    formSteps.forEach((step, index) => {
      if (!validateStep(index)) {
        isFormValid = false;
        if (currentStep !== index) {
          showStep(index);
        }
      }
    });
    
    if (isFormValid) {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      console.log('Form submitted successfully:', data);
      
      // Create a testimonial-style submission card
      const submissionData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        body: data.message || 'Thank you for your interest!',
        company: data.company || 'Client'
      };
      
      addSubmissionToPage(submissionData);
      
      // Show success message
      alert('Thank you for your testimonial! It has been added to the testimonials section above.');
      
      // Reset form
      form.reset();
      showStep(0);
      
      // Scroll to testimonials to show the new submission
      setTimeout(() => {
        document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      
      // Clear all validation states
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.classList.remove('error', 'success');
        field.setAttribute('aria-invalid', 'false');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.classList.remove('show');
        }
      });
    }
  });
  
  // Initialize
  updateProgress();
}

// ============================================================================
// TESTIMONIALS - API INTEGRATION
// ============================================================================

async function loadTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;
  
  try {
    // Fetch data from JSONPlaceholder API
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=6');
    
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    
    const comments = await response.json();
    
    // Clear loading spinner
    container.innerHTML = '';
    
    // Create testimonial cards
    comments.forEach(comment => {
      const card = createTestimonialCard(comment);
      container.appendChild(card);
    });
    
  } catch (error) {
    console.error('Error loading testimonials:', error);
    container.innerHTML = `
      <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p>Unable to load testimonials at this time. Please try again later.</p>
      </div>
    `;
  }
}

function createTestimonialCard(data) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  
  // Extract name from email (for demo purposes)
  const name = data.email.split('@')[0]
    .split('.')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Truncate body if too long
  const body = data.body.length > 150 
    ? data.body.substring(0, 150) + '...' 
    : data.body;
  
  card.innerHTML = `
    <div class="testimonial-content">
      <p>"${body}"</p>
    </div>
    <div class="testimonial-author">
      <div class="author-info">
        <h4>${name}</h4>
        <p>Client</p>
      </div>
    </div>
  `;
  
  return card;
}

// ============================================================================
// ADD FORM SUBMISSION TO PAGE DYNAMICALLY
// ============================================================================

function addSubmissionToPage(data) {
  const container = document.getElementById('testimonials-container');
  if (!container) return;
  
  // Create a new card with submitted data
  const card = document.createElement('div');
  card.className = 'testimonial-card submission-card';
  card.style.animation = 'fadeInUp 0.5s ease';
  
  card.innerHTML = `
    <div class="testimonial-content">
      <p>"${data.body}"</p>
    </div>
    <div class="testimonial-author">
      <div class="author-info">
        <h4>${data.name}</h4>
        <p>${data.company}</p>
      </div>
    </div>
  `;
  
  // Add to the beginning of testimonials
  container.insertBefore(card, container.firstChild);
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty hash or just "#"
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navbarMenu = document.querySelector('.navbar-menu');
        const navbarToggle = document.querySelector('.navbar-toggle');
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          if (navbarToggle) {
            navbarToggle.setAttribute('aria-expanded', 'false');
          }
        }
        
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Set focus to target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

// ============================================================================
// KEYBOARD NAVIGATION ENHANCEMENTS
// ============================================================================

function initKeyboardNavigation() {
  // Trap focus in modal dialogs (if any are added later)
  // Add roving tabindex for complex widgets
  
  // Enhance carousel keyboard navigation
  const carouselBtns = document.querySelectorAll('.carousel-btn, .carousel-indicator');
  carouselBtns.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
  
  // Add visible focus indicators for mouse users
  document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

console.log('Frontend Portfolio JavaScript initialized successfully!');
