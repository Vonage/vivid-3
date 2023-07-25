import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type {
	Appearance, Connotation, Shape, Size
} from '../enums.js';
import { AffixIcon } from '../shared/patterns/affix.js';

/**
 * Types of split-button connotation.
 *
 * @public
 */
export type SplitButtonConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Types of split-button appearance.
 *
 * @public
 */
export type SplitButtonAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

/**
 * Types of split-button shape.
 *
 * @public
 */
export type SplitButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of split-button size.
 *
 * @public
 */
export type SplitButtonSize = Extract<Size, Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded>;

/**
 * Base class for split-button
 *
 * @public
 */
export class SplitButton extends FoundationButton {
	/**
	 * The connotation the split-button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SplitButtonConnotation;

	/**
	 * The shape the split-button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: SplitButtonShape;

	/**
	 * The appearance the split-button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: SplitButtonAppearance;

	/**
	 * The size the split-button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: SplitButtonSize;

	/**
	 * Indicates the button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}

export interface SplitButton extends AffixIcon {}
applyMixins(SplitButton, AffixIcon);
