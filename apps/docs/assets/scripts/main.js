const CBD_DETAILS = 'cbd-details';
const CBD_BUTTON_SHOW = 'cbd-button-show';
const CBD_DEMO = 'cbd-demo';

const toggleCodePanel = (event) => {
	const button = event.target;
	const details = button.closest("." + CBD_DETAILS);
	details.open = !details.open;
	button.setAttribute('aria-expanded', details.open.toString());
};

const initShowCodeButtons = () => {
	document.querySelectorAll("." + CBD_BUTTON_SHOW).forEach(button => {
		button.addEventListener('click', toggleCodePanel);
	});
	document.querySelectorAll("." + CBD_DEMO).forEach(iframe => {
		onloadIframe(iframe);
	});
};

const onloadIframe = (iFrame) => {
	console.log(12)
	iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + 5 + "px";
	toggleDarkMode(iFrame.contentWindow.document.head);
};

const toggleDarkMode = (head) => {
	const toggle = document.querySelector('dark-mode-toggle');
	setCurrentTheme(toggle, head);

	toggle.addEventListener('colorschemechange', () => {
		setCurrentTheme(toggle, head);
	});
};

const setCurrentTheme = (toggle, head) => {
	const theme = toggle.mode === 'dark' ? '<link rel="stylesheet" href="/assets/styles/themes/dark.css" media="all">' : '<link rel="stylesheet" href="/assets/styles/themes/light.css" media="all">';
	head.insertAdjacentHTML("beforeend", theme);
}

window.addEventListener('DOMContentLoaded', initShowCodeButtons);
