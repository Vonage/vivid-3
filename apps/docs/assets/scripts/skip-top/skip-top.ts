import './skip-top.style.scss';

function setupSkipTop() {
  const skipTopBtn = document.getElementById('skip-top');
  if (!skipTopBtn) return;
  
  function handleScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      skipTopBtn!.style.display = 'inline-block';
    } else {
      skipTopBtn!.style.display = 'none'
    }
  }

  function skipToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  skipTopBtn!.addEventListener('click', skipToTop);
  window.addEventListener('scroll', handleScroll);
}

window.addEventListener('DOMContentLoaded', setupSkipTop);
window.addEventListener('htmx:afterSwap', () => setTimeout(setupSkipTop, 100));