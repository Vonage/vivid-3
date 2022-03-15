import {attr} from '@microsoft/fast-element';
import {TextAnchor} from '../text-anchor/text-anchor';

/**
 * Base class for breadcrumb-item
 *
 * @public
 */
export class BreadcrumbItem extends TextAnchor {
	@attr({ mode: 'boolean' }) separator = false;

	constructor() {
		super();
	}
}
