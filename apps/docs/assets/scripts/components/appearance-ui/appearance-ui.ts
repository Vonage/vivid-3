import { attr, customElement, FASTElement } from '@microsoft/fast-element';
import type { Appearance } from '@vonage/vivid';
import { AppearanceUiTemplate } from './appearance-ui.template';
import styles from './appearance-ui.scss?inline';

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
	| Appearance.SubtleLight
	| Appearance.Listitem
>;

@customElement({
	name: 'docs-appearance-ui',
	template: AppearanceUiTemplate,
	styles,
})
export class AppearanceUi extends FASTElement {
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
