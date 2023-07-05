import { attr } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * A Nav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 * @slot - Default slot.
 * @slot meta - A slot to add additional content to the nav disclosure.
 */
export class NavDisclosure extends FoundationElement {
	details!: HTMLDetailsElement;

	/**
	 *
	 * @public
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates whether the nav-disclosure is open
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
		this.details.addEventListener('toggle', this.#onToggle);
		this.details.open = this.open;
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.details.removeEventListener('toggle',  this.#onToggle);
	}

	#onToggle = () => {
		this.open = this.details.open;
		this.$emit('toggle');
	};
}

export interface NavDisclosure extends AffixIcon { }
applyMixins(NavDisclosure, AffixIcon);
