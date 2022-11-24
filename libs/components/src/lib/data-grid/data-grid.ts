import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGrid extends FoundationElement {
	@attr() selectableRows: boolean = false;

	private handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		const cell = e.target;

		if (this.selectableRows) {
			const row: any = (e.target as HTMLElement).parentElement;
			row.selected = !row.selected;
			dispatchEvent(new CustomEvent('selected', { detail: { cell, row } }));
		}

	};
	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('click', this.handleClick);
	}
}
