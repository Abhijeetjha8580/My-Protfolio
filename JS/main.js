// ============================================
//  MAIN.JS — Cursor, Nav, Scroll, Form & More
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursorEl   = document.createElement('div');
  const followerEl = document.createElement('div');
  cursorEl.className   = 'cursor';
  followerEl.className = 'cursor-follower';

  if (window.innerWidth > 768) {
    document.body.appendChild(cursorEl);
    document.body.appendChild(followerEl);
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorEl.style.left = `${mouseX}px`;
    cursorEl.style.top  = `${mouseY}px`;
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    followerEl.style.left = `${followerX}px`;
    followerEl.style.top  = `${followerY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect — ring spins, dot turns purple
  const hoverTargets = document.querySelectorAll(
    'a, button, .skill-item, .project-card, .bulb-container, .road-btn'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorEl.classList.add('hovering');
      followerEl.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('hovering');
      followerEl.classList.remove('hovering');
    });
  });

  // ==========================================
  // NAVBAR — scroll behaviour
  // ==========================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    highlightNavLink();
  }, { passive: true });

  // ==========================================
  // ACTIVE NAV LINK on scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavLink() {
    let found = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= 100) found = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${found}`);
    });
  }

  // ==========================================
  // HAMBURGER MENU
  // ==========================================
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileMenu?.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // ==========================================
  // SCROLL REVEAL
  // ==========================================
  const revealSelectors = [
    '.about-left', '.about-right',
    '.skills-header', '.skill-item',
    '.projects-header', '.road-container',
    '.projects-showcase', '.contact-header',
    '.contact-container', '.footer'
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ==========================================
  // CONTACT FORM
  // ==========================================
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = form?.querySelector('.btn-submit');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      successMsg?.classList.add('visible');
      form.reset();
      setTimeout(() => successMsg?.classList.remove('visible'), 4000);
    }, 1500);
  });

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // SKILLS SCROLLER — pause on hover
  // ==========================================
  const skillsTrack = document.getElementById('skillsTrack');
  const scroller    = document.getElementById('skillsScroller');

  scroller?.addEventListener('mouseenter', () => {
    if (skillsTrack) skillsTrack.style.animationPlayState = 'paused';
  });
  scroller?.addEventListener('mouseleave', () => {
    if (skillsTrack) skillsTrack.style.animationPlayState = 'running';
  });

  // ==========================================
  // MARQUEE — speed up on hover
  // ==========================================
  const marqueeTrack = document.querySelector('.marquee-track');
  document.querySelector('.hero-name-marquee')?.addEventListener('mouseenter', () => {
    if (marqueeTrack) marqueeTrack.style.animationDuration = '5s';
  });
  document.querySelector('.hero-name-marquee')?.addEventListener('mouseleave', () => {
    if (marqueeTrack) marqueeTrack.style.animationDuration = '12s';
  });

  // ==========================================
  // TILT EFFECT on project cards
  // ==========================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const rotX    = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -5;
      const rotY    = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  5;
      card.style.transform  = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // ==========================================
  // SKILL ICON flip on hover
  // ==========================================
  document.querySelectorAll('.skill-item img').forEach(img => {
    const parent = img.closest('.skill-item');
    parent.addEventListener('mouseenter', () => {
      img.style.transform  = 'rotateY(180deg) scale(1.1)';
      img.style.transition = 'transform 0.4s ease';
      setTimeout(() => { img.style.transform = 'rotateY(0deg) scale(1.1)'; }, 200);
    });
    parent.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
  });

  // ==========================================
  // PARALLAX — hero photo on scroll
  // ==========================================
  const heroPhoto = document.querySelector('.hero-photo-wrapper');
  window.addEventListener('scroll', () => {
    if (!heroPhoto || window.scrollY >= window.innerHeight) return;
    heroPhoto.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });

  // ==========================================
  // RESIZE handler
  // ==========================================
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (!document.querySelector('.cursor')) {
        document.body.appendChild(cursorEl);
        document.body.appendChild(followerEl);
      }
    } else {
      cursorEl.remove();
      followerEl.remove();
    }
  });

});

// ==========================================
// MOBILE MENU close (called from inline onclick)
// ==========================================
function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('hamburger')?.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity   = '';
  });
}

// ==========================================
// TYPEWRITER GREETING
// ==========================================
const greetings = ['Hi there !', 'नमस्ते !', 'Bonjour !', 'Hola !'];
const typingEl  = document.getElementById('typingText');
let greetIndex  = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeWriter() {
  if (!typingEl) return;
  const current = greetings[greetIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1500);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      greetIndex  = (greetIndex + 1) % greetings.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}

typeWriter();