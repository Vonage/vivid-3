import { html, when } from '@microsoft/fast-element';
import { classNames, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import { DataGridCellRole, DataGridCellSortStates } from './data-grid.options';
import type { DataGridCell } from './data-grid-cell';

function shouldShowSortIcons(x: DataGridCell): boolean {
	return (
		x.cellType === 'columnheader' &&
		x.sortDirection !== undefined &&
		x.sortDirection !== DataGridCellSortStates.other
	);
}

function getSortIcon<T extends DataGridCell>(x: T): string {
	if (x.sortDirection === DataGridCellSortStates.ascending) {
		return 'sort-asc-solid';
	}

	if (x.sortDirection === DataGridCellSortStates.descending) {
		return 'sort-desc-solid';
	}

	return 'sort-solid';
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
	const visuallyHiddenTagName = context.tagFor(VisuallyHidden);
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
				${(x) =>
					x.ariaSelected === 'true'
						? html`<${visuallyHiddenTagName}>${(x) =>
								x.locale.dataGrid.cell.selected}</${visuallyHiddenTagName}>`
						: null}
				<slot></slot>
				${when(
					shouldShowSortIcons,
					html`<${visuallyHiddenTagName}>${(x: DataGridCell) =>
						x.locale.dataGrid.cell.button}</${visuallyHiddenTagName}>
					`
				)}
				${(_) => renderSortIcons(context)}
			</div>
		</template>
	`;
};
