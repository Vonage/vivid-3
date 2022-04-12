import { isCellOrHeader } from './calendar.keyboard-interactions';


export interface CalendarEventContext {
	day?: number;
	hour?: number;
}

/**
 * @param e
 */
function getDay(e: KeyboardEvent | PointerEvent): number | void {
	const path = e.composedPath();
	const [el] = path;

	if (!(el instanceof HTMLElement)) {
		throw new Error('No HTML element found');
	}

	const query = {
		cell: '[role="gridcell"i]',
		header: '[role="columnheader"i]',
	};

	const cellOrHeader = el.closest(query.cell) || el.closest(query.header);
	if (isCellOrHeader(cellOrHeader)) {
		const { parentElement } = cellOrHeader;
		return parentElement?.children && Array.from(parentElement.children).indexOf(cellOrHeader);
	}
}

/**
 * @param e
 * @param hours
 */
function getHour(e: PointerEvent, hours: number): number | undefined {

	const path = e.composedPath();
	const [el] = path;

	if (!(el instanceof HTMLElement)) {
		throw new Error('No HTML element found');
	}

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
 * @param e
 * @param hours
 */
export const getEventContextFactorial = (hours: number) =>
	(e: KeyboardEvent | PointerEvent): CalendarEventContext | null => {

		if (!(e instanceof KeyboardEvent) || !(e instanceof PointerEvent)) {
			throw new Error('Invalid event. Event must be instance of KeyboardEvent or PointerEvent');
		}

		const day = getDay(e);
		let hour;
		if (e instanceof PointerEvent) {
			hour = getHour(e, hours);
		}

		const context = {
			...(day != undefined && { day }),
			...(hour != undefined && { hour }),
		};

		return (!isEmptyObject(context) && context) || null;
	};
