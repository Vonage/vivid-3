interface ElementConstructor {
	new (...args: any): HTMLElement;
}

/**
 * Retrieves all nested child elements of a specified type from a given HTMLElement.
 *
 * @param {HTMLElement} element - The root element to search within.
 * @param {T} constructor - The constructor function of the element type to filter by.
 *
 * @example
 * ```
 * class DataGrid extends VividElement {
 *
 * 	getCells(): DataGridCell[] {
 * 	  return nestedChildrenOfType(this, DataGridCell);
 * 	}
 * }
 * ```
 */
export function nestedChildrenOfType<T extends ElementConstructor>(
	element: HTMLElement,
	constructor: T
): InstanceType<T>[] {
	return Array.from(element.getElementsByTagName('*')).filter(
		(child) => child instanceof constructor
	) as InstanceType<T>[];
}
