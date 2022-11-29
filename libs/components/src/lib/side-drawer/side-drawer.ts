import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for side-drawer
 *
 * 
 */
export class SideDrawer extends FoundationElement {
	/**
	 * applies scheme alternate region
	 *
	 * 
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * sets the side drawer's type to modal
	 *
	 * 
	 */
	@attr({
		mode: 'boolean',
	}) modal = false;

	/**
	 * indicates whether the side drawer is open
	 *
	 * 
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * sets the side of the side drawer
	 *
	 * 
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
		this.$emit('close');
	}

	#open(): void {
		this.$emit('open');
	}
}
