import { attr } from '@microsoft/fast-element';
import type { Connotation, ConnotationDecorative, Shape } from '../enums';
import { BaseProgress } from '../../shared/foundation/progress/base-progress';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

export type ProgressConnotation =
	| Connotation.Accent
	| Connotation.Success
	| Connotation.Alert
	| Connotation.CTA
	| ConnotationDecorative.Pacific;

export type ProgressShape = Shape.Rounded | Shape.Sharp;

/**
 * @public
 * @component progress
 */
export class Progress extends DelegatesAria(BaseProgress) {
	/**
	 * Sets the border radius
	 *
	 * @public
	 * HTML Attribute: shape
	 */
	@attr() shape?: ProgressShape;

	/**
	 * Sets the connotation
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr() connotation?: ProgressConnotation;

	/**
	 * Sets the progress to show from right to left
	 *
	 * @public
	 * HTML Attribute: reverse
	 */
	@attr({ mode: 'boolean' }) reverse = false;
}
