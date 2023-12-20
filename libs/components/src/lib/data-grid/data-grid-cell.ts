import {
	type ColumnDefinition,
	DataGridCell as FoundationDataGridCell,
} from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { DataGridCellSortStates } from './data-grid.options';

declare interface ColumnDefinitionExtended extends ColumnDefinition {
	sortDirection?: DataGridCellSortStates | null;
	sortable?: boolean | undefined;
}

declare interface DataGridCellExtension {
	columnDefinition: ColumnDefinitionExtended | null;
}
/**
 * Base class for data-grid
 *
 * @public
 * @event sort - Event that fires when a sortable column header is clicked
 * @event cell-click - Event that fires when a cell is clicked
 */
export class DataGridCell extends FoundationDataGridCell {
	/**
	 * Indicates the selected status.
	 *
	 * @public
	 * HTML Attribute: aria-selected
	 */
	@attr({ attribute: 'aria-selected', mode: 'fromView' }) override ariaSelected: string | null = null;

	/**
	 * Indicates the sort status.
	 *
	 * @public
	 * HTML Attribute: aria-sort
	 */
	@attr({ attribute: 'aria-sort' }) override ariaSort: string | null = null;

	ariaSelectedChanged(_: string | null, selectedState: string | null) {
		this.shadowRoot!.querySelector('.base')?.classList.toggle('selected', selectedState === 'true');
	}

	override connectedCallback() {
		super.connectedCallback();
		this.ariaSelectedChanged(null, this.ariaSelected);
	}

	override handleFocusin(e: FocusEvent) {
		super.handleFocusin(e);
		this.shadowRoot!.querySelector('.base')!.classList.add('active');
	}

	override handleFocusout(e: FocusEvent) {
		super.handleFocusout(e);
		this.shadowRoot!.querySelector('.base')!.classList.remove('active');
	}

	constructor() {
		super();
		(this as any).updateCellStyle = () => {
			if (this.gridColumn && !this.gridColumn.includes('undefined')) {
				this.style.gridColumn = this.gridColumn;
			} else {
				this.style.removeProperty('grid-column');
			}
		};
	}

	#getColumnDataKey() {
		return this.columnDefinition && this.columnDefinition.columnDataKey
			? this.columnDefinition.columnDataKey
			: this.textContent!.trim();
	}
	/**
	 * @internal
	 */
	_handleClick() {
		const isHeaderCell = this.cellType === 'columnheader';
		const isSortable = isHeaderCell && this.ariaSort !== null;

		if (isSortable) {
			this.$emit('sort', {
				columnDataKey: this.#getColumnDataKey(),
				sortDirection: this.ariaSort,
			});
		}

		const hasInternalFocusQueue =
			(isHeaderCell && this.columnDefinition?.headerCellInternalFocusQueue) ||
			this.columnDefinition?.cellInternalFocusQueue;
		if (!hasInternalFocusQueue) {
			this.$emit('cell-click', {
				cell: this,
				row: this.parentElement,
				isHeaderCell: isHeaderCell,
				columnDataKey: this.#getColumnDataKey(),
			});
		}
	}

	/**
	 * @internal
	 */
	_handleKeyDown(e: KeyboardEvent) {
		if (e.target === this && (e.key === keyEnter || e.key === keySpace)) {
			this._handleClick();
		}
		return true;
	}
}

export interface DataGridCell extends DataGridCellExtension {
	columnDefinition: ColumnDefinitionExtended | null;
}
