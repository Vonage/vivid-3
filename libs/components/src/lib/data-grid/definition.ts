import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { visuallyHiddenDefinition } from '../visually-hidden/definition';
import dataGridStyles from './data-grid.scss?inline';
import dataGridRowStyles from './data-grid-row.scss?inline';
import dataGridCellStyles from './data-grid-cell.scss?inline';
import { DataGrid } from './data-grid';
import { DataGridTemplate } from './data-grid.template';
import { DataGridRow } from './data-grid-row';
import { DataGridRowTemplate } from './data-grid-row.template';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellTemplate } from './data-grid-cell.template';

/**
 * @internal
 */
export const dataGridCellDefinition = defineVividComponent(
	'data-grid-cell',
	DataGridCell,
	DataGridCellTemplate,
	[iconDefinition, visuallyHiddenDefinition],
	{
		styles: dataGridCellStyles,
	}
);

/**
 * @internal
 */
export const dataGridRowDefinition = defineVividComponent(
	'data-grid-row',
	DataGridRow,
	DataGridRowTemplate,
	[dataGridCellDefinition],
	{
		styles: dataGridRowStyles,
	}
);

/**
 * @internal
 */
export const dataGridDefinition = defineVividComponent(
	'data-grid',
	DataGrid,
	DataGridTemplate,
	[dataGridRowDefinition],
	{
		styles: dataGridStyles,
	}
);

/**
 * Registers the data-grid element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDataGrid = createRegisterFunction(dataGridDefinition);

export {
	DataGrid as VwcDataGridElement,
	DataGridRow as VwcDataGridRowElement,
	DataGridCell as VwcDataGridCellElement,
};
