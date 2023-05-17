import {html, ViewTemplate} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';
export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
						aria-selected="${x => x.selected}"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
        >
					<div id="focus-wrapper" class="base">
							<slot></slot>
					${() => focusTemplate}
					</div>

        </template>
    `;
}
