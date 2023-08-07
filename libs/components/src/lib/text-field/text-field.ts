import {applyMixins, TextField as FoundationTextfield} from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';
import type {Appearance, Shape} from '../enums';
import {AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText} from '../../shared/patterns';
import {type ErrorText, errorText, type FormElement, formElements} from '../../shared/patterns';

export type TextFieldAppearance = Extract<Appearance, Appearance.Fieldset | Appearance.Ghost>;
export type TextFieldShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for text-field
 *
 * @public
 */
@errorText
@formElements
export class TextField extends FoundationTextfield {
	@attr appearance?: TextFieldAppearance;
	@attr shape?: TextFieldShape;
	@attr autoComplete?: string;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */

	@observable actionItemsSlottedContent?: HTMLElement[];
}

export interface TextField extends AffixIcon, ErrorText, FormElement, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(TextField, AffixIcon, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
