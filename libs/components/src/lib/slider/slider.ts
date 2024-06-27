import { attr, observable } from '@microsoft/fast-element';
import { applyMixins, Slider as FastSlider } from '@microsoft/fast-foundation';
import { limit } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';

export type SliderConnotation = Connotation.Accent | Connotation.CTA;

/**
 * @public
 * @component slider
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the slider value changes
 * @vueModel modelValue value change `(event.target as HTMLInputElement).value`
 */
export class Slider extends FastSlider {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
	@attr({ attribute: 'aria-valuetext' }) ariaValuetext: string | null = null;
	/**
	 * Display markers on/off
	 *
	 * @public
	 * HTML Attribute: markers
	 */
	@attr({
		mode: 'boolean',
	})
	markers = false;

	/**
	 * slider connotation
	 *
	 * @public
	 */
	@attr connotation?: SliderConnotation;

	/**
	 * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
	 *
	 * @public
	 */
	@observable override valueTextFormatter: (value: string) => string = (
		value
	) => parseFloat(value).toLocaleString(this.locale.lang);

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

export interface Slider extends Localized {}
applyMixins(Slider, Localized);
