import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable, volatile } from '@microsoft/fast-element';

/**
 * Base class for header
 *
 * @public
 */
export class header extends FoundationElement {
	headerEl!: HTMLElement;
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

	prevScroll: number = 0;

	@observable _elevated = false;
	@observable _scrolled = false;

	override connectedCallback() {
		super.connectedCallback();
		window.addEventListener('scroll', this.#scrolledWindow);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('scroll', this.#scrolledWindow);
	}

	#scrolledWindow = () => {
		this.#updateElevatedState();
		this.#updateScrolledState();
	}

	#updateElevatedState = () => {
		this._elevated = !this._elevated;
	}

	#updateScrolledState = () => {
		if (!this.fixed) {
			// if scroll up
			if (this.prevScroll > window.scrollY) {
				this._scrolled = true;
				this.headerEl.scrollTo({ top: 0, behavior: 'smooth' });
			}
			else {
				this._scrolled = false;
				this.headerEl.scrollTo({ top: -60, behavior: 'smooth' });
			}
		}
		this.prevScroll = window.scrollY;
	}

	@volatile
	get elevated() {
		return (this._elevated && false) || this.fixed && window.pageYOffset > 0;
	}

	@volatile
	get scrolled() {
		return this._scrolled;
	}
}
