import { attr } from '@microsoft/fast-element';
import { Slider as FastSlider } from '@microsoft/fast-foundation';

/**
 * Base class for slider
 *
 * 
 */
export class Slider extends FastSlider {
	/**
	 * Display markers on/off
	 * 
	 * 
	 * HTML Attribute: markers
	 */
	@attr({
		mode: 'boolean',
	}) markers = false;

	/**
	 *
	 *
	 * @param  previous - previous value
	 * @param  next - next value
	 */
	override valueChanged(previous: string, next: string): void {
		if (this.$fastController.isConnected) {
			const nextAsNumber = parseFloat(next);
			const value = Math.min(
				Math.max(this['convertToConstrainedValue'](nextAsNumber), this.min),
				this.max)
				.toString();

			if (value !== next) {
				this.value = value;
				return;
			}

			super.valueChanged(previous, next);

			this['setThumbPositionForOrientation'](this.direction);

			this.$emit('change');
		}
	}
}
