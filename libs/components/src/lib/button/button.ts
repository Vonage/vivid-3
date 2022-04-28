import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, BlockSize, Connotation, Shape,
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
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

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
type ButtonBlockSize = Extract<BlockSize, BlockSize.Condensed | BlockSize.Base | BlockSize.Extended>;

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
	 * The density the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: density
	 */
	@attr size?: ButtonBlockSize;

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
	}) stacked = false;

	/**
	 * Indicates the button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr({ mode: 'fromView' }) label = '';
}

export interface Button extends AffixIconWithTrailing {}
applyMixins(Button, AffixIconWithTrailing);
