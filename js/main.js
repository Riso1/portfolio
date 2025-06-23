// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const projectSearch = document.getElementById("project-search");
const categoryFilter = document.getElementById("category-filter");
const projectsGrid = document.getElementById("projects-grid");
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
const formError = document.getElementById("form-error");

// Mobile Navigation - работает на всех страницах
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("show");
    }
  });
});

// Active Navigation Link для главной страницы
function setActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  if (sections.length === 0) return; // Если нет секций с ID, выходим

  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

// Применяем активную навигацию только на главной странице
if (document.querySelector("section[id]")) {
  window.addEventListener("scroll", setActiveNavLink);
}

// Smooth Scrolling для якорных ссылок (только на главной странице)
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Если ссылка начинается с #, это якорь на текущей странице
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(href);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    // Для обычных ссылок (index.html, projects.html и т.д.) позволяем стандартное поведение
  });
});

// Project Filtering - только для страницы проектов
let allProjects = [];

function initializeProjects() {
  const projectCards = document.querySelectorAll(".project-card");
  if (projectCards.length === 0) return;

  allProjects = Array.from(projectCards).map((card) => ({
    element: card,
    title: card.querySelector("h3").textContent.toLowerCase(),
    description: card.querySelector("p").textContent.toLowerCase(),
    category: card.dataset.category,
    tech: Array.from(card.querySelectorAll(".tech-tag")).map((tag) =>
      tag.textContent.toLowerCase()
    ),
  }));
}

function filterProjects() {
  if (!projectSearch || !categoryFilter || allProjects.length === 0) return;

  const searchTerm = projectSearch.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const noResults = document.getElementById("no-results");
  let visibleCount = 0;

  allProjects.forEach((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title.includes(searchTerm) ||
      project.description.includes(searchTerm) ||
      project.tech.some((tech) => tech.includes(searchTerm));

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    if (matchesSearch && matchesCategory) {
      project.element.style.display = "block";
      project.element.style.animation = "fadeInUp 0.6s ease forwards";
      visibleCount++;
    } else {
      project.element.style.display = "none";
    }
  });

  // Показать/скрыть сообщение "Проекты не найдены"
  if (noResults) {
    if (visibleCount === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }
}

// Event Listeners для фильтрации проектов
if (projectSearch) {
  projectSearch.addEventListener("input", filterProjects);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterProjects);
}

// Contact Form Handling - только для страницы контактов
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Hide previous messages
    if (formSuccess) formSuccess.classList.remove("show");
    if (formError) formError.classList.remove("show");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formSuccess) {
        formSuccess.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
          formSuccess.classList.remove("show");
        }, 5000);
      }
    } catch (error) {
      if (formError) {
        formError.classList.add("show");

        setTimeout(() => {
          formError.classList.remove("show");
        }, 5000);
      }
    }
  });
}

// Scroll Animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".scroll-animate");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);

// Progress Bar Animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar__fill");

  progressBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;

    if (barTop < window.innerHeight - 100) {
      const width = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    }
  });
}

// Run progress bar animation once when skills section is visible
let progressAnimated = false;
window.addEventListener("scroll", () => {
  if (!progressAnimated) {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 200) {
        animateProgressBars();
        progressAnimated = true;
      }
    }
  }
});

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 50) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }
});

// Counter Animation for Stats (только для главной страницы)
function animateCounters() {
  const counters = document.querySelectorAll(".stat__number");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
}

// Run counter animation when hero section is visible
let countersAnimated = false;
window.addEventListener("scroll", () => {
  if (!countersAnimated) {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      const sectionTop = heroSection.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 300) {
        animateCounters();
        countersAnimated = true;
      }
    }
  }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  setActiveNavLink();
  animateOnScroll();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website loaded successfully!");

  // Initialize projects filtering if on projects page
  if (projectsGrid) {
    initializeProjects();
  }

  // Add scroll-animate class to elements that should animate
  const animateElements = document.querySelectorAll(
    ".skill-card, .tech-card, .project-card, .contact-card, .achievement"
  );
  animateElements.forEach((element) => {
    element.classList.add("scroll-animate");
  });

  // Initial check for elements already in view
  animateOnScroll();

  // Add loading animation removal
  const loader = document.querySelector(".loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }, 1000);
  }
});
