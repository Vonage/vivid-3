
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
	setTimeout(() => {
		let scrollTop = localStorage.getItem("scroll");
		if (scrollTop) {
			getAsideElement().scrollTop = scrollTop;
		}
	}, 10);
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		setScrollFromLocalStorage(getAsideElement());
		getAsideElement().addEventListener('scroll', onScroll);
	});
})();
