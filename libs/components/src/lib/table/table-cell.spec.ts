import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { TableCell } from './table-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-cell';

describe('Table cell', () => {
	let element: TableCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableCell;
	});

	describe('when the component is set up', () => {
		it('is a table cell component', async () => {
			expect(element).toBeInstanceOf(TableCell);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the content you put inside it', async () => {
			element.textContent = 'Test cell content';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test cell content');
		});

		it('has role="cell" so screen readers know it is a table cell', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('cell');
		});
	});
});
