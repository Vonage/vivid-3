import {html, ViewTemplate, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../icon/icon';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

function shouldShowAscendingSortIcon(x: DataGridCell): boolean {
	return x.cellType === 'columnheader' && (x.ariaSort === 'none' || x.ariaSort === 'ascending');
}
function shouldShowDescendingSortIcon(x: DataGridCell): boolean {
	return x.cellType === 'columnheader' && (x.ariaSort === 'none' || x.ariaSort === 'descending');
}
export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	const iconTag = context.tagFor(Icon);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
        >
					<div class="base">
							<slot></slot>
					${() => focusTemplate}
						${when(shouldShowAscendingSortIcon, html<T>`
							<${iconTag} class="sort-icon-up" name="chevron-up-line"></${iconTag}>
						`)}
						${when(shouldShowDescendingSortIcon, html<T>`
							<${iconTag} class="sort-icon-down" name="chevron-down-line"></${iconTag}>
						`)}
					</div>

        </template>
    `;
}
