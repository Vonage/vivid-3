import { attr, observable } from '@microsoft/fast-element';
import { Anchor } from '../../shared/patterns/anchor';

/**
 * @public
 * @component breadcrumb-item
 */
export class BreadcrumbItem extends Anchor {
	@attr text?: string;

	/**
	 * @internal
	 */
	@observable
	separator = true;
}
