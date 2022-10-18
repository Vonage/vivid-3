import { attr } from '@microsoft/fast-element';
import { Slider as FastSlider } from '@microsoft/fast-foundation';

/**
 * Base class for slider
 *
 * @public
 */
export class Slider extends FastSlider {
	/**
	 * Display markers on/off
	 * 
	 * @public
	 * HTML Attribute: markers
	 */
	@attr({
		mode: 'boolean',
	}) markers = false;
}
