function setupSticky(stickyId: string) {
	const articleSticky = document.getElementById(stickyId);
  if (!articleSticky) return;
  console.log('set up sticky', articleSticky.offsetTop);
  const sticky = articleSticky.offsetTop;

  function handleScroll() {
    console.log('scroll', window.scrollY, sticky);
    if (window.scrollY > sticky) {
      console.log('is sticky');
      articleSticky!.classList.add('sticky');
      articleSticky!.style.insetBlockStart = `${(window.scrollY + 64) - sticky}px`;
    } else {
      console.log('not sticky');
      articleSticky?.classList.remove('sticky');
    }
  }

  window.addEventListener('scroll', handleScroll);
}

// window.addEventListener('DOMContentLoaded', () => setupSticky('component-header'));
// window.addEventListener('htmx:afterSwap', () => setTimeout(() => setupSticky('component-header'), 100));