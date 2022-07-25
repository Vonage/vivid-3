const sideDrawer = document.querySelector('vwc-side-drawer');
const mobileWidth = 880;
let pendingUpdate = false;

function viewportHandler() {
	const { visualViewport: { width } } = window;
	if (pendingUpdate) return;
	pendingUpdate = true;

	requestAnimationFrame(() => {
		pendingUpdate = false;

		sideDrawer.modal = width < mobileWidth;
	});

}

(function () {
	viewportHandler();
	const { visualViewport: { width } } = window;
	sideDrawer.open = width >= mobileWidth;
})();

window.visualViewport.addEventListener('resize', viewportHandler);
