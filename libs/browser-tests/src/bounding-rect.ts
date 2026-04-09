import { deepQuerySelectorAll } from '@repo/shared/test-utils/shadow-roots';

/**
 * Compute the bounding rect that encompasses the wrapper element and any
 * floating content (vwc-popup, vwc-popover) that is associated with elements
 * inside the wrapper.
 *
 * Floating elements use `position: fixed` and are rendered outside the normal
 * flow, so their dimensions are not included in the wrapper's bounding box.
 * This function finds all floating elements on the page, checks if they
 * originate from within the wrapper, and returns a combined bounding rect.
 *
 * It also waits for all open floating elements to finish positioning before
 * measuring, since their updatePosition() is async (uses floating-ui's
 * computePosition).
 */
export async function boundingRect(wrapper: HTMLElement): Promise<{
	x: number;
	y: number;
	width: number;
	height: number;
}> {
	// Wait for all open floating elements (vwc-popup, vwc-popover) to finish
	// positioning. Their updatePosition() is async (uses floating-ui's
	// computePosition which is async), so even though autoUpdate calls it
	// synchronously during setup, the position isn't applied until the Promise
	// resolves. Without this, bounds may be measured while popups are still at
	// their initial (0,0) position.
	const floatingEls = deepQuerySelectorAll<Element>(
		wrapper,
		'vwc-popup, vwc-popover'
	);
	await Promise.all(
		floatingEls
			.filter((el) => (el as any).open)
			.map((el) => (el as any).updatePosition())
	);

	const wrapperRect = wrapper.getBoundingClientRect();

	let minX = wrapperRect.left;
	let minY = wrapperRect.top;
	let maxX = wrapperRect.right;
	let maxY = wrapperRect.bottom;

	for (const floatingEl of floatingEls) {
		if (!(floatingEl as any).open) continue;

		const positionedEl =
			(floatingEl as any).popupEl ?? (floatingEl as any)._popoverEl;
		if (!positionedEl) throw new Error('positionedEl not found');

		const rect = positionedEl.getBoundingClientRect();

		// Skip elements with zero dimensions (not visible / not open)
		if (rect.width === 0 || rect.height === 0) {
			continue;
		}

		minX = Math.min(minX, rect.left);
		minY = Math.min(minY, rect.top);
		maxX = Math.max(maxX, rect.right);
		maxY = Math.max(maxY, rect.bottom);
	}

	// We must apply a padding to capture shadows
	const PADDING = 8;

	return {
		x: Math.floor(minX) - PADDING,
		y: Math.floor(minY) - PADDING,
		width: Math.ceil(maxX - minX) + PADDING * 2,
		height: Math.ceil(maxY - minY) + PADDING * 2,
	};
}
