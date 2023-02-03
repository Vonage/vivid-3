import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { children, elements, html } from '@microsoft/fast-element';
import { DataGridRow } from './data-grid-row';
import type { DataGrid } from './data-grid';

function createRowItemTemplate(context: ElementDefinitionContext)  {
	const rowTag = context.tagFor(DataGridRow);
	return html `
    <${rowTag}
        :rowData="${x => x}"
        :cellItemTemplate="${(_, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(_, c) => c.parent.headerCellItemTemplate}"
    ></${rowTag}>
`;
}
/**
 * Generates a template for the {@link @microsoft/fast-foundation#DataGrid} component using
 * the provided prefix.
 *
 * @public
 */
export const DataGridTemplate = (context: ElementDefinitionContext) => {
	const rowItemTemplate = createRowItemTemplate(context);
	const rowTag = context.tagFor(DataGridRow);
	return html<DataGrid> `
        <template
            role="grid"
            tabindex="0"
            :rowElementTag="${() => rowTag}"
            :defaultRowItemTemplate="${rowItemTemplate}"
            ${children({
		property: 'rowElements',
		filter: elements('[role=row]'),
	})}
        >
            <slot></slot>
        </template>
    `;
};
