import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves the previous sibling element of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element to start the search from.
 * @param {ElementConstructor} constructor - The constructor function of the element type to find.
 *
 * @example
 * ```
 * class Tab extends VividElement {
 *
 * 	 switchToPrevTab() {
 * 	   const prevTab = prevOfType(element, Tab);
 * 	   if (!prevTab) return
 * 	   this.active = false
 * 	   prevTab.active = true
 * 	 }
 * }
 * ```
 */
export function prevOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T> | null {
	let prev = element.previousElementSibling;
	while (prev) {
		if (prev instanceof constructor) {
			return prev as InstanceType<T>;
		}
		prev = prev.previousElementSibling;
	}
	return null;
}
