// Loading Animation
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
});

// Typing Effect for Tagline
document.addEventListener("DOMContentLoaded", function () {
  const tagline = document.querySelector(".tagline");

  const texts = [
    "Securing the Digital Frontier, One Vulnerability at a Time.",
    "Empowering Innovation with Cybersecurity Excellence.",
    "Defending Tomorrow’s Tech, Today."
  ];

  let textIndex = 0;
  let index = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];
    tagline.textContent = currentText.substring(0, index);

    if (!isDeleting && index < currentText.length) {
      index++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && index > 0) {
      index--;
      setTimeout(type, typingSpeed / 2);
    } else {
      isDeleting = !isDeleting;

      if (!isDeleting) {
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, 1000);
    }
  }

  type();
});


// Smooth Scrolling with Extra Features
document.addEventListener("DOMContentLoaded", function () {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const backToTopBtn = document.createElement("button");
  const progressBar = document.createElement("div");

  // Create Back to Top button
  backToTopBtn.innerText = "↑ Top";
  backToTopBtn.id = "backToTop";
  document.body.appendChild(backToTopBtn);

  // Create Scroll Progress Bar
  progressBar.id = "progressBar";
  document.body.appendChild(progressBar);

  // Smooth scrolling with offset for fixed headers
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = 80; // Offset for fixed header
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight active link while scrolling
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        document.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        const link = document.querySelector(`a[href="#${section.id}"]`);
        if (link) link.classList.add("active");
      }
    });

    // Back to Top Button with Cool Features
document.addEventListener("DOMContentLoaded", function () {
  // Create Back to Top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerText = "↑ 0%";
  backToTopBtn.id = "backToTop";
  document.body.appendChild(backToTopBtn);

  let hideTimeout;

  // Handle scroll events
  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.pointerEvents = "auto";
      backToTopBtn.innerText = `↑ ${scrollPercent}%`;

      // Auto-hide after inactivity
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }, 3000); // Hide after 3 seconds
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.pointerEvents = "none";
    }
  });

  // Scroll to top on button click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


    // Update scroll progress bar
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // Scroll to top on button click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// Animated Skill Bars
const skillsSection = document.querySelector("#skills");
const skillBars = document.querySelectorAll(".skill-bar");

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width;
  });
}

function checkScroll() {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    animateSkillBars();
    window.removeEventListener("scroll", checkScroll);
  }
}

window.addEventListener("scroll", checkScroll);

// Dark/Light Mode Toggle
const modeToggle = document.querySelector("#mode-toggle");
const logo = document.querySelector("#logo");
const body = document.body;

if (modeToggle) {
  modeToggle.addEventListener("click", function () {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      modeToggle.textContent = "Dark Mode";
      logo.src = "assets/logo-light.png";
    } else {
      modeToggle.textContent = "Light Mode";
      logo.src = "assets/logo-dark.png";
    }
  });
}

// Form Validation
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill out all fields.");
    }
  });
}

// Scroll to Top Button
const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Dynamic Year in Footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Hover Effects for Social Links
const socialLinks = document.querySelectorAll(".social-links a");

socialLinks.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.color = "#4bb4de";
  });

  link.addEventListener("mouseleave", function () {
    this.style.color = "#efdbcb";
  });
});

// Real-time Clock
function updateClock() {
  const clock = document.getElementById("clock");
  if (clock) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

// Interactive Terminal (Fake Commands)
const terminal = document.getElementById("terminal");
const terminalInput = document.getElementById("terminal-input");

if (terminal && terminalInput) {
  terminalInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const command = terminalInput.value.trim().toLowerCase();
      let output = "";

      switch (command) {
        case "help":
          output = "Available commands: about, skills, projects, contact, clear";
          break;
        case "about":
          output = "I am a Computer Science student focused on cybersecurity.";
          break;
        case "skills":
          output = "Penetration Testing, Web Security, Programming, Networking";
          break;
        case "projects":
          output = "Vulnerability Reports, CTF Write-ups, Personal Projects";
          break;
        case "contact":
          output = "Email: chaitanya@example.com | GitHub: chaitanyan-00";
          break;
        case "clear":
          terminal.innerHTML = "> ";
          terminalInput.value = "";
          return;
        default:
          output = `Command not found: ${command}`;
      }

      terminal.innerHTML += `<div>> ${command}</div>`; // Display the command
      terminal.innerHTML += `<div>${output}</div>`; // Display the output
      terminal.innerHTML += `<div>> </div>`; // Add a new input line

      terminalInput.value = "";
      terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
    }
  });
}

// Dynamic Content Loading (Simulated)
function loadContent() {
  const content = document.getElementById("dynamic-content");
  if (content) {
    setTimeout(() => {
      content.innerHTML = `
        <h3>Dynamic Content Loaded</h3>
        <p>This content was loaded dynamically after 2 seconds.</p>
      `;
    }, 2000);
  }
}

loadContent();

// Initialize Particles.js
particlesJS.load("particles-js", "particles.json", function () {
  console.log("Particles loaded!");
});

// Cybersecurity Challenges
document.getElementById("submit-challenge").addEventListener("click", function () {
  const answer = document.getElementById("challenge-input").value.trim();
  const result = document.getElementById("challenge-result");

  if (answer === "This is a test") {
    result.textContent = "Correct! 🎉";
    result.style.color = "green";
  } else {
    result.textContent = "Incorrect. Try again!";
    result.style.color = "red";
  }
});

// Password Strength Checker
document.getElementById("password-input").addEventListener("input", function () {
  const password = this.value;
  const strength = checkPasswordStrength(password);
  const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][strength];
  const strengthColor = ["red", "orange", "yellow", "lightgreen", "green"][strength];

  document.getElementById("password-strength").textContent = `Strength: ${strengthText}`;
  document.getElementById("password-strength").style.color = strengthColor;
});

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^A-Za-z0-9]/)) strength++;
  return strength;
}