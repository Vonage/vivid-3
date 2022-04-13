import { BaseProgress as FoundationElement} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation} from '../enums';

export type ProgressConnotation =
	Connotation.Primary |
	Connotation.Success |
	Connotation.Alert |
	Connotation.CTA |
	'pacific' |
	undefined;
/**
 * Base class for progress
 *
 * @public
 */
export class Progress extends FoundationElement {
	@attr() connotation: ProgressConnotation;
}

