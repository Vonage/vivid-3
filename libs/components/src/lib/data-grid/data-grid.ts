import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {DataGridCell} from './data-grid-cell';
import type {DataGridRow} from './data-grid-row';

interface SelectionMetaData {
	target: EventTarget | null
	ctrlKey: boolean,
	shiftKey: boolean,
	metaKey: boolean
}

export const DataGridSelectionMode = {
	none: 'none',
	singleRow: 'single-row',
	multiRow: 'multi-row',
	singleCell: 'single-cell',
	multiCell: 'multi-cell',
} as const;

function isTargetRoleHeader(target: EventTarget) {
	return (target as HTMLElement).getAttribute('role') === 'columnheader';
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
			const selectedCells = rowChildren.filter((cell: DataGridCell) => cell.getAttribute('aria-selected') === 'true');
			return acc.concat(selectedCells);
		}, [] as DataGridCell[]);
	}

	selectionModeChanged() {
		this.#resetSelection();
	}

	#handleKeypress = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' || e.key === ' ') {
			this.#handleClick(e as unknown as MouseEvent);
		}
	};

	#handleClick = ({target, ctrlKey, shiftKey, metaKey}: MouseEvent) => {
		this.#handleSelection({target, ctrlKey, shiftKey, metaKey});
	};

	#handleSelection = ({target, ctrlKey, shiftKey, metaKey}: SelectionMetaData) => {
		const targetAsCell = target as DataGridCell;

		if (isTargetRoleHeader(targetAsCell)) {
			return;
		}

		if (targetAsCell.getAttribute('role') === 'gridcell') {
			if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell)  {
				if (this.selectionMode === DataGridSelectionMode.multiCell && (ctrlKey || shiftKey || metaKey)) {
					this.#setCellSelectedState(targetAsCell, !this.#selectedCells.includes(targetAsCell));
				} else {
					const cacheTargetSelection = targetAsCell.getAttribute('aria-selected') === 'true';
					this.#resetSelection();
					this.#setCellSelectedState(targetAsCell, !cacheTargetSelection);
				}
			}
		}
		if (targetAsCell.getAttribute('role') === 'row') {
			if (this.selectionMode === DataGridSelectionMode.singleRow) {
				const row = target as DataGridRow;
				const cacheTargetSelection = row?.getAttribute('aria-selected') === 'true';
				this.#resetSelection();
				row?.setAttribute('aria-selected', (!cacheTargetSelection).toString());
			}
		}
	};

	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
		this.addEventListener('keydown', this.#handleKeypress);
	}

	#setCellSelectedState = (cell: DataGridCell, selectedState: boolean) => {
		cell.setAttribute('aria-selected', selectedState.toString());
	};

	#resetSelection() {
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => this.#setCellSelectedState(cell as DataGridCell, false));
		}
		if (this.selectionMode === DataGridSelectionMode.none) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.singleRow || this.selectionMode === DataGridSelectionMode.multiRow) {
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.setAttribute('aria-selected', 'false'));
		}
	}
}

