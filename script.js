// ═══════════════════════════════════════
// BuildyBuddy — Interactive Scripts
// ═══════════════════════════════════════

// 1. SCROLL PROGRESS BAR
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

// 2. NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// 3. MOBILE HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// 4. SCROLL REVEAL (IntersectionObserver)
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// 5. TYPING EFFECT IN HERO
const typingEl = document.getElementById('typingText');
const phrases = [
  'websites without coding.',
  'landing pages that convert.',
  'automations that save time.',
  'digital tools for your business.',
  'modern designs that wow.',
  'e-commerce stores.',
  'client portals & dashboards.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 60;

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 30;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 60;
  }

  if (!isDeleting && charIndex === current.length) {
    typingSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}
typeEffect();

// 6. ANIMATED COUNTERS
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter-num');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = Math.ceil(target / (duration / 30));
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current;
        }, 30);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const countersSection = document.querySelector('.counters');
if (countersSection) counterObserver.observe(countersSection);

// 7. HERO PARTICLES
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = (80 + Math.random() * 20) + '%';
    particle.style.animationDuration = (3 + Math.random() * 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.width = (2 + Math.random() * 3) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}
createParticles();

// 8. CURSOR GLOW FOLLOWER (desktop only)
const cursorGlow = document.getElementById('cursorGlow');
if (window.innerWidth > 768 && cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// 9. BACK TO TOP BUTTON
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 10. 3D TILT EFFECT ON CARDS (desktop only)
if (window.innerWidth > 768) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// 11. SMOOTH REVEAL FOR FAQ ITEMS
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      const content = item.querySelector('p');
      content.style.animation = 'none';
      content.offsetHeight; // trigger reflow
      content.style.animation = 'fadeSlideDown 0.3s ease forwards';
    }
  });
});

// Add fadeSlideDown animation
const style = document.createElement('style');
style.textContent = `@keyframes fadeSlideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(style);
