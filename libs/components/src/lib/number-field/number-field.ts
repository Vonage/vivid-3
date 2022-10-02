import {applyMixins, NumberField as FastNumberField} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Density, Shape} from '../enums';
import {FormElement, formElements} from '../../shared/patterns/form-elements';
import {AffixIcon} from '../../shared/patterns';

type NumberFieldDensity = Extract<Density, Density.Normal | Density.Extended>;
type NumberFieldAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
type NumberFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for number-field
 *
 * @public
 */
@formElements
export class NumberField extends FastNumberField {
	@attr density?: NumberFieldDensity;
	@attr appearance?: NumberFieldAppearance;
	@attr shape?: NumberFieldShape;
	@attr autoComplete?: string;
}

export interface NumberField extends AffixIcon, FormElement{}
applyMixins(NumberField, AffixIcon);

