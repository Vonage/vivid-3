import { attr, observable } from '@microsoft/fast-element';
import { Anchor } from '../../shared/foundation/anchor/anchor';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * @public
 * @component breadcrumb-item
 */
export class BreadcrumbItem extends DelegatesAria(VividElement) {
	@attr text?: string;

	/**
	 * @internal
	 */
	@observable
	separator = true;
}

export interface BreadcrumbItem extends Anchor {}
applyMixins(BreadcrumbItem, Anchor);
