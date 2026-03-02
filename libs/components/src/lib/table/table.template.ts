import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Table } from './table';

export const TableTemplate = (context: VividElementDefinitionContext) => {
	return html<Table>`
		<template role="table">
			<div part="inner-container" class="table-inner-container">
				<div part="content" class="table-content">
					<slot></slot>
				</div>
			</div>
		</template>
	`;
};
