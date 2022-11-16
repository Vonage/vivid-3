import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIcon, FormElement } from '../shared/patterns';
import type { Appearance } from '../enums';


type SelectAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;

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
}

export interface Select extends AffixIcon, FormElement{}
applyMixins(Select, AffixIcon);
