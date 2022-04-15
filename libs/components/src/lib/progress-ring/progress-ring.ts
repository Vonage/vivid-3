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
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr size?: ProgressRingSize;
}
