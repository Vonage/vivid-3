import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './data-grid.scss';

import { DataGrid } from './data-grid';
import { DataGridTemplate as template } from './data-grid.template';

export const dataGrid = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid',
	template: template as any,
	styles,
})();

export const dataGridElements = [dataGrid];

/**
 * Registers the data-grid element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDataGrid = registerFactorial(dataGridElements);
