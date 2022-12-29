import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { fixture } from '@vivid-nx/shared';
import { designSystem } from '../../shared/design-system';
import { DataGridRow } from './data-grid-row';
import { DataGridRowTemplate } from './data-grid-row.template';

const dataGridRow = DataGridRow.compose<FoundationElementDefinition>({
	baseName: 'data-grid-row',
	template: DataGridRowTemplate as any
});

designSystem.withPrefix('vwc').register(dataGridRow());

const COMPONENT_TAG = 'vwc-data-grid-row';

describe('vwc-data-grid-row', () => {
	let element: DataGridRow;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as DataGridRow;
	});

	// TODO::adds grid column style
	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGridRow);
		});
	});
});
