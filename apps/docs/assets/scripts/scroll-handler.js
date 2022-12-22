
// sets elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
	const sideHeader = document.querySelector('vwc-header#header-main');
	sideHeader.elevationShadow = isShadowed;
}

const getAsideElement = () => sidedrawer.shadowRoot.querySelector('aside');

const onScroll = () => {
	const isWindowScrolled = window.scrollY > 0;
	const isAsideScrolled = getAsideElement().scrollTop > 0;
	updateHeaderElevationShadow(isWindowScrolled || isAsideScrolled);
	// save sideDrawer's scroll in localStorage
	if (getAsideElement().scrollTop) {
		localStorage.setItem("scroll", getAsideElement().scrollTop);
	}
}

const setScrollFromLocalStorage = () => {
	// set sideDrawer's scroll from localStorage
	const asideElement = getAsideElement();
	if (asideElement.offsetHeight > 0) {
		asideElement.scrollTop = localStorage.getItem("scroll") ?? 0;
	}
	else {
		requestAnimationFrame(setScrollFromLocalStorage);
	}
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		setScrollFromLocalStorage();
		getAsideElement().addEventListener('scroll', onScroll);
	});
})();
