import { DataGridRow as FoundationDataGridRow } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * @public
 * @component data-grid-row
 * @slot - Default slot.
 * @event {CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>} cell-click - Event that fires when a cell is clicked
 * @event {CustomEvent<HTMLElement>} row-focused - Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row
 */
export class DataGridRow extends FoundationDataGridRow {
	/**
	 * Indicates the selected status.
	 *
	 * @public
	 * HTML Attribute: aria-selected
	 */
	@attr({ attribute: 'aria-selected' })
	override ariaSelected: string | null = null;
}
