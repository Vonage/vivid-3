import { html } from '@microsoft/fast-element';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { TableSortingButton } from './table-sorting-button';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

export const TableSortingButtonTemplate = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return html<TableSortingButton>`
		<template
			@click="${(x) => x.toggleSort()}"
			${applyHostSemantics({
				role: 'button',
			})}
		>
			<button>
				${(x) => {
					switch (x.direction) {
						case 'asc':
							return html`<${iconTag} name="sort-asc-line"></${iconTag}>`;
						case 'desc':
							return html`<${iconTag} name="sort-desc-line"></${iconTag}>`;
						default:
							return html`<${iconTag} name="sort-line"></${iconTag}>`;
					}
				}}
			</button>
		</template>
	`;
};
