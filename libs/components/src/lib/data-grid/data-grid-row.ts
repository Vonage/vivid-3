import { DataGridRow as FoundationDataGridRow } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 * @slot - Default slot.
 * @event cell-click - Event that fires when a cell is clicked
 */
export class DataGridRow extends FoundationDataGridRow {
	/**
	 * Indicates the selected status.
	 *
	 * @public
	 * HTML Attribute: aria-selected
	 */
	@attr({attribute: 'aria-selected'})
	override ariaSelected: string | null = null;
}
