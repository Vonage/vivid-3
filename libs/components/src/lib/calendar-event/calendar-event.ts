import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import type { Appearance, Connotation } from '../enums';

/**
 * Types of calendar event connotation.
 *
 * @public
 */
type CalendarEventConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Info
| Connotation.Announcement>;

/**
 * Types of calendar event appearance.
 *
 * @public
 */
type CalendarEventAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Duotone | Appearance.Subtle>;

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
	 * The connotation the calendar event should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: CalendarEventConnotation;

	/**
	 * The appearance the calendar event should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: CalendarEventAppearance;

	/**
	 * sets card display precendence and indentation
	 *
	 * @public
	 */
	@attr({ converter: nullableNumberConverter, attribute: 'overlap-count' })
		overlapCount?: number;

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
