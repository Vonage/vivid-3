import { fixture } from '@vivid-nx/shared';
import { DataGrid } from './data-grid';
import '.';

const COMPONENT_TAG = 'vwc-data-grid';

describe('vwc-data-grid', () => {
	let element: DataGrid;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGrid);
		});
	});
});
