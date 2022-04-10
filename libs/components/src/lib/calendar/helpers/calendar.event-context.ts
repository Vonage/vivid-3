import { isCellOrHeader } from './calendar.keyboard-interactions';


export interface CalendarEventContext {
	day?: number;
	hour?: number;
}

/**
 * @param e
 */
function getDay(e: Event): number | undefined {
	const path = e.composedPath();
	const [el] = path;
	if (!(el instanceof HTMLElement)) {
		return undefined;
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

	return undefined;
}

/**
 * @param e
 * @param hours
 */
function getHour(e: Event, hours: number): number | undefined {
	if (!(e instanceof MouseEvent)) {
		return undefined;
	}

	const path = e.composedPath();
	const [el] = path;

	if (!(el instanceof HTMLElement)) {
		return undefined;
	}

	const rowHeaderOrCell = el.closest('.row-headers') || el.closest('[role="gridcell"i]');
	const boundingClientRect = rowHeaderOrCell?.getBoundingClientRect();

	if (!boundingClientRect?.y) {
		return undefined;
	}

	const offsetY = e.clientY - boundingClientRect.y;
	const hourHeight = boundingClientRect.height / hours;
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
	(e: Event): CalendarEventContext | null => {
		const day = getDay(e);
		const hour = getHour(e, hours);


		const context = {
			...(day != undefined && { day }),
			...(hour != undefined && { hour }),
		};

		return (!isEmptyObject(context) && context) || null;
	};
