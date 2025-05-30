import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves all direct child elements of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The parent element to search within.
 * @param {ElementConstructor} constructor - The constructor function of the element type to filter by.
 *
 * @example
 * ```
 * class DataGrid extends VividElement {
 *
 *   getRows(): DataGridRow[] {
 *     return directChildrenOfType(this, DataGridCell);
 *   }
 * }
 * ```
 */
export function directChildrenOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T>[] {
	return Array.from(element.children).filter(
		(child) => child instanceof constructor
	) as InstanceType<T>[];
}
