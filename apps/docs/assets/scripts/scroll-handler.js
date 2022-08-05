
// sets elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
	const sideHeader = document.querySelector('vwc-header#header-main');
	sideHeader.elevationShadow = isShadowed;
}

const onWindowScroll = () => {
	updateHeaderElevationShadow(window.scrollY > 0);
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onWindowScroll);
})();
