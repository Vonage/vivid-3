import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves all sibling elements of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element whose siblings are to be found.
 * @param {ElementConstructor} constructor - The constructor function of the element type to filter by.
 *
 * @example
 * ```
 * class Tab extends VividElement {
 *
 * 	countSiblings() {
 * 	  return siblingsOfType(this, Tab).length
 * 	}
 * }
 * ```
 */
export function siblingsOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T>[] {
	const parent = element.parentElement;
	if (!parent) return [];
	return Array.from(parent.children).filter(
		(child) => child !== element && child instanceof constructor
	) as InstanceType<T>[];
}
