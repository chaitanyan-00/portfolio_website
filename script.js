// ===== Matrix Background =====
function initMatrix() {
  const matrixBg = document.getElementById('matrix-bg');
  if (!matrixBg) return;
  
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  matrixBg.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  
  const alphabet = katakana + latin + nums + symbols;
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const rainDrops = [];
  
  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }
  
  const draw = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#4BB4DE';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
      
      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  };
  
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery || !mediaQuery.matches) {
    setInterval(draw, 30);
  }
  
  window.addEventListener('resize', debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 200));
}

// ===== Tagline Typing Effect =====
function initTaglineTyping() {
  const texts = [
    "Ethical Hacker | Penetration Tester",
    "Web Developer",
    "Cloud Security Specialist",
    "Turning data into decisions"
  ];
  
  const taglineElement = document.querySelector('.tagline');
  if (!taglineElement) return;
  
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery && mediaQuery.matches) {
    taglineElement.textContent = texts[0];
    return;
  }
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const type = () => {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      taglineElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      taglineElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  };
  
  taglineElement.textContent = texts[0];
  setTimeout(type, 2000);
}

// ===== 12-Hour Clock =====
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockElement.setAttribute('aria-live', 'polite');
  }
}

// ===== Theme Toggle =====
function initThemeToggle() {
  const modeToggle = document.getElementById('mode-toggle');
  if (!modeToggle) return;
  
  const setTheme = (isLight) => {
    document.body.classList.toggle('light-mode', isLight);
    const icon = isLight ? '<i class="fas fa-moon" aria-hidden="true"></i>' : '<i class="fas fa-sun" aria-hidden="true"></i>';
    modeToggle.innerHTML = icon;
    modeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Update particle background color
    const particles = document.getElementById('particles-js');
    if (particles) {
      particles.style.backgroundColor = isLight ? 'var(--light-bg)' : 'var(--dark-bg)';
    }
  };
  
  // Initialize theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme === 'light');
  } else {
    setTheme(!prefersDark);
  }
  
  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(!e.matches);
    }
  });
  
  modeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-mode');
    setTheme(isLight);
  });
  
  modeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isLight = !document.body.classList.contains('light-mode');
      setTheme(isLight);
    }
  });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Only prevent default for same-page anchors
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          // Check for reduced motion preference
          const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
          const behavior = mediaQuery && mediaQuery.matches ? 'auto' : 'smooth';
          
          window.scrollTo({ 
            top: targetPosition, 
            behavior: behavior
          });
          
          // Update URL without page jump
          if (history.pushState) {
            history.pushState(null, null, this.getAttribute('href'));
          }
          
          // Focus the target for keyboard users
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }
    });
  });
}

// ===== Back to Top Button =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;
  
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const behavior = mediaQuery && mediaQuery.matches ? 'auto' : 'smooth';
    
    window.scrollTo({ 
      top: 0, 
      behavior: behavior
    });
    
    // Reset URL hash
    if (history.pushState) {
      history.pushState(null, null, ' ');
    }
    
    // Focus the top of the page for keyboard users
    document.querySelector('header').setAttribute('tabindex', '-1');
    document.querySelector('header').focus();
  });
  
  window.addEventListener('scroll', debounce(toggleVisibility, 100));
  toggleVisibility();
}

// ===== Form Validation =====
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const formStatus = document.getElementById('form-status');
  const fields = {
    name: contactForm.querySelector('[name="name"]'),
    email: contactForm.querySelector('[name="email"]'),
    message: contactForm.querySelector('[name="message"]')
  };
  
  const showError = (input, message) => {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = 'color:var(--error);margin-top:5px;font-size:0.8rem;';
    input.parentNode.appendChild(error);
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  };
  
  const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    Object.values(fields).forEach(field => {
      field.removeAttribute('aria-invalid');
    });
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.style.display = 'none';
    }
  };
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (!fields.name.value.trim()) {
      showError(fields.name, 'Please enter your name');
      isValid = false;
    }
    
    // Email validation
    if (!fields.email.value.trim()) {
      showError(fields.email, 'Please enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value)) {
      showError(fields.email, 'Please enter a valid email');
      isValid = false;
    }
    
    // Message validation
    if (!fields.message.value.trim()) {
      showError(fields.message, 'Please enter your message');
      isValid = false;
    }
    
    if (isValid) {
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
      
      try {
        // Simulate form submission (replace with actual fetch)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        if (formStatus) {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.className = 'success';
          formStatus.style.display = 'block';
        }
        
        submitBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Sent!';
        this.reset();
        
        // Reset button after delay
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          if (formStatus) {
            formStatus.style.display = 'none';
          }
        }, 2000);
      } catch (error) {
        // Show error state
        if (formStatus) {
          formStatus.textContent = 'Failed to send message. Please try again later.';
          formStatus.className = 'error';
          formStatus.style.display = 'block';
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const navContainer = document.querySelector('.nav-container');
  if (!navContainer) return;
  
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  menuToggle.setAttribute('aria-label', 'Toggle menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'main-navigation');
  
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  
  navLinks.id = 'main-navigation';
  navContainer.prepend(menuToggle);
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times" aria-hidden="true"></i>' 
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
          menuToggle.setAttribute('aria-expanded', 'false');
          
          const headerHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          // Check for reduced motion preference
          const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
          const behavior = mediaQuery && mediaQuery.matches ? 'auto' : 'smooth';
          
          window.scrollTo({ 
            top: targetPosition, 
            behavior: behavior
          });
          
          // Focus the target for keyboard users
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }
  });
}

