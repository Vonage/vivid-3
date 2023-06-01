import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { children, elements, html, slotted } from '@microsoft/fast-element';
import { DataGridCell } from './data-grid-cell';
import type { DataGridRow } from './data-grid-row';

function createCellItemTemplate(context: ElementDefinitionContext) {
	const cellTag = context.tagFor(DataGridCell);
	return html `
    <${cellTag}
        cell-type="${x => (x.isRowHeader ? 'rowheader' : undefined)}"
        grid-column="${(_, c) => c.index + 1}"
        :rowData="${(_, c) => c.parent.rowData}"
        :columnDefinition="${x => x}"
				selected="${(_, c) => c.parent.ariaSelected === 'true' ? true : null}"
    ></${cellTag}>
`;
}

function createHeaderCellItemTemplate(context: ElementDefinitionContext) {
	const cellTag = context.tagFor(DataGridCell);
	return html `
    <${cellTag}
        cell-type="columnheader"
        grid-column="${(_, c) => c.index + 1}"
        :columnDefinition="${x => x}"
    ></${cellTag}>
`;
}

/**
 * Generates a template for the DataGridRow component using
 * the provided prefix.
 *
 * @public
 */
export const DataGridRowTemplate = (context: ElementDefinitionContext) => {
	const cellItemTemplate = createCellItemTemplate(context);
	const headerCellItemTemplate = createHeaderCellItemTemplate(context);
	return html<DataGridRow> `
        <template
            role="row"
            class="${x => (x.rowType !== 'default' ? x.rowType : '')}"
            :defaultCellItemTemplate="${cellItemTemplate}"
            :defaultHeaderCellItemTemplate="${headerCellItemTemplate}"
            ${children({
		property: 'cellElements',
		filter: elements('[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]'),
	})}
        >
            <slot ${slotted('slottedCellElements')}></slot>
        </template>
    `;
};


