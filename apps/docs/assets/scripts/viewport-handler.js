let pendingUpdate = false;

function viewportHandler({ target: { width } }) {
	if (pendingUpdate) return;
	pendingUpdate = true;

	requestAnimationFrame(() => {
		pendingUpdate = false;

		const sideDrawer = document.querySelector('vwc-side-drawer');
		sideDrawer.modal = width < 880;
	});

}

window.visualViewport.addEventListener('resize', viewportHandler);
