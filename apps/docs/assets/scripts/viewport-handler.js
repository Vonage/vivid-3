const sideDrawer = document.querySelector('vwc-side-drawer');
const mobileWidth = 880;
let pendingUpdate = false;

function viewportHandler() {
	const { innerWidth } = window;

	if (pendingUpdate) return;

	pendingUpdate = true;

	requestAnimationFrame(() => {
		pendingUpdate = false;

		sideDrawer.modal = innerWidth < mobileWidth;
		sideDrawer.open = innerWidth >= mobileWidth;
	});

}

(function () {
	viewportHandler();
})();

window.addEventListener('resize', viewportHandler);
