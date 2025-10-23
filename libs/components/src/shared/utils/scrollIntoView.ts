export function scrollIntoView(
	element: HTMLElement,
	parent: HTMLElement,
	position: 'nearest' | 'start'
) {
	// Use scrollTop instead of scrollIntoView() because scrollIntoView() scrolls the whole page in Firefox

	const offsetTop =
		element.getRootNode() !== parent.getRootNode()
			? flatTreeOffsetTop(element)
			: element.offsetTop;

	switch (position) {
		case 'start':
			parent.scrollTop = offsetTop;
			break;
		case 'nearest':
			if (offsetTop < parent.scrollTop) {
				parent.scrollTop = offsetTop;
			}
			if (
				offsetTop + element.offsetHeight >
				parent.scrollTop + parent.offsetHeight
			) {
				parent.scrollTop =
					offsetTop + element.offsetHeight - parent.offsetHeight;
			}
			break;
	}
}

// offsetParent of a slotted node will be retargeted to light DOM and offsetTop adjusted
// This function reverses the adjustments and returns the original offsetTop
function flatTreeOffsetTop(element: HTMLElement) {
	const offsetParent = element.offsetParent;
	let value = element.offsetTop;
	let nextOffsetParent = flatTreeOffsetParent(element)! as HTMLElement;

	while (nextOffsetParent !== offsetParent) {
		value -= nextOffsetParent.offsetTop;
		nextOffsetParent = flatTreeOffsetParent(nextOffsetParent)! as HTMLElement;
	}

	return value;
}

function flatTreeParent(element: Element) {
	if (element.assignedSlot) {
		return element.assignedSlot;
	}
	if (element.parentNode instanceof ShadowRoot) {
		return element.parentNode.host;
	}
	return element.parentNode;
}

function flatTreeOffsetParent(element: Element) {
	for (
		let ancestor = flatTreeParent(element);
		ancestor;
		ancestor = flatTreeParent(ancestor as Element)
	) {
		if (!(ancestor instanceof Element)) continue;
		const style = getComputedStyle(ancestor);
		if (style.display === 'contents') continue;
		if (style.position !== 'static' || style.filter !== 'none') {
			return ancestor;
		}
		if (ancestor.tagName === 'BODY') return ancestor;
	}
	return null;
}
