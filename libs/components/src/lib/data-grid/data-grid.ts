import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import type {DataGridCell} from './data-grid-cell';

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

		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell)  {
			if (this.selectionMode === DataGridSelectionMode.multiCell && (ctrlKey || shiftKey || metaKey)) {
				this.#setSelectedState(targetAsCell, !this.#selectedCells.includes(targetAsCell));
			} else {
				const cacheTargetSelection = targetAsCell.getAttribute('aria-selected') === 'true';
				this.#resetSelection();
				this.#setSelectedState(targetAsCell, !cacheTargetSelection);
			}
		}
	};

	constructor() {
		super();
		this.addEventListener('click', this.#handleClick);
		this.addEventListener('keydown', this.#handleKeypress);
	}

	#setSelectedState = (cell: Element, selectedState: boolean) => {
		cell.setAttribute('aria-selected', selectedState.toString());
	};

	#resetSelection() {
		if (this.selectionMode === DataGridSelectionMode.singleCell || this.selectionMode === DataGridSelectionMode.multiCell) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => this.#setSelectedState(cell, false));
		}
		if (this.selectionMode === DataGridSelectionMode.none) {
			Array.from(this.querySelectorAll('[role="gridcell"]')).forEach(cell => cell.removeAttribute('aria-selected'));
		}
		if (this.selectionMode === DataGridSelectionMode.singleRow) {
			Array.from(this.querySelectorAll('[role="row"]')).forEach(row => this.#setSelectedState(row, false));
		}
	}
}

