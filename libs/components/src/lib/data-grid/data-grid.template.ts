import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { DataGrid } from './data-grid';

const getClasses = (_: DataGrid) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#DataGrid} component.
 *
 * @param context
 * @public
 */
export const DataGridTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<DataGrid> = (context: ElementDefinitionContext) => html` <span
	class="${getClasses}"
	>${context.name}
</span>`;
