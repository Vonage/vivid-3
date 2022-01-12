import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Appearance, Connotation, Shape, Size,
} from '../../core/foundation/enums.js';

/**
 * Types of badge connotation.
 *
 * @public
 */
type BadgeConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Info>;

/**
 * Types of badge appearance.
 *
 * @public
 */
type BadgeAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Soft>;

/**
 * Types of badge shape.
 *
 * @public
 */
type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of badge size.
 *
 * @public
 */
type BadgeSize = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge>;

/**
 * Base class for badge
 *
 * @public
 */
export abstract class Badge extends FoundationElement {
	/**
	 * The connotation the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: BadgeConnotation;

	/**
	 * The shape the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: BadgeShape;

	/**
	 * The appearance the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: BadgeAppearance;

	/**
	 * The size the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: BadgeSize;

	/**
	 * A decorative icon the badge should have.
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
	 * Indicates the badge's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text = '';
}
