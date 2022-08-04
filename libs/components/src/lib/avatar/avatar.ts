import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape,
} from '../enums.js';

/**
 * Types of avatar connotation.
 *
 * @public
 */
type AvatarConnotation = Extract<Connotation,
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
	@attr density?:  -2 | -1 | 0 | 1 | 2 | 3;

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
