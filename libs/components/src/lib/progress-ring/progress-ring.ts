import {BaseProgress} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {Connotation} from '../enums';

type ProgressRingSize = Extract<Size, Size.Small | Size.Medium | Size.Large>;

export type ProgressRingConnotation =
	Connotation.Primary |
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
	@attr size?: ProgressRingSize;
}
