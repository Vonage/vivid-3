import type { SideDrawer } from './vivid.js';

const sideDrawer = document.querySelector('vwc-side-drawer') as SideDrawer;
const mobileWidth = 1100;
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
