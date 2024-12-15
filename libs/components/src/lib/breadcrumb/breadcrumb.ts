import { observable } from '@microsoft/fast-element';
import { BreadcrumbItem } from '../breadcrumb-item/breadcrumb-item';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component breadcrumb
 * @slot - Default slot.
 */
export class Breadcrumb extends VividElement {
	/**
	 * @internal
	 */
	@observable
	slottedBreadcrumbItems?: HTMLElement[];

	/**
	 * @internal
	 */
	slottedBreadcrumbItemsChanged(
		_: HTMLElement[] | undefined,
		newItems: HTMLElement[] | undefined
	) {
		if (newItems) {
			newItems.forEach((item, index) => {
				const itemIsLastNode = index === newItems.length - 1;

				this.setItemSeparator(item, itemIsLastNode);
				this.setAriaCurrent(item, itemIsLastNode);
			});
		}
	}

	private setItemSeparator(item: HTMLElement, isLastNode: boolean) {
		if (item instanceof BreadcrumbItem) {
			(item as BreadcrumbItem).separator = !isLastNode;
		}
	}

	/**
	 * Finds href on childnodes in the light DOM or shadow DOM.
	 * We look in the shadow DOM because we insert an anchor when breadcrumb-item has an href.
	 */
	private findChildWithHref(node: HTMLElement): HTMLElement | null {
		if (node.childElementCount > 0) {
			return node.querySelector('a[href]');
		} else if (node.shadowRoot) {
			return node.shadowRoot!.querySelector('a[href]');
		} else return null;
	}

	/**
	 *  Sets ARIA Current for the current node
	 * If child node with an anchor tag and with href is found then set aria-current to correct value for the child node,
	 * otherwise apply aria-current to the host element, with an href
	 */
	private setAriaCurrent(item: HTMLElement, isLastNode: boolean) {
		const childNodeWithHref: HTMLElement | null = this.findChildWithHref(item);

		if (childNodeWithHref !== null) {
			isLastNode
				? childNodeWithHref.setAttribute('aria-current', 'page')
				: childNodeWithHref.removeAttribute('aria-current');
		}
	}
}
