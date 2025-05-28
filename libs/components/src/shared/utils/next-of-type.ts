import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves the next sibling element of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element to start the search from.
 * @param {ElementConstructor} constructor - The constructor function of the element type to find.
 *
 * @example
 * ```
 * class Tab extends VividElement {
 *
 * 	 switchToNextTab() {
 * 	   const nextTab = nextOfType(element, Tab);
 * 	   if (!nextTab) return
 *  	  this.active = false
 * 	   nextTab.active = true
 * 	 }
 * }
 * ```
 */
export function nextOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T> | null {
	let next = element.nextElementSibling;
	while (next) {
		if (next instanceof constructor) {
			return next as InstanceType<T>;
		}
		next = next.nextElementSibling;
	}
	return null;
}
