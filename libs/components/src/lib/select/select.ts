import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Popup } from '../popup/popup';
import { FormElement, formElements } from '../../shared/patterns';
import { AffixIcon } from '../../shared/patterns';
import type { Appearance, Shape } from '../enums';


type SelectAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for select
 *
 * @public
 */
@formElements
export class Select extends FoundationSelect {

	@attr appearance?: SelectAppearance;
	@attr shape?: SelectShape;

	_popup!: Popup;
	_anchor!: HTMLElement;

	override connectedCallback() {
		super.connectedCallback();
		this._popup.anchor = this._anchor;
	}
}

export interface Select extends AffixIcon, FormElement{}
applyMixins(Select, AffixIcon);
