import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable, volatile } from '@microsoft/fast-element';

/**
 * Base class for header
 *
 * @public
 */
export class header extends FoundationElement {
	/**
	 *
	 *headerEl
	 * @public
	 *
	 * HTML Attribute: heading
	 */
	@attr heading?: string;

	/**
	 * sets the header to be fixed
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

	override connectedCallback() {
		super.connectedCallback();
		window.addEventListener('scroll', this.#updateElevatedState);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('scroll', this.#updateElevatedState);
	}

	#updateElevatedState = () => {
		this._elevated = !this._elevated;
	};

	@volatile
	get elevated() {
		return (this._elevated && false) || this.fixed && window.pageYOffset > 0;
	}
}
