import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import type { Appearance, Connotation } from '../enums';

/**
 * Types of calendar event connotation.
 *
 * 
 */
type CalendarEventConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Information
| Connotation.Announcement>;

/**
 * Types of calendar event appearance.
 *
 * 
 */
type CalendarEventAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Duotone | Appearance.Subtle>;

/**
 * Base class for calendar-event
 *
 * 
 */
export class CalendarEvent extends FoundationElement {
	/**
	 * the heading of the event
	 *
	 * 
	 */
	@attr heading?: string;

	/**
	 * the description of the event
	 *
	 * 
	 */
	@attr description?: string;

	/**
	 * The connotation the calendar event should have.
	 *
	 * 
	 * 
	 * HTML Attribute: connotation
	 */
	@attr connotation?: CalendarEventConnotation;

	/**
	 * The appearance the calendar event should have.
	 *
	 * 
	 * 
	 * HTML Attribute: appearance
	 */
	@attr appearance?: CalendarEventAppearance;

	/**
	 * sets card display precendence and indentation
	 *
	 * 
	 */
	@attr({ converter: nullableNumberConverter, attribute: 'overlap-count' })
		overlapCount?: number;

	/**
	 * time of day event starts
	 *
	 */
	@attr({ converter: nullableNumberConverter  })
		start?: number; // TODO should be converted to allowed range

	/**
	 * event's time duration in hours
	 *
	 */
	@attr({ converter: nullableNumberConverter  })
		duration?: number; // TODO should be converted to allowed range

}
