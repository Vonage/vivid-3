import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Appearance } from '../enums.js';

/**
 * Types of appearances.
 *
 * @public
 */
export type AppearanceUIAppearance = Extract<
	Appearance,
	| Appearance.Filled
	| Appearance.Ghost
	| Appearance.GhostLight
	| Appearance.Outlined
	| Appearance.OutlinedLight
	| Appearance.Duotone
	| Appearance.Fieldset
	| Appearance.Subtle
	| Appearance.Listitem
>;

/**
 * @component appearance-ui
 */
export class AppearanceUi extends FoundationElement {
	/**
	 * The appearance.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: AppearanceUIAppearance;

	/**
	 * Displays the hover state via class
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'hovered',
	})
	hovered = false;

	/**
	 * Displays the active state via class
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'active',
	})
	active = false;

	/**
	 * Displays the selected state via class
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'selected',
	})
	selected = false;

	/**
	 * Displays the disabled state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'disabled',
	})
	disabled = false;

	/**
	 * Displays the disabled state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'readonly',
	})
	readonly = false;

	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
