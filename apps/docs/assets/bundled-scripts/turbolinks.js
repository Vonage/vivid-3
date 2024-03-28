import 'htmx.org';

window.addEventListener('DOMContentLoaded', () => {
	const navItems = document.querySelectorAll('vwc-nav-item');
	for (const navItem of navItems) {
		navItem.setAttribute('hx-get', navItem.href);
		navItem.setAttribute('hx-push-url', 'true');
		navItem.addEventListener('click', (e) => {
			e.preventDefault();
		});
		window.htmx.process(navItem);
	}
});

const handleLocationChange = () => {
	for (const el of document.querySelectorAll(
		'vwc-nav-item[aria-current="page"], vwc-nav-disclosure[aria-current="page"]'
	)) {
		el.removeAttribute('aria-current');
	}

	let current = document.querySelector(`
			vwc-nav-item[href="${location.pathname}"],
			vwc-nav-item[href="${location.pathname.replace(/\/$/, '')}"]
		`);
	while (current) {
		if (
			current.tagName === 'VWC-NAV-ITEM' ||
			current.tagName === 'VWC-NAV-DISCLOSURE'
		) {
			current.setAttribute('aria-current', 'page');
		}
		current = current.parentElement;
	}
};

const onBeforeProcessNode = (e) => {
	const element = e.detail.elt;

	// Disable Turbo for links to the Vivid Vue documentation
	if (
		element.tagName === 'A' &&
		element.getAttribute('href')?.startsWith('/vivid-vue')
	) {
		element.setAttribute('hx-boost', 'false');
	}
};

window.addEventListener('popstate', handleLocationChange);
window.addEventListener('htmx:pushedIntoHistory', handleLocationChange);
window.addEventListener('htmx:beforeProcessNode', onBeforeProcessNode);
