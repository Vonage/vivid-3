import { attr, observable } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { Anchor } from '../../shared/foundation/anchor/anchor';

/**
 * @public
 * @component breadcrumb-item
 */
export class BreadcrumbItem extends FoundationElement {
	@attr text?: string;

	/**
	 * @internal
	 */
	@observable
	separator = true;
}

export interface BreadcrumbItem extends Anchor {}
applyMixins(BreadcrumbItem, Anchor);