// ===== Loading Animation =====
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  
  const loadTimeout = setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }, 4000);
  
  window.addEventListener('load', () => {
    clearTimeout(loadTimeout);
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 1000);
  });
}

// ===== Interactive Holographic Scan =====
function initInteractiveScan() {
  const hexagon = document.querySelector('.hexagon-mask');
  const scanLine = document.querySelector('.holographic-scan');
  
  if (!hexagon || !scanLine) return;
  
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery && mediaQuery.matches) {
    scanLine.style.display = 'none';
    return;
  }
  
  hexagon.addEventListener('mousemove', (e) => {
    const rect = hexagon.getBoundingClientRect();
    const yPos = ((e.clientY - rect.top) / rect.height) * 110;
    scanLine.style.top = `${yPos - 10}%`;
    scanLine.style.animation = 'none';
    scanLine.style.opacity = '0.8';
  });
  
  hexagon.addEventListener('mouseleave', () => {
    scanLine.style.animation = 'scan 4s linear infinite';
    scanLine.style.opacity = '0.7';
    scanLine.style.top = '-10px';
  });
}

// ===== Intersection Observers for Animations =====
function initScrollAnimations() {
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery && mediaQuery.matches) {
    document.querySelectorAll('.cyber-skills li, .achievement-item, .project-content li').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const animateOnScroll = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: window.innerWidth < 768 ? 0.05 : 0.1 
    });

    elements.forEach(el => observer.observe(el));
  };

  // Animate cyber skills
  animateOnScroll(
    document.querySelectorAll('.cyber-skills li'),
    'visible'
  );

  // Animate achievement items
  animateOnScroll(
    document.querySelectorAll('.achievement-item'),
    'visible'
  );

  // Animate project list items
  document.querySelectorAll('.project-content ul').forEach(list => {
    Array.from(list.children).forEach((li, index) => {
      li.style.transitionDelay = `${index * 0.1}s`;
      animateOnScroll([li], 'visible');
    });
  });
}

// ===== Debounce Function =====
function debounce(func, wait = 100, immediate = false) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ===== Initialize Particles =====
function initParticles() {
  if (typeof particlesJS !== 'function') return;
  
  // Check for reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery && mediaQuery.matches) return;
  
  particlesJS("particles-js", {
    particles: {
      number: { 
        value: Math.min(80, window.innerWidth / 10), 
        density: { enable: true, value_area: 800 } 
      },
      color: { value: "#4BB4DE" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { 
        enable: true, 
        distance: 150, 
        color: "#3B8AC4", 
        opacity: 0.4, 
        width: 1 
      },
      move: { 
        enable: true, 
        speed: 2, 
        direction: "none", 
        random: true 
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
}

// ===== Handle Window Resize =====
function handleResize() {
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Reinitialize particles on resize if needed
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    initParticles();
  }
}

// ===== Initialize All Components =====
document.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initTaglineTyping();
  initThemeToggle();
  initSmoothScrolling();
  initBackToTop();
  initFormValidation();
  initMobileMenu();
  initLoader();
  initInteractiveScan();
  initScrollAnimations();
  initParticles();
  
  // Update clock every second
  setInterval(updateClock, 1000);
  updateClock();
  
  // Update copyright year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ===== Window Resize Handler =====
window.addEventListener('resize', debounce(() => {
  handleResize();
}, 200));

// ===== Handle Reduced Motion Preference =====
const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
motionMediaQuery.addEventListener('change', () => {
  if (motionMediaQuery.matches) {
    // Disable animations when reduced motion is preferred
    document.querySelectorAll('[style*="animation"], [style*="transition"]').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }
});

// Add to your existing script.js

// ===== Project Page Animations =====
function initProjectPageAnimations() {
  if (!document.querySelector('.project-section')) return;

  // Animate project sections on scroll
  const projectSections = document.querySelectorAll('.project-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  projectSections.forEach(section => {
    observer.observe(section);
  });

  // Interactive screenshot zoom
  const screenshot = document.querySelector('.project-screenshot');
  if (screenshot) {
    screenshot.addEventListener('click', function() {
      this.classList.toggle('zoom');
    });
  }
}

// Update your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // ... existing initializations ...
  initProjectPageAnimations();
});
