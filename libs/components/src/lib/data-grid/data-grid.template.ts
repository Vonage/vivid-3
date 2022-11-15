import {children, elements, html} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type {DataGrid} from './data-grid';
import {DataGridRow} from './data-grid-row';

const getClasses = (_: DataGrid) => classNames('control');

function rowItemTemplate(context: ElementDefinitionContext): ViewTemplate<any, DataGrid> {
	const rowTag = context.tagFor(DataGridRow);
	return html<any, DataGrid>`
			${(_, c) => { console.log("Parent: ", c.parent); }}
    <${rowTag}
        :rowData="${x => x}"
        :cellItemTemplate="${(_, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(_, c) => c.parent.headerCellItemTemplate}"
    ></${rowTag}>
`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#DataGrid} component.
 *
 * @param context
 * @public
 */
export const DataGridTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<DataGrid> = (context: ElementDefinitionContext) => {
	const rowTag = context.tagFor(DataGridRow);
	return html<DataGrid>`
	  <div class="${getClasses}" 
	       role="grid" 
	       tabindex="0" 
	       :rowElementTag="${() => rowTag}" 
	       ${children({
			       property: 'rowElements', filter: elements('[role=row]')
				 })}
		 		:defaultRowItemTemplate="${rowItemTemplate(context)}"
	  >
		  <slot></slot>
	  </div>
	  ;
	`;
};
