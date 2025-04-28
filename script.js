// Projects Page Script - Shared by all project pages
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme toggle
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      this.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
  }

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
      }
    });
  }
});
