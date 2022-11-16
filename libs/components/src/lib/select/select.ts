import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIcon, FormElement } from '../shared/patterns';
import type { Appearance, Shape } from '../enums';


type SelectAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for select
 *
 * @public
 */
export class Select extends FoundationSelect {
	/**
	 * Indicates the switch's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	// @attr label?: string;
	@attr appearance?: SelectAppearance;
	@attr shape?: SelectShape;
}

export interface Select extends AffixIcon, FormElement{}
applyMixins(Select, AffixIcon);
