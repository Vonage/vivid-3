import {BreadcrumbItem as FastBreadcrumbItem} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for breadcrumb-item
 *
 * @public
 */
export class BreadcrumbItem extends FastBreadcrumbItem {
	@attr	text: string;

	constructor() {
		super();
	}
}
