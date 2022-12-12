import { DataGridCell as FastDataGridCell} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

export class DataGridCell extends FastDataGridCell {
	@attr({mode: 'fromView'}) selectable: boolean = false;
	@attr() selected: boolean = false;
	@attr() treeview: boolean = false;
}
