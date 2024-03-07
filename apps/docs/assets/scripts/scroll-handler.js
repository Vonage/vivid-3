
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
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		getSideDrawerBase().addEventListener('scroll', onScroll);
	});
})();
