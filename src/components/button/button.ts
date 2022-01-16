import { Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size,
} from '../../core/foundation/enums.js';

/**
 * Types of button connotation.
 *
 * @public
 */
type ButtonConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Announcement
| Connotation.Info>;

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
	 * A decorative icon the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: icon
	 */
	@attr icon?: string;

	/**
	 * Indicates the icon affix alignment.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: icon-trailing
	 */
	@attr({
		mode: 'boolean',
		attribute: 'icon-trailing',
	}) iconTrailing = false;

	/**
	 * Indicates the button's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label = '';
}
