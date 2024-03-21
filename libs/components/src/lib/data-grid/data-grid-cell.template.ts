import { html, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import { DataGridCellRole, DataGridCellSortStates } from './data-grid.options';
import type { DataGridCell } from './data-grid-cell';

function shouldShowSortIcons<T extends DataGridCell>(x: T): boolean {
	if (x.columnDefinition) {
		x.ariaSort = !x.columnDefinition.sortable
			? null
			: x.columnDefinition.sortDirection
			? x.columnDefinition.sortDirection
			: DataGridCellSortStates.none;
	}
	return (
		x.cellType === 'columnheader' &&
		x.ariaSort !== null &&
		x.ariaSort !== DataGridCellSortStates.other
	);
}

function getSortIcon<T extends DataGridCell>(x: T): string {
	return x.ariaSort === DataGridCellSortStates.ascending
		? 'sort-asc-solid'
		: x.ariaSort === DataGridCellSortStates.descending
		? 'sort-desc-solid'
		: 'sort-solid';
}
function renderSortIcons<T extends DataGridCell>(c: ElementDefinitionContext) {
	const iconTag = c.tagFor(Icon);
	return html<T>`
		${when(
			shouldShowSortIcons,
			html<T>`
				<${iconTag} class="header-icon" name="${getSortIcon}"></${iconTag}>
			`
		)}
	`;
}

function handleKeyDown<T extends DataGridCell>(x: T, e: KeyboardEvent) {
	if (e.key === keyEnter || e.key === keySpace) {
		x._handleInteraction();
	}
	return true;
}

export function DataGridCellTemplate<T extends DataGridCell>(
	context: ElementDefinitionContext
): ViewTemplate<T> {
	return html<T>`
		<template
			tabindex="-1"
			role="${(x) => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
			@click="${(x) => x._handleInteraction()}"
			@keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
		>
			<div class="base">
				<slot></slot>
				${(_) => renderSortIcons(context)}
			</div>
		</template>
	`;
}
