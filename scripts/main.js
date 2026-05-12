document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll-triggered fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Optional: unobserve after animating to only animate once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Smooth scroll for nav links (handled natively by CSS, but keeping JS logic just in case for older browsers)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow default since we have scroll-behavior: smooth in CSS
      // Just closing the nav if we had a mobile menu would go here
    });
  });

  // Shrink nav on scroll
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.padding = '0.8rem 1.5rem';
      nav.style.background = 'rgba(10, 10, 15, 0.9)';
    } else {
      nav.style.padding = '1.2rem 1.5rem';
      nav.style.background = 'rgba(10, 10, 15, 0.7)';
    }
  });

  // Handle contact form submission (demo mode)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('submit-contact');
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // Simulate network request
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#10b981'; // Success green
        contactForm.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.opacity = '1';
          btn.style.background = ''; // Revert to default CSS
        }, 3000);
      }, 1500);
    });
  }
});
