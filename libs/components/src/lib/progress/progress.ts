import { BaseProgress as FoundationElement} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for progress
 *
 * @public
 */
export class Progress extends FoundationElement {
	@attr() connotation: string | undefined;
}
