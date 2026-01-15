import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { TableBody } from './table-body';

export const TableBodyTemplate = (
	context: VividElementDefinitionContext
) => {
	return html<TableBody>`
		<template>
			<slot></slot>
		</template>
	`;
};

