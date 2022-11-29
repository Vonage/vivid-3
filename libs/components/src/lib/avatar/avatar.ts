import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size,
} from '../enums.js';


/**
 * Types of avatar connotation.
 *
 * 
 */
export type AvatarConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Types of avatar appearance.
 *
 * 
 */
export type AvatarAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined>;

/**
 * Types of avatar shape.
 *
 * 
 */
type AvatarShape = Extract<Shape, Shape.Rounded | Shape.Pill>;
/**
 * Base class for avatar
 *
 * 
 */

/**
 * Types of avatar size.
 *
 * 
 */
type AvatarSize = Extract<Size, Size.Condensed | Size.Normal | Size.Expanded>;


export class Avatar extends FoundationElement {
	/**
	 * The connotation the avatar should have.
	 *
	 * 
	 * 
	 * HTML Attribute: connotation
	 */
	@attr connotation?: AvatarConnotation;

	/**
	 * The shape the avatar should have.
	 *
	 * 
	 * 
	 * HTML Attribute: shape
	 */
	@attr shape?: AvatarShape;

	/**
	 * The appearance the avatar should have.
	 *
	 * 
	 * 
	 * HTML Attribute: appearance
	 */
	@attr appearance?: AvatarAppearance;


	/**
	 * The size the avatar should have.
	 *
	 * 
	 * 
	 * HTML Attribute: size
	 */
	@attr size?: AvatarSize;


	/**
	 * avatar header icon
	 *
	 * 
	 */
	@attr icon?: string;

	/**
	 * avatar name
	 *
	 * 
	 */
	@attr name?: string;
}
