/**
 * CHANDRU M - PROFESSIONAL PORTFOLIO
 * High Quality Animations & Core Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initNavbarScroll();
  initActiveNavSpy();
  initSkillFilter();
  initCounterAnimation();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initCopyButtons();
  initLocalTime();

  // High Quality Animation Systems
  initScrollProgressBar();
  initCursorSpotlight();
  initAmbientParticles();
  initTypewriter();
  initCardTiltEffect();
  initScrollReveal();
});

/* ===================================================================
   1. THEME SWITCHER (Dark & Light)
=================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('chandru_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('chandru_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
=================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];

  if (!toggleBtn || !mobileMenu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    
    const icon = toggleBtn.querySelector('svg');
    if (icon) {
      if (isOpen) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* ===================================================================
   3. NAVBAR SCROLL EFFECT
=================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ===================================================================
   4. ACTIVE NAV SPY
=================================================================== */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

/* ===================================================================
   5. SKILL CATEGORY FILTER
=================================================================== */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. METRIC COUNTERS ANIMATION
=================================================================== */
function initCounterAnimation() {
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  if (!metricNumbers.length) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        metricNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = 25;
          const step = Math.ceil(target / 40) || 1;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${count}${suffix}`;
            }
          }, speed);
        });
      }
    });
  }, { threshold: 0.3 });

  const ribbon = document.querySelector('.metrics-ribbon');
  if (ribbon) observer.observe(ribbon);
}

/* ===================================================================
   7. PROJECT MODALS
=================================================================== */
const projectsData = {
  ai_resume: {
    title: 'AI Resume Analysis System',
    category: 'AI / NLP & Web Application',
    image: 'assets/images/project_ai_resume.jpg',
    description: 'An AI-based resume analysis system that extracts skills, education, and experience from candidate resumes and compares them against job requirements. The system helps recruiters improve recruitment efficiency by providing candidate-job matching and ranking.',
    concepts: [
      'Python',
      'AI / NLP',
      'Resume Parsing',
      'TF-IDF Vectorization',
      'Cosine Similarity',
      'Skill Matching',
      'Job Recommendation',
      'Database',
      'Web Application'
    ],
    keyFeatures: [
      'Automated extraction of candidate qualifications, skill sets, and work experience.',
      'Mathematical TF-IDF scoring and Cosine Similarity computation against job descriptions.',
      'Recruiter ranking dashboard displaying match percentages and recommendation radar.',
      'Streamlined candidate shortlisting to reduce recruitment review time and human bias.'
    ],
    technicalHighlights: 'Built using Python NLP parsing pipeline, text tokenization, TF-IDF vectorization models, and database storage for structured candidate profiles.'
  },
  jewellery_pos: {
    title: 'Jewellery Management System',
    category: 'Enterprise Management System',
    image: 'assets/images/project_jewellery_pos.jpg',
    description: 'A comprehensive management system specifically engineered for jewellery retail operations. The Sales Force module manages sales staff activities, billing, and customer handling. It tracks sales performance, supports accurate billing, and improves overall operational efficiency.',
    concepts: [
      'Management System',
      'Sales Force Module',
      'Billing Engine',
      'Customer Handling',
      'Inventory & Sales Analytics',
      'Operational Efficiency'
    ],
    keyFeatures: [
      'Dedicated Sales Force module tracking sales staff performance, targets, and commissions.',
      'High-speed Point-of-Sale billing with automated tax calculations and itemized gold/diamond invoices.',
      'Customer relationship management storing client purchase history and preferences.',
      'Operational analytics and daily inventory tracking for improved retail efficiency.'
    ],
    technicalHighlights: 'Designed for high reliability in retail environments, optimizing transactional integrity, staff workflow coordination, and sales reporting.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const openButtons = document.querySelectorAll('.open-project-btn');
  const closeBtn = document.getElementById('closeProjectModal');

  if (!modal) return;

  function openProject(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modalProjectImg').src = data.image;
    document.getElementById('modalProjectImg').alt = data.title;
    document.getElementById('modalProjectCategory').textContent = data.category;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectDesc').textContent = data.description;
    document.getElementById('modalProjectHighlights').textContent = data.technicalHighlights;

    const techContainer = document.getElementById('modalProjectTech');
    techContainer.innerHTML = '';
    data.concepts.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    const featuresContainer = document.getElementById('modalProjectFeatures');
    featuresContainer.innerHTML = '';
    data.keyFeatures.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'feature-item';
      li.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${feat}</span>
      `;
      featuresContainer.appendChild(li);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProject(projectId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================================================================
   8. RESUME MODAL & PRINT FUNCTIONALITY
=================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('closeResumeModal');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResume);
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeResume();
    }
  });
}

