/**
 * Patches attribute value. You can pass now a `value` to the `VwcIconButton` as
 * in normal buttons
 *
 * @param {any} attribute
 * @param {any} value
 * @param {HTMLElement} element
 * @returns
 */
export const vwcSetAttributeValue = (attribute, value) => (element) => {
	element?.setAttribute(attribute, value);
};
