import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import type { VVDFontFace } from '../../../../../node_modules/@vonage/vivid-tokens/dist/types/typography/font-faces';

/**
 * Types of Text connotation.
 *
 * @public
 */
type TextConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA
| Connotation.Success
| Connotation.Alert>;

/**
 * Base class for text
 *
 * @public
 */
export class Text extends FoundationElement {
	/**
	 * The connotation the Text should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TextConnotation;

	/**
		* Indicates the icon affix alignment.
		*
		* @public
		* @remarks
		* HTML Attribute: icon-trailing
		*/
	@attr({
		attribute: 'font-face',
	}) fontFace?: VVDFontFace;

	/**
		* Indicates whether text should have margins.
		*
		* @public
		* @remarks
		* HTML Attribute: tight
		*/
	@attr({
		mode: 'boolean',
	}) tight = false;
}
