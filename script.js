// BR JALAN Securities - Custom Scripts
document.addEventListener('DOMContentLoaded', function() {
  console.log('BR JALAN site loaded successfully');
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission handler (for non-Netlify forms)
  const forms = document.querySelectorAll('form:not([netlify])');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('This form is disabled for demo. Use Netlify deployment for full functionality.');
    });
  });
});
