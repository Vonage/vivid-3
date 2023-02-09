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
	// localStorage.setItem(THEME, theme);
	// menuButton.icon = isDark(theme) ? 'dark-mode-solid' : 'light-mode-line';

	// const themeStyle = isDark(theme) ?
	// 	'<link rel="stylesheet" href="/assets/styles/tokens/theme-dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/tokens/theme-light.css" media="all">';
	// document.head?.insertAdjacentHTML("beforeend", themeStyle);

	// menu.open = false;
}

// menuButton.addEventListener('click', () => menu.open = !menu.open);
// menu.addEventListener('change', event => setTheme(event.target.getAttribute('data-value')));

// const theme = getTheme();
// document.querySelector(`[data-value="${getTheme()}"]`).checked = true;
// setTheme(theme);

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(theme));
