import { BreadcrumbItem as FastBreadcrumbItem } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for breadcrumb-item
 *
 * @public
 */
export class BreadcrumbItem extends FastBreadcrumbItem {
	/**
	 * Indicates the breadcrumb-item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text = '';

	@attr({ mode: 'boolean' }) override separator = false;

	constructor() {
		super();
	}
}
