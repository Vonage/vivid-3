import {
	children,
	elements,
	html,
	ref,
	slotted,
	when
} from '@microsoft/fast-element';
import {classNames} from '@microsoft/fast-web-utilities';
import type { ColumnDefinition } from '@microsoft/fast-foundation';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { DataGridRow } from './data-grid-row.js';

/**
 * Options for data grid cells.
 *
 * @public
 */
export interface CellItemTemplateOptions {
	dataGridCell: any;
	tagFor?: (element: any) => string;
}

/**
 * @param options
 */
function getCellTag(options: CellItemTemplateOptions) {
	return options.tagFor?.(options.dataGridCell) || options.dataGridCell;
}

function getGridColumnIndex(_: any, c: { index: number; parent: any }) {
	return c.parent.treeViewProperty ? null : c.index + 1;
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
        grid-column="${getGridColumnIndex}"
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
	const cellTag = getCellTag(options);
	return html<ColumnDefinition, T>`
    <${cellTag}
        cell-type="columnheader"
        grid-column="${getGridColumnIndex}"
        :columnDefinition="${x => x}"
    ></${cellTag}>
`;
}

const getClasses = (_: DataGridRow) => classNames(
	'base',
	['selected', _.selected],
	['expanded', _.expanded]
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
        <template style="grid-template-columns: ${getGridTemplateColumns}"
				  class="${getClasses}"
				  role="row"
				  	:treeview="${x => Boolean(x.treeViewProperty)}"
		            :defaultCellItemTemplate="${cellItemTemplate(options)}"
		            :defaultHeaderCellItemTemplate="${headerCellItemTemplate(options)}"
		            ${children({
		property: 'cellElements',
		filter: elements(
			'[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]'
		),
	})}
        >
		${when(x => x.treeViewProperty, html<T>`
			<div><vwc-button size="condensed" @click="${x => x.toggleTreeView()}" icon="${x => getTreeViewIcon(x)}"></vwc-button></div>`)}
		<slot ${slotted('slottedCellElements')}></slot>
		${when(x => x.treeViewOpen, html<T>`<div><vwc-data-grid id="sub-grid" ${ref<any>('subGrid')}></vwc-data-grid></div>`)}
		${when(x => x.expanded, getExpandedRowTemplate())}
        </template>
    `;
}

const TREEVIEW_ICON = {
	'open': 'chevron-down-solid',
	'closed': 'chevron-right-solid'
};

function getTreeViewIcon({treeViewOpen}: DataGridRow) {
	return treeViewOpen ? TREEVIEW_ICON['open'] : TREEVIEW_ICON['closed'];
}

function getExpandedRowTemplate() {
	return html`
	<div>
		${when(x => !x.expandedRowTemplate, expandedRowTemplate())}
		${when(x => x.expandedRowTemplate, customExpandedRowTemplate())}
	</div>`;
}

function expandedRowTemplate() {
	return html`<div>Hello ${x => x.rowData.name}!</div>`;
}

function customExpandedRowTemplate() {
	return html`
		<div id="custom-expansion"></div>
		${x => {setTimeout(() => x.shadowRoot.querySelector('#custom-expansion').innerHTML = x.expandedRowTemplate(x), 0); return '';}}`;
}

function getGridTemplateColumns(row: DataGridRow) {
	return `${row.columnDefinitions?.reduce((templateColumns) => {
		return `${templateColumns}${
			templateColumns === '' ? '' : ' '
		}${'1fr'}`;
	}, row.treeViewProperty ? '32px' : '')}`;
}
