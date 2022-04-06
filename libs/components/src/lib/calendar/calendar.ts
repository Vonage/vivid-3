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
} from './helpers/calendar.keyboard-interactions';
import { assertIsValidDateStringRepresentation } from './helpers/calendar.date-functions';
import { getEventContext } from './helpers/calendar.event-context';


/**
 * Base class for calendar
 *
 * @public
 */
export class Calendar extends FoundationElement {

	/**
	 * The date within a week of choice.
	 * Accepts any valid date string representation e.g. _2021-01-01_
	 *
	 * @public
	 */
	@attr({
		converter: {
			toView(v) {
				// throw if not a valid date string representation
				assertIsValidDateStringRepresentation(v);
				return v;
			},
			fromView(v) {
				// throw if not a valid date string representation
				assertIsValidDateStringRepresentation(v);
				return new Date(v);
			}
		}
	})
		datetime?: Date | string;

	/**
	 * The day to show as the first within a work week.
	 * Accepts either Sunday or Monday
	 * Calendar will - programmatically - default to Monday if not specified
	 *
	 * (only applicable for views of more than a single day)
	 *
	 * @public
	 */
	@attr({ mode: 'fromView' })	startDay?: 'sunday' | 'monday';

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
	 * Fire an event
	 *
	 * @param {string} event        - event name
	 * @param {Object} [detail={}]  - optional event detail object
	 * @returns {boolean}           - return true
	 */
	getEventContext = getEventContext.bind(this);

	// !TODO: this is a temporary fix until calendar event is included in this repo
	private get focusedCalendarEvent(): any | null {
		return null;
	}
	// private get focusedCalendarEvent(): VWCCalendarEvent | null {
	// 	return (document.activeElement?.matches('vwc-calendar-event') && document.activeElement as VWCCalendarEvent) || null;
	// }

	// !TODO: this is a temporary fix until calendar event is included in this repo
	// private getCalendarEventContainingCell(calendarEvent: VWCCalendarEvent) {
	private getCalendarEventContainingCell(calendarEvent: any) {
		const daySlot = calendarEvent.getAttribute('slot');
		const slot = this.shadowRoot?.querySelector(`slot[name="${daySlot}"i]`);
		return slot?.parentElement;
	}

	private arrowKeysInteractions(event: KeyboardEvent) {
		const activeElement = this.shadowRoot?.activeElement;
		let focusNext: Element | null | undefined;

		if (isCellOrHeader(activeElement)) {
			focusNext = getNextFocusableGridElement.call(this, event.key, activeElement);
		} else if (this.focusedCalendarEvent) {
			focusNext = this.getCalendarEventContainingCell(this.focusedCalendarEvent);
		} else if (activeElement?.matches('em[role="button"i]')) {
			focusNext = getHeaderDescendantGridCell.call(this, event.key, activeElement as HTMLElement);
		} else {
			// default selectable element (first header)
			focusNext = this.shadowRoot?.querySelector('[role="columnheader"i]');
		}

		this.moveTo(focusNext as HTMLElement);

		event.preventDefault();
	}

	private moveTo(el: HTMLElement | null | undefined) {
		const onBlur = ({ target }: FocusEvent) => (target as HTMLElement)?.setAttribute('tabindex', '-1');

		el?.addEventListener('blur', onBlur, { once: true });
		el?.setAttribute('tabindex', '0');
		el?.focus();
	}


	onKeydown(event: KeyboardEvent) {
		const isArrow = [ARROW_UP, ARROW_RIGHT, ARROW_DOWN, ARROW_LEFT].includes(event.key);
		isArrow && this.arrowKeysInteractions(event);

		// after this event handler is executed,
		// preventDefault() will be called on the event object by default.
		// we need to return true from our handler to opt - out of this behavior.
		return !isArrow;
	}
}
