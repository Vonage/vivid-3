import {html, ViewTemplate, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../icon/icon';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole, DataGridCellSortStates} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

function shouldShowAscendingSortIcon<T extends DataGridCell>(x: T): boolean {
	return x.cellType === 'columnheader' &&
		(x.ariaSort === DataGridCellSortStates.none || x.ariaSort === DataGridCellSortStates.ascending);
}
function shouldShowDescendingSortIcon<T extends DataGridCell>(x: T): boolean {
	return x.cellType === 'columnheader' &&
		(x.ariaSort === DataGridCellSortStates.none || x.ariaSort === DataGridCellSortStates.descending);
}
function shouldShowSortIcons<T extends DataGridCell>(x: T): boolean {
	return x.cellType === 'columnheader' && x.ariaSort !== null && x.ariaSort !== DataGridCellSortStates.other;
}

function renderSortIcons<T extends DataGridCell>(c: ElementDefinitionContext) {
	const iconTag = c.tagFor(Icon);
	return html<T>`
			${when(shouldShowSortIcons, html<T>`
				<div class="sort-icons-wrapper">
					${when(shouldShowAscendingSortIcon, html<T>`
									<${iconTag} class="sort-icon-up" name="chevron-up-line"></${iconTag}>
								`)}
					${when(shouldShowDescendingSortIcon, html<T>`
									<${iconTag} class="sort-icon-down" name="chevron-down-line"></${iconTag}>
								`)}
				</div>
			`)}
		`;
}

function handleClick<T extends DataGridCell>(x: T) {
	if (x.cellType === 'columnheader' && x.ariaSort !== null) {
		x.$emit('sort',
			{columnDataKey: x.columnDefinition ? x.columnDefinition.columnDataKey : x.innerText, sortDirection: x.ariaSort});
	}
}
export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
						@click="${handleClick}"
        >
					<div class="base">
							<slot></slot>
							${() => focusTemplate}
							${_ => renderSortIcons(context)}
					</div>

        </template>
    `;
}
