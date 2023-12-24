
// sets elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
	const sideHeader = document.querySelector('vwc-header#header-main');
	sideHeader.elevationShadow = isShadowed;
}

const getSideDrawerBase = () => sidedrawer.shadowRoot.querySelector('[part~="base"]');

const onScroll = () => {
	const isWindowScrolled = window.scrollY > 0;
	const isSideDrawerScrolled = getSideDrawerBase().scrollTop > 0;
	updateHeaderElevationShadow(isWindowScrolled || isSideDrawerScrolled);
	// save sideDrawer's scroll in sessionStorage
	if (getSideDrawerBase().scrollTop) {
		sessionStorage.setItem("scroll", getSideDrawerBase().scrollTop);
	}
}

const setScrollFromSessionStorage = () => {
	// set sideDrawer's scroll from sessionStorage
	if (getSideDrawerBase().offsetHeight > 0) {
		getSideDrawerBase().scrollTop = sessionStorage.getItem('scroll') ?? 0;
	} else {
		requestAnimationFrame(setScrollFromSessionStorage);
	}
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		setScrollFromSessionStorage();
		getSideDrawerBase().addEventListener('scroll', onScroll);
	});
})();
