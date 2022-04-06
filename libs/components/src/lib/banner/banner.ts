import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for banner
 *
 * @public
 */
export class Banner extends FoundationElement {
	@attr({mode: 'boolean'}) dismissible = false;
	@attr({mode: 'boolean'}) open = false;
	@attr({mode: 'fromView'}) role = 'status';
	@attr({mode: 'fromView'}) override ariaLive = 'polite';
}
