import { attr } from '@microsoft/fast-element';
import { Slider as FastSlider } from '@microsoft/fast-foundation';
import { limit } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums';

export type SliderConnotation =
	Connotation.Accent |
	Connotation.CTA;


/**
 * Base class for slider
 *
 * @public
 */
export class Slider extends FastSlider {
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-valuetext'}) ariaValuetext: string | null = null;
	/**
	 * Display markers on/off
	 * 
	 * @public
	 * HTML Attribute: markers
	 */
	@attr({
		mode: 'boolean',
	}) markers = false;

	/**
	 * slider connotation
	 *
	 * @public
	 */
	@attr connotation?: SliderConnotation;

	/**
	 * TO BE REMOVED WHEN UPGRADING TO FAST-FOUNDATION 3
	 * 
	 * @internal
	 */
	override valueChanged(previous: string, next: string): void {
		if (this.$fastController.isConnected) {
			// min/max constraints backported from v3
			const nextAsNumber = parseFloat(next);
			const value = limit(
				this.min,
				this.max,
				this['convertToConstrainedValue'](nextAsNumber)
			).toString();

			if (value !== next) {
				this.value = value;
				return;
			}
			// v2 super will still do setThumbPositionForOrientation and emit change
			super.valueChanged(previous, value);
		}
	}
}
