import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { Linkable } from '../../shared/patterns/linkable';
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
 * @slot icon - The preferred way to add an icon to the component.
 */
export class Avatar extends Linkable(VividElement) {
	/**
	 * Sets the element's connotation
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: AvatarConnotation;

	/**
	 * Sets the element's shape
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: AvatarShape;

	/**
	 * Sets the element's appearance
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: AvatarAppearance;

	/**
	 * Sets the element's size
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: AvatarSize;

	/**
	 * Sets the element's icon
	 *
	 * @deprecated deprecated as of 06/25
	 *
	 * avatar header icon
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * Sets the initials on the Avatar
	 *
	 * @public
	 */
	@attr initials?: string;

	/**
	 * Indicates whether avatar should be a clickable <button> element.
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
		attribute: 'clickable',
	})
	clickable = false;
}
