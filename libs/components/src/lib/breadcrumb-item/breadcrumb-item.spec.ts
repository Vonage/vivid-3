import {elementUpdated, fixture} from '@vivid-nx/shared';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb-item';

fdescribe('vwc-breadcrumb-item', () => {
	let element: BreadcrumbItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as BreadcrumbItem;
	});

	it('should be initialized as a vwc-breadcrumb-item', async () => {
		expect(element).toBeInstanceOf(BreadcrumbItem);
	});

	it('should display nothing when no prop is set', function () {
		expect(element.shadowRoot?.querySelector('.control')?.innerHTML?.trim()).toEqual('');
	});

	it('should be set as simple text when given only text', async function () {
		const breadcrumbText = 'some text';
		element.text = breadcrumbText;
		await elementUpdated(element);
		const controlElement = element.shadowRoot?.querySelector('.control') as HTMLElement;
		expect(controlElement?.textContent?.trim()).toEqual(breadcrumbText);
	});
});
