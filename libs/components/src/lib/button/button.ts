import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size,
} from '../enums.js';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Types of button connotation.
 *
 * @public
 */
type ButtonConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert>;

/**
 * Types of button appearance.
 *
 * @public
 */
export type ButtonAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Soft>;

/**
 * Types of button shape.
 *
 * @public
 */
type ButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of button size.
 *
 * @public
 */
type ButtonSize = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge>;

/**
 * Base class for button
 *
 * @public
 */
export class Button extends FoundationButton {
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
	 * Indicates the button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr() label = '';
}

export interface Button extends AffixIconWithTrailing {}
applyMixins(Button, AffixIconWithTrailing);
