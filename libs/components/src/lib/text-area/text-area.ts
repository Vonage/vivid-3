import { TextArea as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import {FormElement, formElements} from '../../shared/patterns/form-elements';
import type {Density} from '../enums';

type TextAreaDensity = Extract<Density, Density.Normal | Density.Extended>;

type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * Base class for text-area
 *
 * @public
 */
@formElements
export class TextArea extends FoundationElement {
	@attr density?: TextAreaDensity;
	@attr wrap?: TextAreaWrap;
}

export interface TextArea extends FormElement{}

