import type { ElementConstructor } from './dom-traversal-types';

/**
 * Retrieves the last child element of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The element whose children are to be searched.
 * @param {ElementConstructor} constructor - The constructor function of the element type to find.
 *
 * @example
 * ```
 * class DataGrid extends VividElement {
 *
 *   getLastCell(): DataGridCell | null {
 *     return lastOfType(this, DataGridCell);
 *   }
 * }
 * ```
 */
export function lastOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T> | null {
	for (let i = element.children.length - 1; i >= 0; i--) {
		const child = element.children[i];
		if (child instanceof constructor) {
			return child as InstanceType<T>;
		}
	}
	return null;
}
