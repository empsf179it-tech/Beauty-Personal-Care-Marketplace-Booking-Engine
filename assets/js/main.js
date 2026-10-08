document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Logic via Event Delegation
    document.addEventListener('click', (e) => {
        const hamburgerBtn = e.target.closest('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburgerBtn && navLinks) {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        }
        
        // Close menu when clicking a link
        if (e.target.closest('.nav-link') && navLinks) {
            const hamb = document.querySelector('.hamburger');
            if (hamb) hamb.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

  // Theme Toggle Logic via Event Delegation
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  const sunSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const moonSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = moonSvg);
  } else {
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = sunSvg);
  }

  // Use event delegation in case the navbar is re-rendered or script runs early
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.theme-toggle');
    if (toggleBtn) {
      e.preventDefault();
      const isDark = body.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = sunSvg);
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = moonSvg);
      }
    }
  });

  // Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    document.body.appendChild(cursor); // Force to end of DOM for highest stacking
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactables = document.querySelectorAll('a, button, .service-item, .editorial-card, .time-slot, .service-display-row, .provider-card, .faq-question, .offer-banner');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active Nav Link Logic
  const currentLocation = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });



  // Booking Modal Logic
  const bookBtns = document.querySelectorAll('.book-cta');
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (modal) {
    bookBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.2
    });

    gsap.from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.8
    });

    gsap.from('.tag', {
      y: 'random(-50, 50)',
      x: 'random(-50, 50)',
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 1
    });

    // GSAP removed for native scroll behavior via buttons

    // Editorial Cards reveal
    gsap.utils.toArray('.editorial-card').forEach(card => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
    });
  }

  // Booking Multi-step logic (Demo)
  let currentStep = 1;
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  
  function showStep(stepNum) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`step-${stepNum}`);
    if (target) target.classList.add('active');
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep++;
      showStep(currentStep);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // Time Slot Selection
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      timeSlots.forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Service Selection
  const services = document.querySelectorAll('.service-item');
  const totalDisplay = document.getElementById('booking-total');
  
  services.forEach(service => {
    service.addEventListener('click', function() {
      services.forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
      const price = this.getAttribute('data-price');
      if (totalDisplay && price) {
        totalDisplay.innerText = `₹${price}`;
      }
    });
  });

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
