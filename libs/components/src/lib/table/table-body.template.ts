import { html } from '@microsoft/fast-element';
import type { TableBody } from './table-body';

export const TableBodyTemplate = () => {
	return html<TableBody>`
		<template>
			<slot></slot>
		</template>
	`;
};
