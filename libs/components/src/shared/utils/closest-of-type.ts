import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves the closest ancestor of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element to start the search from.
 * @param {ElementConstructor} constructor - The constructor function of the element type to find.
 *
 * @example
 * ```
 * class MenuItem extends VividElement {
 *
 * 	 getMenu(): DataGridCell[] {
 * 	   return closestOfType(this, Menu);
 * 	 }
 * }
 * ```
 */
export function closestOfType<T extends ElementConstructor>(
	element: Element,
	constructor: T
): InstanceType<T> | null {
	let current: Element | null = element.parentElement;
	while (current) {
		if (current instanceof constructor) {
			return current as InstanceType<T>;
		}
		current = current.parentElement;
	}
	return null;
}
