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
	@attr({mode: 'boolean'}) expandableRows = false;
	@attr() expandableRowTemplate: any;
	@attr() treeViewProperty?: string;

	#treeviewDataColumnDefinition = {
		index: -1,
		definition: null
	};

	treeViewPropertyChanged() {
		const newColumnDefinitions = JSON.parse(JSON.stringify(this.columnDefinitions));
		const dataPropDefinitionIndex = newColumnDefinitions.findIndex((x: any) => x.columnDataKey === this.treeViewProperty);
		this.#treeviewDataColumnDefinition.definition = newColumnDefinitions.splice(dataPropDefinitionIndex, 1);
		this.#treeviewDataColumnDefinition = dataPropDefinitionIndex;
		// newColumnDefinitions.unshift({gridColumn: "0", type: 'treeViewChevron'});
		this.columnDefinitions = newColumnDefinitions;
	}

	private handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();

		if(this.expandableRows) {
			const row: any = (e.target as HTMLElement).parentElement;
			row.expanded = !row.expanded;
		}

		if (this.selectableRows) {
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