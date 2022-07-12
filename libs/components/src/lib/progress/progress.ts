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
	@attr() shape?: ProgressShape;
	@attr() connotation?: ProgressConnotation;
	@attr({mode: 'boolean'}) reverse = false;
}

