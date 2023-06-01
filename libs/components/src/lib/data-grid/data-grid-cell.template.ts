import {html, ViewTemplate} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

const getStateClasses = ({
													 selected
												 }: DataGridCell) => classNames(
	'base',
	['selected', selected],
);

export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
        >
					<div class="${getStateClasses}">
							<slot></slot>
					${() => focusTemplate}
					</div>

        </template>
    `;
}
