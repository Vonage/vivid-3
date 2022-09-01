import {applyMixins, TextField as FoundationTextfield} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Appearance, Density, Shape} from '../enums';
import {AffixIcon} from '../../shared/patterns';
import {FormElement, formElements} from '../../shared/patterns/form-elements';

type TextFieldDensity = Extract<Density, Density.Normal | Density.Extended>;
type TextFieldAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;
type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for text-field
 *
 * @public
 */
@formElements
export class TextField extends FoundationTextfield {
	@attr density?: TextFieldDensity;
	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@attr autoComplete?: string;
}

export interface TextField extends AffixIcon, FormElement{}
applyMixins(TextField, AffixIcon);


