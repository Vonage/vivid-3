import { applyMixins, Select as FoundationSelect } from '@microsoft/fast-foundation';
import {attr, observable, Observable} from '@microsoft/fast-element';
import type { Popup } from '../popup/popup';
import {
	AffixIconWithTrailing,
	FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import {ErrorText, errorText} from '../../shared/patterns';
import type { Appearance, Shape } from '../enums';


export type SelectAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
export type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for select
 *
 * @public
 * @slot - Default slot.
 * @slot icon - Slot to add an icon to the select control.
 * @slot meta - Slot to add meta content to the select control.
 */
@errorText
@formElements
export class Select extends FoundationSelect {

	@attr appearance?: SelectAppearance;
	@attr shape?: SelectShape;

	_popup!: Popup;
	_anchor!: HTMLElement;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: Node[];
	@attr({mode: 'boolean', attribute: 'fixed-dropdown'}) fixedDropdown = false;

	override connectedCallback() {
		super.connectedCallback();
		this._popup.anchor = this._anchor;
	}

	override get displayValue(): string {
		Observable.track(this, 'displayValue');
		return this.firstSelectedOption?.getAttribute('label') ?? this.firstSelectedOption?.text ?? '';
	}
}

export interface Select extends AffixIconWithTrailing, FormElement, FormElementHelperText, ErrorText, FormElementSuccessText{}
applyMixins(Select, AffixIconWithTrailing, FormElementHelperText, FormElementSuccessText);
