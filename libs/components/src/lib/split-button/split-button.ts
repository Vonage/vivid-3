import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { AffixIcon } from '../../shared/patterns/affix';
import { Localized } from '../../shared/patterns';

/**
 * Types of split button connotation.
 *
 * @public
 */
export type SplitButtonConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA | Connotation.Success | Connotation.Alert
>;

/**
 * Types of split button appearance.
 *
 * @public
 */
export type SplitButtonAppearance = Extract<
	Appearance,
	Appearance.Filled | Appearance.Outlined | Appearance.Ghost
>;

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
export type SplitButtonSize = Extract<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component split-button
 * @slot - Default slot.
 * @slot icon - Add an icon to the component.
 * @event action-click - Event emitted when the action button is clicked
 * @event indicator-click - Event emitted when the indicator button is clicked
 */
export class SplitButton extends FoundationElement {
	/**
	 * Action HTML button element
	 *
	 * @public
	 * @remarks
	 */
	_action!: HTMLButtonElement;
	get action(): HTMLButtonElement {
		return this._action;
	}

	/**
	 * Indicator HTML button element
	 *
	 * @public
	 * @remarks
	 */
	_indicator!: HTMLButtonElement;
	get indicator(): HTMLButtonElement {
		return this._indicator;
	}

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
	 * Indicates the split button's icon.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: icon
	 */
	@attr icon?: string;

	/**
	 * Indicates the split button's icon indicator.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: split-indicator
	 */
	@attr({ attribute: 'split-indicator', mode: 'fromView' })
	splitIndicator: string = 'chevron-down-line';

	/**
	 * Indicates if the button is disabled.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ attribute: 'disabled', mode: 'boolean' }) disabled = false;

	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
	@attr({ attribute: 'aria-expanded' }) override ariaExpanded: string | null =
		null;

	/**
	 * Defines a string value that labels the indicator element.
	 *
	 * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-label}
	 * @public
	 * @remarks
	 * HTML Attribute: indicator-aria-label
	 */
	@attr({ attribute: 'indicator-aria-label' }) indicatorAriaLabel:
		| string
		| null = null;
}

export interface SplitButton extends AffixIcon, Localized {}
applyMixins(SplitButton, AffixIcon, Localized);
