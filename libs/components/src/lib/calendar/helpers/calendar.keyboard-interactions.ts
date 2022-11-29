import type { Calendar } from '../calendar';


export const ARROW_UP = 'ArrowUp';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';

export type PredefindKeys = typeof ARROW_UP | typeof ARROW_RIGHT | typeof ARROW_DOWN | typeof ARROW_LEFT;

/**
 *
 *
 * @param {unknown} el - element
 * @returns {*}  {el is HTMLElement} - cell or header
 */
export function isCellOrHeader(el: unknown): el is HTMLElement {
	return el instanceof HTMLElement
	&& (
		el.matches('[role="gridcell"i]')
		|| el.matches('[role="columnheader"i]')
	);
}

/**
 * 
 * @param {HTMLElement} f - HTMLElement
 * @returns {HTMLElement} role - cell or header
 */
const getCellOrHeader = (f: HTMLElement) => (f.matches('[role="columnheader"i]')
	? '[role="gridcell"i]'
	: '[role="columnheader"i]');

/**
 *
 *
 * @param {Calendar} this - calendar
 * @param {PredefindKeys} key - keys
 * @param {HTMLElement} activeElement - htmlelement
 * @returns {*}  {(Element | null | void)} - focusable grid element
 */
export function getNextFocusableGridElement(
	this: Calendar, key: PredefindKeys, activeElement: HTMLElement
): Element | null | void {
	if (activeElement.parentNode instanceof HTMLElement) {
		switch (key) {
			case ARROW_RIGHT:
				return activeElement.nextElementSibling || activeElement.parentNode.firstElementChild;
			case ARROW_LEFT:
				return activeElement.previousElementSibling || activeElement.parentNode.lastElementChild;
			case ARROW_UP:
			case ARROW_DOWN: {
				const { children } = activeElement.parentNode;
				const i = Array.from(children).indexOf(activeElement);
				return (this.shadowRoot as ShadowRoot).querySelector(
					`${getCellOrHeader(activeElement as HTMLElement)}:nth-child(${i + 1})`
				);
			}
		}
	}
}

/**
 *
 *
 * @param {Calendar} this - calendar
 * @param {PredefindKeys} key - keys
 * @param {HTMLElement} activeElement - element
 * @returns {*}  {(Element | null | undefined)} - header descendant grid cell
 */
export function getHeaderDescendantGridCell(this: Calendar, key: PredefindKeys, activeElement: HTMLElement): Element | null | undefined {
	if (key !== ARROW_DOWN) {return;}

	const header = activeElement.closest('[role="columnheader"i]') as HTMLElement;
	const columnHeaders = (this.shadowRoot as ShadowRoot).querySelectorAll('[role="columnheader"i]');
	const i = Array.from(columnHeaders).indexOf(header);
	return (this.shadowRoot as ShadowRoot).querySelector(`[role="gridcell"i]:nth-child(${i + 1})`);

}
