
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
	// save sideDrawer's scroll in sessionStorage
	if (getAsideElement().scrollTop) {
		sessionStorage.setItem("scroll", getAsideElement().scrollTop);
	}
}

const setScrollFromsessionStorage = () => {
	// set sideDrawer's scroll from sessionStorage
	const asideElement = getAsideElement();
	if (asideElement.offsetHeight > 0) {
		asideElement.scrollTop = sessionStorage.getItem("scroll") ?? 0;
	}
	else {
		requestAnimationFrame(setScrollFromsessionStorage);
	}
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		setScrollFromsessionStorage();
		getAsideElement().addEventListener('scroll', onScroll);
	});
})();
