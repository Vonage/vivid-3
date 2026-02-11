import { html, when } from '@microsoft/fast-element';
import { classNames, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import {
	DataGridCellRole,
	DataGridCellSortStates,
	DataGridCellTypes,
} from './data-grid.options';
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

function calculateAriaSelectedValue(x: DataGridCell) {
	if (x._selectable && x.selected) return 'true';

	if (x._selectable && !x.selected) return 'false';

	return null;
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

function shouldAnnounceSortState(x: DataGridCell): boolean {
	return (
		x.cellType === DataGridCellTypes.columnHeader &&
		x.sortDirection !== undefined
	);
}

function getSortStateKey(x: DataGridCell): DataGridCellSortStates {
	return x.sortDirection ?? DataGridCellSortStates.none;
}

function getLocalizedSortStatus(x: DataGridCell): string {
	const direction = getSortStateKey(x);
	const sortStatus = x.locale.dataGrid.cell.sortStatus;
	return sortStatus?.[direction];
}

function getLocalizedSortInstruction(x: DataGridCell): string {
	const direction = getSortStateKey(x);
	const sortInstruction = x.locale.dataGrid.cell.sortInstruction;
	return sortInstruction?.[direction];
}

function getSortAnnouncement(x: DataGridCell): string {
	return [getLocalizedSortStatus(x), getLocalizedSortInstruction(x)]
		.filter((part) => !!part)
		.join(' ')
		.trim();
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
			${applyHostSemantics({
				role: (x) => DataGridCellRole[x.cellType] ?? DataGridCellRole.default,
				ariaSelected: calculateAriaSelectedValue,
				ariaSort: (x) => x.sortDirection ?? null,
			})}
			@click="${(x, c) => x._handleInteraction(c.event as MouseEvent)}"
			@keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
		>
			<div
				class="${getBaseClasses}"
				role="${(x) => (shouldShowSortIcons(x) ? 'button' : undefined)}"
			>
				${(x) =>
					x.selected
						? html`<${visuallyHiddenTagName}
								data-announcement="selection"
							>
								${(x) => x.locale.dataGrid.cell.selected}
							</${visuallyHiddenTagName}>`
						: null}
				<slot></slot>
				${when(
					shouldShowSortIcons,
					html`<${visuallyHiddenTagName}
							data-announcement="button-role"
						>
							${(x: DataGridCell) => x.locale.dataGrid.cell.button}
						</${visuallyHiddenTagName}>
					`
				)}
				${when(
					shouldAnnounceSortState,
					html`<${visuallyHiddenTagName}
							aria-live="polite"
							data-announcement="sort-state"
						>
							${getSortAnnouncement}
						</${visuallyHiddenTagName}>`
				)}
				${(_) => renderSortIcons(context)}
			</div>
			<slot name="filter"></slot>
		</template>
	`;
};
