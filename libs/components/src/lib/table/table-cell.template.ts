import { html } from '@microsoft/fast-element';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { TableCell } from './table-cell';

export const TableCellTemplate = () => {
	return html<TableCell>`
		<template
			${applyHostSemantics({
				role: () => 'cell',
			})}
		>
			<div class="base">
				<slot></slot>
			</div>
		</template>
	`;
};
