import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { BaseProgress } from '../../shared/foundation/progress/base-progress';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

export type ProgressRingConnotation =
	| Connotation.Accent
	| Connotation.Success
	| Connotation.Alert
	| Connotation.CTA;

/**
 * @public
 * @component progress-ring
 */
export class ProgressRing extends DelegatesAria(BaseProgress) {
	@attr connotation?: ProgressRingConnotation;
	@attr size?: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
}
