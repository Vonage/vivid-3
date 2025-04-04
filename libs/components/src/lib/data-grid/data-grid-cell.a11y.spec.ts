import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { DataGridCell } from './data-grid-cell';
import { DataGridCellSortStates } from './data-grid.options';
import '.';

const COMPONENT_TAG = 'vwc-data-grid-cell';

describe('a11y: vwc-data-grid-cell', () => {
	let element: DataGridCell;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const div = (await fixture(`
      <div role="grid">
        <div role="row">
          <${COMPONENT_TAG}></${COMPONENT_TAG}>
        </div>
      </div>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as DataGridCell;
	});

	it('should pass html a11y test', async () => {
		const setParentsRoles = (element: HTMLElement) => {
			element.parentElement!.setAttribute('role', 'row');
			element.parentElement!.parentElement!.setAttribute('role', 'grid');
		};

		element.columnDefinition = {
			columnDataKey: 'Name',
			sortDirection: DataGridCellSortStates.ascending,
			sortable: true,
			isRowHeader: true,
		};
		setParentsRoles(element);
		element.setAttribute('role', 'columnheader');
		element.rowData = { Name: 'Person 1' };

		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
