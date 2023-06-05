import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr, DOM} from '@microsoft/fast-element';
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

	get #selectedRows(): DataGridRow[] {
		return this.rowElements.filter((row: HTMLElement) => row.getAttribute('aria-selected') === 'true') as DataGridRow[];
	}

	get #selectedCells(): DataGridCell[] {
		return this.rowElements.reduce((acc, row) => {
			const rowChildren = Array.from(row.children) as DataGridCell[];
			const selectedCells = rowChildren.filter((cell: DataGridCell) => cell.getAttribute('aria-selected') === 'true');
			return acc.concat(selectedCells);
		}, [] as DataGridCell[]);
	}

	selectionModeChanged(oldValue: DataGridSelectionMode, newValue: DataGridSelectionMode) {
		if (oldValue === undefined && newValue !== DataGridSelectionMode.none) {
			DOM.queueUpdate(this.#initSelections); return;
		}
		this.#resetSelection();
	}

	#handleKeypress = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' || e.key === ' ') {
			this.#handleClick(e as unknown as MouseEvent);
		}
	};

	#handleClick = ({target, ctrlKey, shiftKey, metaKey}: MouseEvent) => {
		if ((target as HTMLElement).getAttribute('role') !== 'gridcell') return;

		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell) {
			this.#handleCellSelection({target, ctrlKey, shiftKey, metaKey});
			return;
		}

		if (this.selectionMode === DataGridSelectionMode.singleRow || this.selectionMode === DataGridSelectionMode.multiRow) {
			this.#handleRowSelection({target, ctrlKey, shiftKey, metaKey});
		}
	};

	#handleCellSelection = ({target, ctrlKey, shiftKey, metaKey}: SelectionMetaData) => {
		const cell = target as DataGridCell;

		if (this.selectionMode === DataGridSelectionMode.multiCell && (ctrlKey || shiftKey || metaKey)) {
			this.#setSelectedState(cell, !this.#selectedCells.includes(cell));
		} else {
			const cacheTargetSelection = cell.getAttribute('aria-selected') === 'true';
			this.#resetSelection();
			this.#setSelectedState(cell, !cacheTargetSelection);
		}
	};

	#handleRowSelection = ({target, ctrlKey, shiftKey, metaKey}: SelectionMetaData) => {
		const row = (target as DataGridCell).parentNode as DataGridRow;
		if (this.selectionMode === DataGridSelectionMode.multiRow && (ctrlKey || shiftKey || metaKey)) {
			this.#setSelectedState(row, !this.#selectedRows.includes(row));
		} else {
			const cacheTargetSelection = row.getAttribute('aria-selected') === 'true';
			this.#resetSelection();
			this.#setSelectedState(row, !cacheTargetSelection);
		}
	};

	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
		this.addEventListener('keydown', this.#handleKeypress);
	}

	#setSelectedState = (cell: DataGridCell | DataGridRow, selectedState: boolean) => {
		cell.setAttribute('aria-selected', selectedState.toString());
	};

	#resetSelection = () => {
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => this.#setSelectedState(cell as DataGridCell, false));
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.none) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.singleRow || this.selectionMode === DataGridSelectionMode.multiRow) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.setAttribute('aria-selected', 'false'));
		}
	};

	#initSelections = () => {
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell) {
			Array.from(this.querySelectorAll('[role="gridcell"]'))
				.forEach(cell => !cell.hasAttribute('aria-selected') && this.#setSelectedState(cell as DataGridCell, false));
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.none) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => row.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.singleRow || this.selectionMode === DataGridSelectionMode.multiRow) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
			Array.from(this.querySelectorAll('[role="row"]'))
				.forEach(row => !row.hasAttribute('aria-selected') && row.setAttribute('aria-selected', 'false'));
		}
	};
}

