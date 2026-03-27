// Redesign Shield - App JS
// - Theme toggling with persistence & system preference
// - Mobile nav toggle
// - Hero text rotation synced with Lottie source changes
// - Card hover parallax effect
// - Drawer slide-up interactions
// - Smooth scroll and small utilities





(function () {
  'use strict';
  const doc = document.documentElement;
  const body = document.body;

  // Theme: init from storage or system
  const storageTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(mode) {
    body.setAttribute('data-theme', mode);
    // Update meta theme-color for better PWA/browser UI integration
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    const themeColor = getComputedStyle(body).getPropertyValue('--bg').trim();
    meta.setAttribute('content', themeColor);
  }
  const initTheme = storageTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initTheme);

  // Door Opening Animation
  const doorOverlay = document.getElementById('door-overlay');
  if (doorOverlay) {
    // Lock scroll initially
    body.style.overflow = 'hidden';
    
    // Fallback: Open door after 3 seconds anyway
    setTimeout(() => {
      if (!doorOverlay.classList.contains('door-open')) {
        doorOverlay.classList.add('door-open');
        body.style.overflow = '';
        setTimeout(() => { if(doorOverlay.parentNode) doorOverlay.remove(); }, 1300);
      }
    }, 3000);

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!doorOverlay.classList.contains('door-open')) {
          doorOverlay.classList.add('door-open');
          body.style.overflow = '';
          
          // Remove from DOM after animation closes to avoid z-index blocking
          setTimeout(() => {
            if(doorOverlay.parentNode) doorOverlay.remove();
          }, 1300); // 1.2s transform + buffer
        }
      }, 500); // Short delay after load
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const curr = body.getAttribute('data-theme');
      const next = curr === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile Nav Toggle
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('menu');
  if (nav && navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll enhancement for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Button hover spotlight position (CSS vars: --px / --py)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      btn.style.setProperty('--px', `${px}%`);
      btn.style.setProperty('--py', `${py}%`);
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.removeProperty('--px');
      btn.style.removeProperty('--py');
    });
  });

  // Hero Dynamic Text + Lottie Logic
  const roles = [
    { text: "Web Developer" },
    { text: "UI/UX Designer" },
    { text: "Performance Engineer" }
  ];

  const dynamicTextEl = document.getElementById('dynamicText');
  const lottieElements = document.querySelectorAll('.hero__lottie-wrap dotlottie-wc');
  
  let roleIndex = 0;

  if (dynamicTextEl && lottieElements.length > 0) {
    // Ensure first is playing
    if (lottieElements[0].play) lottieElements[0].play();

    setInterval(() => {
      // 1. Animate Out Text
      dynamicTextEl.classList.add('is-hidden');
      
      // Animate Out Current Lottie
      const currentLottie = lottieElements[roleIndex];
      if (currentLottie) {
          currentLottie.classList.remove('is-active');
          if (currentLottie.pause) currentLottie.pause(); // Optimize perf
      }

      // 2. Wait for exit animation, then swap
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        
        // Update Text
        dynamicTextEl.innerText = roles[roleIndex].text;
        
        // Update Lottie
        const nextLottie = lottieElements[roleIndex];
        if (nextLottie) {
            nextLottie.classList.add('is-active');
            if (nextLottie.play) nextLottie.play();
        }

        // 3. Animate In Text
        dynamicTextEl.classList.remove('is-hidden');
        
      }, 500); // Matches CSS transition duration
    }, 4000); // Change every 4 seconds
  }

  // Card hover parallax light
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * 20;
      const my = ((e.clientY - r.top) / r.height - 0.5) * 20;
      card.style.setProperty('--mx', `${mx}px`);
      card.style.setProperty('--my', `${my}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });

  // Drawer interactions
  const drawerBtn = document.querySelector('.fab--drawer');
  const drawer = document.getElementById('drawer');
  const drawerClose = drawer?.querySelector('.drawer__close');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.toggleAttribute('hidden', !open);
    if (open) { drawer.setAttribute('data-open', 'true'); drawerBtn?.setAttribute('aria-expanded', 'true'); }
    else { drawer.removeAttribute('data-open'); drawerBtn?.setAttribute('aria-expanded', 'false'); }
  }
  drawerBtn?.addEventListener('click', () => setDrawer(!drawer?.hasAttribute('data-open')));
  drawerClose?.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });



  // FAQ accordion: only one open at a time
  const faq = document.querySelector('#faq');
  if (faq) {
    const panels = faq.querySelectorAll('details');
    panels.forEach((p) => {
      // ensure only one panel open at a time
      p.addEventListener('toggle', () => {
        if (p.open) {
          panels.forEach((q) => { if (q !== p) q.removeAttribute('open'); });
        }
      });

      // clicking anywhere in the card (except summary) toggles state
      p.addEventListener('click', (e) => {
        if (e.target.closest('summary')) return; // summary already handles toggle
        p.open = !p.open;
      });
    });
  }

  // Contact Form: Show method selection popup
  const contactForm = document.getElementById('contactForm');
  const contactMethodModal = document.getElementById('contactMethodModal');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const emailBtn = document.getElementById('emailBtn');
  const telegramBtn = document.getElementById('telegramBtn');
  const closeModal = document.getElementById('closeModal');
  
  let formData_cache = {};
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Validate form
      if (!name || !email || !message) {
        alert('Please fill in Name, Email, and Message.');
        return;
      }
      
      // Cache form data for use in buttons
      formData_cache = { name, email, subject, message };
      
      // Show modal
      contactMethodModal.showModal();
    });
  }
  
  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      contactMethodModal.close();
    });
  }
  
  // Close modal when clicking outside
  if (contactMethodModal) {
    contactMethodModal.addEventListener('click', (e) => {
      if (e.target === contactMethodModal) {
        contactMethodModal.close();
      }
    });
  }
  
  // WhatsApp Button
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const { name, email, subject, message } = formData_cache;
      const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}${subject ? `\n*Subject:* ${subject}` : ''}\n*Message:* ${message}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/8801560034870?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
      contactMethodModal.close();
      contactForm.reset();
    });
  }
  
  // Email Button
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const { name, email, subject, message } = formData_cache;
      const mailtoLink = `mailto:info.redesignshield@gmail.com?subject=Contact Form: ${encodeURIComponent(subject || 'Contact')}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
      contactMethodModal.close();
      contactForm.reset();
    });
  }
  
  // Telegram Button
  if (telegramBtn) {
    telegramBtn.addEventListener('click', () => {
      const { name, email, subject, message } = formData_cache;
      const telegramMessage = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ''}\n\nMessage:\n${message}`;
      const encodedMessage = encodeURIComponent(telegramMessage);
      const telegramURL = `https://t.me/RedesignShield?text=${encodedMessage}`;
      window.open(telegramURL, '_blank');
      contactMethodModal.close();
      contactForm.reset();
    });
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Global Scroll Reveal
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Auto-add reveal class to sections and major elements for quick implementation
  document.querySelectorAll('section, h2, .card, .portfolio__item').forEach(el => {
    el.classList.add('reveal', 'reveal--scale');
    observer.observe(el);
  });

  document.querySelectorAll('.hero__left, .about__content, .why__content').forEach(el => {
    el.classList.add('reveal', 'reveal--left');
    observer.observe(el);
  });

  document.querySelectorAll('.hero__right, .about__visual, .why__visual').forEach(el => {
    el.classList.add('reveal', 'reveal--right');
    observer.observe(el);
  });
  // Render Portfolio Grid
  const portfolioGrid = document.getElementById('portfolioGrid');
  if (portfolioGrid && Array.isArray(portfolioData)) {
    portfolioGrid.innerHTML = portfolioData.map(item => `
      <figure class="portfolio__item" data-id="${item.id}">
        <img src="${item.desktop.image}" alt="${item.desktop.title}" loading="lazy" />
        <figcaption>${item.desktop.title}</figcaption>
      </figure>
    `).join('');
  }

  // Portfolio Modal Logic
  const modal = document.getElementById('portfolioModal');
  if (modal) {
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const closeModal = modal.querySelector('.modal__close');

    function openModal(itemEl) {
      const id = parseInt(itemEl.dataset.id);
      const data = portfolioData.find(d => d.id === id);
      
      if (!data) return;

      // Use fullImage for the monitor view (simulated by using same seed but larger dimensions in data)
      modalImg.src = data.popup.fullImage; 
      modalTitle.textContent = data.popup.title;
      modalDesc.textContent = data.popup.description;
      modalLink.href = data.popup.link;
      
      modal.showModal();
      modal.classList.add('is-open'); 
    }

    function closePortfolioModal() {
      modal.classList.remove('is-open');
      setTimeout(() => modal.close(), 300);
    }

    closeModal?.addEventListener('click', closePortfolioModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePortfolioModal();
    });

    portfolioGrid?.addEventListener('click', (e) => {
      const item = e.target.closest('.portfolio__item');
      if (item) {
        openModal(item);
      }
    });
  }

  // Testimonial Marquee Setup
  const testimonialMarquee = document.getElementById('testimonialMarquee');
  
  if (testimonialMarquee && Array.isArray(testimonialsData)) {
    // Render testimonials with stars, name, title, and company
    const renderTestimonials = (data) => data.map(testimonial => {
      const stars = '★'.repeat(testimonial.rating || 5);
      return `
        <div class="marquee-item">
          <div class="marquee-item__stars">${stars}</div>
          <p class="marquee-item__text">"${testimonial.text}"</p>
          <div class="marquee-item__footer">
            <span class="marquee-item__name">${testimonial.author}</span>
            <span class="marquee-item__meta">${testimonial.title} @ ${testimonial.company}</span>
          </div>
        </div>
      `;
    }).join('');

    // Fill the marquee and duplicate for seamless loop
    const content = renderTestimonials(testimonialsData);
    testimonialMarquee.innerHTML = content + content; // Double for seamless loop
  }


  // Chat FAB Toggle Logic
  const chatToggle = document.getElementById('chatToggle');
  const chatMenu = document.getElementById('chatMenu');
  
  if (chatToggle && chatMenu) {
    chatToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = chatMenu.classList.toggle('active');
      chatToggle.setAttribute('aria-expanded', String(isActive));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!chatMenu.contains(e.target) && !chatToggle.contains(e.target)) {
        chatMenu.classList.remove('active');
        chatToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        chatMenu.classList.remove('active');
        chatToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


})();
