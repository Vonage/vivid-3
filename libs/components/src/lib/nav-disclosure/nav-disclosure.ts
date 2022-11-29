import { attr } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * A Nav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * 
 */
export class NavDisclosure extends FoundationElement {
	details!: HTMLDetailsElement;

	/**
	 *
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates whether the nav-disclosure is open
	 *
	 * 
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * 
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		this.details.addEventListener('toggle', this.#onToggle);
		this.details.open = this.open;
	}

	/**
	 * 
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
