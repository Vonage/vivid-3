import { attr } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { Appearance, Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Types of nav-disclosure appearance.
 *
 * @public
 */
export type NavDisclosureAppearance = Extract<
	Appearance,
	Appearance.Ghost | Appearance.GhostLight
>;

/**
 * Types of nav-disclosure connotation.
 *
 * @public
 */
export type NavDisclosureConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * @public
 * @component nav-disclosure
 * @slot - Default slot.
 * @slot meta - A slot to add additional content to the nav disclosure.
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<undefined>} toggle - Event emitted when the nav disclosure is toggled.
 */
export class NavDisclosure extends FoundationElement {
	details!: HTMLDetailsElement;

	/**
	 *
	 * @public
	 * @slot icon - Slot to add an icon to nav-disclosure.
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * The appearance nav-disclosure should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: NavDisclosureAppearance;

	/**
	 * The connotation nav-disclosure should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: NavDisclosureConnotation;

	/**
	 * Indicates whether the nav-disclosure is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	@attr({ attribute: 'aria-current' }) override ariaCurrent: string | null =
		null;

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
		this.details.removeEventListener('toggle', this.#onToggle);
	}

	#onToggle = () => {
		this.open = this.details.open;
		this.$emit('toggle', undefined, { bubbles: false });
	};
}

export interface NavDisclosure extends AffixIcon {}
applyMixins(NavDisclosure, AffixIcon);
