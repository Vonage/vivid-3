import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves the first child element of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element whose children are to be searched.
 * @param {ElementConstructor} constructor - The constructor function of the element type to find.
 *
 * @example
 * ```
 * class DataGrid extends VividElement {
 *
 *   getFirstCell(): DataGridCell | null {
 *     return firstOfType(this, DataGridCell);
 *   }
 * }
 * ```
 */
export function firstOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T> | null {
	for (const child of element.children) {
		if (child instanceof constructor) {
			return child as InstanceType<T>;
		}
	}
	return null;
}
