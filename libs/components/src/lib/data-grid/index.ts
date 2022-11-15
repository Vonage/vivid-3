import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './data-grid.scss';

import { DataGrid } from './data-grid';
import { DataGridTemplate as template } from './data-grid.template';
import {dataGridRowTemplate} from './data-grid-row.template';

export const vividDataGrid = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid',
	template: template as any,
	styles,
});

export const vividDataGridRow = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid-row',
	template: dataGridRowTemplate as any,
});

designSystem.register(vividDataGridRow(), vividDataGrid());
