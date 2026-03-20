import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import type { Appearance, Connotation } from '../enums';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * Types of calendar event connotation.
 *
 * @public
 */
export type CalendarEventConnotation = ExtractFromEnum<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
	| Connotation.Announcement
>;

/**
 * Types of calendar event appearance.
 *
 * @public
 */
export type CalendarEventAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Filled | Appearance.Duotone | Appearance.Subtle
>;

/**
 * @public
 * @component calendar-event
 */
export class CalendarEvent extends DelegatesAria(VividElement) {
	/**
	 * Sets the event heading
	 *
	 * @public
	 */
	@attr heading?: string;

	/**
	 * Sets the event description
	 *
	 * @public
	 */
	@attr description?: string;

	/**
	 * Sets the first day of the week to display
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: CalendarEventConnotation;

	/**
	 * Sets the event's appearance
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: CalendarEventAppearance;

	/**
	 * Sets the stacking context of the event when it overlaps with another
	 *
	 * @public
	 */
	@attr({ converter: nullableNumberConverter, attribute: 'overlap-count' })
	overlapCount?: number;

	/**
	 * Sets the event start time (e.g. `14` = 2pm)
	 *
	 * @public
	 */
	@attr({ converter: nullableNumberConverter })
	start?: number; // TODO should be converted to allowed range

	/**
	 * Sets the event duration (e.g. `2` = 2 hours)
	 *
	 * @public
	 */
	@attr({ converter: nullableNumberConverter })
	duration?: number; // TODO should be converted to allowed range
}
