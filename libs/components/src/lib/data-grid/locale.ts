import type { DataGridCellSortStates } from './data-grid.options';

type SortAnnouncements = Record<DataGridCellSortStates, string>;

export interface DataGridLocale {
	cell: {
		selected: string;
		button: string;
		sortStatus: SortAnnouncements;
		sortInstruction: SortAnnouncements;
	};
}
