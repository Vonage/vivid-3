import {applyMixins, NumberField as FastNumberField} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Shape} from '../enums';
import {type FormElement, FormElementCharCount, FormElementHelperText, formElements, FormElementSuccessText} from '../../shared/patterns';
import {AffixIcon} from '../../shared/patterns';

export type NumberFieldAppearance = Extract<Appearance, Appearance.Fieldset | Appearance.Ghost>;
export type NumberFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

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
	function isValueInvalidValid(value: string): boolean {
		return decimalSplit.length > 3 || !!value.match(/\.\.+/gm) || isNaN(parseFloat(validValue));
	}

	function removePossibleTrailingExtraDecimal(value: string): string {
		if (decimalSplit.length === 3 && decimalSplit[2] === '') {
			value = decimalSplit[0] + '.' + decimalSplit[1];
		}
		return value;
	}

	function addLeadingOrTrailingDecimal(value: string): string {
		if (decimalSplit.length === 2) {
			if (decimalSplit[1] === '') {
				value += '.';
			} else if (decimalSplit[0] === '') {
				value = '.' + decimalSplit[1];
			}
		}
		return value;
	}

	function setInMinMaxBoundaries(value: string, min: number, max: number) {
		const numericValue: number = parseFloat(parseFloat(value).toPrecision(12));
		const minValue: number = min !== undefined ? min : numericValue;
		const maxValue: number = max !== undefined ? max : numericValue;

		if (numericValue < minValue) {
			value = minValue.toString();
		} else if (numericValue > maxValue) {
			value = maxValue.toString();
		} else {
			value = numericValue.toString();
		}

		return value;
	}

	if (value === '-') {
		return '-';
	}

	const decimalSplit = value.split('.');
	let validValue: string = value;

	if (isValueInvalidValid(validValue)) {
		return '';
	}

	validValue = removePossibleTrailingExtraDecimal(validValue);

	validValue = setInMinMaxBoundaries(validValue, this.min, this.max);

	validValue = addLeadingOrTrailingDecimal(validValue);

	return validValue;
};

export interface NumberField extends AffixIcon, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(NumberField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
