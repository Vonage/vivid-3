import { html } from '@microsoft/fast-element';
import type { Table } from './table';

export const TableTemplate = () => {
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
