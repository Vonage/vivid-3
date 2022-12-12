import type {FoundationElementDefinition} from '@microsoft/fast-foundation';
import '../button';
import {designSystem} from '../../shared/design-system';
import gridStyles from './data-grid.scss';
import gridSRowtyles from './data-grid-row.scss';
import gridSCelltyles from './data-grid-cell.scss';

import {dataGridTemplate} from './data-grid.template';
import {dataGridRowTemplate} from './data-grid-row.template';
import {dataGridCellTemplate} from './data-grid-cell.template';
import {DataGrid} from './data-grid';
import {DataGridRow} from './data-grid-row';
import {DataGridCell} from './data-grid-cell';

export const vividDataGrid = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid',
	template: dataGridTemplate as any,
	styles: gridStyles,
});

export const vividDataGridRow = DataGridRow.compose<FoundationElementDefinition>({
	baseName: 'data-grid-row',
	template: dataGridRowTemplate({
		dataGridCell: 'vwc-data-grid-cell',
	}) as any,
	styles: gridSRowtyles
});

export const vividDataGridCell = DataGridCell.compose<FoundationElementDefinition>({
	baseName: 'data-grid-cell',
	template: dataGridCellTemplate as any,
	styles: gridSCelltyles
});

designSystem.register(vividDataGridRow(), vividDataGrid(), vividDataGridCell());
