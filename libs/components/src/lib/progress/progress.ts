import { BaseProgress } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation, ConnotationDecorative, Shape} from '../enums';

export type ProgressConnotation =
	Connotation.Accent |
	Connotation.Success |
	Connotation.Alert |
	Connotation.CTA |
	ConnotationDecorative.Pacific;

export type ProgressShape =
	Shape.Rounded |
	Shape.Sharp;
/**
 * Base class for progress
 *
 * @public
 */
export class Progress extends BaseProgress {
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
	@attr({mode: 'boolean'}) reverse = false;
}

