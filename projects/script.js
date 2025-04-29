// Projects Page Script - Shared by all project pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from localStorage or preference
    function initTheme() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        document.body.classList.toggle('light-mode', savedTheme === 'light');
      } else {
        document.body.classList.toggle('light-mode', !prefersDark);
      }
      
      updateThemeToggle();
    }
    
    // Update theme toggle icon
    function updateThemeToggle() {
      const modeToggle = document.getElementById('mode-toggle');
      if (modeToggle) {
        const isLight = document.body.classList.contains('light-mode');
        modeToggle.innerHTML = isLight 
          ? '<i class="fas fa-moon" aria-hidden="true"></i>' 
          : '<i class="fas fa-sun" aria-hidden="true"></i>';
        modeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      }
    }
    
    // Theme toggle event
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
      modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeToggle();
      });
    }
    
    // Initialize theme
    initTheme();
    
    // Update clock
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const clockElement = document.getElementById('clock');
      if (clockElement) {
        clockElement.textContent = `${hours}:${minutes} ${ampm}`;
        clockElement.setAttribute('aria-live', 'polite');
      }
    }
    setInterval(updateClock, 60000);
    updateClock();
  
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
  
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // Initialize particles if available
    if (typeof particlesJS === 'function') {
      particlesJS("particles-js", {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
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
          move: { enable: true, speed: 2 }
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
    
    // Scroll animations
    const animateOnScroll = () => {
      const projectSections = document.querySelectorAll('.project-section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
  
      projectSections.forEach(section => {
        observer.observe(section);
      });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Update current year
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  // Initialize theme
document.addEventListener('DOMContentLoaded', function() {
  // Sync with main theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('mode-toggle').innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-section').forEach(section => {
    observer.observe(section);
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
});
