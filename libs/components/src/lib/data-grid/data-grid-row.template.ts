import { children, elements, html, slotted } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { DataGridCell } from './data-grid-cell';
import type { DataGridRow } from './data-grid-row';

function createCellItemTemplate(context: VividElementDefinitionContext) {
	const cellTag = context.tagFor(DataGridCell);
	return html`
    <${cellTag}
        cell-type="${(x) => (x.isRowHeader ? 'rowheader' : undefined)}"
        grid-column="${(_, c) => c.index + 1}"
        :rowData="${(_, c) => c.parent.rowData}"
        :columnDefinition="${(x) => x}"
				selected="${(_, c) => (c.parent.ariaSelected === 'true' ? true : null)}"
    ></${cellTag}>
`;
}

function createHeaderCellItemTemplate(context: VividElementDefinitionContext) {
	const cellTag = context.tagFor(DataGridCell);
	return html`
    <${cellTag}
        cell-type="columnheader"
        grid-column="${(_, c) => c.index + 1}"
        :columnDefinition="${(x) => x}"
    ></${cellTag}>
`;
}

export const DataGridRowTemplate = (context: VividElementDefinitionContext) => {
	const cellItemTemplate = createCellItemTemplate(context);
	const headerCellItemTemplate = createHeaderCellItemTemplate(context);
	return html<DataGridRow>`
		<template
			role="row"
			class="${(x) => (x.rowType !== 'default' ? x.rowType : '')}"
			:defaultCellItemTemplate="${cellItemTemplate}"
			:defaultHeaderCellItemTemplate="${headerCellItemTemplate}"
			${children({
				property: 'cellElements',
				filter: elements(
					'[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]'
				),
			})}
		>
			<div
				class="base ${(x) => (x.ariaSelected === 'true' ? 'selected' : '')}"
				style="grid-template-columns: ${(x) => x.gridTemplateColumns};"
			>
				<slot ${slotted('slottedCellElements')}></slot>
			</div>
		</template>
	`;
};
