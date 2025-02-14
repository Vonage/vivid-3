import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import '.';
import { Pagination } from './pagination';

const COMPONENT_TAG = 'vwc-pagination';

describe('a11y: vwc-pagination', () => {
	let element: Pagination;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Pagination;
	});

	it('should pass html a11y test', async () => {
		element.total = 20;
		element.selectedIndex = 10;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
