import { attr, Updates } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Sticky } from '../enums';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { CalendarEvent } from './../calendar-event/calendar-event';
import {
	ARROW_DOWN,
	ARROW_LEFT,
	ARROW_RIGHT,
	ARROW_UP,
	getHeaderDescendantGridCell,
	getNextFocusableGridElement,
	isCellOrHeader,
	type PredefindKeys,
} from './helpers/calendar.keyboard-interactions';
import { getEventContext } from './helpers/calendar.event-context';

const isScrollable = (node: HTMLElement) => {
	const overflowY = window.getComputedStyle(node).overflowY;
	const overflowX = window.getComputedStyle(node).overflowX;
	return {
		vertical:
			(overflowY === 'auto' || overflowY === 'scroll') &&
			node.scrollHeight > node.clientHeight,
		horizontal:
			(overflowX === 'auto' || overflowX === 'scroll') &&
			node.scrollWidth > node.clientWidth,
	};
};

export type CalendarSticky = ExtractFromEnum<
	Sticky,
	Sticky.None | Sticky.Header | Sticky.Column | Sticky.All
>;

/**
 * @public
 * @component calendar
 * @slot - Default slot.
 * @slot day-0 - Assign elements to corresponding day column using this slot.
 * @slot day-1 - Assign elements to corresponding day column using this slot.
 * @slot day-2 - Assign elements to corresponding day column using this slot.
 * @slot day-3 - Assign elements to corresponding day column using this slot.
 * @slot day-4 - Assign elements to corresponding day column using this slot.
 * @slot day-5 - Assign elements to corresponding day column using this slot.
 * @slot day-6 - Assign elements to corresponding day column using this slot.
 */
export class Calendar extends VividElement {
	/**
	 * Sets the week to display
	 *
	 * @public
	 */
	@attr datetime?: Date | string;

	/**
	 * Sets the first day of the week to display
	 *
	 * @public
	 */
	@attr({ attribute: 'start-day' }) startDay?: 'sunday' | 'monday';

	/**
	 * Sets the locale to be displayed
	 *
	 * @public
	 */
	@attr locales?: string | string[] | undefined;

	/**
	 * Displays a time in 12 hour format
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) hour12 = false;

	/**
	 * Set the `sticky-mode` attribute
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: sticky-mode
	 */
	@attr({ attribute: 'sticky-mode', mode: 'fromView' })
	stickyMode: CalendarSticky = Sticky.All;

	/**
	 * @internal
	 */
	_hours = 24;
	/**
	 * @internal
	 */
	_days = 7;

	/**
	 * @internal
	 */
	hoursAsDatetime = (Array.from({ length: this._hours - 1 }) as Date[])
		.fill(new Date(new Date().setHours(0, 0, 0)))
		.map((d, i) => new Date(d.setHours(++i)));

	/**
	 * @param dateArr - array of dates. requires at least 1 date to be set within the array
	 * @returns array of incremental dates from the first date in the array
	 * @internal
	 */
	_generateDaysArr = (dateArr: [Date, ...Date[]]): Date[] => {
		if (dateArr.length == this._days) {
			return dateArr;
		}

		const lastDate = new Date(dateArr[dateArr.length - 1]);
		lastDate.setDate(lastDate.getDate() + 1);

		return this._generateDaysArr([...dateArr, lastDate]);
	};

	get #activeCalendarEvent(): CalendarEvent | null {
		const { activeElement } = document;
		return activeElement instanceof CalendarEvent ? activeElement : null;
	}

	/**
	 * Fire an event
	 *
	 * @param calendarEvent - event name
	 * @returns boolean - return true
	 */
	getEventContext = getEventContext;

	private getCalendarEventContainingCell(calendarEvent: CalendarEvent) {
		const slotName = calendarEvent.getAttribute('slot') as string;
		const gridCell = (this.shadowRoot as ShadowRoot).querySelector(
			`slot[name="${slotName}"i]`
		) as HTMLDivElement;
		return gridCell.parentElement as HTMLDivElement;
	}

	private arrowKeysInteractions(key: PredefindKeys) {
		const { activeElement } = this.shadowRoot as ShadowRoot;
		let focusNext: Element | null | void;

		if (isCellOrHeader(activeElement)) {
			focusNext = getNextFocusableGridElement.call(this, key, activeElement);
		} else if (this.#activeCalendarEvent) {
			focusNext = this.getCalendarEventContainingCell(
				this.#activeCalendarEvent
			);
		} else if (activeElement?.matches('em[role="button"i]')) {
			focusNext = getHeaderDescendantGridCell.call(
				this,
				key,
				activeElement as HTMLElement
			);
		} else {
			focusNext = (this.shadowRoot as ShadowRoot).querySelector(
				'[role="columnheader"i]'
			);
		}

		this.activateElement(focusNext as HTMLElement);
	}

	private activateElement(el: HTMLElement | null | undefined) {
		const onBlur = ({ target }: FocusEvent) =>
			(target as HTMLElement).setAttribute('tabindex', '-1');

		el?.addEventListener('blur', onBlur, { once: true });
		el?.setAttribute('tabindex', '0');
		el?.focus();
	}

	/**
	 * @internal
	 */
	onKeydown({ key }: KeyboardEvent) {
		const isArrow = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT].some(
			(predefinedKey) => predefinedKey == key
		);

		if (isArrow) {
			this.arrowKeysInteractions(key as PredefindKeys);
		}

		// after this event handler is executed,
		// preventDefault() will be called on the event object by default.
		// we need to return true from our handler to opt - out of this behavior.
		return !isArrow;
	}

	override connectedCallback() {
		super.connectedCallback();
		this.initializeScrollPosition();
	}

	private initializeScrollPosition() {
		if (!isScrollable(this).vertical) {
			return;
		}

		const initialScrollHour = 8;
		const rowHeight = this.scrollHeight / this._hours;
		const scrollPosition = rowHeight * (initialScrollHour - 1);

		Updates.enqueue(() => {
			this.scrollTo({
				top: scrollPosition,
			});
		});
	}
}
