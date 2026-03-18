import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of badge connotation.
 *
 * @public
 */
export type BadgeConnotation = ExtractFromEnum<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
	| Connotation.Announcement
>;

/**
 * Types of badge appearance.
 *
 * @public
 */
export type BadgeAppearance = ExtractFromEnum<
	Appearance,
	| Appearance.Filled
	| Appearance.Duotone
	| Appearance.Subtle
	| Appearance.SubtleLight
>;

/**
 * Types of badge shape.
 *
 * @public
 */
export type BadgeShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of badge size.
 *
 * @public
 */
export type BadgeSize = ExtractFromEnum<Size, Size.Normal | Size.Expanded>;

/**
 * @public
 * @component badge
 * @slot icon - The preferred way to add an icon to the component.
 */
export class Badge extends AffixIconWithTrailing(VividElement) {
	/**
	 * Sets the badge connotation
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: BadgeConnotation;

	/**
	 * Sets the badge border-radius
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: BadgeShape;

	/**
	 * Sets the badge size
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: BadgeSize;

	/**
	 * Sets the badge appearance
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: BadgeAppearance;

	/**
	 * Sets a text on the badge
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
