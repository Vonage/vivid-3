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
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-labelledby'}) ariaLabelledby: string | null = null;
	@attr({attribute: 'aria-describedby'}) ariaDescribedby: string | null = null;
	@attr connotation?: ProgressRingConnotation;
	@attr size?: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
}
