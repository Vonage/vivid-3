
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { fixture } from '@vivid-nx/shared';
import { designSystem } from '../../shared/design-system';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellTemplate } from './data-grid-cell.template';

const dataGridCell = DataGridCell.compose<FoundationElementDefinition>({
	baseName: 'data-grid-cell',
	template: DataGridCellTemplate as any
});

designSystem.withPrefix('vwc').register(dataGridCell());

const COMPONENT_TAG = 'vwc-data-grid-cell';

describe('vwc-data-grid-cell', () => {
	let element: DataGridCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGridCell;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGridCell);
			expect(element.cellType).toEqual('default');
			expect(element.gridColumn).toBeUndefined();
			expect(element.rowData).toEqual(null);
			expect(element.columnDefinition).toEqual(null);
		});
	});
});
