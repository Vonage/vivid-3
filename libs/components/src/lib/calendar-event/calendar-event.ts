import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';

/**
 * Base class for calendar-event
 *
 * @public
 */
export class CalendarEvent extends FoundationElement {
	/**
	 * the heading of the event
	 *
	 * @public
	 */
	@attr heading?: string;

	/**
	 * the description of the event
	 *
	 * @public
	 */
	@attr description?: string;

	/**
	 * color - color of event card
	 *
	 * @public
	 */
	@attr color?: string;

	/**
	 * sets card display precendence and indentation
	 *
	 * @public
	 */
	@attr({ attribute: 'overlap-count' })
		overlapCount?: string;

	/**
	 * time of day event starts
	 *
	 * @default 0
	 * @public
	 */
	@attr({ converter: nullableNumberConverter  })
		start?: number; // TODO should be converted to allowed range

	/**
	 * event's time duration in hours
	 *
	 * @default 1
	 * @public
	 */
	@attr({ converter: nullableNumberConverter  })
		duration?: number; // TODO should be converted to allowed range

}
