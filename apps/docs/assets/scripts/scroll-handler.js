
// sets elevation on scroll
const updateHeaderElevationShadow = (isShadowed) => {
	const sideHeader = document.querySelector('vwc-header#header-main');
	sideHeader.elevationShadow = isShadowed;
}

const onWindowScroll = ({ target }) => {
	const isScrolled = target == document ? window.scrollY > 0 : target.scrollTop > 0;
	updateHeaderElevationShadow(isScrolled);
	// save sideDrawer's scroll in localStorage
	if (target.scrollTop) {
		localStorage.setItem("scroll", target.scrollTop);
	}
}

const setScrollFromLocalStorage = (target) => {
	// set sideDrawer's scroll from localStorage
	let scrollTop = localStorage.getItem("scroll");
	if (scrollTop != null) {
		setTimeout(() => {
			target.scrollTop = scrollTop;
		}, 1);
	}
}

(() => {
	// hook window scroll
	window.addEventListener('scroll', onWindowScroll);

	customElements.whenDefined('vwc-side-drawer').then(() => {
		const sideDrawer = document.querySelector('#sidedrawer');
		const aside = sideDrawer.shadowRoot.querySelector('aside');
		setScrollFromLocalStorage(aside);
		aside.addEventListener('scroll', onWindowScroll)
	});
})();
