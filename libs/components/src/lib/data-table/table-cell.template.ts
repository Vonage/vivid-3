import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { DataGridCellRole } from '../data-grid/data-grid.options';
import type { TableCell } from './table-cell';

export const TableCellTemplate = (
	context: VividElementDefinitionContext
) => {
	return html<TableCell>`
		<template
			tabindex="-1"
			${applyHostSemantics({
				role: () => DataGridCellRole.default,
			})}
		>
			<slot></slot>
		</template>
	`;
};

