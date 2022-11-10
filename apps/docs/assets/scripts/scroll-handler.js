
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
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		getAsideElement().addEventListener('scroll', onScroll)
	});
})();
