import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Density, Shape,
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
type AvatarShape = Extract<Shape, Shape.Rounded | Shape.Pill>;
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
type AvatarDensity = Extract<Density, Density.Condensed | Density.Normal | Density.Extended>;


export class Avatar extends FoundationElement {
	/*/**
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
	@attr density?: AvatarDensity;


	/**
	 * Indicates the avatar's initials.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr name?: string;
	/**
	 * avatar header icon
	 *
	 * @public
	 */
	@attr icon?: string;

}
