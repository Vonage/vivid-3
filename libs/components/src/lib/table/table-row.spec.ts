import { elementUpdated, fixture } from '@repo/shared';
import { TableRow } from './table-row';
import '.';

const COMPONENT_TAG = 'vwc-table-row';

describe('Table row', () => {
	let element: TableRow;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableRow;
	});

	describe('when the component is set up', () => {
		it('is a table row component', async () => {
			expect(element).toBeInstanceOf(TableRow);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the content you put inside its cells', async () => {
			element.innerHTML = '<vwc-table-cell>Cell 1</vwc-table-cell>';
			await elementUpdated(element);
			const cell = element.querySelector('vwc-table-cell');
			expect(cell).toBeTruthy();
			expect(cell?.textContent).toContain('Cell 1');
		});

		it('has role="row" so screen readers know it is a row', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('row');
		});

		it('can display multiple cells in one row', async () => {
			element.innerHTML = `
				<vwc-table-cell>Cell 1</vwc-table-cell>
				<vwc-table-cell>Cell 2</vwc-table-cell>
				<vwc-table-cell>Cell 3</vwc-table-cell>
			`;
			await elementUpdated(element);
			const cells = element.querySelectorAll('vwc-table-cell');
			expect(cells.length).toBe(3);
		});
	});

	describe('focus and keyboard navigation', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<vwc-table-cell>Cell 1</vwc-table-cell>
				<vwc-table-cell>Cell 2</vwc-table-cell>
				<vwc-table-cell>Cell 3</vwc-table-cell>
			`;
			await elementUpdated(element);
		});

		it('remembers which column has focus when you focus a cell', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
		});

		it('remembers the column when you focus a button inside a cell', async () => {
			element.innerHTML = `
				<vwc-table-cell><button id="btn">Action</button></vwc-table-cell>
				<vwc-table-cell>Cell 2</vwc-table-cell>
			`;
			await elementUpdated(element);
			const btn = element.querySelector('#btn') as HTMLButtonElement;
			btn.focus();
			expect(element.focusColumnIndex).toBe(0);
		});

		it('goes back to the first column when focus leaves the row', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[2] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(2);
			const outside = document.createElement('button');
			outside.tabIndex = 0;
			document.body.append(outside);
			outside.focus();
			element.dispatchEvent(
				new FocusEvent('focusout', { bubbles: true, relatedTarget: outside })
			);
			expect(element.focusColumnIndex).toBe(0);
			outside.remove();
		});

		it('resets to the first column after you tab out of the row', async () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			const outside = document.createElement('button');
			outside.tabIndex = 0;
			document.body.append(outside);
			outside.focus();
			await new Promise((resolve) => setTimeout(resolve, 0));
			element.dispatchEvent(
				new FocusEvent('focusout', { bubbles: true, relatedTarget: outside })
			);
			expect(document.activeElement).toBe(outside);
			expect(element.focusColumnIndex).toBe(0);
			outside.remove();
		});

		it('resets to the first column when focus has left the row', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			const containsSpy = vi.spyOn(element, 'contains').mockReturnValue(false);
			element.dispatchEvent(
				new FocusEvent('focusout', { bubbles: true, relatedTarget: null })
			);
			expect(element.focusColumnIndex).toBe(0);
			containsSpy.mockRestore();
		});

		it('keeps the current column when focus moves between cells in the same row', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			element.dispatchEvent(
				new FocusEvent('focusout', { bubbles: true, relatedTarget: cells[0] })
			);
			expect(element.focusColumnIndex).toBe(1);
		});

		it('resets to the first column when focus moved to an element outside the row', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			const outside = document.createElement('div');
			outside.tabIndex = -1;
			document.body.append(outside);
			const desc =
				Object.getOwnPropertyDescriptor(document, 'activeElement') ??
				Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement');
			Object.defineProperty(document, 'activeElement', {
				configurable: true,
				get: () => outside,
			});
			try {
				element.dispatchEvent(
					new FocusEvent('focusout', { bubbles: true, relatedTarget: outside })
				);
				expect(element.focusColumnIndex).toBe(0);
			} finally {
				if (desc) {
					Object.defineProperty(document, 'activeElement', desc);
				}
			}
			outside.remove();
		});

		it('resets to the first column when focus leaves the document (e.g. tabbed away)', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			const desc =
				Object.getOwnPropertyDescriptor(document, 'activeElement') ??
				Object.getOwnPropertyDescriptor(Document.prototype, 'activeElement');
			Object.defineProperty(document, 'activeElement', {
				configurable: true,
				get: () => null,
			});
			try {
				element.dispatchEvent(
					new FocusEvent('focusout', { bubbles: true, relatedTarget: null })
				);
				expect(element.focusColumnIndex).toBe(0);
			} finally {
				if (desc) {
					Object.defineProperty(document, 'activeElement', desc);
				}
			}
		});

		it('resets to the first column when focus is outside the row and focusout is handled', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
			vi.spyOn(element, 'contains').mockReturnValue(false);
			(element as unknown as { handleFocusOut: () => void }).handleFocusOut();
			expect(element.focusColumnIndex).toBe(0);
		});

		it('does not move focus when another element has already handled the arrow key', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[0] as HTMLElement).focus();
			const ev = new KeyboardEvent('keydown', {
				key: 'ArrowRight',
				bubbles: true,
				cancelable: true,
			});
			ev.preventDefault();
			element.dispatchEvent(ev);
			expect(document.activeElement).toBe(cells[0]);
		});

		it('lets you use arrow keys inside an input to move the cursor (does not move focus)', async () => {
			element.innerHTML = `
				<vwc-table-cell><input id="input" /></vwc-table-cell>
				<vwc-table-cell>Cell 2</vwc-table-cell>
			`;
			await elementUpdated(element);
			const input = element.querySelector('#input') as HTMLInputElement;
			const cell2 = element.querySelectorAll('vwc-table-cell')[1];
			input.focus();
			input.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
			);
			expect(document.activeElement).toBe(input);
			expect(document.activeElement).not.toBe(cell2);
		});

		it('Home moves focus to the first cell in the row, End to the last cell', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[1] as HTMLElement).focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
			);
			expect(document.activeElement).toBe(cells[0]);
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'End', bubbles: true })
			);
			expect(document.activeElement).toBe(cells[2]);
		});

		it('does not crash when the row is empty and you press a key', async () => {
			element.innerHTML = '';
			await elementUpdated(element);
			expect(() => {
				element.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
				);
			}).not.toThrow();
		});

		it('notifies the table which row is focused even when focus is on a child element', () => {
			const spy = vi.fn();
			element.addEventListener('row-focused', spy);
			element.dispatchEvent(new Event('cell-focused', { bubbles: true }));
			expect(spy).toHaveBeenCalledWith(expect.anything());
			element.removeEventListener('row-focused', spy);
		});

		it('does not change column when a cell in another row reports focus', async () => {
			const table = document.createElement('vwc-table');
			table.innerHTML = `
				<vwc-table-body>
					<vwc-table-row id="row1">
						<vwc-table-cell>R1C1</vwc-table-cell>
						<vwc-table-cell>R1C2</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row id="row2">
						<vwc-table-cell id="other-cell">R2C1</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			document.body.append(table);
			await elementUpdated(table);
			const row1 = table.querySelector('#row1') as TableRow;
			const otherCell = table.querySelector('#other-cell') as HTMLElement;
			row1.focusColumnIndex = 1;
			const ev = new Event('cell-focused', { bubbles: true });
			Object.defineProperty(ev, 'target', {
				value: otherCell,
				configurable: true,
			});
			row1.dispatchEvent(ev);
			expect(row1.focusColumnIndex).toBe(1);
			table.remove();
		});

		it('updates the focused column when you move to another cell in the same row', () => {
			const cells = Array.from(element.querySelectorAll('vwc-table-cell'));
			(cells[0] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(0);
			(cells[1] as HTMLElement).focus();
			expect(element.focusColumnIndex).toBe(1);
		});
	});
});
