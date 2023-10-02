import { DataGridRow as FoundationDataGridRow } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
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
