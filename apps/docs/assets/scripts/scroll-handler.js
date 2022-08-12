
// sets elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
	const sideHeader = document.querySelector('vwc-header#header-main');
	sideHeader.elevationShadow = isShadowed;
}

const onWindowScroll = ({ target }) => {
	const isScrolled = target == document ? window.scrollY > 0 : target.scrollTop > 0;
	updateHeaderElevationShadow(isScrolled);
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onWindowScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		const sideDrawer = document.querySelector('#sidedrawer');
		const aside = sideDrawer.shadowRoot.querySelector('aside');
		aside.addEventListener('scroll', onWindowScroll)
	});
})();
