window.addEventListener('load', () => {
	addSideDrawerListeners();
});

const addSideDrawerListeners = () => {
	const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
	sideDrawer.addEventListener('close', () => toggleSideDrawerButtonIcon(false));
	sideDrawer.addEventListener('open', () => toggleSideDrawerButtonIcon(true));
};

const toggleSideDrawerButton = () => {
	const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
	sideDrawer.open = !sideDrawer.open;
};

const toggleSideDrawerButtonIcon = (open) => {
	const buttonToggle = document.querySelector('vwc-button#hamburger-button');
	buttonToggle.icon = open ? 'collapse-solid' : 'menu-solid';
};

const codeBlockButtonClick = (button) => {
	const details = button.closest('.cbd-actions').nextElementSibling;
	details.open = !details.open;
	button.ariaExpanded = details.open;
};

const getCurrentTheme = () =>
	document.querySelector('vwc-button#dark-mode-toggle').icon ===
	'dark-mode-solid'
		? 'dark'
		: 'light';

const onloadIframe = (iFrame) => {
	iFrame.setAttribute('data-vivid-iframe', '');
	setCurrentIframeTheme(getCurrentTheme(), iFrame);
	autoResize(iFrame);
};

const iframeObservers = new WeakMap();

const autoResize = (iFrame) => {
	new ResizeObserver((entries, observer) => {
		if (entries.length === 0) return;
		iFrame.style.height = Math.max(30, entries[0].contentRect.height) + 'px';
		clearTimeout(iframeObservers.get(iFrame));
		iframeObservers.set(
			iFrame,
			setTimeout(() => {
				observer.disconnect();
				iframeObservers.delete(iFrame);
			}, 3000)
		);
	}).observe(iFrame.contentWindow.document.documentElement);
};

const setCurrentIframeTheme = (displayMode, iFrame) => {
	const iframeHead = iFrame.contentWindow.document.head;

	const theme = `<link id="theme-link" rel="stylesheet" href="/assets/styles/tokens/theme-${displayMode}.css" data-theme="${displayMode}" media="all">`;

	const themeLink = iframeHead.querySelector('#theme-link');
	if (!themeLink) {
		iframeHead.insertAdjacentHTML('beforeend', theme);
	} else if (themeLink.dataset.theme !== displayMode) {
		themeLink.outerHTML = theme;
	}
};

const updateThemeOfAllIframes = () => {
	const newTheme = getCurrentTheme();
	for (const iframe of document.querySelectorAll('[data-vivid-iframe]')) {
		setCurrentIframeTheme(newTheme, iframe);
	}
};

const setupIframeThemeUpdates = () => {
	document
		.querySelector('vwc-menu#dark-mode-menu')
		.addEventListener('change', updateThemeOfAllIframes);
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', updateThemeOfAllIframes);
};
window.addEventListener('load', setupIframeThemeUpdates);
