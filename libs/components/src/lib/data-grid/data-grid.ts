import { DataGrid as FoundationDataGrid } from '@microsoft/fast-foundation';
import { attr, DOM, observable, Observable } from '@microsoft/fast-element';
import type { DataGridCell } from './data-grid-cell';
import type { DataGridRow } from './data-grid-row';
import { DataGridRowTypes, GenerateHeaderOptions } from './data-grid.options';

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
 * @event cell-click - Event that fires when a cell is clicked
 */
export class DataGrid extends FoundationDataGrid {
	/**
	 *
	 * Rows slot observer:
	 *
	 * @internal
	 */
	@observable slottedRowElements?: HTMLElement[];

	/**
	 *
	 *
	 * @internal
	 */
	slottedRowElementsChanged(_oldValue: HTMLElement[], _newValue: HTMLElement[]) {
		this.#initSelections();
	}

	/**
	 * Indicates the selection mode.
	 *
	 * @public
	 * HTML Attribute: selection-mode
	 */
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

	selectionModeChanged(oldValue: DataGridSelectionMode) {
		if (oldValue === undefined) {
			DOM.queueUpdate(this.#initSelections);
			return;
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

		// Override toggleGeneratedHeader to generate the header row even if the grid is empty
		const privates = this as unknown as {
			generatedHeader: DataGridRow | null;
			rowsPlaceholder: HTMLElement | null;
			rowElementTag: string;
			toggleGeneratedHeader: () => void;
		};
		privates.toggleGeneratedHeader = () => {
			if (privates.generatedHeader !== null) {
				this.removeChild(privates.generatedHeader);
				privates.generatedHeader = null;
			}

			if (
				this.generateHeader !== GenerateHeaderOptions.none &&
				this.columnDefinitions !== null
			) {
				const generatedHeaderElement: HTMLElement = document.createElement(
					this.rowElementTag
				);
				privates.generatedHeader = (generatedHeaderElement as unknown) as DataGridRow;
				privates.generatedHeader.columnDefinitions = this.columnDefinitions;
				privates.generatedHeader.gridTemplateColumns = this.gridTemplateColumns;
				privates.generatedHeader.rowType =
					this.generateHeader === GenerateHeaderOptions.sticky
						? DataGridRowTypes.stickyHeader
						: DataGridRowTypes.header;
				/* istanbul ignore next */
				if (this.firstChild !== null || privates.rowsPlaceholder !== null) {
					this.insertBefore(
						generatedHeaderElement,
						this.firstChild !== null ? this.firstChild : privates.rowsPlaceholder
					);
				}
				return;
			}
		};
	}

	#changeHandler = {
		handleChange(dataGrid: DataGrid, propertyName: string) {
			if (propertyName === 'columnDefinitions') {
				if (dataGrid.$fastController.isConnected) {
					(dataGrid as any).toggleGeneratedHeader();
				}
			}
		}
	};

	override connectedCallback() {
		super.connectedCallback();
		Observable.getNotifier(this).subscribe(this.#changeHandler, 'columnDefinitions');
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		Observable.getNotifier(this).unsubscribe(this.#changeHandler, 'columnDefinitions');
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

	static override generateColumns (rowData: any)  {
		return Object.keys(rowData).map((property, index) => {
			return {
				columnDataKey: property,
				gridColumn: `${index}`,
			};
		});
	}


}

