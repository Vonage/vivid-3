import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { DataGridCellRole } from '../data-grid/data-grid.options';
import type { TableHeaderCell } from './table-header-cell';
import { tableHeadName } from './table-head';

export const TableHeaderCellTemplate = (
	context: VividElementDefinitionContext
) => {
	const tableHeadTag = context.tagForNonDependency(tableHeadName);

	return html<TableHeaderCell>`
		<template
			tabindex="-1"
			${applyHostSemantics({
				role: (x) =>
					x.closest(tableHeadTag) !== null
						? DataGridCellRole.columnheader
						: DataGridCellRole.rowheader,
			})}
		>
			<slot></slot>
		</template>
	`;
};
