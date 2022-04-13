import { BaseProgress } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation, ConnotationDecorative, Shape} from '../enums';

export type ProgressConnotation =
	Connotation.Primary |
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
	@attr() shape: ProgressShape | undefined;
	@attr() connotation: ProgressConnotation | undefined;
	@attr({mode: 'boolean'}) reverse = false;
}

