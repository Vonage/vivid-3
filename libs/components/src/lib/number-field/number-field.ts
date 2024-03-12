import { NumberField as FastNumberField} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Shape} from '../enums';
import {
	type ErrorText,
	errorText,
	type FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
	Localized,
} from '../../shared/patterns';
import {AffixIcon} from '../../shared/patterns';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';

export type NumberFieldAppearance = Extract<Appearance, Appearance.Fieldset | Appearance.Ghost>;
export type NumberFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

const STEP_DIRECTION = {
	up: 1,
	down: -1
};

const PROXY_REFLECTED_ATTRIBUTES = {
	max: true,
	min: true
};
function makeStep(element: NumberField, direction: number) {
	const value = parseFloat(element.value);
	const stepUpValue = !isNaN(value)
		? value + direction * element.step
		: element.min > 0
			? element.min
			: element.max < 0
				? element.max
				: !element.min
					? direction * element.step
					: 0;

	element.value = Number(stepUpValue.toFixed(12)).toString();
}
/**
 * @public
 * @component number-field
 * @vueModel modelValue current-value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class NumberField extends FastNumberField {
	@attr({attribute: 'increment-button-aria-label'}) incrementButtonAriaLabel: string | null = null;
	@attr({attribute: 'decrement-button-aria-label'}) decrementButtonAriaLabel: string | null = null;
	@attr appearance?: NumberFieldAppearance;
	@attr shape?: NumberFieldShape;
	@attr autoComplete?: string;

	stepChanged(_previous: number, next: number) {
		this.proxy.setAttribute('step', Number.isFinite(next) ? next.toString() : '');
	}

	override attributeChangedCallback(name:string, previous: string, next:string) {
		super.attributeChangedCallback(name, previous, next);
		if ((<any>PROXY_REFLECTED_ATTRIBUTES)[name]) {
			this.proxy.setAttribute(name, next);
		}
	}
	override stepUp() {
		makeStep(this, STEP_DIRECTION.up);
	}

	override stepDown(): void {
		makeStep(this, STEP_DIRECTION.down);
	}
}

// Hack to solve Fast bug: https://github.com/microsoft/fast/pull/6778
const numberInput = document.createElement('input');
numberInput.type = 'number';
(<any>NumberField).prototype.getValidValue = function (value: string) {
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

export interface NumberField extends AffixIcon,
	ErrorText,
	FormElement,
	FormElementCharCount,
	FormElementHelperText,
	FormElementSuccessText,
	Localized {}
applyMixinsWithObservables(NumberField, Localized, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
