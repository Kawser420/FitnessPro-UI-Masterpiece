// Fitness Pro - JavaScript Code

document.addEventListener("DOMContentLoaded", function () {
  // Loading Screen
  const loadingScreen = document.querySelector(".loading-screen");

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");

    // Remove loading screen from DOM after fade out
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);

  // Theme Switcher
  const themeToggle = document.getElementById("themeToggle");
  const themeSwitcher = document.querySelector(".theme-switcher");
  const themeButtons = document.querySelectorAll(".theme-btn");

  themeToggle.addEventListener("click", function () {
    themeSwitcher.classList.toggle("active");
  });

  themeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", theme);

      // Store theme preference in localStorage
      localStorage.setItem("fitness-theme", theme);

      // Close theme switcher after selection
      themeSwitcher.classList.remove("active");
    });
  });

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("fitness-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // Mobile Menu Functionality
  const menubar = document.querySelector(".menubar");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.createElement("div");
  const navClose = document.createElement("button");

  // Create overlay for mobile menu
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);

  // Create close button for mobile menu
  navClose.className = "nav-close";
  navClose.innerHTML = '<i class="fas fa-times"></i>';
  navLinks.appendChild(navClose);

  // Toggle mobile menu
  function toggleMobileMenu() {
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  }

  // Event listeners for mobile menu
  menubar.addEventListener("click", toggleMobileMenu);
  navClose.addEventListener("click", toggleMobileMenu);
  navOverlay.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        toggleMobileMenu();
      }
    });
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Active Navigation Link
  const sections = document.querySelectorAll("main section");
  const navLinksArray = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    navLinksArray.forEach((link) => link.classList.remove("active"));
    if (navLinksArray[index]) {
      navLinksArray[index].classList.add("active");
    }
  }

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // BMI Calculator
  const calculateBtn = document.getElementById("calculateBmi");
  const bmiResult = document.getElementById("bmiResult");

  calculateBtn.addEventListener("click", function () {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      bmiResult.innerHTML = `
        <div class="result-error">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Please enter valid height and weight values</p>
        </div>
      `;
      return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(1);

    // Determine BMI category
    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "var(--warning-color)";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      color = "var(--success-color)";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "var(--warning-color)";
    } else {
      category = "Obesity";
      color = "var(--error-color)";
    }

    // Display result
    bmiResult.innerHTML = `
      <div class="result-success">
        <h3 style="color: ${color}">${roundedBmi}</h3>
        <p style="color: ${color}">${category}</p>
        <div class="bmi-bar">
          <div class="bmi-progress" style="width: ${Math.min(
            (bmi / 40) * 100,
            100
          )}%; background: ${color}"></div>
        </div>
      </div>
    `;

    // Add animation
    bmiResult.style.animation = "pulse 0.5s ease";
    setTimeout(() => {
      bmiResult.style.animation = "";
    }, 500);
  });

  // Testimonials Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    testimonials[index].classList.add("active");
    currentTestimonial = index;
  }

  prevBtn.addEventListener("click", function () {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    }
    showTestimonial(newIndex);
  });

  nextBtn.addEventListener("click", function () {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialSlider = document.querySelector(".testimonials-slider");
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      let newIndex = currentTestimonial + 1;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      showTestimonial(newIndex);
    }, 5000);
  });

  // Pricing Toggle
  const pricingToggle = document.getElementById("pricingToggle");
  const monthlyPrices = [29, 59, 99];
  const yearlyPrices = [23.2, 47.2, 79.2]; // 20% discount

  pricingToggle.addEventListener("change", function () {
    const prices = document.querySelectorAll(".price .amount");

    if (this.checked) {
      // Yearly pricing
      prices.forEach((price, index) => {
        price.textContent = yearlyPrices[index];
      });
    } else {
      // Monthly pricing
      prices.forEach((price, index) => {
        price.textContent = monthlyPrices[index];
      });
    }
  });

  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".feature-card, .card-habit, .program-card, .meet-trainer, .pricing-card"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .card-habit, .program-card, .meet-trainer, .pricing-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  // Trigger once on load
  animateOnScroll();

  // Form Validation for Newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      if (emailInput.value && isValidEmail(emailInput.value)) {
        // Simulate successful subscription
        emailInput.value = "";
        showNotification(
          "Successfully subscribed to our newsletter!",
          "success"
        );
      } else {
        showNotification("Please enter a valid email address.", "error");
      }
    });
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification System
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-triangle"
        }"></i>
        <span>${message}</span>
      </div>
    `;

    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
        type === "success" ? "var(--success-color)" : "var(--error-color)"
      };
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transform: translateX(150%);
      transition: transform 0.3s ease;
      max-width: 350px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(150%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Counter Animation for Stats
  const stats = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateStats() {
    if (animated) return;

    const bannerPosition = document
      .querySelector(".banner")
      .getBoundingClientRect().top;

    if (bannerPosition < window.innerHeight - 100) {
      animated = true;

      stats.forEach((stat) => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 30);
      });
    }
  }

  window.addEventListener("scroll", animateStats);
  // Trigger on load
  animateStats();

  // Parallax Effect for Banner
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const banner = document.querySelector(".banner");
    const bannerContent = document.querySelector(".banner-content");
    const bannerImg = document.querySelector(".banner-img");

    if (banner && scrolled < banner.offsetHeight) {
      bannerContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      bannerImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Interactive Floating Elements
  const floatingCards = document.querySelectorAll(".floating-card");

  floatingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
