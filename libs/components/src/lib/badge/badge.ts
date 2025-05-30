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
	 * The connotation the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: BadgeConnotation;

	/**
	 * The shape the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: BadgeShape;

	/**
	 * The size the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: BadgeSize;

	/**
	 * The appearance the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: BadgeAppearance;

	/**
	 * Indicates the badge's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
