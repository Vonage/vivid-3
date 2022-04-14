import type { Calendar } from '../calendar';


export const ARROW_UP = 'ArrowUp';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';

export type PredefindKeys = typeof ARROW_UP | typeof ARROW_RIGHT | typeof ARROW_DOWN | typeof ARROW_LEFT;

/**
 * @param el
 */
export function isCellOrHeader(el: unknown): el is HTMLElement {
	return el instanceof HTMLElement
	&& (
		el.matches('[role="gridcell"i]')
		|| el.matches('[role="columnheader"i]')
	);
}

const getCellOrHeader = (f: HTMLElement) => (f.matches('[role="columnheader"i]')
	? '[role="gridcell"i]'
	: '[role="columnheader"i]');

/**
 * @param this
 * @param key
 * @param activeElement
 */
export function getNextFocusableGridElement(this: Calendar, key: PredefindKeys, activeElement: HTMLElement): Element | null | undefined {
	switch (key) {
		case ARROW_RIGHT:
			return activeElement.nextElementSibling || activeElement.parentNode?.firstElementChild;
		case ARROW_LEFT:
			return activeElement.previousElementSibling || activeElement.parentElement?.lastElementChild;
		case ARROW_UP:
		case ARROW_DOWN: {
			const { children } = activeElement?.parentElement as HTMLElement;
			const i = Array.from(children).indexOf(activeElement);
			return this.shadowRoot?.querySelector(`${getCellOrHeader(activeElement as HTMLElement)}:nth-child(${i + 1})`);
		}
	}
}

/**
 * @param this
 * @param key
 * @param activeElement
 */
export function getHeaderDescendantGridCell(this: Calendar, key: PredefindKeys, activeElement: HTMLElement): Element | null | undefined {
	if (key !== ARROW_DOWN) {return;}

	const header = activeElement.closest('[role="columnheader"i]');
	const columnHeaders = this.shadowRoot?.querySelectorAll('[role="columnheader"i]');
	const i = (columnHeaders && header && Array.from(columnHeaders).indexOf(header)) || 0;
	return this.shadowRoot?.querySelector(`[role="gridcell"i]:nth-child(${i + 1})`);

}
