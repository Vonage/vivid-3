import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for banner
 *
 * @public
 */
export class Banner extends FoundationElement {
	@attr({mode: 'boolean'}) dismissible = false;
}
