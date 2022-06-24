import {BaseProgress} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation} from '../enums';


export type ProgressRingConnotation =
	Connotation.Accent |
	Connotation.Success |
	Connotation.Alert |
	Connotation.CTA;

/**
 * Base class for progress-ring
 *
 * @public
 */
export class ProgressRing extends BaseProgress {
	@attr connotation?: ProgressRingConnotation;
	@attr density?: -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3;
}
