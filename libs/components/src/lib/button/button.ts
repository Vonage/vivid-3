import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size
} from '../enums.js';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Types of button connotation.
 *
 * 
 */
type ButtonConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA
| Connotation.Success
| Connotation.Alert>;

/**
 * Types of button appearance.
 *
 * 
 */
export type ButtonAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

/**
 * Types of button shape.
 *
 * 
 */
type ButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of button size.
 *
 * 
 */
type ButtonSize = Extract<Size, Size.Condensed | Size.Normal | Size.Expanded>;

/**
 * Base class for button
 *
 * 
 */
export class Button extends FoundationButton {
	/**
	 * The connotation the button should have.
	 *
	 * 
	 * 
	 * HTML Attribute: connotation
	 */
	@attr connotation?: ButtonConnotation;

	/**
	 * The shape the button should have.
	 *
	 * 
	 * 
	 * HTML Attribute: shape
	 */
	@attr shape?: ButtonShape;

	/**
	 * The appearance the button should have.
	 *
	 * 
	 * 
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ButtonAppearance;

	/**
	 * The size the button should have.
	 *
	 * 
	 * 
	 * HTML Attribute: size
	 */
	@attr size?: ButtonSize;

	/**
	 * Indicates the icon is stacked.
	 *
	 * 
	 * 
	 * HTML Attribute: stacked
	 */
	@attr({
		mode: 'boolean',
		attribute: 'stacked',
	}) stacked = false;

	/**
	 * Indicates the button's label.
	 *
	 * 
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;
}

export interface Button extends AffixIconWithTrailing {}
applyMixins(Button, AffixIconWithTrailing);
