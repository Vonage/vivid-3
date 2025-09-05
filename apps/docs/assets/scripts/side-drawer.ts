import type { Button, SideDrawer } from './vivid.js';

const toggleSideDrawerButtonIcon = (open: boolean) => {
	const buttonToggle = document.querySelector(
		'vwc-button#hamburger-button'
	) as Button;
	buttonToggle.icon = open ? 'collapse-solid' : 'menu-solid';
};

window.toggleSideDrawerButton = () => {
	const sideDrawer = document.querySelector(
		'vwc-side-drawer#navigation-sidedrawer'
	) as SideDrawer;
	sideDrawer.open = !sideDrawer.open;
};

const addSideDrawerListeners = () => {
	const sideDrawer = document.querySelector(
		'vwc-side-drawer#navigation-sidedrawer'
	)!;
	sideDrawer.addEventListener('close', () => toggleSideDrawerButtonIcon(false));
	sideDrawer.addEventListener('open', () => toggleSideDrawerButtonIcon(true));
};

window.addEventListener('load', () => {
	addSideDrawerListeners();
});
