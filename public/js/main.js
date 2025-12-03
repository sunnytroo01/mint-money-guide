document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookies = document.getElementById('accept-cookies');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backToTop) backToTop.classList.add('show');
    } else {
      if (backToTop) backToTop.classList.remove('show');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Add smooth animation
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.style.animation = 'slideDown 0.3s ease-out';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  if (cookieConsent && acceptCookies) {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const manageCookies = document.getElementById('manage-cookies');

    if (!cookiesAccepted) {
      cookieConsent.classList.remove('hidden');
      setTimeout(() => cookieConsent.style.transform = 'translateY(0)', 100);
    }

    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.transform = 'translateY(100%)';
      setTimeout(() => {
        cookieConsent.remove();
      }, 500);
    });

    if (manageCookies) {
      manageCookies.addEventListener('click', () => {
        window.location.href = '/privacy';
      });
    }
  }

  const footerForm = document.getElementById('footer-subscribe-form');
  if (footerForm) {
    footerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(footerForm);
      const data = Object.fromEntries(formData);
      data.source = 'footer';

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
          alert('Thank you for subscribing!');
          footerForm.reset();
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    });
  }

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          if (img.complete) {
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
