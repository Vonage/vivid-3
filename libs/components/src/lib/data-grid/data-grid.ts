import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGrid extends FoundationElement {
	override handleFocus() {
		const focusOnCell = (rowIndex: number, columnIndex: number) => {
			if (this.rowElements.length === 0) {
				this.focusRowIndex = 0;
				this.focusColumnIndex = 0;
				return;
			}
			const focusRowIndex = Math.max(0, Math.min(this.rowElements.length - 1, rowIndex));
			const focusRow = this.rowElements[focusRowIndex];
			const cells = focusRow.querySelectorAll('[role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"]');
			const focusColumnIndex = Math.max(0, Math.min(cells.length - 1, columnIndex));
			const focusTarget = cells[focusColumnIndex] as HTMLElement;
			focusTarget.focus();
		};
		if (this.focusRowIndex === 0) {
			this.focusRowIndex = 1;
		}
		focusOnCell(this.focusRowIndex, this.focusColumnIndex);
	}

	override handleRowFocus(e: Event) {
		super.handleRowFocus(e);
		this.handleFocus();
	}
}
