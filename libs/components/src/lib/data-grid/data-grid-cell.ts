import {applyMixins, ColumnDefinition, DataGridCell as FoundationDataGridCell} from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type {DataGridCellSortStates} from './data-grid.options';

declare interface ColumnDefinitionExtended extends ColumnDefinition {
	sortDirection?: DataGridCellSortStates | null;
	sortable?: boolean | undefined;
}

class DataGridCellExtension {
	@attr()
		columnDefinition: ColumnDefinitionExtended | null = null;
}
/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGridCell extends FoundationDataGridCell {

	@attr({ attribute: 'aria-selected', mode: 'fromView' }) override ariaSelected: string | null = null;
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
}

export interface DataGridCell extends DataGridCellExtension {
	columnDefinition: ColumnDefinitionExtended | null;
}

applyMixins(DataGridCell, DataGridCellExtension);
