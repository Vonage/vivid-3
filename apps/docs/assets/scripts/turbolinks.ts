import htmx from 'htmx.org';
import type { NavItem } from './vivid.js';

window.htmx = htmx;

window.addEventListener('DOMContentLoaded', () => {
	const navItems = document.querySelectorAll(
		'vwc-nav-item'
	) as NodeListOf<NavItem>;
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

	let current =
		Array.from(document.querySelectorAll('vwc-nav-item')).find((el) =>
			location.pathname.includes(
				(el.getAttribute('href') ?? '').replace(/\/$/, '')
			)
		) ?? null;
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

const onBeforeProcessNode = (e: CustomEvent) => {
	const element = e.detail.elt;

	// Disable Turbo for links to the Vivid Vue documentation
	if (
		element.tagName === 'A' &&
		element.getAttribute('href')?.startsWith('/vivid-vue')
	) {
		element.setAttribute('hx-boost', 'false');
	}
};

const handleScrollAfterSwap = (e: CustomEvent) => {
	const anchor = e.detail.pathInfo.anchor;

	if (anchor) {
		document.getElementById(anchor)?.scrollIntoView();
	} else {
		window.scrollTo(0, 0);
	}
};

window.addEventListener('popstate', handleLocationChange);
window.addEventListener('htmx:pushedIntoHistory', handleLocationChange);
window.addEventListener(
	'htmx:beforeProcessNode',
	onBeforeProcessNode as EventListener
);
window.addEventListener(
	'htmx:afterSwap',
	handleScrollAfterSwap as EventListener
);
