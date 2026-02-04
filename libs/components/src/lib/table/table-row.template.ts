import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { TableRow } from './table-row';

export const TableRowTemplate = (context: VividElementDefinitionContext) => {
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
