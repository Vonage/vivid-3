import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Linkable } from '../../shared/patterns/linkable';

/**
 * @public
 * @component breadcrumb-item
 */
export class BreadcrumbItem extends Linkable(VividElement) {
	@attr text?: string;

	/**
	 * @internal
	 */
	@observable
	separator = true;
}
