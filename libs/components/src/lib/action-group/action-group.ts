import { attr } from '@microsoft/fast-element';
import type { Appearance, Shape } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * Types of button appearance.
 *
 * @public
 */
export type ActionGroupAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;

/**
 * Types of button shape.
 *
 * @public
 */
export type ActionGroupShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * @public
 * @component action-group
 * @slot - Default slot.
 */
export class ActionGroup extends VividElement {
	/**
	 * The shape the ActionGroup should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: ActionGroupShape;

	/**
	 * The appearance the ActionGroup should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ActionGroupAppearance;

	/**
	 * Indicates whether action group should have padding.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: tight
	 */
	@attr({
		mode: 'boolean',
	})
	tight = false;

	@attr() override role: string | null = null;
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
}
