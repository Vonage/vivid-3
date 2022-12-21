import { fixture } from '@vivid-nx/shared';
import { DataGrid } from './data-grid';
import type { ColumnDefinition } from '@microsoft/fast-foundation';
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

	describe('generateColumns', () => {
		const expectedColumn: ColumnDefinition[] = [
			{
				columnDataKey: 'x',
				gridColumn: '0'
			},
			{
				columnDataKey: 't',
				gridColumn: '1'
			},

		]
		const columns: ColumnDefinition[] = DataGrid.generateColumns([{x: 'y', t: 'z'}]);
		expect(columns).toEqual(expectedColumn);
	});
});
