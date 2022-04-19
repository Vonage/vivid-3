import { isEmpty, not } from 'ramda';
import type { Calendar } from '../calendar';
// import { isCellOrHeader } from './calendar.keyboard-interactions';

export interface CalendarEventContext {
	day?: number;
	hour?: number;
}

/**
 * @param el
 */
function getDay(el: HTMLElement): number | void {
	const cellOrHeader = el.closest('[role="gridcell"i], [role="columnheader"i]');
	if (cellOrHeader) {
		const { parentElement } = cellOrHeader;
		if (parentElement) {
			return parentElement.children && Array.from(parentElement.children).indexOf(cellOrHeader);
		}
	}
}

/**
 * @param e
 * @param el
 * @param hours
 */
function getHour(e: MouseEvent, el: HTMLElement, hours: number): number | void {
	const rowHeaderOrCell = el.closest('[role="rowheader"], [role="gridcell"i]') as HTMLElement;

	if (rowHeaderOrCell) {
		const DOMRect = rowHeaderOrCell.getBoundingClientRect();
		const offsetY = e.clientY - DOMRect.y;
		const hourHeight = DOMRect.height / hours;
		const hour = offsetY / hourHeight;

		return Math.round((hour + Number.EPSILON) * 100) / 100;
	}
}

/**
 * @param this
 * @param shadowRoot
 * @param hours
 * @param e
 */
export const getEventContext = function(this: Calendar, e: KeyboardEvent | MouseEvent): CalendarEventContext | null {

	if (!(e instanceof KeyboardEvent || e instanceof MouseEvent)) {
		throw new Error('Invalid event. Event must be instance of KeyboardEvent or MouseEvent');
	}

	const [el] = e.composedPath();

	if (!(el && el instanceof HTMLElement && this.shadowRoot?.contains(el))) {
		throw new Error('Invalid event. Event must contain a target object which is a direct descendant of calendar');
	}

	const day = getDay(el);
	let hour;

	if (e instanceof MouseEvent) {
		hour = getHour(e, el, this.#hours);
	}

	const context = {
		...(day != undefined && { day }),
		...(hour != undefined && { hour }),
	};

	return not(isEmpty(context)) ? context : null;
};
