import {html, ViewTemplate} from '@microsoft/fast-element';
import {classNames} from '@microsoft/fast-web-utilities';
import type { DataGridCell } from './data-grid-cell.js';

/**
 * Roles for the data grid cell
 *
 * @public
 */
export const DataGridCellRole = {
	columnheader: 'columnheader',
	rowheader: 'rowheader',
	default: 'gridcell',
} as const;

const getClasses = (_: DataGridCell) => classNames(
	'base',
	['selectable', _.selectable]
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
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
        >
            <slot></slot>
        </template>
    `;
}
