import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {BreadcrumbItem} from '../breadcrumb-item/breadcrumb-item';
import { Breadcrumb } from './breadcrumb';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb';

describe('vwc-breadcrumb', () => {
	const breadcrumbItemsData = [
		{
			href: '#',
			text: 'bc1'
		},
		{
			text: 'bc2'
		},
		{
			href: '#',
			text: 'bc3'
		},
		{
			text: 'bc4'
		}
	];
	const breadcrumbItemsTemplate = breadcrumbItemsData.reduce((htmlStr: string, breadcrumbItemData: any) => {
		const href = breadcrumbItemData.href ? `href="${breadcrumbItemData.href}"` : '';
		const text = `text="${breadcrumbItemData.text}"`;
		htmlStr += `<vwc-breadcrumb-item ${href} ${text}></vwc-breadcrumb-item>`;
		return htmlStr;
	}, '');

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

	it('should set aria-current to last node if last node is href', async function () {
		const newItem = document.createElement('vwc-breadcrumb-item') as BreadcrumbItem;
		newItem.href = '#';
		newItem.text = 'breadcrumb';

		element.appendChild(newItem);
		await elementUpdated(element);
		const ariaCurrent = newItem.shadowRoot?.querySelector('a')?.getAttribute('aria-current');

		expect(ariaCurrent).toEqual('page');
	});
});
