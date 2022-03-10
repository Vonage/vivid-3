import { fixture } from '@vivid-nx/shared';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb-item';

describe('vwc-breadcrumb-item', () => {
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
		expect(element.shadowRoot?.querySelector('.control')?.innerHTML).toEqual('');
	});

	it('should be set as simple text when given only text', function () {

	});
});
