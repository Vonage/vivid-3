import { TextArea as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import {FormElement, formElements} from '../../shared/patterns';

type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * Base class for text-area
 *
 * @public
 */
@formElements
export class TextArea extends FoundationElement {
	@attr wrap?: TextAreaWrap;
}

export interface TextArea extends FormElement{}

