import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size,
} from '../enums.js';


/**
 * Types of avatar connotation.
 *
 * @public
 */
export type AvatarConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Types of avatar appearance.
 *
 * @public
 */
export type AvatarAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined>;

/**
 * Types of avatar shape.
 *
 * @public
 */
export type AvatarShape = Extract<Shape, Shape.Rounded | Shape.Pill>;
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
export type AvatarSize = Extract<Size, Size.Condensed | Size.Normal | Size.Expanded>;


export class Avatar extends FoundationElement {
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
