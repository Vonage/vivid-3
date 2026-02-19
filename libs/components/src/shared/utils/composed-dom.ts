/**
 * Returns the composed parent of an element, crossing shadow DOM boundaries.
 * When the element's parent is a ShadowRoot, returns the host element instead of the shadow root.
 * This matches the "composed tree" traversal used by FAST and native DOM APIs.
 */
export function getComposedParent(element: Element): Element | null {
	const parent = element.parentNode;
	if (parent instanceof ShadowRoot) {
		return parent.host;
	}
	return parent as Element | null;
}

/**
 * Walks up the composed tree from `element` and returns the first ancestor that matches `predicate`, or null.
 * Use this instead of `element.closest(selector)` when the target may live across shadow boundaries.
 */
export function findComposedAncestor(
	element: Element,
	predicate: (el: Element) => boolean
): Element | null {
	for (
		let current: Element | null = getComposedParent(element);
		current;
		current = getComposedParent(current)
	) {
		if (predicate(current)) {
			return current;
		}
	}
	return null;
}
