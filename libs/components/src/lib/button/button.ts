import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { VividFoundationButton } from '../../shared/foundation/button/button.js';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import {
	AffixIconWithTrailing,
	Linkable,
	Localized,
} from '../../shared/patterns';

/**
 * Types of button connotation.
 *
 * @public
 */
export type ButtonConnotation = ExtractFromEnum<
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
export type ButtonAppearance = ExtractFromEnum<
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
export type ButtonShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of button size.
 *
 * @public
 */
export type ButtonSize = ExtractFromEnum<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component button
 * @slot icon - Add an icon to the component.
 */
export class Button extends AffixIconWithTrailing(
	Localized(Linkable(VividFoundationButton))
) {
	/**
	 * Specifies extra information about the button. This information is typically used by browsers to display a tooltip.
	 */
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

	constructor() {
		super();
		this.title = '';
	}
}
