import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

import type {
	Appearance, Connotation, Density, Shape,
} from '../enums.js';

/**
 * Types of badge connotation.
 *
 * @public
 */
type BadgeConnotation = Extract<Connotation,
| Connotation.Accent
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
Appearance.Filled | Appearance.Duotone | Appearance.Subtle>;

/**
 * Types of badge shape.
 *
 * @public
 */
type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of badge density.
 *
 * @public
 */
type BadgeDensity = Extract<Density, Density.Condensed | Density.Normal | Density.Extended>;

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
	@attr density?: BadgeDensity;

	/**
	 * Indicates the badge's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}

export interface Badge extends AffixIconWithTrailing {}
applyMixins(Badge, AffixIconWithTrailing);
