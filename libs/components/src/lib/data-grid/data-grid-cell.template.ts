import { html, when } from '@microsoft/fast-element';
import { classNames, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { DataGridCellRole, DataGridCellSortStates } from './data-grid.options';
import type { DataGridCell } from './data-grid-cell';

function shouldShowSortIcons(x: DataGridCell): boolean {
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
function renderSortIcons<T extends DataGridCell>(
	c: VividElementDefinitionContext
) {
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

export const DataGridCellTemplate = (
	context: VividElementDefinitionContext
) => {
	const getBaseClasses = (x: DataGridCell) =>
		classNames('base', ['selected', !!x.selected]);
	return html<DataGridCell>`
		<template
			tabindex="-1"
			role="${(x) => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
			@click="${(x) => x._handleInteraction()}"
			@keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
		>
			<div
				class="${getBaseClasses}"
				role="${(x) => (shouldShowSortIcons(x) ? 'button' : undefined)}"
			>
				<slot></slot>
				${(_) => renderSortIcons(context)}
			</div>
		</template>
	`;
};
