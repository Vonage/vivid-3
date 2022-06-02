import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable, volatile} from '@microsoft/fast-element';

/**
 * Base class for top-app-bar
 *
 * @public
 */
export class TopAppBar extends FoundationElement {
	/**
	 *
	 *
	 * @public
	 *
	 * HTML Attribute: heading
	 */
	@attr heading?: string;

	/**
	 * sets the top-app-bar to be fixed
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) fixed = false;

	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	@observable _elevated = false;

	@volatile
	get elevated() {
		if (this.fixed && window.pageYOffset > 0) {
			return this._elevated = true;
		} else {
			return this._elevated = false;
		}
	}
}
