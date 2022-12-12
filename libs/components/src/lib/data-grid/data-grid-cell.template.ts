import {html, ViewTemplate} from '@microsoft/fast-element';
import { DataGridCellTypes } from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type { DataGridCell } from './data-grid-cell.js';

const getClasses = (_: DataGridCell) => classNames(
	'base',
	['selectable', _.selectable],
	['selected', _.selected],
	['treeview', (_.parentElement as any)?.treeview],
);

/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGridCell} component using
 * the provided prefix.
 *
 * @public
 */
export function dataGridCellTemplate<T extends DataGridCell>(): ViewTemplate<T> {
	return html<T>`
        <template
				        class="${getClasses}"
            tabindex="-1"
            role="${x => !x.cellType || x.cellType === DataGridCellTypes['default'] ? "gridcell" : x.cellType}"
        >
            <slot></slot>
        </template>
    `;
}
