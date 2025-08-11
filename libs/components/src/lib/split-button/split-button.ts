import { attr } from '@microsoft/fast-element';
import type { Appearance, Connotation, Shape, Size } from '../enums.js';
import { AffixIcon } from '../../shared/patterns/affix';
import { Localized } from '../../shared/patterns';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of split button connotation.
 *
 * @public
 */
export type SplitButtonConnotation = ExtractFromEnum<
	Connotation,
	| Connotation.Accent
	| Connotation.Announcement
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
>;

/**
 * Types of split button appearance.
 *
 * @public
 */
export type SplitButtonAppearance = ExtractFromEnum<
	Appearance,
	| Appearance.Filled
	| Appearance.Outlined
	| Appearance.Ghost
	| Appearance.OutlinedLight
>;

/**
 * Types of split button shape.
 *
 * @public
 */
export type SplitButtonShape = ExtractFromEnum<
	Shape,
	Shape.Rounded | Shape.Pill
>;

/**
 * Types of split button size.
 *
 * @public
 */
export type SplitButtonSize = ExtractFromEnum<
	Size,
	Size.SuperCondensed | Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component split-button
 * @slot - Default slot.
 * @slot icon - The preferred way to add an icon to the component.
 * @event {CustomEvent<undefined>} action-click - Event emitted when the action button is clicked
 * @event {CustomEvent<undefined>} indicator-click - Event emitted when the indicator button is clicked
 */
export class SplitButton extends AffixIcon(
	Localized(DelegatesAria(VividElement))
) {
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
	 * Indicates the split button's icon indicator.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: split-indicator
	 */
	@attr({ attribute: 'split-indicator', mode: 'fromView' })
	splitIndicator = 'chevron-down-line';

	/**
	 * Indicates if the button is disabled.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ attribute: 'disabled', mode: 'boolean' }) disabled = false;

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
