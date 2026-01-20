import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import tableStyles from './table.scss?inline';
import tableHeadStyles from './table-head.scss?inline';
import tableBodyStyles from './table-body.scss?inline';
import tableRowStyles from './table-row.scss?inline';
import tableHeaderCellStyles from './table-header-cell.scss?inline';
import tableCellStyles from './table-cell.scss?inline';
import { Table } from './table';
import { TableTemplate } from './table.template';
import { TableHead } from './table-head';
import { TableHeadTemplate } from './table-head.template';
import { TableBody } from './table-body';
import { TableBodyTemplate } from './table-body.template';
import { TableRow } from './table-row';
import { TableRowTemplate } from './table-row.template';
import { TableHeaderCell } from './table-header-cell';
import { TableHeaderCellTemplate } from './table-header-cell.template';
import { TableCell } from './table-cell';
import { TableCellTemplate } from './table-cell.template';

/**
 * @internal
 */
export const tableCellDefinition = defineVividComponent(
	'table-cell',
	TableCell,
	TableCellTemplate,
	[],
	{
		styles: tableCellStyles,
	}
);

/**
 * @internal
 */
export const tableHeaderCellDefinition = defineVividComponent(
	'table-header-cell',
	TableHeaderCell,
	TableHeaderCellTemplate,
	[tableCellDefinition],
	{
		styles: tableHeaderCellStyles,
	}
);

/**
 * @internal
 */
export const tableRowDefinition = defineVividComponent(
	'table-row',
	TableRow,
	TableRowTemplate,
	[tableCellDefinition, tableHeaderCellDefinition],
	{
		styles: tableRowStyles,
	}
);

/**
 * @internal
 */
export const tableBodyDefinition = defineVividComponent(
	'table-body',
	TableBody,
	TableBodyTemplate,
	[tableRowDefinition],
	{
		styles: tableBodyStyles,
	}
);

/**
 * @internal
 */
export const tableHeadDefinition = defineVividComponent(
	'table-head',
	TableHead,
	TableHeadTemplate,
	[tableRowDefinition],
	{
		styles: tableHeadStyles,
	}
);

/**
 * @internal
 */
export const tableDefinition = defineVividComponent(
	'table',
	Table,
	TableTemplate,
	[tableHeadDefinition, tableBodyDefinition],
	{
		styles: tableStyles,
	}
);

/**
 * Registers the table element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDataTable = createRegisterFunction(tableDefinition);

export {
	Table as VwcTableElement,
	TableHead as VwcTableHeadElement,
	TableBody as VwcTableBodyElement,
	TableRow as VwcTableRowElement,
	TableHeaderCell as VwcTableHeaderCellElement,
	TableCell as VwcTableCellElement,
};

