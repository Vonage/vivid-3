import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Sticky } from '../enums';
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
	 * The date within a week of choice.
	 * Accepts any parameter acceptable by the `Date()` constructor.
	 *
	 * @public
	 */
	@attr datetime?: Date | string;

	/**
	 * The day to show as the first within a work week.
	 * Accepts either Sunday or Monday
	 * Calendar will - programmatically - default to Monday if not specified
	 *
	 * (only applicable for views of more than a single day)
	 *
	 * @public
	 */
	@attr({ attribute: 'start-day' }) startDay?: 'sunday' | 'monday';

	/**
	 * A locale string or array of locale strings that contain one or more language or locale tags.
	 * If you include more than one locale string,
	 * list them in descending order of priority so that the first entry is the preferred locale.
	 * If you omit this parameter, the default locale of the JavaScript runtime is used.
	 * This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
	 * e.g. en-US | en-US, he-IL
	 *
	 * @public
	 */
	@attr locales?: string | string[] | undefined;

	/**
	 * The convention of displayed time in which the day runs from midnight to midnight and is divided into 24 or 12 hours.
	 * Unless provided, choice will be set according to local time preference (e.g. US = 12, IL = 24)
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) hour12 = false;

	/**
	 * Sticky header and sticky time options
	 *
	 * @public
	 */
	@attr({ attribute: 'sticky-mode', mode: 'fromView' })
	stickyMode: Sticky = Sticky.None;

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
}
