import {applyMixins, NumberField as FastNumberField} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Shape} from '../enums';
import type {FormElement} from '../../shared/patterns';
import {FormElementCharCount, FormElementHelperText, formElements, FormElementSuccessText} from '../../shared/patterns';
import {AffixIcon} from '../../shared/patterns';

export type NumberFieldAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
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

export interface NumberField extends AffixIcon, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(NumberField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);


