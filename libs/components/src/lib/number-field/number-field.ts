import {applyMixins, NumberField as FastNumberField} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Shape} from '../enums';
import {type FormElement, FormElementCharCount, FormElementHelperText, formElements, FormElementSuccessText} from '../../shared/patterns';
import {AffixIcon} from '../../shared/patterns';

export type NumberFieldAppearance = Extract<Appearance, Appearance.Fieldset | Appearance.Ghost>;
export type NumberFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

const numberInput = document.createElement('input');
numberInput.type = 'number';
/**
 * Base class for number-field
 *
 * @public
 */
@formElements
export class NumberField extends FastNumberField {
	@attr appearance?: NumberFieldAppearance;
	@attr shape?: NumberFieldShape;
	@attr autoComplete?: string;
}

// Hack to solve Fast bug: https://github.com/microsoft/fast/pull/6778
(<any>NumberField).prototype.getValidValue = function (value: string) {
	// TODO::solve the validation issue with decimal numbers
	// console.log('getValidValue: ', this.isUserInput, value);
	if (!this.isUserInput) {
		numberInput.value = value;
		return numberInput.value;
	}

	if (value === '' || value === '-' || value === '.') {
		return value;
	}

	const decimalSplit = value.split('.');
	let valueSuffix = '';
	if (decimalSplit.length === 2 && decimalSplit[1] === '') {
		valueSuffix = '.';
		numberInput.value = value.slice(0, -1);
	} else {
		numberInput.value = value;
	}

	if (numberInput.value === '') {
		return this.currentValue;
	}
	return numberInput.value + valueSuffix;
};

export interface NumberField extends AffixIcon, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(NumberField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
