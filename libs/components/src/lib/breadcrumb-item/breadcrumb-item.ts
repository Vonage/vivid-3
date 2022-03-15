import {observable} from '@microsoft/fast-element';
import {TextAnchor} from '../text-anchor/text-anchor';

/**
 * Base class for breadcrumb-item
 *
 * @public
 */
export class BreadcrumbItem extends TextAnchor {
	@observable
		separator: boolean = true;

	constructor() {
		super();
	}
}