/* ===================================================================
   9. CONTACT FORM — FORMSPREE SUBMISSION
=================================================================== */
function initContactForm() {
  const contactForm    = document.getElementById('contactForm');
  const messageInput   = document.getElementById('formMessage');
  const charCounter    = document.getElementById('charCounter');
  const submitBtn      = document.getElementById('btnSubmitForm');
  const submitBtnText  = document.getElementById('submitBtnText');
  const submitIcon     = document.getElementById('submitIcon');
  const formFeedback   = document.getElementById('formFeedback');

  if (!contactForm) return;

  /* Read the Formspree URL directly from the form's action attribute */
  const FORMSPREE_URL = contactForm.getAttribute('action');

  /* Set _next so HTML-fallback redirect returns to the contact section */
  const nextField = contactForm.querySelector('input[name="_next"]');
  if (nextField) nextField.value = window.location.origin + window.location.pathname + '#contact';

  /* --- Character counter --- */
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 500 characters`;
    });
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();


    const name    = document.getElementById('formName').value.trim();
    const email   = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim() || 'Portfolio Contact Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    /* --- Client-side validation --- */
    if (!name || !email || !message) {
      showFeedback('error', '⚠️ Please fill in all required fields (Name, Email, Message).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('error', '⚠️ Please enter a valid email address.');
      return;
    }

    /* Sync _replyto hidden field so Formspree can thread replies */
    const replyTo = document.getElementById('_replyto');
    if (replyTo) replyTo.value = email;

    /* --- Loading state --- */
    setLoadingState(true);
    hideFeedback();

    try {
      const response = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(contactForm)
      });

      if (response.ok) {
        /* ✅ Success */
        showFeedback('success',
          `✅ Message sent successfully! Thank you, <strong>${escapeHtml(name)}</strong>. I'll get back to you soon.`
        );
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500 characters';
        showToast('Message delivered via Formspree ✉️');
      } else {
        /* Server returned an error */
        const data = await response.json().catch(() => ({}));
        const errMsg = data?.errors?.map(err => err.message).join(', ')
                    || 'Submission failed. Please try again.';
        showFeedback('error', `❌ ${errMsg}`);
        showToast('Message could not be sent. Please retry.');
      }
    } catch (networkErr) {
      showFeedback('error', '❌ Network error — please check your connection and try again.');
      showToast('Network error. Please retry.');
      console.error('Formspree error:', networkErr);
    } finally {
      setLoadingState(false);
    }
  });

  /* ── Helpers ──────────────────────────────────────────────── */
  function setLoadingState(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (submitBtnText) {
      submitBtnText.textContent = loading ? 'Sending…' : 'Send Message';
    }
    if (submitIcon) {
      submitIcon.innerHTML = loading
        ? `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"
             stroke-dasharray="31.4" stroke-dashoffset="10"
             style="animation:spin 0.8s linear infinite;transform-origin:center"/>
           <style>@keyframes spin{to{transform:rotate(360deg)}}</style>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>`;
    }
  }

  function showFeedback(type, html) {
    if (!formFeedback) return;
    formFeedback.style.display = 'block';
    formFeedback.className = type === 'success' ? 'form-feedback-success' : 'form-feedback-error';
    formFeedback.innerHTML = html;
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFeedback() {
    if (!formFeedback) return;
    formFeedback.style.display = 'none';
    formFeedback.innerHTML = '';
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
}


/* ===================================================================
   10. ONE-CLICK COPY TO CLIPBOARD
=================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg> Copied!
        `;
        showToast(`Copied "${textToCopy}" to clipboard`);

        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  });
}

/* ===================================================================
   11. REAL-TIME LOCAL CLOCK (Tiruppur, India - IST)
=================================================================== */
function initLocalTime() {
  const clockElement = document.getElementById('localClock');
  if (!clockElement) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat([], options);
    clockElement.textContent = formatter.format(new Date()) + ' IST';
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ===================================================================
   12. TOAST NOTIFICATION UTILITY
=================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="#10b981" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ===================================================================
   13. TOP SCROLL PROGRESS BAR
=================================================================== */
function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ===================================================================
   14. INTERACTIVE AMBIENT MOUSE SPOTLIGHT
=================================================================== */
function initCursorSpotlight() {
  let spotlight = document.querySelector('.ambient-spotlight');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.className = 'ambient-spotlight';
    document.body.appendChild(spotlight);
  }

  let rafId = null;
  window.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }, { passive: true });
}

/* ===================================================================
   15. AMBIENT PARTICLES CONSTELLATION IN HERO
=================================================================== */
function initAmbientParticles() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'heroCanvas';
  heroSection.insertBefore(canvas, heroSection.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 38;

  function resize() {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   16. DYNAMIC TYPEWRITER EFFECT
=================================================================== */
function initTypewriter() {
  const typingTarget = document.getElementById('typingText');
  if (!typingTarget) return;

  const roles = [
    'B.Sc Computer Science Graduate',
    'MBA Student (2026–2028)',
    'UI/UX & Digital Technology Enthusiast',
    'Data Analysis & Power BI Practitioner',
    'AI & Automation Solutions Builder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 1800;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ===================================================================
   17. 3D INTERACTIVE CARD TILT
=================================================================== */
function initCardTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card, .project-card, .avatar-wrapper');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ===================================================================
   18. SCROLL REVEAL ANIMATIONS
=================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
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

  revealElements.forEach(el => observer.observe(el));
}
