import { attr } from '@microsoft/fast-element';
import { Appearance, Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns/affix';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { replaces } from '../../shared/deprecation/replaced-props';

/**
 * Types of nav-disclosure appearance.
 *
 * @public
 */
export type NavDisclosureAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Ghost | Appearance.GhostLight
>;

/**
 * Types of nav-disclosure connotation.
 *
 * @public
 */
export type NavDisclosureConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * @public
 * @component nav-disclosure
 * @slot - Default slot.
 * @slot meta - A slot to add additional content to the nav disclosure.
 * @slot icon - The preferred way to add an icon to the component.
 * @event {CustomEvent<undefined>} toggle - Event emitted when the nav disclosure is toggled.
 * @testSelector byLabel byLabel
 * @testAction expand toggleNavDisclosure true
 * @testAction collapse toggleNavDisclosure false
 * @testQuery current navCurrent true
 * @testQuery !current navCurrent false
 * @testQuery open open true
 * @testQuery closed open false
 * @testRef summary shadow summary
 */
export class NavDisclosure extends AffixIcon(DelegatesAria(VividElement)) {
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

	/**
	 * Indicates there's a nested active nav-item within nav-disclosure
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: current
	 */
	@replaces<boolean, string | null>({
		deprecatedPropertyName: 'ariaCurrent',
		fromDeprecated: (v) => Boolean(v),
		toDeprecated: (v) => (v ? 'true' : null),
	})
	@attr({ attribute: 'current', mode: 'boolean' })
	current = false;

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
