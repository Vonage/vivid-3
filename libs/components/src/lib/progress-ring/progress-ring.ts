import { attr } from '@microsoft/fast-element';
import {BaseProgress} from '@microsoft/fast-foundation';
import type {Size} from '../enums';

type ProgressRingSize = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge>;

/**
 * Base class for progress-ring
 *
 * @public
 */
export class ProgressRing extends BaseProgress {
	/**
	 * Indicates the progress ring's size.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: ProgressRingSize;
}
