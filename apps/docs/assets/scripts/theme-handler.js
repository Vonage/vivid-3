"use strict";

const THEME = 'theme';
const LIGHT = 'light';
const DARK = 'dark';
const AUTO = 'auto';

const menu = document.querySelector('#dark-mode-menu');
const menuButton = document.querySelector('#dark-mode-menu-button');

function getTheme() {
	return localStorage.getItem(THEME) || AUTO;
}

function isDark(theme) {
	if (theme === AUTO) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return theme === DARK;
}

function setTheme(theme) {
	if (![AUTO, DARK, LIGHT].includes(theme)) {
		return;
	}
	console.log('setTheme', theme)
	localStorage.setItem(THEME, theme);
	const isDarkTheme = isDark(theme);
	menuButton.icon = isDarkTheme ? 'dark-mode-solid' : 'light-mode-line';
	// menuButton.ariaLabel = isDarkTheme ? 'Dark mode' : 'Light mode';

	const themeLink = document.head.querySelector('#themeLink');
	themeLink.href = `/assets/styles/tokens/theme-${isDarkTheme ? 'dark' : 'light'}.css`;

	menu.open = false;
}

menuButton.addEventListener('click', () => {
	menu.open = !menu.open;
	menuButton.ariaExpanded = menu.open;
});
menu.addEventListener('change', ({ target }) => {
	if (target.checked) {
		setTheme(target.getAttribute('data-value'));
	}
});

const theme = getTheme();
document.querySelector(`[data-value="${theme}"]`).checked = true;
setTheme(theme);

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(theme));
