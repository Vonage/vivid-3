import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {DataGridCell} from './data-grid-cell';

export const DataGridSelectionMode = {
	none: 'none',
	singleRow: 'single-row',
	multiRow: 'multi-row',
	singleCell: 'single-cell',
	multiCell: 'multi-cell',
} as const;

function isTargetRoleHeader(target: DataGridCell) {
	return target.getAttribute('role') === 'columnheader';
}

export type ValueOf<T> = T[keyof T];

export type DataGridSelectionMode = ValueOf<typeof DataGridSelectionMode>;
/**
 * Base class for data-grid
 *
 * @public
 * @slot - Default slot.
 */
export class DataGrid extends FoundationElement {
	@attr({attribute: 'selection-mode'})
		selectionMode?: DataGridSelectionMode;

	get #selectedCells(): DataGridCell[] {
		return this.rowElements.reduce((acc, row) => {
			const rowChildren = Array.from(row.children) as DataGridCell[];
			const selectedCells = rowChildren.filter((cell: DataGridCell) => cell.selected);
			return acc.concat(selectedCells);
		}, [] as DataGridCell[]);
	}

	selectionModeChanged() {
		this.#resetSelection();
	}

	#handleClick = (e: MouseEvent) => {
		const target = e.target as DataGridCell;
		if (isTargetRoleHeader(target)) {
			return;
		}
		const {ctrlKey, shiftKey, metaKey} = e;
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell)  {

			if (this.selectionMode === DataGridSelectionMode.multiCell && (ctrlKey || shiftKey || metaKey)) {
				target.selected = !this.#selectedCells.includes(target);
			} else {
				const cacheTargetSelection = target.selected;
				this.#resetSelection();
				target.selected = !cacheTargetSelection;
			}

			if (target.selected) {
				this.#selectedCells.push(target);
			}
		}
	};

	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
	}

	#resetSelection() {
		this.#selectedCells.forEach(cell => cell.selected = false);
	}
}

