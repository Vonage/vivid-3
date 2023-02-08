window.onload = () => {
	addSideDrawerListeners();
};

const addSideDrawerListeners = () => {
	const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
	sideDrawer.addEventListener('close', () => { toggleSideDrawerButtonIcon(false); });
	sideDrawer.addEventListener('open', () => { toggleSideDrawerButtonIcon(true); });
}

const toggleSideDrawerButton = () => {
	const sideDrawer = document.querySelector('vwc-side-drawer#sidedrawer');
	sideDrawer.open = !sideDrawer.open;
};

const toggleSideDrawerButtonIcon = (open) => {
	const buttonToggle = document.querySelector('vwc-button#hamburger-button');
	buttonToggle.icon = open ? 'collapse-solid' : 'menu-solid';
};

const codeBlockButtonClick = (button) => {
	const details = button.closest('vwc-action-group').nextElementSibling;
	details.open = !details.open;
	button.ariaExpanded = details.open;
};

const codeCopyButtonClick = (button) => {
	const details = button.closest('vwc-action-group').nextElementSibling;
	const { textContent } = details;
	navigator.clipboard.writeText(textContent.trim())
		.then(() => {
			/* clipboard successfully set */
			button.icon = 'check-line';
		})
		.catch(() => {
			/* clipboard write failed */
			button.icon = 'close-line';
		});

	setTimeout(() => {
		button.icon = 'copy-2-line';
	}, 1000);
};

const onloadIframe = (iFrame) => {
	const menuButton = document.querySelector('#dark-mode-menu-button');
	const menu = document.querySelector('#dark-mode-menu');

	setCurrentIframeTheme(menuButton, iFrame);
	menu.addEventListener('change', () => {
		setCurrentIframeTheme(menuButton, iFrame);
	});
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setCurrentIframeTheme(menuButton, iFrame));

	autoResize(iFrame);
};

const iframeObservers = new WeakMap();

const autoResize = (iFrame) => {
	new ResizeObserver((entries, observer) => {
		if (entries.length === 0) return;
		iFrame.style.height = Math.max(150, entries[0].contentRect.height) + "px";
		clearTimeout(iframeObservers.get(iFrame));
		iframeObservers.set(iFrame, setTimeout(() => {
			observer.disconnect();
			iframeObservers.delete(iFrame);
		}, 3000));
	}).observe(iFrame.contentWindow.document.documentElement);
};

const setCurrentIframeTheme = (menuButton, iFrame) => {
	const theme = menuButton.icon === "dark-mode-solid" ? '<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all">';
	iFrame.contentWindow.document.head?.insertAdjacentHTML("beforeend", theme);
}
