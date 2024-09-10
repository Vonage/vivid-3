const compNav = document.getElementById('components-header');
if (compNav) {
  window.addEventListener('DOMContentLoaded', () => setupCompNav(compNav));
  window.addEventListener('htmx:afterSwap', () => setupCompNav(compNav));
}

function setupCompNav(compNav: HTMLElement) {
	function handleHashChange() {
    console.log('hash changed 2!', compNav);
  }
  console.log('set up', window.location.hash);
}

window.addEventListener("hashchange", () => {
  console.log(`Hash changed to: ${window.location.hash}`);
});