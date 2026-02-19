import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { findComposedAncestor } from '../../shared/utils/composed-dom';
import { DataGridCellRole } from '../data-grid/data-grid.options';
import type { TableHeaderCell } from './table-header-cell';

function isTableHead(el: Element): boolean {
	return (
		el.getAttribute?.('data-vvd-component') === 'table-head' ||
		(el.tagName?.toLowerCase().endsWith('-table-head') ?? false)
	);
}

export const TableHeaderCellTemplate = (
	context: VividElementDefinitionContext
) => {
	return html<TableHeaderCell>`
		<template
			tabindex="-1"
			${applyHostSemantics({
				role: (x) =>
					findComposedAncestor(x, isTableHead) !== null
						? DataGridCellRole.columnheader
						: DataGridCellRole.rowheader,
			})}
		>
			<slot></slot>
		</template>
	`;
};
