import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type {
	Appearance, Connotation, Shape, Size
} from '../enums.js';
import { AffixIcon } from '../shared/patterns/affix.js';

/**
 * Types of split button connotation.
 *
 * @public
 */
export type SplitButtonConnotation = Extract<Connotation,
Connotation.Accent | Connotation.CTA>;

/**
 * Types of split button appearance.
 *
 * @public
 */
export type SplitButtonAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

/**
 * Types of split button shape.
 *
 * @public
 */
export type SplitButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of split button size.
 *
 * @public
 */
export type SplitButtonSize = Extract<Size, Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded>;

/**
 * Base class for split button
 *
 * @public
 */
export class SplitButton extends FoundationButton {
	/**
	 * The connotation the split button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SplitButtonConnotation;

	/**
	 * The shape the split button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: SplitButtonShape;

	/**
	 * The appearance the split button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: SplitButtonAppearance;

	/**
	 * The size the split button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: SplitButtonSize;

	/**
	 * Indicates the split button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates the split button's icon indicator.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: split-indicator
	 */
	@attr({ attribute: ' split-indicator', mode: 'fromView' }) splitIndicator: string = 'chevron-down-line';

	/**
	 * Indicates if the split button's popup is open.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * Indicates if the action button is disabled.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled-action
	 */
	@attr({ attribute: 'disabled-action', mode: 'boolean' }) disabledAction = false;

	/**
	 * Indicates if the secondary button is disabled.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled-secondary
	 */
	@attr({ attribute: 'disabled-secondary', mode: 'boolean' }) disabledSecondary = false;
}

export interface SplitButton extends AffixIcon { }
applyMixins(SplitButton, AffixIcon);
