import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { BreadcrumbItem } from './breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb-item';

describe('a11y: vwc-breadcrumb-item', () => {
	let element: BreadcrumbItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const wrapper = (await fixture(
			`<div role="list"><${COMPONENT_TAG}></${COMPONENT_TAG}></div>`
		)) as HTMLDivElement;
		element = wrapper.querySelector(COMPONENT_TAG) as BreadcrumbItem;
	});

	it('should pass html a11y test', async () => {
		element.href = '#';
		element.text = 'stam';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
