import { DataGrid as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGrid extends FoundationElement {
	@attr({mode: 'boolean'}) selectableRows = false;
	@attr({mode: 'boolean'}) selectableCells = false;

	private handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();


		if (this.selectableRows) {x
			const row: any = (e.target as HTMLElement).parentElement;
			row.selected = !row.selected;
			dispatchEvent(new CustomEvent('selected', { detail: { row } }));
		}

		if (this.selectableCells) {
			const cell = e.target as any;
			cell.selected = !cell.selected;
			dispatchEvent(new CustomEvent('selected', { detail: { cell } }));
		}

	};
	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('click', this.handleClick);
	}
}
