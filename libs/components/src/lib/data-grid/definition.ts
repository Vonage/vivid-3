import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import dataGridStyles from './data-grid.scss';
import dataGridCellStyles from './data-grid.scss';

import { DataGrid } from './data-grid';
import { DataGridTemplate as template } from './data-grid.template';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellTemplate } from './data-grid-cell.template';

export const dataGrid = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid',
	template: template as any,
	styles: dataGridStyles,
})();

export const dataGridCell = DataGridCell.compose<FoundationElementDefinition>({
	baseName: 'data-grid-cell',
	template: DataGridCellTemplate as any,
	styles: dataGridCellStyles,
});
export const dataGridElements = [dataGrid, dataGridCell];

/**
 * Registers the data-grid element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDataGrid = registerFactory(dataGridElements);
