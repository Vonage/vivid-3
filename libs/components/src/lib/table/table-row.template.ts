import { html } from '@microsoft/fast-element';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { TableRow } from './table-row';

export const TableRowTemplate = () => {
	return html<TableRow>`
		<template
			${applyHostSemantics({
				role: 'row',
			})}
		>
			<div class="base">
				<slot></slot>
			</div>
		</template>
	`;
};
