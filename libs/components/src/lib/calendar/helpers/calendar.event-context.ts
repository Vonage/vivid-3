import type { Calendar } from '../calendar';
import { isCellOrHeader } from './calendar.keyboard-interactions';


export interface CalendarEventContext {
	day?: number;
	hour?: number;
}

/**
 * @param el
 */
function getDay(el: HTMLElement): number | void {
	const cellOrHeader = el.closest('[role="gridcell"i]') || el.closest('[role="columnheader"i]');
	if (isCellOrHeader(cellOrHeader)) {
		const { parentElement } = cellOrHeader;
		return parentElement?.children && Array.from(parentElement.children).indexOf(cellOrHeader);
	}
}

/**
 * @param e
 * @param el
 * @param hours
 */
function getHour(e: MouseEvent, el: HTMLElement, hours: number): number | undefined {
	const rowHeaderOrCell = el.closest('.row-headers') || el.closest('[role="gridcell"i]');

	if (!rowHeaderOrCell) {
		return;
	}

	const DOMRect = rowHeaderOrCell.getBoundingClientRect();
	const offsetY = e.clientY - DOMRect.y;
	const hourHeight = DOMRect.height / hours;
	const hour = offsetY / hourHeight;

	return Math.round((hour + Number.EPSILON) * 100) / 100;
}

const isEmptyObject = (obj: Record<string, unknown>): obj is Record<string, never> =>
	Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * @param this
 * @param hours
 */
export const getEventContextFactorial = (hours: number) => {

	return	function (this: Calendar,e: KeyboardEvent | MouseEvent): CalendarEventContext | null {

		if (!(e instanceof KeyboardEvent || e instanceof MouseEvent)) {
			throw new Error('Invalid event. Event must be instance of KeyboardEvent or MouseEvent');
		}

		const [el] = e.composedPath();
		debugger;
		if (!(el && el instanceof HTMLElement && this.contains(el))) {
			throw new Error('Invalid event. Event must have a target object which is a descendant of calendar');
		}

		const day = getDay(el);
		let hour;

		if (e instanceof MouseEvent) {
			hour = getHour(e, el, hours);
		}

		const context = {
			...(day != undefined && { day }),
			...(hour != undefined && { hour }),
		};

		return (!isEmptyObject(context) && context) || null;
	};
};
