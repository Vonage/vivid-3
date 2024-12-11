import { attr } from '@microsoft/fast-element';
import type { Connotation, ConnotationDecorative, Shape } from '../enums';
import { BaseProgress } from '../../shared/foundation/progress/base-progress';

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
export class Progress extends BaseProgress {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

	/**
	 * Indicates the progress' shape.
	 *
	 * @public
	 * HTML Attribute: shape
	 */
	@attr() shape?: ProgressShape;

	/**
	 * Indicates the progress' connotation.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr() connotation?: ProgressConnotation;

	/**
	 * Indicates the progress' reverse status.
	 *
	 * @public
	 * HTML Attribute: reverse
	 */
	@attr({ mode: 'boolean' }) reverse = false;
}
