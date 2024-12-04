import {
	children,
	elements,
	ExecutionContext,
	html,
	slotted,
} from '@microsoft/fast-element';
import { DataGridRow } from './data-grid-row';
import type { DataGrid } from './data-grid';
import { DataGridSelectionMode } from './data-grid';
import { DataGridRowTypes, GenerateHeaderOptions } from './data-grid.options';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

function createRowItemTemplate(context: VividElementDefinitionContext) {
	const rowTag = context.tagFor(DataGridRow);
	return html`
    <${rowTag}
        :rowData="${(x) => x}"
        :cellItemTemplate="${(_, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(_, c) => c.parent.headerCellItemTemplate}"
    ></${rowTag}>
`;
}

function getMultiSelectAriaState(x: DataGrid) {
	return x.selectionMode === undefined ||
		x.selectionMode === DataGridSelectionMode.none
		? null
		: x.selectionMode.includes('multi')
		? 'true'
		: 'false';
}

function setHeaderRow(x: DataGrid) {
	if (x.columnDefinitions === null) {
		const headerRow = x.querySelector(
			'[cell-type="columnheader"]'
		)?.parentElement;
		if (headerRow) {
			const rowType =
				x.generateHeader === GenerateHeaderOptions.sticky
					? DataGridRowTypes.stickyHeader
					: DataGridRowTypes.header;
			headerRow.setAttribute('row-type', rowType);
		}
	}
}

function handleColumnSort<T extends DataGrid>(
	_: T,
	{ event }: ExecutionContext
) {
	event.stopPropagation();
}

export const DataGridTemplate = (context: VividElementDefinitionContext) => {
	const rowItemTemplate = createRowItemTemplate(context);
	const rowTag = context.tagFor(DataGridRow);
	return html<DataGrid>`
		<template
			aria-multiselectable="${getMultiSelectAriaState}"
			role="grid"
			tabindex="0"
			@sort="${handleColumnSort}"
			:rowElementTag="${() => rowTag}"
			:defaultRowItemTemplate="${rowItemTemplate}"
			${children({
				property: 'rowElements',
				filter: elements('[role=row]'),
			})}
		>
			<div class="base">
				${setHeaderRow}
				<slot ${slotted('slottedRowElements')}></slot>
			</div>
		</template>
	`;
};
