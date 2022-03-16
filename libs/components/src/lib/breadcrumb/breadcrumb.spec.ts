import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {BreadcrumbItem} from '../breadcrumb-item/breadcrumb-item';
import { Breadcrumb } from './breadcrumb';
import '../breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb';

fdescribe('vwc-breadcrumb', () => {
	const breadcrumbItemsTemplate = `
	  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
    <vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
    <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
    <vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
	`;

	let element: Breadcrumb;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>${breadcrumbItemsTemplate}</${COMPONENT_TAG}>`
		)) as Breadcrumb;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-breadcrumb', async () => {
			expect(element).toBeInstanceOf(Breadcrumb);
		});
	});

	it('should set separator true for all except the last item', function () {
		const itemElements = element.querySelectorAll('vwc-breadcrumb-item') as unknown as BreadcrumbItem[];

		expect(itemElements[0].separator).toEqual(true);
		expect(itemElements[1].separator).toEqual(true);
		expect(itemElements[2].separator).toEqual(true);
		expect(itemElements[3].separator).toEqual(false);
	});

	describe('aria-current', function () {
		function removeAElementFromBreadcrumbItem() {
			newItem.shadowRoot?.querySelector('a')
				?.remove();
		}
		let newItem: BreadcrumbItem;

		beforeEach(async function () {
			newItem = document.createElement('vwc-breadcrumb-item') as BreadcrumbItem;
			newItem.href = '#';
			newItem.text = 'breadcrumb';
			element.appendChild(newItem);
			await elementUpdated(element);
		});

		it('should set aria-current to last node internal a element if last node is href', async function () {
			const ariaCurrent = newItem.shadowRoot?.querySelector('a')?.getAttribute('aria-current');
			expect(ariaCurrent).toEqual('page');
		});

		it('should set aria-current to last node if last node is href and doesnt have internal a element', async function () {
			removeAElementFromBreadcrumbItem();
			element.slottedBreadcrumbItemsChanged();

			expect(newItem.ariaCurrent).toEqual('page');
		});

		it('should not set aria-current to last node if last node is not href', async function () {
			removeAElementFromBreadcrumbItem();
			newItem.removeAttribute('href');
			const ariaCurrent = newItem.getAttribute('aria-current');
			expect(ariaCurrent).toEqual(null);
		});
	});

});
