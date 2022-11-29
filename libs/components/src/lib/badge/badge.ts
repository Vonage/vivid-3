import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

import type {
	Appearance, Connotation, Shape,
} from '../enums.js';

/**
 * Types of badge connotation.
 *
 * 
 */
type BadgeConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA
| Connotation.Success
| Connotation.Alert
| Connotation.Warning
| Connotation.Information>;

/**
 * Types of badge appearance.
 *
 * 
 */
type BadgeAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Duotone | Appearance.Subtle>;

/**
 * Types of badge shape.
 *
 * 
 */
type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for badge
 *
 * 
 */
export class Badge extends FoundationElement {
	/**
	 * The connotation the badge should have.
	 *
	 * 
	 * 
	 * HTML Attribute: connotation
	 */
	@attr connotation?: BadgeConnotation;

	/**
	 * The shape the badge should have.
	 *
	 * 
	 * 
	 * HTML Attribute: shape
	 */
	@attr shape?: BadgeShape;

	/**
	 * The appearance the badge should have.
	 *
	 * 
	 * 
	 * HTML Attribute: appearance
	 */
	@attr appearance?: BadgeAppearance;

	/**
	 * Indicates the badge's text.
	 *
	 * 
	 * 
	 * HTML Attribute: text
	 */
	@attr text?: string;
}

export interface Badge extends AffixIconWithTrailing {}
applyMixins(Badge, AffixIconWithTrailing);
