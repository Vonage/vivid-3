import { Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';

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
type ButtonAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Soft>;

/**
 * Types of button shape.
 *
 * @public
 */
type ButtonShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

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
	@attr size?: Size;

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
	/**
	 * Applies 'icon-only' class when there is no label but there is icon
	 *
	 * @public
	 * @remarks
	 */
	labelChanged(): void {
		this.iconOnly = !this.label && !!this.icon;
	}

	@observable iconOnly = false;
}
