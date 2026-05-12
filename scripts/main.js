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

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;
      
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      
      // Open default mail client
      window.location.href = `mailto:carlosl.hernandezbrn@gmail.com?subject=${subject}&body=${body}`;
      
      const btn = document.getElementById('submit-contact');
      const originalText = btn.textContent;
      
      btn.textContent = 'Opening Mail Client...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
      }, 3000);
    });
  }
});
