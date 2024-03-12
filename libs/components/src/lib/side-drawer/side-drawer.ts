import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * @public
 * @component side-drawer
 * @slot - Sets assigned nodes to the side drawer itself.
 * @slot app-content - Sets assigned nodes to the main application content, the side drawer is opened next to.
 * @event close - Fired when the side drawer is closed.
 * @event open - Fired when the side drawer is opened.
 */
export class SideDrawer extends FoundationElement {
	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * sets the side drawer's type to modal
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) modal = false;

	/**
	 * indicates whether the side drawer is open
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * sets the side of the side drawer
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) trailing = false;

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'open': {
				this.open ? this.#open() : this.#close();
			}
		}
	}

	#close(): void {
		this.$emit('close', undefined, { bubbles: false });
	}

	#open(): void {
		this.$emit('open', undefined, { bubbles: false });
	}
}
