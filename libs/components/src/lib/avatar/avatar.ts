import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of avatar connotation.
 *
 * @public
 */
export type AvatarConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of avatar appearance.
 *
 * @public
 */
export type AvatarAppearance = ExtractFromEnum<
	Appearance,
	| Appearance.Filled
	| Appearance.Outlined
	| Appearance.Duotone
	| Appearance.Subtle
>;

/**
 * Types of avatar shape.
 *
 * @public
 */
export type AvatarShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;
/**
 * Base class for avatar
 *
 * @public
 */

/**
 * Types of avatar size.
 *
 * @public
 */
export type AvatarSize = ExtractFromEnum<
	Size,
	Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component avatar
 * @slot graphic - Assign nodes to the graphic slot to set a graphic media of any kind (e.g. image, illustration etc).
 */
export class Avatar extends VividElement {
	/**
	 * The connotation the avatar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: AvatarConnotation;

	/**
	 * The shape the avatar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: AvatarShape;

	/**
	 * The appearance the avatar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: AvatarAppearance;

	/**
	 * The size the avatar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: AvatarSize;

	/**
	 * avatar header icon
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * avatar name
	 *
	 * @public
	 */
	@attr initials?: string;
}
