import { DataGridRow as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGridRow extends FoundationElement {
	@attr({mode: 'fromView'}) selectable: boolean = false;
	@attr() selected = false;
}
