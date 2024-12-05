import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';

import type { Appearance, Connotation, Shape } from '../enums.js';

/**
 * Types of badge connotation.
 *
 * @public
 */
export type BadgeConnotation = Extract<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
>;

/**
 * Types of badge appearance.
 *
 * @public
 */
export type BadgeAppearance = Extract<
	Appearance,
	| Appearance.Filled
	| Appearance.Duotone
	| Appearance.Subtle
	| Appearance.SubtleLight
>;

/**
 * Types of badge shape.
 *
 * @public
 */
export type BadgeShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * @public
 * @component badge
 * @slot icon - Add an icon to the component.
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
