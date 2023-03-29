import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import {attr, Observable} from '@microsoft/fast-element';
import type { Popup } from '../popup/popup';
import {AffixIconWithTrailing, FormElement, formElements} from '../../shared/patterns';
import type { Appearance, Shape } from '../enums';


export type SelectAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
export type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

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

	override get displayValue(): string {
		Observable.track(this, 'displayValue');
		return this.firstSelectedOption?.getAttribute('label') ?? this.firstSelectedOption?.text ?? '';
	}
}

export interface Select extends AffixIconWithTrailing, FormElement{}
applyMixins(Select, AffixIconWithTrailing);
