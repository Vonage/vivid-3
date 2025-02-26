import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { DataGrid } from './data-grid';
import '.';

const COMPONENT_TAG = 'vwc-data-grid';

describe('a11y: vwc-data-grid', () => {
	let element: DataGrid;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;

		await elementUpdated(element);
	});

	it('should pass html a11y test', async () => {
		element.rowsData = [
			{ id: '1', name: 'Person 1' },
			{ id: '2', name: 'Person 2' },
		];
		await elementUpdated(element);
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
