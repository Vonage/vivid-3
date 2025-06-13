import lightCss from '@repo/styles/tokens/theme-light.css?inline';
import darkCss from '@repo/styles/tokens/theme-dark.css?inline';
import type { Button, Menu, MenuItem } from './vivid.js';

type ThemeSetting = 'auto' | 'light' | 'dark';

function getInitialThemeSetting(): ThemeSetting {
	return (localStorage.getItem('theme') as ThemeSetting) || 'auto';
}

let currentThemeSetting = getInitialThemeSetting();

function isDarkTheme() {
	if (currentThemeSetting === 'auto') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return currentThemeSetting === 'dark';
}

export function getCurrentThemeCss() {
	return isDarkTheme() ? darkCss : lightCss;
}

const button = document.querySelector('vwc-button#dark-mode-toggle') as Button;
const menu = document.querySelector('vwc-menu#dark-mode-menu') as Menu;

function setTheme(newTheme: ThemeSetting) {
	currentThemeSetting = newTheme;

	const darkTheme = isDarkTheme();

	localStorage.setItem('theme', currentThemeSetting);
	button.icon = darkTheme ? 'dark-mode-solid' : 'light-mode-line';

	document.getElementById('vivid-theme')!.textContent = getCurrentThemeCss();

	menu.open = false;
}

function toggleMenu() {
	menu.open = !menu.open;
	if (menu.open) {
		(
			document.getElementById(`option-${currentThemeSetting}`) as MenuItem
		).checked = true;
	}
}

button.addEventListener('click', toggleMenu);
menu.addEventListener('change', (event) => {
	if ((event.target as MenuItem).checked)
		setTheme((event.target as MenuItem).text.toLowerCase() as ThemeSetting);
});
window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => setTheme(currentThemeSetting));

setTheme(currentThemeSetting);
document.body.classList.remove('page-not-ready');
