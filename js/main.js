/**
 * KIVO DIGITAL MARKETING - CORE INTERACTION CONTROLLER
 * Handles Sticky Navigation, ScrollSpy, Mobile Glass Drawer, WhatsApp/Email Form Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initScrollSpy();
  initSmoothScroll();
  initMobileMenu();
  initCursorSpotlight();
  initStatCounters();
  initContactForm();
  initCopyActions();
  initHero3DParallax();
  initServiceSearch();
  initClientFilters();
  initUrlScrollHelper();
});

/**
 * 1. Sticky Header Animation Controller
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. ScrollSpy: Dynamically update active navigation indicator
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-nav .mobile-nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        updateActiveLinks(activeId);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  function updateActiveLinks(id) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/**
 * 3. Smooth Scrolling with Dynamic Sticky Header Offset
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 20);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * 4. Luxury Mobile Glass Drawer Toggle & Accessibility
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn-cta');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    
    toggleBtn.classList.toggle('active', isOpen);
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/**
 * 5. Interactive Ambient Cursor Glow Spotlight
 */
function initCursorSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    posX += (mouseX - posX) * 0.12;
    posY += (mouseY - posY) * 0.12;
    spotlight.style.left = `${posX}px`;
    spotlight.style.top = `${posY}px`;
    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * 6. Animated Stat Counters on Scroll
 */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(2, -10 * progress);
          const currentVal = target * easeOut;

          el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * 7. Interactive Project Consultation Form Handler
 * Dispatches to WhatsApp (+91 9440524658) or Mailto
 */
function initContactForm() {
  const form = document.getElementById('kivo-consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name')?.value || 'Client';
    const phone = document.getElementById('client-phone')?.value || '';
    const budget = document.getElementById('client-budget')?.value || 'Not specified';
    const message = document.getElementById('client-message')?.value || '';
    
    // Collect checked services
    const checkedBoxes = document.querySelectorAll('input[name="services"]:checked');
    const selectedServices = Array.from(checkedBoxes).map(cb => cb.value).join(', ');

    const text = `Hello Kivo Digital Marketing Team!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Services Needed:* ${encodeURIComponent(selectedServices || 'General Marketing Growth')}%0A*Budget:* ${encodeURIComponent(budget)}%0A*Project Goals:* ${encodeURIComponent(message)}`;

    // Open WhatsApp directly to 9440524658
    const whatsappUrl = `https://wa.me/919440524658?text=${text}`;
    window.open(whatsappUrl, '_blank');
  });
}

/**
 * 8. Copy to Clipboard Utility for Direct Inquiries
 */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color: var(--accent-teal);">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });
}

/**
 * 9. Real-Time 3D Hero Parallax & Gyroscopic Depth Controller
 * Responds to mouse movement to dynamically rotate and tilt the 3D stage in real-time
 */
function initHero3DParallax() {
  const stage = document.getElementById('hero-3d-interactive-stage');
  const cardStack = document.getElementById('hero-card-stack');
  const elements = document.querySelectorAll('#hero-card-stack .stage-element');
  if (!stage || !cardStack) return;

  let targetTiltX = 0, targetTiltY = 0;
  let currentTiltX = 0, currentTiltY = 0;
  let isHovered = false;

  const onMouseMove = (e) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    targetTiltY = Math.max(-12, Math.min(12, normX * 12));
    targetTiltX = Math.max(-10, Math.min(10, -normY * 10));
    isHovered = true;
  };

  const onMouseLeave = () => {
    targetTiltX = 0;
    targetTiltY = 0;
    isHovered = false;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  stage.addEventListener('mouseleave', onMouseLeave, { passive: true });

  function updateParallax() {
    if (window.innerWidth <= 768) {
      cardStack.style.transform = '';
      requestAnimationFrame(updateParallax);
      return;
    }

    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    if (Math.abs(currentTiltX) > 0.01 || Math.abs(currentTiltY) > 0.01 || isHovered) {
      cardStack.style.transform = `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
    }

    requestAnimationFrame(updateParallax);
  }

  requestAnimationFrame(updateParallax);
}

/**
 * 10. Interactive Service Quick Search Bar
 */
function initServiceSearch() {
  const searchInput = document.getElementById('service-search-input');
  const dropdown = document.getElementById('search-dropdown-menu');
  if (!searchInput || !dropdown) return;

  const items = dropdown.querySelectorAll('.search-dropdown-item');

  searchInput.addEventListener('focus', () => {
    dropdown.removeAttribute('hidden');
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    dropdown.removeAttribute('hidden');

    let visibleCount = 0;
    items.forEach((item) => {
      const text = (item.getAttribute('data-search') || item.textContent).toLowerCase();
      if (text.includes(query) || query === '') {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      dropdown.setAttribute('hidden', '');
    }
  });

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetQuery = item.getAttribute('data-search') || '';
      searchInput.value = '';
      dropdown.setAttribute('hidden', '');

      // Smooth scroll to services
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 75;
        const targetPos = servicesSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 20);
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        // Highlight matching card
        const cards = servicesSection.querySelectorAll('.glass-card');
        const firstWord = targetQuery.split(' ')[0];
        cards.forEach((card) => {
          if (card.textContent.toLowerCase().includes(firstWord)) {
            card.classList.add('search-highlighted');
            setTimeout(() => card.classList.remove('search-highlighted'), 3000);
          }
        });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.setAttribute('hidden', '');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.setAttribute('hidden', '');
      searchInput.blur();
    }
  });
}

/**
 * 11. Interactive Client Brand Category Filter
 */
function initClientFilters() {
  const filterBtns = document.querySelectorAll('.client-filter-btn');
  const clientCards = document.querySelectorAll('.client-brand-card');

  if (!filterBtns.length || !clientCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      clientCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 12. Instant Section Scroll Helper via URL param
 */
function initUrlScrollHelper() {
  const urlParams = new URLSearchParams(window.location.search);
  const scrollTarget = urlParams.get('scroll');
  if (scrollTarget) {
    const el = document.getElementById(scrollTarget) || document.querySelector('.' + scrollTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }
}

