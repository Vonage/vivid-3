import {
	children,
	elements,
	html,
	slotted,
} from '@microsoft/fast-element';
import {classNames} from '@microsoft/fast-web-utilities';
import type { ColumnDefinition } from '@microsoft/fast-foundation';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { DataGridRow } from './data-grid-row.js';
import {DataGridCell} from './data-grid-cell';

/**
 * Options for data grid cells.
 *
 * @public
 */
export interface CellItemTemplateOptions {
	dataGridCell: any;
	tagFor?: (element: any) => string;
}

function getCellTag(options: CellItemTemplateOptions) {
	const cellTag = options.tagFor?.(options.dataGridCell) || options.dataGridCell;
	return cellTag;
}

/**
 * @param options
 */
function cellItemTemplate<T extends DataGridRow>(
	options: CellItemTemplateOptions
): ViewTemplate<ColumnDefinition, T> {
	const cellTag = getCellTag(options);
	return html<ColumnDefinition, T>`
    <${cellTag}
        cell-type="${x => (x.isRowHeader ? 'rowheader' : undefined)}"
        grid-column="${(_, c) => c.index + 1}"
        :rowData="${(_, c) => c.parent.rowData}"
        :columnDefinition="${x => x}"
        :selectable="${(_, c) => c.parent.selectable}"
    ></${cellTag}>
`;
}

/**
 * @param options
 */
function headerCellItemTemplate<T extends DataGridRow>(
	options: CellItemTemplateOptions
): ViewTemplate<ColumnDefinition, T> {
	options.dataGridCell = options.dataGridCell ?? DataGridCell;
	const cellTag = getCellTag(options);
	return html<ColumnDefinition, T>`
    <${cellTag}
        cell-type="columnheader"
        grid-column="${(_, c) => c.index + 1}"
        :columnDefinition="${x => x}"
    ></${cellTag}>
`;
}

const getClasses = (_: DataGridRow) => classNames(
	'base',
	['selected', _.selected]
);

/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGridRow} component using
 * the provided prefix.
 *
 * @param options
 * @public
 */
export function dataGridRowTemplate<T extends DataGridRow>(
	options: CellItemTemplateOptions
): ViewTemplate<T> {
	return html<T>`
        <template class="${getClasses}"
				  role="row"
		            :defaultCellItemTemplate="${cellItemTemplate(options)}"
		            :defaultHeaderCellItemTemplate="${headerCellItemTemplate(options)}"
		            ${children({
		property: 'cellElements',
		filter: elements(
			'[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]'
		),
	})}
        >
            <slot ${slotted('slottedCellElements')}></slot>
        </template>
    `;
}
