import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type {
	Connotation, Layout, Shape, Size,
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
 * Types of badge layout.
 *
 * @public
 */
 type BadgeLayout = Extract<Layout,
 Layout.Filled | Layout.Outlined | Layout.Soft>;

/**
 * Types of badge shape.
 *
 * @public
 */
type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for badge
 *
 * @public
 */
export class Badge extends FoundationElement {
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
	 * The layout the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: layout
	 */
	@attr layout?: BadgeLayout;

	/**
	 * The size the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: Size;

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
