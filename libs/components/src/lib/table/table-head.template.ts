import { html } from '@microsoft/fast-element';
import type { TableHead } from './table-head';

export const TableHeadTemplate = () => {
	return html<TableHead>`
		<template>
			<slot></slot>
		</template>
	`;
};
