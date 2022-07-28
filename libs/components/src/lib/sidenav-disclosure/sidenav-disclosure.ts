import { attr } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class SidenavDisclosure extends FoundationElement {
	details!: HTMLDetailsElement;

	/**
	 *
	 * @public
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates whether the sidenav-disclosure is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	* @internal
	*/
	override connectedCallback(): void {
		super.connectedCallback();
		this.onToggle = this.onToggle.bind(this);
		this.details.addEventListener('toggle', this.onToggle);
		this.details.open = this.open;
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.details.removeEventListener('toggle', this.onToggle);
	}

	/**
	 * Update the aria attr and fire `toggle` event
	 */
	protected onToggle() {
		this.open = this.details.open;
		this.$emit('toggle');
	}
}

export interface SidenavDisclosure extends AffixIcon { }
applyMixins(SidenavDisclosure, AffixIcon);