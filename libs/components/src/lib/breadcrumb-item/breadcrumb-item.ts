import { attr, observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { Anchor } from '../../shared/foundation/anchor/anchor';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';

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
