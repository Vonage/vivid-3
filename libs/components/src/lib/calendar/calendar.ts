import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {
	ARROW_DOWN,
	ARROW_LEFT,
	ARROW_RIGHT,
	ARROW_UP,
	getHeaderDescendantGridCell,
	getNextFocusableGridElement,
	isCellOrHeader,
	PredefindKeys,
} from './helpers/calendar.keyboard-interactions';
import { getEventContext } from './helpers/calendar.event-context';


/**
 * Base class for calendar
 *
 * @public
 */
export class Calendar extends FoundationElement {

	/**
	 * The date within a week of choice.
	 * Accepts any parameter acceptable by the `Date()` constructor.
	 *
	 * @public
	 */
	@attr	datetime?: Date | string;

	/**
	 * The day to show as the first within a work week.
	 * Accepts either Sunday or Monday
	 * Calendar will - programmatically - default to Monday if not specified
	 *
	 * (only applicable for views of more than a single day)
	 *
	 * @public
	 */
	@attr({ attribute: 'start-day' })	startDay?: 'sunday' | 'monday';

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
	@attr	locales?: string | string[] | undefined;

	/**
	 * The convention of displayed time in which the day runs from midnight to midnight and is divided into 24 or 12 hours.
	 * Unless provided, choice will be set according to local time preference (e.g. US = 12, IL = 24)
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) hour12 = false;

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
	 * @param dateArr array of dates. requires at least 1 date to be set within the array
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

	/**
	 * Fire an event
	 *
	 * @param {string} event        - event name
	 * @param {Object} [detail={}]  - optional event detail object
	 * @returns {boolean}           - return true
	 */
	getEventContext = getEventContext;

	private arrowKeysInteractions(key: PredefindKeys) {
		const { activeElement } = (this.shadowRoot as ShadowRoot);
		let focusNext: Element | null | void;

		if (isCellOrHeader(activeElement)) {
			focusNext = getNextFocusableGridElement.call(this, key, activeElement);
		} else if (this.focusedCalendarEvent) {
			focusNext = this.getCalendarEventContainingCell(this.focusedCalendarEvent);
		}	else if (activeElement?.matches('em[role="button"i]')) {
			focusNext = getHeaderDescendantGridCell.call(this, key, activeElement as HTMLElement);
		} else {
			focusNext = (this.shadowRoot as ShadowRoot).querySelector('[role="columnheader"i]');
		}

		this.moveTo(focusNext as HTMLElement);
	}

	private moveTo(el: HTMLElement | null | undefined) {
		const onBlur = ({ target }: FocusEvent) => (target as HTMLElement).setAttribute('tabindex', '-1');

		el?.addEventListener('blur', onBlur, { once: true });
		el?.setAttribute('tabindex', '0');
		el?.focus();
	}


	onKeydown({ key }: KeyboardEvent) {
		const isArrow = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT].some(predefinedKey => predefinedKey == key);

		if (isArrow) {
			this.arrowKeysInteractions(key as PredefindKeys);
		}

		// after this event handler is executed,
		// preventDefault() will be called on the event object by default.
		// we need to return true from our handler to opt - out of this behavior.
		return !isArrow;
	}
}
