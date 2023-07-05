import { DataGridRow as FoundationDataGridRow } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGridRow extends FoundationDataGridRow {
	@attr({attribute: 'aria-selected'})
	override ariaSelected: string | null = null;
}
