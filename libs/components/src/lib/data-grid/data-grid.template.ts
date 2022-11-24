import {
	children,
	elements,
	html
} from '@microsoft/fast-element';
import type {DataGrid, ElementDefinitionContext} from '@microsoft/fast-foundation';
import type {ViewTemplate} from '@microsoft/fast-element';
import {DataGridRow} from './data-grid-row';

/**
 * Options for data grid templates.
 *
 * @public
 */
export interface DataGridOptions extends ElementDefinitionContext {
	dataGridRow: any;
}

/**
 * @param options
 */
function rowItemTemplate<T extends DataGridRow>(
	options: DataGridOptions
): ViewTemplate<T> {
	const rowTag = options.tagFor(options.dataGridRow);
	return html<T>`
	  <${rowTag}
				:selectable="${(_, c) => c.parent.selectableRows}"
			  :rowData="${x => x}"
			  :cellItemTemplate="${(_, c) => c.parent.cellItemTemplate}"
			  :headerCellItemTemplate="${(_, c) => c.parent.headerCellItemTemplate}"
	  ></${rowTag}>
	`;
}

/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGrid} component using
 * the provided prefix.
 *
 * @param options
 * @public
 */
export function dataGridTemplate<T extends DataGrid>(
	options: DataGridOptions
): ViewTemplate<T> {
	options.dataGridRow  = options.dataGridRow ?? DataGridRow;
	const rowTag = options.tagFor(options.dataGridRow);
	return html<T>`
	  <template
			  role="grid"
			  tabindex="0"
			  :rowElementTag="${rowTag}"
			  :defaultRowItemTemplate="${rowItemTemplate(options)}"
			  ${children({
				  property: "rowElements",
				  filter: elements("[role=row]"),
			  })}
	  >
		  <slot></slot>
	  </template>
	`;
}
