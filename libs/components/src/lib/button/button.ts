import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { VividFoundationButton } from '../../shared/foundation/button/button.js';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins.js';

/**
 * Types of button connotation.
 *
 * @public
 */
export type ButtonConnotation = Extract<
	Connotation,
	| Connotation.Accent
	| Connotation.Announcement
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
>;

/**
 * Types of button appearance.
 *
 * @public
 */
export type ButtonAppearance = Extract<
	Appearance,
	| Appearance.Filled
	| Appearance.Outlined
	| Appearance.Ghost
	| Appearance.GhostLight
	| Appearance.OutlinedLight
>;

/**
 * Types of button shape.
 *
 * @public
 */
export type ButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of button size.
 *
 * @public
 */
export type ButtonSize = Extract<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component button
 * @slot icon - Add an icon to the component.
 */
export class Button extends VividFoundationButton {
	@attr({
		converter: {
			fromView: (value) => value || null,
			toView: (value) => value || null,
		},
	})
	override title: string;
	/**
	 * The connotation the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: ButtonConnotation;

	/**
	 * The shape the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: ButtonShape;

	/**
	 * The appearance the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ButtonAppearance;

	/**
	 * The size the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: ButtonSize;

	/**
	 * Indicates the icon is stacked.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: stacked
	 */
	@attr({
		mode: 'boolean',
		attribute: 'stacked',
	})
	stacked = false;

	/**
	 * Displays the button in pending state.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({
		mode: 'boolean',
		attribute: 'pending',
	})
	pending = false;

	/**
	 * Display a chevron to indicate that the button opens a dropdown.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: dropdown-indicator
	 */
	@attr({
		mode: 'boolean',
		attribute: 'dropdown-indicator',
	})
	dropdownIndicator = false;

	/**
	 * Displays the button in active state.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: active
	 */
	@attr({
		mode: 'boolean',
		attribute: 'active',
	})
	active = false;

	/**
	 * Indicates the button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates the button's href.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: href
	 */
	@attr href?: string;

	/**
	 * Indicates the button's download.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: download
	 */
	@attr download?: string;

	/**
	 * Indicates the button's hreflang.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: hreflang
	 */
	@attr hreflang?: string;

	/**
	 * Indicates the button's ping.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: ping
	 */
	@attr ping?: string;

	/**
	 * Indicates the button's referrerpolicy.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: referrerpolicy
	 */
	@attr referrerpolicy?: string;

	/**
	 * Indicates the button's rel.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: rel
	 */
	@attr rel?: string;

	/**
	 * Indicates the target's rel.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: target
	 */
	@attr target?: '_self' | '_blank' | '_parent' | '_top';

	constructor() {
		super();
		this.title = '';
	}
}

export interface Button extends AffixIconWithTrailing {}
applyMixins(Button, AffixIconWithTrailing);
