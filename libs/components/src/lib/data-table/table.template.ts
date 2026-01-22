import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Table } from './table';

export const TableTemplate = (context: VividElementDefinitionContext) => {
	return html<Table>`
		<template role="grid">
			<div class="base">
				<slot></slot>
			</div>
		</template>
	`;
};
