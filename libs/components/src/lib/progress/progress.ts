import { BaseProgress as FoundationElement} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation, Shape} from '../enums';

export type ProgressConnotation =
	Connotation.Primary |
	Connotation.Success |
	Connotation.Alert |
	Connotation.CTA |
	'pacific' |
	undefined;

export type ProgressShape =
	Shape.Rounded |
	undefined;
/**
 * Base class for progress
 *
 * @public
 */
export class Progress extends FoundationElement {
	@attr() shape: ProgressShape;
	@attr() connotation: ProgressConnotation;
	@attr({mode: 'boolean'}) reverse = false;
}

