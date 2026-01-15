import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { TableHead } from './table-head';

export const TableHeadTemplate = (
	context: VividElementDefinitionContext
) => {
	return html<TableHead>`
		<template>
			<slot></slot>
		</template>
	`;
};

